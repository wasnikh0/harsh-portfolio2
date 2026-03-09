import { useState, useCallback } from "react";
import "./styles/Work.css";
import { MdArrowBack, MdArrowForward } from "react-icons/md";

const projects = [
  {
    title: "Network Security MLOps Pipeline",
    emoji: "🛡️",
    category: "MLOps & Cybersecurity",
    tools: "Python, MLflow, Docker, AWS EC2/ECR, GitHub Actions, DagsHub",
    gradient: "linear-gradient(135deg, #0f766e 0%, #115e59 50%, #134e4a 100%)",
    highlights: [
      "End-to-end MLOps pipeline for real-time phishing detection",
      "Modular architecture with YAML configs & CI/CD via GitHub Actions",
      "Dockerized & deployed to AWS EC2 using ECR",
      "Compared Random Forest, AdaBoost, Gradient Boosting, Logistic Regression & Decision Trees",
    ],
  },
  {
    title: "AI-Powered Risk Predictor",
    emoji: "🔐",
    category: "Healthcare AI & NLP",
    tools: "Databricks Spark, LLMs, Knowledge Graphs, EHR Data",
    gradient: "linear-gradient(135deg, #7c3aed 0%, #6d28d9 50%, #4c1d95 100%)",
    highlights: [
      "HIPAA-compliant patient-specific treatment recommendations",
      "Integrated EHR, clinical notes & medication data",
      "Achieved 90% accuracy in diagnosis prediction",
      "Built with Databricks Spark & Knowledge Graphs",
    ],
  },
  {
    title: "Adaptive Learning with GPT + KGs",
    emoji: "📚",
    category: "EdTech & GenAI · Published at IEEE ICCPCT 2025",
    tools: "GPT-4, Semantic Knowledge Graphs, Python, NLP",
    gradient: "linear-gradient(135deg, #0369a1 0%, #075985 50%, #0c4a6e 100%)",
    highlights: [
      "Integrated GPT-4 with semantic knowledge graphs",
      "Personalised learning paths for students",
      "Improved student engagement by 25%, retention by 18%",
      "Published at IEEE ICCPCT 2025",
    ],
  },
];

const Work = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goToSlide = useCallback(
    (index: number) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setCurrentIndex(index);
      setTimeout(() => setIsAnimating(false), 500);
    },
    [isAnimating]
  );

  const goToPrev = useCallback(() => {
    const newIndex =
      currentIndex === 0 ? projects.length - 1 : currentIndex - 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  const goToNext = useCallback(() => {
    const newIndex =
      currentIndex === projects.length - 1 ? 0 : currentIndex + 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>

        <div className="carousel-wrapper">
          {/* Navigation Arrows */}
          <button
            className="carousel-arrow carousel-arrow-left"
            onClick={goToPrev}
            aria-label="Previous project"
            data-cursor="disable"
          >
            <MdArrowBack />
          </button>
          <button
            className="carousel-arrow carousel-arrow-right"
            onClick={goToNext}
            aria-label="Next project"
            data-cursor="disable"
          >
            <MdArrowForward />
          </button>

          {/* Slides */}
          <div className="carousel-track-container">
            <div
              className="carousel-track"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {projects.map((project, index) => (
                <div className="carousel-slide" key={index}>
                  <div className="carousel-content">
                    <div className="carousel-info">
                      <div className="carousel-number">
                        <h3>0{index + 1}</h3>
                      </div>
                      <div className="carousel-details">
                        <h4>{project.title}</h4>
                        <p className="carousel-category">
                          {project.category}
                        </p>
                        <div className="carousel-tools">
                          <span className="tools-label">Tools & Tech</span>
                          <p>{project.tools}</p>
                        </div>
                      </div>
                    </div>
                    <div className="carousel-image-wrapper">
                      <div
                        className="project-card-visual"
                        style={{ background: project.gradient }}
                      >
                        <span className="project-card-emoji">
                          {project.emoji}
                        </span>
                        <ul className="project-card-highlights">
                          {project.highlights.map((h, i) => (
                            <li key={i}>{h}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dot Indicators */}
          <div className="carousel-dots">
            {projects.map((_, index) => (
              <button
                key={index}
                className={`carousel-dot ${index === currentIndex ? "carousel-dot-active" : ""
                  }`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to project ${index + 1}`}
                data-cursor="disable"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;
