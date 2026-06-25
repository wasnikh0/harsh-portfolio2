import CryptoJS from "crypto-js";

async function generateAESKey(password: string): Promise<CryptoKey> {
  const passwordBuffer = new TextEncoder().encode(password);
  const hashedPassword = await crypto.subtle.digest("SHA-256", passwordBuffer);
  return crypto.subtle.importKey(
    "raw",
    hashedPassword.slice(0, 32),
    { name: "AES-CBC" },
    false,
    ["encrypt", "decrypt"]
  );
}

function wordArrayToArrayBuffer(wordArray: CryptoJS.lib.WordArray): ArrayBuffer {
  const { words, sigBytes } = wordArray;
  const bytes = new Uint8Array(sigBytes);

  for (let i = 0; i < sigBytes; i++) {
    bytes[i] = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
  }

  return bytes.buffer;
}

function decryptWithCryptoJs(
  data: ArrayBuffer,
  iv: Uint8Array,
  password: string
): ArrayBuffer {
  const key = CryptoJS.SHA256(password);
  const decrypted = CryptoJS.AES.decrypt(
    CryptoJS.lib.CipherParams.create({
      ciphertext: CryptoJS.lib.WordArray.create(new Uint8Array(data)),
    }),
    key,
    {
      iv: CryptoJS.lib.WordArray.create(Array.from(iv)),
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }
  );

  return wordArrayToArrayBuffer(decrypted);
}

export const decryptFile = async (
  url: string,
  password: string
): Promise<ArrayBuffer> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch encrypted model (${response.status})`);
  }

  const encryptedData = await response.arrayBuffer();
  const iv = new Uint8Array(encryptedData.slice(0, 16));
  const data = encryptedData.slice(16);

  if (window.isSecureContext && crypto.subtle?.decrypt) {
    try {
      const key = await generateAESKey(password);
      return crypto.subtle.decrypt({ name: "AES-CBC", iv }, key, data);
    } catch (error) {
      console.warn("Web Crypto decrypt failed, using JS fallback:", error);
    }
  }

  return decryptWithCryptoJs(data, iv, password);
};
