# Student Performance Predictor — Premium Frontend

A portfolio-quality React frontend for the Student Academic Performance Prediction
ML project (Linear Regression R² = 0.863, Logistic Regression accuracy = 92.3%,
trained on the UCI `student-por.csv` dataset — 649 students).

## Run it

```bash
npm install
npm run dev       # local dev server
npm run build     # production build -> dist/
npm run preview   # preview the production build
```

No backend/Flask server is required — the trained model's scaler and
regression coefficients are baked into `src/lib/predictor.js`, so the
prediction runs instantly in the browser and is deployable as a static
site (Vercel, Netlify, GitHub Pages, etc.).

## Why only 5 real input fields?

The original notebook's `predict_student()` function only accepts 5
parameters — `G1`, `G2`, `studytime`, `failures`, `absences`. The other 6
model features (`higher`, `Medu`, `Fedu`, `alcohol`, `internet`,
`risk_score`) are filled with dataset averages (or derived automatically,
in the case of `risk_score = failures + absences`) — they were never
meant to be user-editable.

This UI mirrors that honestly: the 5 real inputs are interactive sliders,
and the other factors are shown as a read-only "Background factors" panel
so visitors understand what the model actually uses, instead of a form
that pretends to take 11 live inputs when 6 of them don't affect the
prediction at all.

If you later retrain the model to genuinely accept those 6 factors as
real inputs, `src/lib/predictor.js` is the only file you'd need to update
— swap in the new scaler mean/scale and model coefficients, and extend
`PredictionForm.jsx` with the extra fields.

## Structure

```
src/
  components/
    Navbar.jsx          sticky nav with smooth scroll
    Hero.jsx             split hero, floating AI illustration
    About.jsx             project explanation + factor icons
    Features.jsx          glass feature cards
    Timeline.jsx           "how it works" 4-step flow
    PredictionForm.jsx    the 5 real inputs + background-factor panel + loading state
    SliderField.jsx        reusable slider input
    ResultCard.jsx          circular gauge, animated counter, confetti
    Background.jsx          neural-network canvas + gradient blobs (signature visual)
    BrandIcons.jsx          GitHub/LinkedIn inline SVGs
    ScrollReveal.jsx        framer-motion scroll-in wrapper
    Footer.jsx
  lib/
    predictor.js         client-side replica of predict_student() math
  App.jsx
  main.jsx
  index.css
```

## Stack

React 19 · Vite · Tailwind CSS · Framer Motion · lucide-react · canvas-confetti
