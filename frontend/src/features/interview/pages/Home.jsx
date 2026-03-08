import React from "react";
import "../style/home.scss";

const Home = () => {
  return (
    <main className="home">
      <div className="home-container">
        <header className="home-header">
          <h1 className="home-title">AI Interview Preparation</h1>
          <p className="home-subtitle">
            Upload your resume and job description to generate personalized
            interview questions and insights
          </p>
        </header>

        <div className="interview-input-group">
          <div className="left">
            <label htmlFor="jobDescription" className="input-label">
              Job Description
            </label>
            <textarea
              name="jobDescription"
              id="jobDescription"
              placeholder="Paste the job description here..."
            ></textarea>
          </div>

          <div className="right">
            <div className="input-group">
              <label className="input-label">
                Resume <small className="file-hint">(PDF, Max 3MB)</small>
              </label>
              <label className="file-label" htmlFor="resume">
                <span className="file-icon">📄</span>
                Choose File
              </label>
              <input
                hidden
                type="file"
                name="resume"
                id="resume"
                accept=".pdf"
              />
            </div>

            <div className="input-group">
              <label htmlFor="selfDescription" className="input-label">
                Self Description
              </label>
              <textarea
                name="selfDescription"
                id="selfDescription"
                placeholder="Describe your experience and skills relevant to this role..."
              ></textarea>
            </div>

            <button className="button primary-button">
              Generate Interview Report
            </button>
          </div>
        </div>

        <footer className="home-footer">
          <p>Powered by AI • Secure & Confidential</p>
        </footer>
      </div>
    </main>
  );
};

export default Home;
