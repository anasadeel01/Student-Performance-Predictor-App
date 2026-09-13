// This file replicates the EXACT math of predict_student() from the
// original Jupyter notebook (Linear Regression R²=0.863, Logistic Regression
// accuracy=92.3%, trained on the UCI student-por.csv dataset).
//
// The real function only takes 5 inputs: G1, G2, studytime, failures, absences.
// The remaining 6 model features (higher, Medu, Fedu, alcohol, internet, risk_score)
// are filled with dataset averages / derived values exactly like the notebook —
// they are NOT user-editable, so this UI shows them as read-only context instead
// of fake extra inputs.

export const MODEL_META = {
  r2: 0.863,
  mae: 0.733,
  accuracy: 0.923,
  featureOrder: ['G1', 'G2', 'studytime', 'failures', 'higher', 'Medu', 'Fedu', 'absences', 'alcohol', 'internet', 'risk_score'],
};

// Background factors — filled with dataset averages, exactly as in predict_student()
const AVERAGES = {
  higher: 0.8936825885978429,
  Medu: 2.514637904468413,
  Fedu: 2.3066255778120186,
  alcohol: 1.891371340523883,
  internet: 0.7673343605546995,
};

const SCALER_MEAN = [11.248554913294798, 11.458574181117534, 1.9017341040462428, 0.2254335260115607, 0.8901734104046243, 2.489402697495183, 2.277456647398844, 3.6917148362235066, 1.905587668593449, 0.7552986512524085, 3.9171483622350673];
const SCALER_SCALE = [2.6732588615070836, 2.8780142429207625, 0.8117495073190221, 0.589935298135171, 0.3126734875444745, 1.1188451543682103, 1.08239212954871, 4.675330735170382, 1.0302494186675828, 0.42990998903107747, 4.779822188463273];

const LR_COEF = [0.48533109026963017, 2.5123964823848755, 0.08686755285685623, -0.09480587614242934, 0.00668441654803028, -0.1001359845830741, 0.018458193704705264, 0.06953879959457318, -0.06217426533081539, 0.057742209368542526, 0.05631748287081339];
const LR_INTERCEPT = 11.79383429672447;

const LOG_COEF = [1.8122783630217594, 3.0904098280025023, 0.12568398198411115, -0.058715766611029216, -0.0039001927086302233, 0.05044627606043309, -0.08008633263800066, 0.024586925609397393, -0.0726624072604061, -0.01643784730825667, 0.01680261368255386];
const LOG_INTERCEPT = 4.793965764745315;

function sigmoid(z) {
  return 1 / (1 + Math.exp(-z));
}

/**
 * Mirrors predict_student(G1, G2, studytime, failures, absences) from the notebook.
 * Returns { grade, isPass, passProbability, riskScore }
 */
export function predictStudent({ G1, G2, studytime, failures, absences }) {
  const higher = AVERAGES.higher;
  const Medu = AVERAGES.Medu;
  const Fedu = AVERAGES.Fedu;
  const alcohol = AVERAGES.alcohol;
  const internet = AVERAGES.internet;
  const riskScore = failures + absences;

  const raw = [G1, G2, studytime, failures, higher, Medu, Fedu, absences, alcohol, internet, riskScore];

  const scaled = raw.map((v, i) => (v - SCALER_MEAN[i]) / SCALER_SCALE[i]);

  let grade = LR_INTERCEPT;
  let logit = LOG_INTERCEPT;
  for (let i = 0; i < scaled.length; i++) {
    grade += LR_COEF[i] * scaled[i];
    logit += LOG_COEF[i] * scaled[i];
  }

  const passProbability = sigmoid(logit);
  const isPass = passProbability >= 0.5;

  grade = Math.max(0, Math.min(20, grade));

  return {
    grade,
    isPass,
    passProbability,
    riskScore,
    backgroundFactors: { higher, Medu, Fedu, alcohol, internet },
  };
}

export function gradeLabel(grade) {
  const pct = (grade / 20) * 100;
  if (pct >= 85) return 'Excellent';
  if (pct >= 65) return 'Good';
  if (pct >= 50) return 'Average';
  return 'Needs Improvement';
}
