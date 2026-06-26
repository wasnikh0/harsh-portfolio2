import { useEffect, useRef } from "react";
import * as THREE from "three";
import setCharacter from "./utils/character";
import setLighting from "./utils/lighting";
import { useLoading } from "../../context/LoadingProvider";
import handleResize from "./utils/resizeUtils";
import {
  handleMouseMove,
  handleTouchEnd,
  handleHeadRotation,
  handleTouchMove,
} from "./utils/mouseUtils";
import setAnimations from "./utils/animationUtils";
import { setProgress } from "../Loading";

const MOBILE_BREAKPOINT = 1024;
const LOAD_TIMEOUT_MS = 20000;

const Scene = () => {
  const canvasDiv = useRef<HTMLDivElement | null>(null);
  const hoverDivRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef(new THREE.Scene());
  const { setLoading } = useLoading();

  useEffect(() => {
    const canvasHost = canvasDiv.current;
    if (!canvasHost) {
      return;
    }

    let disposed = false;
    let renderer: THREE.WebGLRenderer | null = null;
    let loadTimeout: number | undefined;
    let debounce: number | undefined;
    let resizeObserver: ResizeObserver | undefined;
    let headBone: THREE.Object3D | null = null;
    let screenLight: THREE.Object3D | null = null;
    let mixer: THREE.AnimationMixer | undefined;
    let loadingFinished = false;
    let characterRevealed = false;
    let lightingControls: ReturnType<typeof setLighting> | null = null;
    let cleanupFns: Array<() => void> = [];

    const isMobile = () => window.innerWidth <= MOBILE_BREAKPOINT;

    const getContainerSize = () => {
      const rect = canvasHost.getBoundingClientRect();
      return {
        width: Math.max(rect.width, 1),
        height: Math.max(rect.height, 1),
      };
    };

    const revealCharacter = (onComplete?: () => void) => {
      if (characterRevealed) {
        onComplete?.();
        return;
      }

      characterRevealed = true;
      const delay = loadingFinished ? 300 : 2500;

      window.setTimeout(() => {
        if (disposed) {
          return;
        }

        lightingControls?.turnOnLights();
        canvasHost.classList.add("character-loaded");
        onComplete?.();
      }, delay);
    };

    const completeLoading = (onComplete?: () => void) => {
      if (loadingFinished) {
        onComplete?.();
        return;
      }

      loadingFinished = true;
      progress.loaded().then(() => {
        if (characterRevealed) {
          onComplete?.();
          return;
        }

        revealCharacter(onComplete);
      });
    };

    const progress = setProgress((value) => setLoading(value));

    const setupScene = () => {
      if (disposed || renderer) {
        return;
      }

      const container = getContainerSize();
      if (container.width <= 1 || container.height <= 1) {
        return;
      }

      const aspect = container.width / container.height;
      const scene = sceneRef.current;
      const mobile = isMobile();

      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: !mobile,
        powerPreference: mobile ? "low-power" : "high-performance",
        failIfMajorPerformanceCaveat: false,
      });

      if (!renderer.getContext()) {
        console.error("WebGL is unavailable on this device.");
        completeLoading();
        return;
      }

      renderer.setSize(container.width, container.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, mobile ? 1.5 : 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1;
      canvasHost.appendChild(renderer.domElement);

      const camera = new THREE.PerspectiveCamera(14.5, aspect, 0.1, 1000);
      camera.position.set(0, 13.1, 24.7);
      camera.zoom = mobile ? 1 : 1.1;
      camera.updateProjectionMatrix();

      const clock = new THREE.Clock();
      lightingControls = setLighting(scene);
      const { loadCharacter } = setCharacter(renderer, scene, camera);

      loadTimeout = window.setTimeout(() => {
        console.warn("Loading screen timeout reached.");
        completeLoading();
      }, LOAD_TIMEOUT_MS);

      loadCharacter()
        .then((gltf) => {
          if (!gltf || disposed || !renderer) {
            completeLoading();
            return;
          }

          const animations = setAnimations(gltf);
          hoverDivRef.current && animations.hover(gltf, hoverDivRef.current);
          mixer = animations.mixer;

          const loadedCharacter = gltf.scene;
          scene.add(loadedCharacter);
          headBone = loadedCharacter.getObjectByName("spine006") || null;
          screenLight = loadedCharacter.getObjectByName("screenlight") || null;

          const onReady = () => animations.startIntro();
          if (loadingFinished) {
            revealCharacter(onReady);
          } else {
            completeLoading(onReady);
          }

          const onResize = () =>
            handleResize(renderer!, camera, canvasDiv, loadedCharacter);
          window.addEventListener("resize", onResize);
          onResize();
          cleanupFns.push(() => window.removeEventListener("resize", onResize));
        })
        .catch((error) => {
          console.error("Character failed to load:", error);
          completeLoading();
        })
        .finally(() => {
          if (loadTimeout) {
            window.clearTimeout(loadTimeout);
          }
        });

      let mouse = { x: 0, y: 0 };
      let interpolation = { x: 0.1, y: 0.2 };

      const onMouseMove = (event: MouseEvent) => {
        handleMouseMove(event, (x, y) => {
          mouse = { x, y };
        });
      };

      const onTouchStart = (event: TouchEvent) => {
        const element = event.target as HTMLElement;
        debounce = window.setTimeout(() => {
          element?.addEventListener("touchmove", (e: TouchEvent) =>
            handleTouchMove(e, (x, y) => {
              mouse = { x, y };
            })
          );
        }, 200);
      };

      const onTouchEnd = () => {
        handleTouchEnd((x, y, interpolationX, interpolationY) => {
          mouse = { x, y };
          interpolation = { x: interpolationX, y: interpolationY };
        });
      };

      document.addEventListener("mousemove", onMouseMove);
      const landingDiv = document.getElementById("landingDiv");
      landingDiv?.addEventListener("touchstart", onTouchStart);
      landingDiv?.addEventListener("touchend", onTouchEnd);
      cleanupFns.push(() => {
        document.removeEventListener("mousemove", onMouseMove);
        landingDiv?.removeEventListener("touchstart", onTouchStart);
        landingDiv?.removeEventListener("touchend", onTouchEnd);
      });

      const animate = () => {
        if (disposed || !renderer) {
          return;
        }

        requestAnimationFrame(animate);

        if (headBone && lightingControls) {
          handleHeadRotation(
            headBone,
            mouse.x,
            mouse.y,
            interpolation.x,
            interpolation.y,
            THREE.MathUtils.lerp
          );
          lightingControls.setPointLight(screenLight);
        }

        const delta = clock.getDelta();
        mixer?.update(delta);
        renderer.render(scene, camera);
      };

      animate();
    };

    setupScene();

    if (!renderer) {
      resizeObserver = new ResizeObserver(() => {
        if (!renderer) {
          setupScene();
        }
      });
      resizeObserver.observe(canvasHost);
    }

    return () => {
      disposed = true;
      if (loadTimeout) {
        window.clearTimeout(loadTimeout);
      }
      if (debounce) {
        window.clearTimeout(debounce);
      }
      resizeObserver?.disconnect();
      cleanupFns.forEach((cleanup) => cleanup());
      sceneRef.current.clear();
      renderer?.dispose();
      if (renderer?.domElement.parentElement === canvasHost) {
        canvasHost.removeChild(renderer.domElement);
      }
    };
  }, [setLoading]);

  return (
    <div className="character-container">
      <div className="character-model">
        <div className="character-scene" ref={canvasDiv}>
          <div className="character-rim"></div>
          <div className="character-hover" ref={hoverDivRef}></div>
        </div>
      </div>
    </div>
  );
};

export default Scene;
