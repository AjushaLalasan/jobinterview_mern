import React, { useState } from "react";

const AddInterview = () => {
  const [formData, setFormData] = useState({
    candidateName: "",
    companyName: "",
    jobTitle: "",
    interviewDate: "",
    interviewType: "",
    status: "",
    feedback: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Replace with your actual backend URL
    const response = await fetch("http://localhost:8080/interviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert("Interview added successfully!");
      setFormData({
        candidateName: "",
        companyName: "",
        jobTitle: "",
        interviewDate: "",
        interviewType: "",
        status: "",
        feedback: "",
      });
    } else {
      alert("Failed to add interview");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Add New Interview</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Candidate Name:</label>
          <br />
          <input
            name="candidateName"
            value={formData.candidateName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Company Name:</label>
          <br />
          <input
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Job Title:</label>
          <br />
          <input
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Interview Date:</label>
          <br />
          <input
            type="date"
            name="interviewDate"
            value={formData.interviewDate}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Interview Type:</label>
          <br />
          <input
            name="interviewType"
            value={formData.interviewType}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Status:</label>
          <br />
          <input
            name="status"
            value={formData.status}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Feedback:</label>
          <br />
          <textarea
            name="feedback"
            value={formData.feedback}
            onChange={handleChange}
          />
        </div>
        <br />
        <button type="submit">Add Interview</button>
      </form>
    </div>
  );
};

export default AddInterview;
