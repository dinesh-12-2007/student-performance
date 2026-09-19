// ============================================================
// Student Performance Prediction - Frontend JavaScript
// ============================================================

const form = document.getElementById("predictionForm");

const predictBtn = document.getElementById("predictBtn");
const btnSpinner = document.getElementById("btnSpinner");
const btnText = document.getElementById("btnText");
const resetBtn = document.getElementById("resetBtn");

const resultSection = document.getElementById("resultSection");
const predictedScoreEl = document.getElementById("predictedScore");

const resSubjectEl = document.getElementById("resSubject");
const resG1El = document.getElementById("resG1");
const resG2El = document.getElementById("resG2");
const resAbsencesEl = document.getElementById("resAbsences");
const resStudytimeEl = document.getElementById("resStudytime");
const resFailuresEl = document.getElementById("resFailures");

const errorContainer = document.getElementById("errorContainer");
const errorMessageEl = document.getElementById("errorMessage");
const closeErrorBtn = document.getElementById("closeErrorBtn");


// ============================================================
// FIELD ERROR
// ============================================================

function setFieldError(fieldId, message) {

    const input = document.getElementById(fieldId);
    const messageElement = document.getElementById(
        `msg-${fieldId}`
    );

    if (input) {
        input.classList.add("input-error");
    }

    if (messageElement) {
        messageElement.textContent = message;
    }
}


// ============================================================
// CLEAR VALIDATION ERRORS
// ============================================================

function clearValidationMessages() {

    const errorInputs =
        document.querySelectorAll(".input-error");

    errorInputs.forEach(function (element) {
        element.classList.remove("input-error");
    });

    const messages =
        document.querySelectorAll(".validation-msg");

    messages.forEach(function (element) {
        element.textContent = "";
    });
}


// ============================================================
// COLLECT FORM DATA
// ============================================================

function collectFormData() {

    const selectedSubject =
        document.querySelector(
            'input[name="subject"]:checked'
        );

    const subject =
        selectedSubject
            ? selectedSubject.value
            : "math";


    const data = {

        school:
            document.getElementById("school").value,

        sex:
            document.getElementById("sex").value,

        age:
            parseInt(
                document.getElementById("age").value,
                10
            ),

        address:
            document.getElementById("address").value,

        famsize:
            document.getElementById("famsize").value,

        Pstatus:
            document.getElementById("Pstatus").value,


        Medu:
            parseInt(
                document.getElementById("Medu").value,
                10
            ),

        Fedu:
            parseInt(
                document.getElementById("Fedu").value,
                10
            ),


        Mjob:
            document.getElementById("Mjob").value,

        Fjob:
            document.getElementById("Fjob").value,

        reason:
            document.getElementById("reason").value,

        guardian:
            document.getElementById("guardian").value,


        traveltime:
            parseInt(
                document.getElementById("traveltime").value,
                10
            ),

        studytime:
            parseInt(
                document.getElementById("studytime").value,
                10
            ),

        failures:
            parseInt(
                document.getElementById("failures").value,
                10
            ),


        schoolsup:
            document.getElementById("schoolsup").value,

        famsup:
            document.getElementById("famsup").value,

        paid:
            document.getElementById("paid").value,

        activities:
            document.getElementById("activities").value,

        nursery:
            document.getElementById("nursery").value,

        higher:
            document.getElementById("higher").value,

        internet:
            document.getElementById("internet").value,

        romantic:
            document.getElementById("romantic").value,


        famrel:
            parseInt(
                document.getElementById("famrel").value,
                10
            ),

        freetime:
            parseInt(
                document.getElementById("freetime").value,
                10
            ),

        goout:
            parseInt(
                document.getElementById("goout").value,
                10
            ),

        Dalc:
            parseInt(
                document.getElementById("Dalc").value,
                10
            ),

        Walc:
            parseInt(
                document.getElementById("Walc").value,
                10
            ),

        health:
            parseInt(
                document.getElementById("health").value,
                10
            ),

        absences:
            parseInt(
                document.getElementById("absences").value,
                10
            ),


        G1:
            parseInt(
                document.getElementById("G1").value,
                10
            ),

        G2:
            parseInt(
                document.getElementById("G2").value,
                10
            )
    };


    return {
        subject: subject,
        data: data
    };
}


// ============================================================
// VALIDATION
// ============================================================

function validateForm(data) {

    clearValidationMessages();

    let valid = true;


    if (
        Number.isNaN(data.age) ||
        data.age < 15 ||
        data.age > 22
    ) {

        setFieldError(
            "age",
            "Age must be between 15 and 22."
        );

        valid = false;
    }


    if (
        Number.isNaN(data.absences) ||
        data.absences < 0 ||
        data.absences > 93
    ) {

        setFieldError(
            "absences",
            "Absences must be between 0 and 93."
        );

        valid = false;
    }


    if (
        Number.isNaN(data.G1) ||
        data.G1 < 0 ||
        data.G1 > 20
    ) {

        setFieldError(
            "G1",
            "G1 must be between 0 and 20."
        );

        valid = false;
    }


    if (
        Number.isNaN(data.G2) ||
        data.G2 < 0 ||
        data.G2 > 20
    ) {

        setFieldError(
            "G2",
            "G2 must be between 0 and 20."
        );

        valid = false;
    }


    return valid;
}


// ============================================================
// LOADING STATE
// ============================================================

