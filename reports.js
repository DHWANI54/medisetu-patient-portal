const patientId = localStorage.getItem("patientId");
if (!patientId) window.location.href = "index.html";

document.getElementById("pid").innerText = "Patient ID: " + patientId;

function logout() {
  localStorage.clear();
  window.location.href = "index.html";
}

const reportsData = [
  { id: 1, title: "CBC Test", date: "2024-01-10", source: "Apollo", status: "Normal" },
  { id: 2, title: "X-Ray Chest", date: "2024-01-12", source: "City Hospital", status: "Abnormal" },
  { id: 3, title: "Blood Sugar", date: "2024-01-15", source: "Medisetu Lab", status: "Pending" }
];

const reportsDiv = document.getElementById("reports");
const loading = document.getElementById("loading");
const empty = document.getElementById("empty");

setTimeout(showReports, 1000);

function showReports() {
  loading.style.display = "none";
  render(reportsData);
}

function render(data) {
  reportsDiv.innerHTML = "";
  empty.innerText = "";

  if (data.length === 0) {
    empty.innerText = "No reports found";
    return;
  }

  data.forEach(r => {
    reportsDiv.innerHTML += `
      <div class="card">
        <h3>${r.title}</h3>
        <p>${r.date}</p>
        <p>${r.source}</p>
        <span class="badge ${r.status}">${r.status}</span><br>
        <button onclick="view(${r.id})">View Report</button>
      </div>
    `;
  });
}

document.getElementById("search").oninput = filterReports;
document.getElementById("filter").onchange = filterReports;

function filterReports() {
  const text = search.value.toLowerCase();
  const status = filter.value;

  const filtered = reportsData.filter(r =>
    (r.title.toLowerCase().includes(text) || r.source.toLowerCase().includes(text)) &&
    (status === "All" || r.status === status)
  );

  render(filtered);
}

function view(id) {
  window.location.href = `report.html?id=${id}`;
}
