<!DOCTYPE html>

<html lang="en">
<head>
<meta charset="utf-8"/>
<meta content="width=device-width,initial-scale=1.0" name="viewport"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body {
      width: 100%;
      height: 100%;
      overflow: hidden;
      background: #000;
    }
  </style>
</head>
<body>
<!-- STITCH_THREEJS_START:ANIMATION_3 class="fixed inset-0 w-full h-full bg-transparent" -->
<div class="fixed inset-0 w-full h-full bg-transparent" style="display:block;">
<script src="https://ajax.googleapis.com/ajax/libs/threejs/r125/three.min.js"></script>
<div id="threejs-container-ANIMATION_3" style="width:100%;height:100%"></div>
<script>
(function() {
  const container = document.getElementById('threejs-container-ANIMATION_3');
  const devicePixelRatio = window.devicePixelRatio || 1;
  /**
 * ==========================================================
 * Student Performance Prediction - Client Script
 * Vanilla JavaScript (Zero external libraries, beginner-friendly)
 * ==========================================================
 */

// FastAPI Backend URL endpoint
// const API_ENDPOINT = 'http://127.0.0.1:8000/predict';

// DOM Element references
const form = document.getElementById('predictionForm');
const predictBtn = document.getElementById('predictBtn');
const btnSpinner = document.getElementById('btnSpinner');
const btnText = document.getElementById('btnText');
const resetBtn = document.getElementById('resetBtn');

const resultSection = document.getElementById('resultSection');
const predictedScoreEl = document.getElementById('predictedScore');
const resSubjectEl = document.getElementById('resSubject');
const resG1El = document.getElementById('resG1');
const resG2El = document.getElementById('resG2');
const resAbsencesEl = document.getElementById('resAbsences');
const resStudytimeEl = document.getElementById('resStudytime');
const resFailuresEl = document.getElementById('resFailures');

const errorContainer = document.getElementById('errorContainer');
const errorMessageEl = document.getElementById('errorMessage');
const closeErrorBtn = document.getElementById('closeErrorBtn');

// Helper to set individual field error message
function setFieldError(fieldId, message) {
  const inputEl = document.getElementById(fieldId);
  const msgEl = document.getElementById(`msg-${fieldId}`);
  if (inputEl) {
    inputEl.classList.add('input-error');
  }
  if (msgEl) {
    msgEl.textContent = message;
  }
}

// Clear all field-level validation messages
function clearValidationMessages() {
  const errorInputs = document.querySelectorAll('.input-error');
  errorInputs.forEach(el => el.classList.remove('input-error'));
  
  const msgEls = document.querySelectorAll('.validation-msg');
  msgEls.forEach(el => { el.textContent = ''; });
}

/**
 * 1. Collect form data and cast types strictly matching FastAPI Pydantic schema
 * Numeric fields: age, Medu, Fedu, traveltime, studytime, failures,
 *                 famrel, freetime, goout, Dalc, Walc, health, absences, G1, G2
 */
function collectFormData() {

  const selectedSubjectRadio =
    document.querySelector('input[name="subject"]:checked');

  const subject =
    selectedSubjectRadio ? selectedSubjectRadio.value : 'math';

  const data = {

    school: document.getElementById('school').value,
    sex: document.getElementById('sex').value,
    age: parseInt(document.getElementById('age').value, 10),
    address: document.getElementById('address').value,
    famsize: document.getElementById('famsize').value,
    Pstatus: document.getElementById('Pstatus').value,

    Medu: parseInt(document.getElementById('Medu').value, 10),
    Fedu: parseInt(document.getElementById('Fedu').value, 10),

    Mjob: document.getElementById('Mjob').value,
    Fjob: document.getElementById('Fjob').value,
    reason: document.getElementById('reason').value,
    guardian: document.getElementById('guardian').value,

    traveltime: parseInt(
      document.getElementById('traveltime').value,
      10
    ),

    studytime: parseInt(
      document.getElementById('studytime').value,
      10
    ),

    failures: parseInt(
      document.getElementById('failures').value,
      10
    ),

    schoolsup: document.getElementById('schoolsup').value,
    famsup: document.getElementById('famsup').value,
    paid: document.getElementById('paid').value,
    activities: document.getElementById('activities').value,
    nursery: document.getElementById('nursery').value,
    higher: document.getElementById('higher').value,

    internet: document.getElementById('internet').value,
    romantic: document.getElementById('romantic').value,

    famrel: parseInt(
      document.getElementById('famrel').value,
      10
    ),

    freetime: parseInt(
      document.getElementById('freetime').value,
      10
    ),

    goout: parseInt(
      document.getElementById('goout').value,
      10
    ),

    Dalc: parseInt(
      document.getElementById('Dalc').value,
      10
    ),

    Walc: parseInt(
      document.getElementById('Walc').value,
      10
    ),

    health: parseInt(
      document.getElementById('health').value,
      10
    ),

    absences: parseInt(
      document.getElementById('absences').value,
      10
    ),

    G1: parseFloat(
      document.getElementById('G1').value
    ),

    G2: parseFloat(
      document.getElementById('G2').value
    )
  };

  return {
    subject: subject,
    data: data
  };
}

/**
 * 2. Validate form inputs before sending to the backend
 * Checks presence, numeric ranges, non-negative absences, and G1/G2 boundaries (0-20)
 */
function validateForm(data) {
  clearValidationMessages();
  let isValid = true;

  // Age validation: 15 to 22
  if (isNaN(data.age) || data.age < 15 || data.age > 22) {
    setFieldError('age', 'Please enter a valid age between 15 and 22.');
    isValid = false;
  }

  // Absences validation: non-negative integer, reasonable max (93)
  if (isNaN(data.absences) || data.absences < 0 || data.absences > 93) {
    setFieldError('absences', 'Absences must be a non-negative number (0 - 93).');
    isValid = false;
  }

  // G1 grade validation: 0 to 20
  if (isNaN(data.G1) || data.G1 < 0 || data.G1 > 20) {
    setFieldError('G1', 'G1 must be between 0 and 20.');
    isValid = false;
  }

  // G2 grade validation: 0 to 20
  if (isNaN(data.G2) || data.G2 < 0 || data.G2 > 20) {
    setFieldError('G2', 'G2 must be between 0 and 20.');
    isValid = false;
  }

  return isValid;
}

/**
 * Helper to update button loading state
 */
function setLoadingState(isLoading) {
  if (isLoading) {
    predictBtn.disabled = true;
    btnSpinner.classList.add('active');
    btnText.textContent = 'Predicting...';
  } else {
    predictBtn.disabled = false;
    btnSpinner.classList.remove('active');
    btnText.textContent = 'Predict Final Grade';
  }
}

/**
 * 3. Display user-friendly error message
 */
function displayError(message) {
  errorMessageEl.textContent = message;
  errorContainer.style.display = 'flex';
  errorContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/**
 * Clear error banner
 */
function clearError() {
  errorContainer.style.display = 'none';
  errorMessageEl.textContent = '';
}

/**
 * 4. Display ML prediction results
 */
function displayResult(predictionResponse, inputData) {
  clearError();

  // Extract predicted G3 grade from backend response (supports { prediction: X } or { predicted_G3: X } or numeric direct)
  let predictedG3;
  if (typeof predictionResponse === 'object' && predictionResponse !== null) {
    predictedG3 = predictionResponse.predicted_G3 ?? 
                  predictionResponse.prediction ?? 
                  predictionResponse.g3 ?? 
                  predictionResponse.result;
  } else if (typeof predictionResponse === 'number') {
    predictedG3 = predictionResponse;
  }

  if (predictedG3 !== undefined && !isNaN(predictedG3)) {
    // Format to 1 or 2 decimal places if fractional, else integer
    predictedScoreEl.textContent = Number(predictedG3).toFixed(1);
  } else {
    predictedScoreEl.textContent = 'N/A';
  }

  // Populate contextual summary
  const subjectDisplay = inputData.subject === 'math' ? 'Mathematics (Math Syllabus)' : 'Portuguese Language';
  resSubjectEl.textContent = subjectDisplay;
  resG1El.textContent = `${inputData.G1} / 20`;
  resG2El.textContent = `${inputData.G2} / 20`;
  resAbsencesEl.textContent = `${inputData.absences} days`;
  
  const studyMap = { 1: '< 2 hours/wk', 2: '2 - 5 hours/wk', 3: '5 - 10 hours/wk', 4: '> 10 hours/wk' };
  resStudytimeEl.textContent = studyMap[inputData.studytime] || `${inputData.studytime}`;
  resFailuresEl.textContent = `${inputData.failures} previous`;

  // Show result card with smooth scroll
  resultSection.style.display = 'block';
  resultSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/**
 * 5. Handle Predict Grade submission and API POST request
 */
async function predictGrade(event) {
  event.preventDefault();
  clearError();

  const { subject, data } = collectFormData();

  const isValid = validateForm(data);

  if (!isValid) {
    displayError(
      'Please resolve the highlighted validation errors above before proceeding.'
    );
    return;
  }

  setLoadingState(true);

  try {

    // Select backend endpoint based on subject
    const API_ENDPOINT =
      subject === 'math'
        ? 'http://127.0.0.1:8000/predict/math'
        : 'http://127.0.0.1:8000/predict/por';

    const response = await fetch(API_ENDPOINT, {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },

      // Send only student data
      body: JSON.stringify(data)
    });

    if (!response.ok) {

      let errorDetail =
        `Server responded with status code ${response.status}.`;

      try {
        const errorJson = await response.json();

        if (errorJson && errorJson.detail) {
          errorDetail =
            typeof errorJson.detail === 'string'
              ? errorDetail + ` Details: ${errorJson.detail}`
              : errorDetail + ` Schema validation error in payload.`;
        }

      } catch (parseErr) {
        // Keep default error message
      }

      throw new Error(errorDetail);
    }

    const result = await response.json();

    // Pass subject only for displaying the result
    displayResult(result, { ...data, subject });

  } catch (err) {

    console.error('Prediction API Error:', err);

    displayError(
      'Unable to connect to the prediction server. Please make sure the FastAPI backend is running.'
    );

  } finally {

    setLoadingState(false);

  }
})();
</script>
</div>
<!-- STITCH_THREEJS_END:ANIMATION_3 -->
</body>
</html>
