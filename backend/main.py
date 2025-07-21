from flask import Flask, request, jsonify
import pandas as pd
import pickle
from flask_cors import CORS
import ollama

# Initialize the Ollama client
client = ollama.Client()

# Define the model and the input prompt
ollama_model_name = "llama3.2:1b"  # Replace with your model name
app = Flask(__name__)
CORS(app)

@app.route("/")
def main():
    return "Welcome to Salary Prediction App"

@app.route('/predict', methods=['POST'])
def chat():
    try:
        data = request.get_json()
        new_data = pd.DataFrame([{             
            'Education': data['Education'],
            'Experience': data['Experience'],
            'Location': data['Location'],
            'Job_Title': data['Job_Title'],
            'Age': data['Age'],
            'Gender': data['Gender']
        }])
        with open("./Model/Salary_Prediction_Model.pkl", 'rb') as model_file:
            model = pickle.load(model_file)

        predicted_salary = model.predict(new_data)
        return jsonify({"salary": round(predicted_salary[0], 2)}), 200
    except Exception as e:
        print("Error:", e)  # Add this line
        return jsonify({"error": str(e)}), 400
    
@app.route('/suggest', methods=['POST'])
def suggestion():
    try:
        data = request.get_json()
        expected_salary = data.get("Expected_Salary")
        predicted_salary = data.get("Predicted_Salary")
        candidate_details = data.get("Candidate_Details")
        gap = expected_salary - predicted_salary

        if not all([expected_salary, predicted_salary, candidate_details]):
            raise ValueError("Missing expected fields: Expected_Salary, ML_Predicted_Salary, or Candidate_Details.")

        prompt = f"""
                You are a helpful assistant advising on job offer salary negotiations.

                Below are two values:
                - Expected Salary: ₹{expected_salary}
                - ML Predicted Salary: ₹{predicted_salary}

                Candidate details:
                {candidate_details}

                Instructions:
                1. Analyze the difference between the expected salary and the ML predicted salary.
                2. If the expected salary is significantly higher than the ML predicted salary:
                - Provide constructive feedback on potential skill gaps or experience areas to improve.
                - Recommend a realistic career path or skill development roadmap that can justify the expected salary in the near future.
                3. If the predicted salary is higher than expected, suggest how the candidate might better position themselves or negotiate more confidently.
                4. Consider fairness, typical negotiation strategies, and data-driven insights.
                5. Suggest a recommended salary to offer or negotiate, with a concise justification.

                Your response should be specific, actionable, and balanced—addressing whether to align with the candidate’s expectations, the model's prediction, or propose a middle ground.
                """

        response = client.generate(
            model=ollama_model_name,
            prompt=prompt,
            system="You are a helpful assistant for salary negotiation recommendations."
        )
        suggestion = response.response
        return jsonify({"suggestion": suggestion}), 200

    except Exception as e:
        print("Suggestion Error:", e)
        return jsonify({"error": str(e)}), 400

if __name__ == "__main__":
    app.run(debug=True)


if __name__ == "__main__":
    app.run(debug=True)


