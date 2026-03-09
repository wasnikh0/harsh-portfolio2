import { PropsWithChildren } from "react";
import "./styles/Landing.css";

const Landing = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <h2>Hello! I'm</h2>
            <h1>
              HARSH
              <br />
              <span>WASNIK</span>
            </h1>
          </div>
          <div className="landing-info">
            <h3>Data Scientist</h3>
            <h2 className="landing-info-h2">
              <div className="landing-h2-1">Machine</div>
              <div className="landing-h2-2">Learning</div>
            </h2>
            <h2>
              <div className="landing-h2-info">Analytics</div>
              <div className="landing-h2-info-1">Consultant</div>
            </h2>
            <p className="landing-tagline">
              Driving Business ROI with Scalable Data Governance Systems
            </p>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
