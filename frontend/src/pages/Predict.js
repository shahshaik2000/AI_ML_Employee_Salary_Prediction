import React, { useState } from 'react';
import './Predict.css';
import { useNavigate } from 'react-router-dom';

function Predict() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Education: '',
    Experience: 0,
    Location: '',
    Job_Title: '',
    Age: 0,
    Gender: '',
  });

  const [prediction, setPrediction] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  // Simple validation check
  const missingFields = Object.entries(formData).filter(
    ([key, value]) => value === '' || value === null || value === undefined
  );

  if (missingFields.length > 0) {
    alert(`Please fill in all fields before predicting.`);
    return;
  }

  try {
    const res = await fetch('http://127.0.0.1:5000/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    setPrediction(data.salary);
  } catch (error) {
    console.error('Error:', error);
  }
};


  return (
    <div className="predict-container">
        <div className="predict-card">
            <h2 className="predict-title">🔍 Salary Prediction</h2>
            <form onSubmit={handleSubmit} className="predict-form">
                <div className="form-group">
                    <label>
                    Education:
                    <select name="Education" value={formData.Education} onChange={handleChange}>
                        <option value="" disabled>Select Education</option>
                        <option value="High School">High School</option>
                        <option value="Bachelor">Bachelor</option>
                        <option value="Master">Master</option>
                        <option value="PhD">PhD</option>
                    </select>
                    </label>
                </div>

                <div className="form-group">
                    <label>
                    Experience (years):
                    <input
                        type="number"
                        name="Experience"
                        value={formData.Experience}
                        onChange={handleChange}
                        min="0"
                    />
                    </label>
                </div>

                <div className="form-group">
                    <label>
                    Location:
                    <select name="Location" value={formData.Location} onChange={handleChange}>
                        <option value="" disabled>Select Location</option>
                        <option value="Urban">Urban</option>
                        <option value="Suburban">Suburban</option>
                        <option value="Rural">Rural</option>
                    </select>
                    </label>
                </div>

                <div className="form-group">
                    <label>
                    Job Title:
                    <select name="Job_Title" value={formData.Job_Title} onChange={handleChange} >
                        <option value="" disabled>Select Job Title</option>
                        <option value="Director">Director</option>
                        <option value="Analyst">Analyst</option>
                        <option value="Manager">Manager</option>
                        <option value="Engineer">Engineer</option>
                    </select>
                    </label>
                </div>

                <div className="form-group">
                    <label>
                    Age:
                    <input type="number" name="Age" value={formData.Age} onChange={handleChange} min="18" />
                    </label>
                </div>

                <div className="form-group">
                    <label>
                    Gender:
                    <select name="Gender" value={formData.Gender} onChange={handleChange}>
                        <option value="" disabled>Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                    </label>
                </div>

                <button type="submit" className="predict-btn">💡 Predict Salary</button>
            </form>

            {prediction && (
                <div className="result">
                <h2>Predicted Salary: <span>₹{prediction}</span></h2>
                <button
                  className="suggestion-btn"
                  onClick={() => navigate('/suggestions', { state: { formData, prediction } })}
                >
                🎯 Get Suggestions
                </button>
                </div>
            )}
        </div>
    </div>
  );
}

export default Predict;