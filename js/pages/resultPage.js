document.addEventListener("DOMContentLoaded", function () {
  components.navbar();
  components.footer();
  //generete dummyData List Participants

  const urlParams = new URLSearchParams(window.location.search);
  const participantsID = urlParams.get("id");

  let getAllParticipants = localStorage.getItem("disc_participants");

  const jsonParticipant = JSON.parse(getAllParticipants);

  let profileID = {
    id: "",
    name: "",
    gender: "",
    age: 0,
    createdAt: "",
    answers: [],
    result: {},
    profile: {
      key: "",
      title: "",
      summary: "",
    },
    reason: "",
  };

  for (let i = 0; i < jsonParticipant.length; i++) {
    const tempJSON = jsonParticipant[i];
    if (participantsID === tempJSON.id) {
      profileID = tempJSON;
    }
  }

  console.log(profileID);

  if (!profileID.id) {
    window.location.href = "index.html";
  }
  if (userData.userName !== profileID.userName && !userData.isAdmin) {
    console.log("usename tidak sama dan bukan admin");
  }

  let testDate = new Date(profileID.createdAt).toLocaleString();

  document.getElementById("profile-highlight").innerHTML =
    `<div style="display: flex; justify-content: flex-end">
                   ${renderButton()}
                  </div>
                  <div style=" display: grid;
                    justify-content: center;
                    align-items: center;
                    margin-bottom: 20px;
                  "
                >
                  <h3 class="h2">Profile</h3>
                  <span class="h2 text-center text-muted-custom"
                    >${profileID.profile.key}</span
                  >
                </div>
                <div class="d-flex flex-wrap justify-content-between gap-3">
                  <div id="headerProfile">
                    <h1 class="h3 mb-2">${profileID.name}</h1>
               <div class="text-muted-custom">
                  Gender: ${profileID.gender} • Umur: ${profileID.age} • Tanggal Test: ${testDate}
                   </div>
                    </div>
                  </div>
                  
                </div>`;

  // <div style="height: 40px; width: 70px">
  //   <a href="admin-dashboard.html">
  //     <button
  //       id="back-admin-button"
  //       type="button"
  //       class="btn btn-secondary btn-lg d-none"
  //     >
  //       Back
  //     </button>
  //   </a>
  // </div>;

  document.getElementById("headerProfile").innerHTML =
    `<h1 class="h3 mb-2">${profileID.name}</h1>
                    <div class="text-muted-custom">
                      Gender: ${profileID.gender} • Umur: ${profileID.age} • Tanggal Test: ${testDate}
                      </div>`;

  // Back button for admin
  let adminButton = document.getElementById("back-admin-button");

  if (permissions.isAdmin()) {
    adminButton.classList.remove("d-none");
  }

  let resultTableStr = "";
  let countLine = 1;

  for (const key in profileID.result) {
    let resultProfile = profileID.result[key];
    resultTableStr += `<tr>
                        <th>${countLine}</th>
                        <td>${resultProfile.D}</td>
                        <td>${resultProfile.I}</td>
                        <td>${resultProfile.S}</td>
                        <td>${resultProfile.C}</td>
                        <td>${resultProfile["*"] ? resultProfile["*"] : "-"}</td>
                        <td>${resultProfile.total ? resultProfile.total : "-"}</td>
                      </tr>`;

    countLine++;
  }

  document.getElementById("resultTable").innerHTML = resultTableStr;

  document.getElementById("profile-card").innerHTML = `
  <h4 class="h6 fw-bold mb-2">${profileID.profile.title}</h4>
  <p class="text-muted mb-4">
    ${profileID.profile.summary}
  </p>
<h3 class="h5 mb-2">Alasan</h3>
                    <p class="mb-4">
                      ${profileID.reason}
                    </p>
  <div class="mb-3">
    <h5 class="h6 fw-semibold mb-2">Strengths</h5>
    <ul class="mb-0 ps-3">
      ${profileID.profile.strengths
        .map((item) => `<li class="mb-1">${item}</li>`)
        .join("")}
    </ul>
  </div>

  <div>
    <h5 class="h6 fw-semibold mb-2">Weaknesses</h5>
    <ul class="mb-0 ps-3">
      ${profileID.profile.weaknesses
        .map((item) => `<li class="mb-1">${item}</li>`)
        .join("")}
    </ul>
  </div>
`;

  // document.getElementById("reason-card").innerHTML =
  // ``;

  // chart function
  const firstChartJS = document.getElementById("firstChart");

  new Chart(firstChartJS, {
    type: "line",
    data: {
      labels: ["D", "I", "S", "C"],
      datasets: [
        {
          label: "score",
          data: [
            profileID.result.line1.D,
            profileID.result.line1.I,
            profileID.result.line1.S,
            profileID.result.line1.C,
          ],
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
          text: "Line 1 DISC Score",
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

  const secondChartJS = document.getElementById("secondChart");

  new Chart(secondChartJS, {
    type: "line",
    data: {
      labels: ["D", "I", "S", "C"],
      datasets: [
        {
          label: "score",
          data: [
            profileID.result.line2.D,
            profileID.result.line2.I,
            profileID.result.line2.S,
            profileID.result.line2.C,
          ],
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
          text: "Line 2 DISC Score",
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

  const thirdChartJS = document.getElementById("thirdChart");

  new Chart(thirdChartJS, {
    type: "line",
    data: {
      labels: ["D", "I", "S", "C"],
      datasets: [
        {
          label: "score",
          data: [
            profileID.result.line3.D,
            profileID.result.line3.I,
            profileID.result.line3.S,
            profileID.result.line3.C,
          ],
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
          text: "Line 3 DISC Score",
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

  //create&Save dummyData to localStorage
  // saveDummyParticipants();
});

function renderButton() {
  let user = userData();
  console.log(user.isAdmin);
  if (user.isAdmin) {
    return `<a href="admin-dashboard.html"
                      ><button
                        id="back-admin-button"
                        type="button"
                        class="btn btn-secondary d-none"
                      >
                        Back
                      </button></a>`;
  } else {
    return `<a href="test.html"
                      ><button
                        id="back-admin-button"
                        type="button"
                        class="btn btn-primary"
                      >
                        Retake test
                      </button></a>`;
  }
}
