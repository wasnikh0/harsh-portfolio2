import "./styles/About.css";

const About = () => {
  return (
    <div className="about-section" id="about">
      <div className="about-me">
        <h3 className="title">About Me</h3>
        <p className="para">
          Data-driven engineer with a strong foundation in machine learning, data
          pipelines, and analytics, passionate about turning complex datasets into
          real business outcomes. Proud graduate of the University of Arizona with a
          4.0 GPA and a member of the Dean’s Distinguished Scholars List. Industry
          experience at Tata Communications building AI‑powered systems that are
          scalable, cloud‑ready, and impact‑focused. I’ve applied ML (LSTM, GNNs,
          NLP) and data engineering tools (PySpark, Airflow, Snowflake) to reduce
          churn, boost network traffic for major clients, and deliver over $100K in
          combined gains.
        </p>
        <ul className="para">
          <li><strong>Top Skills:</strong> Python, SQL, Machine Learning, Cloud services</li>
          <li><strong>Languages:</strong> English (Full Professional), Marathi (Native/Bilingual), Hindi (Native/Bilingual) </li>
          <li><strong>Certifications:</strong> What is Data Science; Introduction to Business Analytics: Communicating with Data; Data Visualization with Power BI: Storytelling with Data; Analysis for Business Systems</li>
          <li><strong>Honors & Awards:</strong> Distinguished Scholar; Student Award Nominee; Star Award; Certificate of Excellence</li>
        </ul>
      </div>
    </div>
  );
};

export default About;
