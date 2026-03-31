document.addEventListener("DOMContentLoaded", function () {
  components.navbar();
  components.footer();
  if (permissions.requireCurrentParticipant()) {
    startTest();
  } else {
    document.getElementById("page-content").innerHTML = `
              <div class="row justify-content-center">
            <div class="col-lg-8">
              <div class="app-card p-4 p-md-5">
                <h1 class="h3 mb-3">Isi Data Diri</h1>
                <p class="text-muted-custom mb-4">
                  Data ini akan ditampilkan di halaman result dan dashboard
                  admin.
                </p>
                <form id="participant-form" novalidate>
                  <div class="mb-3">
                    <label for="name" class="form-label">Nama</label
                    ><input
                      id="name"
                      class="form-control"
                      placeholder="Masukkan nama lengkap"
                    />
                  </div>
                  <div class="mb-3">
                    <label for="gender" class="form-label">Jenis Kelamin</label
                    ><select id="gender" class="form-select">
                      <option value="">Pilih jenis kelamin</option>
                      <option value="Laki-laki">Laki-laki</option>
                      <option value="Perempuan">Perempuan</option>
                    </select>
                  </div>
                  <div class="mb-4">
                    <label for="age" class="form-label">Umur</label
                    ><input
                      id="age"
                      type="number"
                      class="form-control"
                      placeholder="Masukkan umur"
                    />
                  </div>
                  <div class="d-flex flex-wrap gap-3">
                    <a href="index.html" class="btn btn-outline-secondary"
                      >Kembali</a
                    ><button type="submit" class="btn btn-primary">
                      Mulai Test
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
  `;
    document
      .getElementById("participant-form")
      .addEventListener("submit", function (event) {
        event.preventDefault();
        let name = document.getElementById("name").value.trim();
        let gender = document.getElementById("gender").value;
        let age = document.getElementById("age").value.trim();
        if (!name || !gender || !age) {
          services.alert.toastWarning("Semua field wajib diisi.");
          return;
        }
        let draft = {
          id: "PRT-" + Date.now(),
          name: name,
          gender: gender,
          age: Number(age),
          createdAt: new Date().toISOString(),
          answers: [],
        };
        localStorage.setItem("disc_current_participant", JSON.stringify(draft));
        localStorage.setItem("disc_current_question_index", 0);
        startTest();
      });
  }
});
function startTest() {
  let root = document.getElementById("page-content");
  let participant = services.storage.get("disc_current_participant", null);
  let questions = data.questions || [];

  if (!questions.length) {
    root.innerHTML = `
      <div class="app-card p-4">
        <h1 class="h4 mb-2">Soal belum tersedia</h1>
        <p class="text-muted-custom mb-0">
          Isi file <strong>questions.js</strong> dulu supaya test bisa dijalankan.
        </p>
      </div>
    `;
    return;
  }

  renderPage();

  function renderPage() {
    participant = services.storage.get("disc_current_participant", null);

    let currentIndex = services.storage.get("disc_current_question_index", 0);
    if (currentIndex < 0) currentIndex = 0;
    if (currentIndex >= questions.length) currentIndex = questions.length - 1;

    let question = questions[currentIndex];
    let currentAnswer = participant.answers[currentIndex] || null;
    let progressPercent = Math.round(
      ((currentIndex + 1) / questions.length) * 100,
    );

    root.innerHTML = `
      <div class="row justify-content-center">
        <div class="col-xl-9">
          <div class="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-3">
            <div>
              <h1 class="h4 mb-1">Halo, ${participant.name}</h1>
              <div class="text-muted-custom">
                Soal ${currentIndex + 1} dari ${questions.length}
              </div>
            </div>

            <div class="d-flex flex-wrap gap-2">
              <a class="btn btn-outline-secondary btn-sm">
                Edit Data
              </a>
            </div>
          </div>

          <div class="app-card p-3 p-md-4 mb-4">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <span class="fw-semibold">Progress Test</span>
              <span class="text-muted-custom">${progressPercent}%</span>
            </div>

            <div class="progress" style="height: 10px;">
              <div
                class="progress-bar"
                role="progressbar"
                style="width: ${progressPercent}%"
                aria-valuenow="${progressPercent}"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
          </div>

          ${components.questionCard(question, currentAnswer)}

          <div class="d-flex flex-wrap justify-content-between gap-3 mt-4">
            <button
              id="prev-btn"
              class="btn btn-outline-secondary"
              ${currentIndex === 0 ? "disabled" : ""}
            >
              Previous
            </button>

            <button id="next-btn" class="btn btn-primary px-4">
              ${currentIndex === questions.length - 1 ? "Finish Test" : "Next"}
            </button>
          </div>
        </div>
      </div>
    `;

    bindEvents(currentIndex, question);
  }

  function bindEvents(currentIndex, question) {
    let prevBtn = document.getElementById("prev-btn");
    let nextBtn = document.getElementById("next-btn");

    if (prevBtn) {
      prevBtn.addEventListener("click", function () {
        saveCurrentSelectionSilently(currentIndex, question);
        if (currentIndex > 0) {
          services.storage.set("disc_current_question_index", currentIndex - 1);
          renderPage();
        }
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", function () {
        let mostInput = document.querySelector(
          'input[name="mostChoice"]:checked',
        );
        let leastInput = document.querySelector(
          'input[name="leastChoice"]:checked',
        );

        if (!mostInput || !leastInput) {
          services.alert.toastWarning("Pilih P dan K terlebih dahulu.");
          return;
        }

        if (mostInput.value === leastInput.value) {
          services.alert.toastWarning("Pilihan P dan K tidak boleh sama.");
          return;
        }

        participant.answers[currentIndex] = {
          questionId: question.id,
          mostChoice: Number(mostInput.value),
          leastChoice: Number(leastInput.value),
        };

        services.storage.set("disc_current_participant", participant);

        if (currentIndex === questions.length - 1) {
          finishTest();
          return;
        }

        services.storage.set("disc_current_question_index", currentIndex + 1);
        renderPage();
      });
    }

    bindRadioUX();
  }
  function bindRadioUX() {
    let mostInputs = document.querySelectorAll('input[name="mostChoice"]');
    let leastInputs = document.querySelectorAll('input[name="leastChoice"]');

    for (let i = 0; i < mostInputs.length; i++) {
      mostInputs[i].addEventListener("change", function () {
        let selectedMost = this.value;
        let checkedLeast = document.querySelector(
          'input[name="leastChoice"]:checked',
        );

        if (checkedLeast && checkedLeast.value === selectedMost) {
          checkedLeast.checked = false;
          services.alert.toastWarning(
            "Pilihan K dibersihkan karena tidak boleh sama dengan P.",
          );
        }
      });
    }

    for (let j = 0; j < leastInputs.length; j++) {
      leastInputs[j].addEventListener("change", function () {
        let selectedLeast = this.value;
        let checkedMost = document.querySelector(
          'input[name="mostChoice"]:checked',
        );

        if (checkedMost && checkedMost.value === selectedLeast) {
          checkedMost.checked = false;
          services.alert.toastWarning(
            "Pilihan P dibersihkan karena tidak boleh sama dengan K.",
          );
        }
      });
    }
  }

  function saveCurrentSelectionSilently(currentIndex, question) {
    let mostInput = document.querySelector('input[name="mostChoice"]:checked');
    let leastInput = document.querySelector(
      'input[name="leastChoice"]:checked',
    );

    if (!mostInput || !leastInput) return;
    if (mostInput.value === leastInput.value) return;

    participant.answers[currentIndex] = {
      questionId: question.id,
      mostChoice: Number(mostInput.value),
      leastChoice: Number(leastInput.value),
    };

    services.storage.set("disc_current_participant", participant);
  }

  function finishTest() {
    let result = services.scoring.calculate(participant.answers);
    let profile = services.resultProfile.resolve(result.line3);
    let reason = services.resultProfile.buildReason(result.line3, profile);

    let finalParticipant = {
      id: participant.id,
      name: participant.name,
      gender: participant.gender,
      age: participant.age,
      createdAt: participant.createdAt,
      answers: participant.answers,
      result: result,
      profile: profile,
      reason: reason,
    };

    services.participant.add(finalParticipant);
    services.storage.remove("disc_current_question_index");
    services.storage.remove("disc_current_participant");
    console.log("harusnya keluar alert");
    services.alert
      .success("Test selesai. Hasil akan ditampilkan sekarang.")
      .then(function () {
        window.location.href = "result.html?id=" + finalParticipant.id;
      });
  }
}
