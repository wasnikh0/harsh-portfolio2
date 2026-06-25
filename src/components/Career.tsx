import "./styles/Career.css";

const experience = [
  {
    role: "Head of AI/ML",
    company: "Voicera",
    period: "Feb 2026 – Present",
    highlights: [
      "Leading architecture and delivery of Voicera's core multimodal sincerity score engine, an LLM-backed GenAI service that combines audio and video models to quantify speaker credibility, exposed via REST APIs and real-time webhooks for paying customers, including model evaluation, deployment, and monitoring",
      "Architected and deployed a cost-efficient AI stack in Python on GCP containerizing services with Docker and hosting Ollama as an internal VM-hosted LLM endpoint to avoid external API costs while maintaining control over latency and data privacy",
      "Built an outreach platform implementing multi-agent AI workflows where sub-agents handle planning, sequencing, content generation, and execution across email and LinkedIn, effectively turning one rep into a small virtual sales team",
      "Own the full engineering lifecycle of GitHub, CI/CD, backend services, observability, and integration with internal and third-party APIs defining architectural patterns and technical standards for rapid, reliable GenAI feature delivery",
    ],
  },
  {
    role: "Data Scientist",
    company: "UGenome",
    period: "Aug 2025 – Apr 2026",
    highlights: [
      "Designed and engineered an internal Customer Data Platform (CDP) in SQL to centralize marketing leads and user records into a scalable, cloud-ready relational database",
      "Leveraged Databricks fundamentals to design analytics and ML workflows that can run on Azure-integrated data platforms for enterprise customers",
      "Implemented governance and safety controls for AI services, including prompt and tool management, rate-limiting, logging, and data-handling policies to ensure reliable behavior and auditability for enterprise customers",
      "Established the foundation for predictive analytics by training Python-based ML models on centralized CDP data to predict churn, retention, and product usage, informing future GenAI and personalization use-cases",
    ],
  },
  {
    role: "Graduate Assistant: Machine Learning",
    company: "University of Arizona",
    period: "Sept 2024 – Aug 2025",
    highlights: [
      "Led 40+ students as a Teaching Assistant, managing office hours, resolving blockers in assignments, and coordinating escalations with the professor, similar to a release triage process and incident management for academic deliverables",
      "Facilitated weekly problem-solving sessions and 1:1 mentoring for 30+ students in Algorithms, resulting in higher assignment completion rates and a 10% increase in course pass rates",
    ],
  },
  {
    role: "Business and Data Analyst",
    company: "Tata Communications",
    period: "Nov 2021 – July 2024",
    highlights: [
      "Formed successful relationships with sales, product, and regional leadership to drive LATAM market entry by analyzing telecom demand and competitive pricing across Brazil, Mexico, and Chile, expanding qualified enterprise leads by 40%",
      "Implemented machine-learning ensemble models (Random Forest, Gradient Boosting) on structured sensor data to detect anomalies and deployed monitoring workflows, enabling proactive interventions that safeguarded product quality",
      "Created executive-facing Power BI reports and data marts aggregating 500GB of multi-dimensional customer and network data, empowering KPI-driven personalized outreach campaigns and revenue-focused decision-making",
      "Reported 500+ critical defects during UAT for a financial risk management system, decreased production incidents by 30%",
    ],
  },
];

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
          {experience.map((job) => (
            <div className="career-info-box" key={`${job.company}-${job.period}`}>
              <div className="career-info-in">
                <div className="career-role">
                  <h4>{job.role}</h4>
                  <h5>{job.company}</h5>
                </div>
                <h3>{job.period}</h3>
              </div>
              <ul className="career-highlights">
                {job.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Career;
