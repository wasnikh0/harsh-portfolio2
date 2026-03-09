import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Engineer</h4>
                <h5>UGenome</h5>
              </div>
              <h3>Aug 2025 – Present</h3>
            </div>
            <p>
              Developing scalable data governance systems and AI‑powered solutions as
              a full‑stack engineer. Leveraging ML models and cloud platforms to drive
              business ROI and build production‑ready pipelines.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Machine Learning Researcher &amp; Graduate Teaching Assistant</h4>
                <h5>University of Arizona</h5>
              </div>
              <h3>Sep 2024 – Aug 2025</h3>
            </div>
            <p>
              Built an NLP grading pipeline reducing manual effort by 40%, led
              weekly algorithm discussion sessions, and engineered a LangChain-based
              document app for natural‑language PDF querying. Conducted research in
              AI systems and taught machine learning topics to graduate students.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Engineer / Associate Engineer</h4>
                <h5>Tata Communications</h5>
              </div>
              <h3>Nov 2021 – Jul 2024</h3>
            </div>
            <p>
              Streamlined IoT ingestion pipelines, analyzed telecom datasets to
              power dashboards, and managed SDLC for enterprise systems, delivering
              automated insights and supporting high‑volume traffic.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Implementation Engineer</h4>
                <h5>Larsen &amp; Toubro</h5>
              </div>
              <h3>May 2017 – Jul 2017</h3>
            </div>
            <p>
              Worked on mechanical engineering infrastructure projects, assisting
              in design, analysis, and quality assurance to optimize manufacturing
              workflows.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