function setLoadingState(isLoading) {

    if (!predictBtn) {
        return;
    }


    predictBtn.disabled = isLoading;


    if (btnSpinner) {

        if (isLoading) {
            btnSpinner.classList.add("active");
        } else {
            btnSpinner.classList.remove("active");
        }
    }


    if (btnText) {

        if (isLoading) {
            btnText.textContent = "Predicting...";
        } else {
            btnText.textContent = "Predict Final Grade";
        }
    }
}


// ============================================================
// ERROR MESSAGE
// ============================================================

function displayError(message) {

    if (errorMessageEl) {
        errorMessageEl.textContent = message;
    }


    if (errorContainer) {
        errorContainer.style.display = "flex";
    }
}


function clearError() {

    if (errorMessageEl) {
        errorMessageEl.textContent = "";
    }


    if (errorContainer) {
        errorContainer.style.display = "none";
    }
}


// ============================================================
// DISPLAY RESULT
// ============================================================

function displayResult(response, inputData) {

    clearError();


    // FastAPI returns:
    //
    // {
    //     "G3": 12.5
    // }

    const predictedG3 = response.G3;


    if (predictedScoreEl) {

        if (
            predictedG3 !== undefined &&
            predictedG3 !== null &&
            !Number.isNaN(Number(predictedG3))
        ) {

            predictedScoreEl.textContent =
                Number(predictedG3).toFixed(1);

        } else {

            predictedScoreEl.textContent = "N/A";
        }
    }


    if (resSubjectEl) {

        if (inputData.subject === "math") {

            resSubjectEl.textContent =
                "Mathematics (Math Syllabus)";

        } else {

            resSubjectEl.textContent =
                "Portuguese Language";
        }
    }


    if (resG1El) {
        resG1El.textContent =
            `${inputData.G1} / 20`;
    }


    if (resG2El) {
        resG2El.textContent =
            `${inputData.G2} / 20`;
    }


    if (resAbsencesEl) {
        resAbsencesEl.textContent =
            `${inputData.absences} days`;
    }


    const studyMap = {

        1: "< 2 hours/wk",

        2: "2 - 5 hours/wk",

        3: "5 - 10 hours/wk",

        4: "> 10 hours/wk"
    };


    if (resStudytimeEl) {

        resStudytimeEl.textContent =
            studyMap[inputData.studytime]
            || inputData.studytime;
    }


    if (resFailuresEl) {

        resFailuresEl.textContent =
            `${inputData.failures} previous`;
    }


    if (resultSection) {

        resultSection.style.display = "block";

        resultSection.scrollIntoView({
            behavior: "smooth",
            block: "nearest"
        });
    }
}


// ============================================================
// PREDICTION
// ============================================================

async function predictGrade(event) {

    // VERY IMPORTANT:
    // Prevent browser from refreshing/reloading the page.
    event.preventDefault();


    clearError();


    const result = collectFormData();

    const subject = result.subject;
    const data = result.data;


    // Validate
    if (!validateForm(data)) {

        displayError(
            "Please resolve the highlighted validation errors above."
        );

        return;
    }


    setLoadingState(true);


    try {

        // ----------------------------------------------------
        // FASTAPI ENDPOINTS
        // ----------------------------------------------------

        let API_ENDPOINT;


        if (subject === "math") {

            API_ENDPOINT =
                "http://127.0.0.1:8000/predict/mat";

        } else {

            API_ENDPOINT =
                "http://127.0.0.1:8000/predict/por";
        }


        console.log(
            "Sending request to:",
            API_ENDPOINT
        );

        console.log(
            "Sending data:",
            data
        );


        // ----------------------------------------------------
        // SEND REQUEST
        // ----------------------------------------------------

        const response = await fetch(
            API_ENDPOINT,
            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json",

                    "Accept":
                        "application/json"
                },

                body:
                    JSON.stringify(data)
            }
        );


        console.log(
            "Response status:",
            response.status
        );


        // ----------------------------------------------------
        // ERROR RESPONSE
        // ----------------------------------------------------

        if (!response.ok) {

            let errorMessage =
                `Server returned ${response.status}.`;


            try {

                const errorData =
                    await response.json();


                console.error(
                    "Backend error:",
                    errorData
                );


                if (errorData.detail) {

                    errorMessage +=
                        ` ${JSON.stringify(errorData.detail)}`;
                }

            } catch (error) {

                console.error(
                    "Could not read error response.",
                    error
                );
            }


            throw new Error(errorMessage);
        }


        // ----------------------------------------------------
        // SUCCESS RESPONSE
        // ----------------------------------------------------

        const prediction =
            await response.json();


        console.log(
            "Prediction received:",
            prediction
        );


        displayResult(
            prediction,
            {
                ...data,
                subject: subject
            }
        );


    } catch (error) {

        console.error(
            "Prediction API Error:",
            error
        );


        displayError(
            "Prediction failed: " +
            error.message
        );


    } finally {

        setLoadingState(false);
    }
}


// ============================================================
// CONNECT FORM TO PREDICTION FUNCTION
// ============================================================

if (form) {

    form.addEventListener(
        "submit",
        predictGrade
    );

} else {

    console.error(
        "ERROR: predictionForm was not found."
    );
}


// ============================================================
// RESET BUTTON
// ============================================================

if (resetBtn) {

    resetBtn.addEventListener(
        "click",
        function () {

            clearError();

            clearValidationMessages();


            if (resultSection) {

                resultSection.style.display =
                    "none";
            }
        }
    );
}


// ============================================================
// CLOSE ERROR BUTTON
// ============================================================

if (closeErrorBtn) {

    closeErrorBtn.addEventListener(
        "click",
        clearError
    );
}


// ============================================================
// SCRIPT LOADED CHECK
// ============================================================

console.log(
    "Student Performance script.js loaded successfully."
);