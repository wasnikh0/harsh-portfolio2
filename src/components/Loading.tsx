import { useEffect, useState } from "react";
import "./styles/Loading.css";
import { useLoading } from "../context/LoadingProvider";

const Loading = ({ percent }: { percent: number }) => {
  const { setIsLoading } = useLoading();
  const [loaded, setLoaded] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [clicked, setClicked] = useState(false);

  if (percent >= 100) {
    setTimeout(() => {
      setLoaded(true);
      setTimeout(() => {
        setIsLoaded(true);
      }, 1000);
    }, 600);
  }

  useEffect(() => {
    import("./utils/initialFX").then((module) => {
      if (isLoaded) {
        setClicked(true);
        setTimeout(() => {
          if (module.initialFX) {
            module.initialFX();
          }
          setIsLoading(false);
        }, 900);
      }
    });
  }, [isLoaded]);

  const progressDegrees = Math.min(360, Math.max(0, percent * 3.6));

  return (
    <>
      <div className="loading-header">
        <a href="/#" className="loader-title" data-cursor="disable">
          HW
        </a>
        <span className="loader-status">Initializing Portfolio</span>
      </div>
      <div className="loading-screen">
        <div className="loading-bg-orb loading-bg-orb-1"></div>
        <div className="loading-bg-orb loading-bg-orb-2"></div>
        <div className="loading-roles">
          <div className="loading-roles-track">
            <span>Data Scientist</span>
            <span>Machine Learning Specialist</span>
            <span>Analytics Consultant</span>
            <span>AI Engineer</span>
            <span>Data Scientist</span>
            <span>Machine Learning Specialist</span>
          </div>
        </div>
        <div className={`loading-wrap ${clicked && "loading-clicked"}`}>
          <div className={`loading-button ${loaded && "loading-complete"}`}>
            <div className="loading-ring" style={{ background: `conic-gradient(var(--accentColor) ${progressDegrees}deg, rgba(17, 54, 52, 0.15) 0deg)` }}>
              <div className="loading-ring-inner">{percent}%</div>
            </div>
            <div className="loading-container">
              <div className="loading-content">Preparing interactive experience</div>
              <div className="loading-progress-bar">
                <div className="loading-progress-fill" style={{ width: `${Math.min(100, Math.max(0, percent))}%` }}></div>
              </div>
            </div>
            <div className="loading-content2">
              <span>Welcome, I'm Harsh</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loading;

export const setProgress = (setLoading: (value: number) => void) => {
  let percent: number = 0;

  let interval = setInterval(() => {
    if (percent <= 50) {
      let rand = Math.round(Math.random() * 5);
      percent = percent + rand;
      setLoading(percent);
    } else {
      clearInterval(interval);
      interval = setInterval(() => {
        percent = percent + Math.round(Math.random());
        setLoading(percent);
        if (percent > 91) {
          clearInterval(interval);
        }
      }, 2000);
    }
  }, 100);

  function clear() {
    clearInterval(interval);
    setLoading(100);
  }

  function loaded() {
    return new Promise<number>((resolve) => {
      clearInterval(interval);
      interval = setInterval(() => {
        if (percent < 100) {
          percent++;
          setLoading(percent);
        } else {
          resolve(percent);
          clearInterval(interval);
        }
      }, 2);
    });
  }
  return { loaded, percent, clear };
};
