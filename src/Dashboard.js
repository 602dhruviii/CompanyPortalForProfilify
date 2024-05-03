import React,{useEffect,useState} from "react";
import './App.css';
import testImage from './dash.png';
const Dashboard = () => {
  const [openings, setOpenings] = useState([]);

  useEffect(() => {
    const fetchOpenings = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/openings');
        if (response.ok) {
          const data = await response.json();
          setOpenings(data);
        } else {
          console.error('Failed to fetch openings');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchOpenings();
  }, []);

  return (
    <div className="box">
      <div className="im">
        <img src={testImage} className="imh"/>
      </div>
      <div class="ag-format-container">
        <div class="ag-courses_box">
        {openings.map((opening) => (
            <div className="ag-courses_item" key={opening._id}>
              <a href="#" className="ag-courses-item_link">
                <div className="ag-courses-item_bg"></div>

                <div className="ag-courses-item_title">
                  {opening.companyName}
                </div>

                <div className="ag-courses-item_date-box">
                  <span className="ag-courses-item_date">&#10003;&nbsp;&nbsp;{opening.jobProfile}</span>
                </div>
                <div className="ag-courses-item_date-box">
              
                  <span className="ag-courses-item_date">&#10003;&nbsp;&nbsp;{opening.jobType}</span>
                </div>
                <div className="ag-courses-item_date-box">
                
                  <span className="ag-courses-item_date">&#10003;&nbsp;&nbsp;{opening.location}</span>
                </div>
                <div className="ag-courses-item_date-box">
                 
                  <span className="ag-courses-item_date">&#10003; &nbsp;&#8377; {opening.salary}/month</span>
                </div>
              </a>
            </div>
          ))}
        </div>
        </div>
    </div>
  );
};
export default Dashboard;
