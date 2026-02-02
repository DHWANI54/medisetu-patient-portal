const patientId = localStorage.getItem("patientId");
if (!patientId) {
  window.location.href = "index.html";
}

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
    fileSize: "412 KB",
    notes: "No clinical action required."
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
    fileSize: "2.1 MB",
    notes: "Schedule a follow up within 2 weeks."
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
    fileSize: "356 KB",
    notes: "You will be notified when results are ready."
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
    fileSize: "298 KB",
    notes: "Continue current lifestyle plan."
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
    fileSize: "182 KB",
    notes: "Consider a daily supplement as advised."
  }
];

const details = document.getElementById("details");
const backBtn = document.getElementById("backBtn");

backBtn.addEventListener("click", () => {
  window.location.href = "reports.html";
});

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

const id = new URLSearchParams(window.location.search).get("id");
const report = reportsData.find(item => item.id === Number(id));

if (!report) {
  details.innerHTML = `
    <div class="card">
      <h2>Report not found</h2>
      <p class="muted">The report you are looking for is unavailable.</p>
    </div>
  `;
} else {
  details.innerHTML = `
    <div class="card report-detail">
      <div class="detail-header">
        <div>
          <p class="label">${report.category}</p>
          <h1>${report.title}</h1>
          <p class="muted">${report.facility} • ${formatDate(report.date)}</p>
        </div>
        <span class="badge ${report.status}">${statusLabel(report.status)}</span>
      </div>

      <div class="detail-grid">
        <div>
          <p class="label">Ordering doctor</p>
          <p>${report.doctor}</p>
        </div>
        <div>
          <p class="label">Report status</p>
          <p>${statusLabel(report.status)}</p>
        </div>
        <div>
          <p class="label">Facility</p>
          <p>${report.facility}</p>
        </div>
        <div>
          <p class="label">Report date</p>
          <p>${formatDate(report.date)}</p>
        </div>
      </div>

      <div class="card soft">
        <h3>Summary</h3>
        <p class="summary">${report.summary}</p>
        <p class="summary">${report.notes}</p>
      </div>

      <div class="file-card">
        <div>
          <p class="label">Report file</p>
          <p>${report.fileName}</p>
        </div>
        <div class="file-meta">
          <span>${report.fileSize}</span>
          <span>PDF format</span>
        </div>
        <button class="primary" id="downloadBtn" type="button">Download report</button>
      </div>
    </div>
  `;

  const downloadBtn = document.getElementById("downloadBtn");
  downloadBtn.addEventListener("click", () => {
    alert(`Preparing ${report.fileName} for download.`);
  });
}
