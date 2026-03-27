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
  let participant = localStorage.getItem("disc_current_participant");
  participant = JSON.parse(participant);
  let currentIndex = localStorage.getItem("disc_current_question_index");
  if (!currentIndex) {
    currentIndex = 0;
  }
  currentIndex = Number(currentIndex);
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
  if (currentIndex < 0) currentIndex = 0;
  if (currentIndex >= questions.length) currentIndex = questions.length - 1;
  let question = questions[currentIndex];
  let currentAnswer = participant.answers[currentIndex] || null;
  let progressPercent = Math.round(
    ((currentIndex + 1) / questions.length) * 100,
  );
  renderPage();
  function renderPage() {
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
  }
}
