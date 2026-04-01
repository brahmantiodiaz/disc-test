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

  let testDate = new Date(profileID.createdAt).toLocaleString();

  document.getElementById("profile-highlight").innerHTML =
    `<div style="display: flex; justify-content: flex-end">
                    <a href="admin-dashboard.html"
                      ><button
                        id="back-admin-button"
                        type="button"
                        class="btn btn-secondary btn-lg d-none"
                      >
                        Back
                      </button></a
                    >
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
                    <h3 class="h5">Profile</h3>
                    <div class="badge text-bg-light mb-3">${profileID.profile.key}</div>
                    <h4 class="h6 fw-bold">${profileID.profile.title}</h4>
                    <p class="mb-0 text-muted-custom">
                      ${profileID.profile.summary}
                    </p>`;

  document.getElementById("reason-card").innerHTML =
    `<h3 class="h5">Kenapa hasilnya ini</h3>
                    <p class="mb-0 text-muted-custom">
                      ${profileID.reason}
                    </p>`;

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
