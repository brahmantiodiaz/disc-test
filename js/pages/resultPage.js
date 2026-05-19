document.addEventListener("DOMContentLoaded", function () {
  components.navbar();
  components.footer();

  const urlParams = new URLSearchParams(window.location.search);
  const participantsID = urlParams.get("id");
  const currentUser = userData();
  const participants = services.participant.getAll();

  const profileID = participants.find(function (participant) {
    return participant.id === participantsID;
  });

  if (!profileID) {
    services.alert.warning("Data hasil test tidak ditemukan.");
    setTimeout(function () {
      window.location.href = "index.html";
    }, 900);
    return;
  }

  if (currentUser.userName !== profileID.userName && !currentUser.isAdmin) {
    services.alert.warning("Kamu tidak memiliki akses ke hasil test ini.");
    setTimeout(function () {
      window.location.href = "index.html";
    }, 900);
    return;
  }

  let testDate = new Date(profileID.createdAt).toLocaleString("id-ID");

  document.getElementById("profile-highlight").innerHTML = `
    <div style="display: flex; justify-content: flex-end">
      ${renderButton(currentUser)}
    </div>
    <div style="display: grid; justify-content: center; align-items: center; margin-bottom: 20px;">
      <h3 class="h2">Profile</h3>
      <span class="h2 text-center text-muted-custom">${profileID.profile.key}</span>
    </div>
    <div class="d-flex flex-wrap justify-content-between gap-3">
      <div id="headerProfile">
        <h1 class="h3 mb-2">${profileID.name}</h1>
        <div class="text-muted-custom">
          Gender: ${profileID.gender} • Umur: ${profileID.age} • Tanggal Test: ${testDate}
        </div>
      </div>
    </div>`;

  let adminButton = document.getElementById("back-admin-button");

  if (adminButton && currentUser.isAdmin) {
    adminButton.classList.remove("d-none");
  }

  renderResultTable(profileID.result);
  renderProfileCard(profileID);
  renderChart("firstChart", "Line 1 DISC Score", profileID.result.line1);
  renderChart("secondChart", "Line 2 DISC Score", profileID.result.line2);
  renderChart("thirdChart", "Line 3 DISC Score", profileID.result.line3);
});

function renderButton(user) {
  if (user.isAdmin) {
    return `<a href="admin-dashboard.html">
      <button id="back-admin-button" type="button" class="btn btn-secondary d-none">
        Back
      </button>
    </a>`;
  }

  return `<a href="test.html">
    <button id="back-admin-button" type="button" class="btn btn-primary">
      Retake test
    </button>
  </a>`;
}

function renderResultTable(result) {
  let resultTableStr = "";
  let countLine = 1;

  for (const key in result) {
    let resultProfile = result[key];
    resultTableStr += `<tr>
      <th>${countLine}</th>
      <td>${resultProfile.D}</td>
      <td>${resultProfile.I}</td>
      <td>${resultProfile.S}</td>
      <td>${resultProfile.C}</td>
      <td>${resultProfile["*"] ?? "-"}</td>
      <td>${resultProfile.total ?? "-"}</td>
    </tr>`;

    countLine++;
  }

  document.getElementById("resultTable").innerHTML = resultTableStr;
}

function renderProfileCard(profileID) {
  document.getElementById("profile-card").innerHTML = `
    <h4 class="h6 fw-bold mb-2">${profileID.profile.title}</h4>
    <p class="text-muted mb-4">${profileID.profile.summary}</p>
    <h3 class="h5 mb-2">Alasan</h3>
    <p class="mb-4">${profileID.reason}</p>
    <div class="mb-3">
      <h5 class="h6 fw-semibold mb-2">Strengths</h5>
      <ul class="mb-0 ps-3">
        ${(profileID.profile.strengths || [])
          .map((item) => `<li class="mb-1">${item}</li>`)
          .join("")}
      </ul>
    </div>
    <div>
      <h5 class="h6 fw-semibold mb-2">Weaknesses</h5>
      <ul class="mb-0 ps-3">
        ${(profileID.profile.weaknesses || [])
          .map((item) => `<li class="mb-1">${item}</li>`)
          .join("")}
      </ul>
    </div>`;
}

function renderChart(canvasId, title, score) {
  const chartCanvas = document.getElementById(canvasId);

  if (!chartCanvas || !score) {
    return;
  }

  new Chart(chartCanvas, {
    type: "line",
    data: {
      labels: ["D", "I", "S", "C"],
      datasets: [
        {
          label: "score",
          data: [score.D, score.I, score.S, score.C],
          borderWidth: 3,
          pointRadius: 5,
          pointHoverRadius: 8,
          borderColor: "#bdb5d3",
        },
      ],
    },
    options: {
      scales: {
        y: {
          min: -12,
          max: 12,
          ticks: {
            stepSize: 4,
          },
          grid: {
            display: false,
          },
        },
        x: {
          ticks: {
            font: {
              size: 15,
            },
          },
        },
      },
      plugins: {
        title: {
          display: true,
          text: title,
          padding: {
            top: 10,
            bottom: 30,
          },
          font: {
            size: 18,
          },
        },
        legend: {
          display: false,
        },
      },
    },
  });
}
