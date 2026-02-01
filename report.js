const data = [
  { id: 1, title: "CBC Test", date: "2024-01-10", source: "Apollo", status: "Normal" },
  { id: 2, title: "X-Ray Chest", date: "2024-01-12", source: "City Hospital", status: "Abnormal" },
  { id: 3, title: "Blood Sugar", date: "2024-01-15", source: "Medisetu Lab", status: "Pending" }
];

const id = new URLSearchParams(window.location.search).get("id");
const report = data.find(r => r.id == id);

document.getElementById("details").innerHTML = `
  <div class="card">
    <h2>${report.title}</h2>
    <p>${report.date}</p>
    <p>${report.source}</p>
    <span class="badge ${report.status}">${report.status}</span>

    <hr>
    <p>File: cbc_report.pdf</p>
    <p>Size: 1.2 MB</p>
    <button onclick="alert('Downloading...')">Download</button>
  </div>
`;

function back() {
  window.location.href = "reports.html";
}
