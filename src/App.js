import React,{useState} from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Createopening from './Createopening';
import Dashboard from './Dashboard';
import AppliedCandidates from './AppliedCandidates';
import AttemptedCandidates from './AttemptedCandidates';
import CreateTest from './CreateTest';

const App = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    jobProfile: '',
    jobType: '',
    location: '',
    salaryStipend: '',
    jobDescription: ''
  });

  const handleFormSubmit = (data) => {
    setFormData(data);
  };
  return (
    <Router>
      <div className="partition-container">
        <div className="left-partition">
          <nav className="links-container">
            <Link to="/" className="link">DASHBOARD</Link>
            <Link to="/create-opening" className="link">CREATE JOB DESCRIPTION</Link>
            <Link to="/applied-candidates" className="link">APPLIED CANDIDATES</Link>
            <Link to="/attempted-candidates" className="link">ATTEMPTED</Link>
            <Link to="/createtest" className="link">CREATE TEST</Link>
          </nav>
        </div>
        <div className="right-partition">
          <Routes>
            <Route path="/" element={<Dashboard formData={formData} />} />
            <Route path="/create-opening" element={<Createopening onSubmit={handleFormSubmit} />} />
            <Route path="/applied-candidates" element={<AppliedCandidates />} />
            <Route path="/attempted-candidates" element={<AttemptedCandidates />} />
            <Route path="/createtest" element={<CreateTest />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
