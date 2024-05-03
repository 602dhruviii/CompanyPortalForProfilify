import React, { useState, useEffect } from 'react';
import Papa from 'papaparse'; // Import PapaParse library
import axios from 'axios'; // Import axios for making HTTP requests
import './AppliedCandidates.css'; // assuming you have a CSS file for styling

const AppliedCandidates = () => {
  const [candidatesData, setCandidatesData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/data.csv');

        if (!response.data) {
          console.error('Failed to fetch data');
          return;
        }

        const parsedData = Papa.parse(response.data, { header: true }).data;
        setCandidatesData(parsedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSelectRow = (index) => {
    const selectedIndex = selectedRows.indexOf(index);
    if (selectedIndex === -1) {
      setSelectedRows([...selectedRows, index]);
    } else {
      setSelectedRows(selectedRows.filter((i) => i !== index));
    }
  };

  const handleSelectAll = () => {
    if (selectedRows.length === candidatesData.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(candidatesData.map((_, index) => index));
    }
  };

  const handleSendInvites = () => {
    // Here you can implement the logic to send invites for selected rows
    // For demonstration purposes, I'll just log the selected rows
    console.log('Selected Rows:', selectedRows);
    alert('Mail sent successfully!');
  };

  return (
    <div>
      <div className="table-wrapper">
        <table className="fl-table">
          <thead>
            <tr>
              <th>
                SELECT CANDIDATES
                <input
                  type="checkbox"
                  checked={selectedRows.length === candidatesData.length}
                  onChange={handleSelectAll}
                />
              </th>
              <th>NAME</th>
              <th>SKILLS</th>
              <th>Education Achievement</th>
              <th>Projects</th>
              <th>Position of Responsibility</th>
              <th>Co-Currics</th>
              <th>Work Experience</th>
              <th>Resume</th>
              <th>Send Invites</th>
            </tr>
          </thead>
          <tbody>
            {candidatesData.map((candidate, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(index)}
                    onChange={() => handleSelectRow(index)}
                  />
                </td>
                <td>{candidate.Name}</td>
                <td>{candidate.Skills}</td>
                <td>{candidate.Education}</td>
                <td>{candidate.Projects}</td>
                <td>{candidate["Position of Responsibility"]}</td>
                <td>{candidate["Co-Currics"]}</td>
                <td>{candidate["Work Experience"]}</td>
                <td>{candidate.Resume}</td>
                <td>
                  {/* Here you can add the send invite button for each row */}
                  <button onClick={() => alert('Invite sent for row ' + index)}>
                    Send Invite
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button onClick={handleSendInvites}>Send Invites</button>
    </div>
  );
};

export default AppliedCandidates;
