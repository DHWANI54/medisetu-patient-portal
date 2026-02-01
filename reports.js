const patientId = localStorage.getItem("patientId");
if (!patientId) {
  window.location.href = "index.html";
}

document.getElementById("pid").textContent = patientId;

const reportsData = [
  {
    id: 1,
    title: "Complete Blood Count",
    date: "2026-01-18",
    facility: "Apollo Diagnostics",
    status: "normal",
    category: "Hematology",
    doctor: "Dr. R. Iyer",
    summary: "All parameters within reference ranges.",
    fileName: "cbc_report_2026.pdf",
    fileSize: "412 KB"
  },
  {
    id: 2,
    title: "Chest X-Ray",
    date: "2026-01-12",
    facility: "City Hospital",
    status: "abnormal",
    category: "Radiology",
    doctor: "Dr. S. Mehta",
    summary: "Mild bronchial wall thickening. Follow up recommended.",
    fileName: "xray_chest_2026.pdf",
    fileSize: "2.1 MB"
  },
  {
    id: 3,
    title: "HbA1c",
    date: "2026-01-09",
    facility: "Medisetu Lab",
    status: "pending",
    category: "Diabetes",
    doctor: "Dr. A. Rao",
    summary: "Processing at lab, expected within 24 hours.",
    fileName: "hba1c_2026.pdf",
    fileSize: "356 KB"
  },
  {
    id: 4,
    title: "Lipid Profile",
    date: "2026-01-05",
    facility: "Sunrise Clinic",
    status: "normal",
    category: "Cardiology",
    doctor: "Dr. N. Joshi",
    summary: "LDL and HDL levels within the target range.",
    fileName: "lipid_profile_2026.pdf",
    fileSize: "298 KB"
  },
  {
    id: 5,
    title: "Vitamin D",
    date: "2026-01-02",
    facility: "Medisetu Lab",
    status: "abnormal",
    category: "Wellness",
    doctor: "Dr. P. Kapoor",
    summary: "Low Vitamin D detected. Supplement plan required.",
    fileName: "vitamin_d_2026.pdf",
    fileSize: "182 KB"
  }
];

const searchInput = document.getElementById("search");
const filterSelect = document.getElementById("filter");
const reportsDiv = document.getElementById("reports");
const loading = document.getElementById("loading");
const empty = document.getElementById("empty");

const statTotal = document.getElementById("statTotal");
const statNormal = document.getElementById("statNormal");
const statAbnormal = document.getElementById("statAbnormal");
const statPending = document.getElementById("statPending");
const lastSynced = document.getElementById("lastSynced");

const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("patientId");
  window.location.href = "index.html";
});

setTimeout(() => {
  loading.style.display = "none";
  render(reportsData);
  updateStats(reportsData);
  updateLastSynced(reportsData);
}, 700);

function formatDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}

function statusLabel(status) {
  return status.charAt(0).toUpperCase() + status.slice(1);
}

function updateStats(data) {
  const total = data.length;
  const normal = data.filter(item => item.status === "normal").length;
  const abnormal = data.filter(item => item.status === "abnormal").length;
  const pending = data.filter(item => item.status === "pending").length;

  statTotal.textContent = total;
  statNormal.textContent = normal;
  statAbnormal.textContent = abnormal;
  statPending.textContent = pending;
}

function updateLastSynced(data) {
  if (!data.length) {
    lastSynced.textContent = "--";
    return;
  }

  const latest = data
    .map(item => new Date(item.date))
    .filter(date => !Number.isNaN(date.getTime()))
    .sort((a, b) => b - a)[0];

  lastSynced.textContent = latest ? formatDate(latest) : "--";
}

function render(data) {
  reportsDiv.innerHTML = "";
  empty.textContent = "";

  if (data.length === 0) {
    empty.textContent = "No reports found for the current filters.";
    return;
  }

  data.forEach(report => {
    const card = document.createElement("div");
    card.className = "card report-card";
    card.innerHTML = `
      <div class="card-top">
        <div>
          <h3>${report.title}</h3>
          <p class="muted">${report.facility} • ${formatDate(report.date)}</p>
        </div>
        <span class="badge ${report.status}">${statusLabel(report.status)}</span>
      </div>
      <p class="summary">${report.summary}</p>
      <div class="meta-row">
        <span class="pill">${report.category}</span>
        <span class="pill">${report.doctor}</span>
      </div>
      <div class="card-actions">
        <button class="ghost" type="button" onclick="view(${report.id})">View details</button>
        <button class="primary" type="button" onclick="download(${report.id})">Download</button>
      </div>
    `;
    reportsDiv.appendChild(card);
  });
}

function filterReports() {
  const text = searchInput.value.trim().toLowerCase();
  const status = filterSelect.value;

  const filtered = reportsData.filter(report => {
    const matchesText = report.title.toLowerCase().includes(text) ||
      report.facility.toLowerCase().includes(text);
    const matchesStatus = status === "All" || report.status === status;
    return matchesText && matchesStatus;
  });

  render(filtered);
}

function view(id) {
  window.location.href = `report.html?id=${id}`;
}

function download(id) {
  const report = reportsData.find(item => item.id === id);
  if (!report) {
    return;
  }
  alert(`Preparing ${report.fileName} for download.`);
}

searchInput.addEventListener("input", filterReports);
filterSelect.addEventListener("change", filterReports);
