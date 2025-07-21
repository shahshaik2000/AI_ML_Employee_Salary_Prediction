# 💼 Salary Prediction App

A machine learning web application that predicts an employee's salary based on features like education, experience, job title, age, location, and gender. This project includes both frontend and backend code, integrated into a single deployable solution.
---

## 🧠 Machine Learning Model

- **Algorithms Tried**:
  - Linear Regression
  - Decision Tree Regressor
  - Random Forest Regressor
  - Gradient Boosting Regressor
- **Best Performer**: Selected based on highest R² Score on test data.

### Features Used:
- Education (Categorical)
- Experience (Numerical)
- Location (Categorical)
- Job Title (Categorical)
- Age (Numerical)
- Gender (Categorical)

### Preprocessing:
- `OneHotEncoder` for categorical features
- `StandardScaler` for numerical features
- Combined using `ColumnTransformer` inside a `Pipeline`

---

## 🎯 How It Works

1. **User inputs data** via frontend 
2. **Input is sent** to the backend for prediction (via internal function or REST API)
3. **Model predicts** the salary
4. **Output is displayed** on the UI
5. **Suggestions** fron the Ollama model
6. **Output is displayed** on the UI

---

## 🛠️ Installation & Setup  

### **1️⃣ Clone the Repository**  
```bash
git clone https://github.com/shahshaik2000/AI-ML-Medical-Diagnosis.git
cd AI-ML-Medical-Diagnosis
```

### **2️⃣ Install Dependencies**  
```bash
pip install -r requirements.txt
```

### **3️⃣ Install & Setup OLLAMA LLM**  
#### **Windows Installation:**  
1. Download and install **Ollama** from:  
   👉 [Ollama Setup](https://ollama.com/download/OllamaSetup.exe)
2. Open **Command Prompt** and verify the installation:  
   ```bash
   ollama
   ```
3. Run the **OLLAMA LLM** (Choose a version from [Ollama Library](https://ollama.com/library)):
   ```bash
   ollama run ollama 3.2
   ```

### **4️⃣ Run the App **  
```bash
# 1. Clone the repo
git https://github.com/shahshaik2000/AI_ML_Employee_Salary_Prediction.git

```bash
cd backend
pip install -r requirements.txt
python main.py
```