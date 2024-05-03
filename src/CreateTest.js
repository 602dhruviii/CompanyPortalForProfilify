import React, { useState } from 'react';
import './createtest.css';
import testImage from './cr.png'; // Import your test image

const Form = () => {
  const [numQuestions, setNumQuestions] = useState(0);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleInputChange = (event) => {
    const value = parseInt(event.target.value);
    setNumQuestions(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);
  };

  const renderInputFields = () => {
    const inputFields = [];
    for (let i = 1; i <= numQuestions; i++) {
      inputFields.push(
        <div key={i} className="form-group">
          <label htmlFor={`question${i}`}>Question {i}:</label>
          <input type="text" id={`question${i}`} name={`question${i}`} className="tx" />
          <label htmlFor={`time${i}`}>Time to answer (in seconds):</label>
          <input type="number" id={`time${i}`} name={`time${i}`} className="form-control" />
        </div>
      );
    }
    return inputFields;
  };

  return (
    <div className="container">
      <div className="content">
        <img src={testImage} alt="test" className="test-image" />
        <div className="form-container">
          <h2>Create Test</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="numQuestions">Number of Questions:</label>
              <input
                type="number"
                id="numQuestions"
                name="numQuestions"
                className="form-control"
                value={numQuestions}
                onChange={handleInputChange}
              />
            </div>
          </form>
          {formSubmitted && (
            <div className="success-message">Test created successfully!</div>
          )}
          {numQuestions > 0 && (
            <div className="input-fields">
              {renderInputFields()}
              <button type="submit" className="btn btn-primary" onClick={() => alert("Test Created Successfully! Now you can send invites to candidates.")}>
                Submit
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Form;
