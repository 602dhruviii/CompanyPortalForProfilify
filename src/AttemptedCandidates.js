import React, { useState, useEffect } from "react";
import Papa from "papaparse"; // Import PapaParse library
import axios from "axios"; // Import axios for making HTTP requests
import "./AppliedCandidates.css"; // assuming you have a CSS file for styling

const AppliedCandidates = () => {
  const [candidatesData, setCandidatesData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/att.csv");

        if (!response.data) {
          console.error("Failed to fetch data");
          return;
        }

        const parsedData = Papa.parse(response.data, { header: true }).data;
        setCandidatesData(parsedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="table-wrapper" >
      
        <table className="fl-table" style={{marginLeft:'45%'}}>
          <thead>
            <tr>
              <th>NAME</th>
              <th>Email</th>
              <th>PassCode</th>
              <th>Marks</th>
              <th>AI Review</th>
            </tr>
          </thead>
          <tbody>
            {candidatesData.map((candidate, index) => (
              <tr key={index}>
                <td>{candidate.NAME}</td>
                <td>{candidate.Email}</td>
                <td>{candidate.PassCode}</td>
                <td>{candidate.Marks}</td>
                <td>{candidate.AI_Review}</td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppliedCandidates;
