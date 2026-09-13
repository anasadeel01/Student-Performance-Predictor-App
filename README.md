# 🎓 Student Academic Performance Prediction

A machine learning project that predicts student final grades and pass/fail outcomes using the UCI Student Performance Dataset (Portuguese language course).

---

## 📁 Project Structure

```
├── main.ipynb          # Main notebook with full ML pipeline
├── student-por.csv     # UCI Student Performance Dataset
├── frontend/            # Premium React UI for the model
└── README.md           # Project documentation
```

---

## 📊 Dataset

- **Source:** UCI Machine Learning Repository
- **File:** `student-por.csv`
- **Students:** 649
- **Features:** 33 columns (demographics, family, habits, grades)
- **Target:** `G3` — Final grade (0–20)

---

## ⚙️ ML Pipeline

```
Raw Data (649 students, 33 features)
        ↓
Label Encoding (17 categorical columns)
        ↓
Feature Engineering (4 new features)
        ↓
Feature Selection (11 features)
        ↓
Train-Test Split (80/20)
        ↓
Standard Scaling
        ↓
Model Training (Linear + Logistic Regression)
        ↓
Evaluation + Prediction
```

---

## 🔧 Feature Engineering

| Feature | Formula | Purpose |
|---|---|---|
| `alcohol` | (Dalc + Walc) / 2 | Overall alcohol consumption |
| `risk_score` | failures + absences | Student at-risk indicator |
| `night_owl_index` | studytime - alcohol | Study dedication vs social habits |
| `family_advantage` | (Medu+Fedu) + famsup + famrel + internet | Home environment quality |

---

## 🤖 Models

| Model | Task | Target | Result |
|---|---|---|---|
| Linear Regression | Predict exact grade | G3 (0–20) | R² = 0.863 |
| Logistic Regression | Predict Pass or Fail | pass (0 or 1) | Accuracy = 92.3% |

---

## 🔮 Prediction System

```python
predict_student(G1=10, G2=11, studytime=2, failures=0, absences=4)
```

```
========================================
   STUDENT PERFORMANCE PREDICTION
========================================
Predicted Grade  : 11.2 / 20
Result           : ✅ PASS
Pass Probability : 97.1%
========================================
```

---

## 📦 Libraries Used

```
pandas, numpy, matplotlib, seaborn, scikit-learn
```

---

## 🚀 How to Run

1. Clone the repository
2. Install libraries
```bash
pip install pandas numpy matplotlib seaborn scikit-learn
```
3. Open `main.ipynb` in Jupyter Notebook or Google Colab
4. Run all cells in order

---

## 💻 Frontend

A premium, portfolio-quality interactive UI is available in the [`/frontend`](./frontend) folder — a React + Tailwind + Framer Motion app where the trained model's scaler and regression coefficients run directly in the browser (no backend needed).

**Live demo:** https://studentsperformancepredictor.netlify.app

```bash
cd frontend
npm install
npm run dev
```

---

## 👨‍💻 Author

**Anas Adeel**
BS Artificial Intelligence — Air University Islamabad
