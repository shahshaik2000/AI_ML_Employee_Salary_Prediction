import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Suggestion.css';

function Suggestions() {
  const location = useLocation();
  const { formData, prediction } = location.state || {};

  const [expectedSalary, setExpectedSalary] = useState('');
  const [suggestions, setSuggestions] = useState(null);

  const handleSubmit = async () => {
    setSuggestions(null);
    const payload = {
      Candidate_Details: formData,
      Predicted_Salary: prediction,
      Expected_Salary: Number(expectedSalary),
    };

    try {
      const res = await fetch('http://localhost:5000/suggest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      setSuggestions(
      data.suggestion
        ? typeof data.suggestion === 'string'
          ? data.suggestion.split('\n')
          : data.suggestion
        : []
    );
    } catch (err) {
      console.error(err);
      setSuggestions([]); // Optional: explicitly show no suggestions on error
    }
  };

  return (
    <div className="suggestion-container">
      <div className="suggestion-card">
        <h2 className="title">🎯 Personalized Suggestions</h2>

        <div className="summary">
          <p><strong>Predicted Salary:</strong> ₹{prediction}</p>
          <p><strong>Job Title:</strong> {formData?.Job_Title}</p>
          <p><strong>Experience:</strong> {formData?.Experience} years</p>
          <p><strong>Education:</strong> {formData?.Education}</p>
        </div>

        <div className="input-group">
          <label>What salary do you expect?</label>
          <input
            type="number"
            value={expectedSalary}
            onChange={(e) => setExpectedSalary(e.target.value)}
            placeholder="Enter expected salary"
          />
          <button onClick={handleSubmit}>💬 Get Suggestions</button>
        </div>

        {Array.isArray(suggestions) && suggestions.length > 0 && (
  <div className="results">
    <h3>💡 Suggestions:</h3>
    <ul>
      {suggestions
        .filter((s) => s.trim() !== '') // Remove empty or whitespace-only lines
        .map((s, index) => (
          <li key={index}>{s}</li>
        ))}
    </ul>
  </div>
)}
      </div>
    </div>
  );
}

export default Suggestions;
