import React, { useState } from 'react';
import './createopening.css';
import testimage from './opencreate.png';

const Createopening = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    jobProfile: '',
    jobType: '',
    location: '',
    salary: '',
    jobDescription: ''
  });

  const handleJobTypeChange = (event) => {
    setFormData({ ...formData, jobType: event.target.value });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/openings',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        alert('Opening created successfully');
        // Reset form data after successful submission
        setFormData({
          companyName: '',
          jobProfile: '',
          jobType: '',
          location: '',
          salary: '',
          jobDescription: ''
        });
      } else {
        alert('Failed to create opening');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

 
  return (

    <div className="box">
    <div className="b">
      <img src={testimage} className="imr"/>
    </div>
    <div className="login-box">
        <h1>OPEN POSITION</h1>
      <form onSubmit={handleSubmit}>
        <div className="user-box">
          <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} required />
          <label>Company Name</label>
        </div>
        <div className="user-box">
          <input type="text" name="jobProfile" value={formData.jobProfile} onChange={handleChange} required />
          <label>Job Profile</label>
        </div>
        <div className="rad">
          <label>Job type</label>
          <div className="radio-options">
            <input
              type="radio"
              id="fullTime"
              name="jobType"
              value="Full-time"
              checked={formData.jobType === "Full-time"}
              onChange={handleJobTypeChange}
            />
            <label htmlFor="fullTime">Full-time</label>
            <input
              type="radio"
              id="partTime"
              name="jobType"
              value="Part-time"
              checked={formData.jobType === "Part-time"}
              onChange={handleJobTypeChange}
            />
            <label htmlFor="partTime">Part-time</label>
            <input
              type="radio"
              id="contract"
              name="jobType"
              value="Contract"
              checked={formData.jobType === "Contract"}
              onChange={handleJobTypeChange}
            />
            <label htmlFor="contract">Contract</label>
          </div>
        </div>
        <div className="user-box">
          <input type="text" name="location" value={formData.location} onChange={handleChange} required />
          <label>Location</label>
        </div>
        <div className="user-box">
          <input type="number" name="salary" value={formData.salary} onChange={handleChange} required />
          <label>Salary / Stipend (Per Month)</label>
        </div>
        <div className="fileup">
          <label style={{color:"black",fontWeight:"bold"}}>Upload Job Description&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
          <input type="file" name="jobDescription" accept=".pdf,.doc,.docx" required />
        </div>
        <center>
          <button type="submit">
            SEND
            <span></span>
          </button>
        </center>
      </form>
    </div>
    </div>
  );
};

export default Createopening;
