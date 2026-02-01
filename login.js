// Auto redirect if already logged in
if (localStorage.getItem("patientId")) {
  window.location.href = "reports.html";
}

function login() {
  const patientId = document.getElementById("patientId").value;
  const error = document.getElementById("error");

  if (patientId === "") {
    error.innerText = "Please enter Patient ID";
    return;
  }

  localStorage.setItem("patientId", patientId);
  window.location.href = "reports.html";
}
