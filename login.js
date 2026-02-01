const DEMO_PATIENT_ID = "MD-2041-9823";

const patientInput = document.getElementById("patientId");
const error = document.getElementById("error");
const continueBtn = document.getElementById("continueBtn");
const demoId = document.getElementById("demoId");
const useDemo = document.getElementById("useDemo");

if (localStorage.getItem("patientId")) {
  window.location.href = "reports.html";
}

if (demoId) {
  demoId.textContent = DEMO_PATIENT_ID;
}

function login() {
  const id = patientInput.value.trim();

  if (!id) {
    error.textContent = "Please enter a Patient ID.";
    return;
  }

  localStorage.setItem("patientId", id);
  window.location.href = "reports.html";
}

continueBtn.addEventListener("click", login);

patientInput.addEventListener("keydown", event => {
  if (event.key === "Enter") {
    login();
  }
});

patientInput.addEventListener("input", () => {
  error.textContent = "";
});

useDemo.addEventListener("click", () => {
  patientInput.value = DEMO_PATIENT_ID;
  patientInput.focus();
  error.textContent = "";
});
