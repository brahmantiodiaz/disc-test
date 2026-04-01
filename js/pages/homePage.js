document.addEventListener("DOMContentLoaded", function () {
  components.navbar();
  components.footer();
  let user = services.storage.get("userLogin", {});
  let startPage = "test.html";
  let adminBtn = document.getElementById("btn-admin");
  // console.log(user);
  let findData = services.participant.getByUserName(user.userName);
  console.log(findData);
  if (findData) {
    startPage = `result.html?id=${findData.id}`;
  }
  let renderButton = "";
  if (user.isAdmin) {
    renderButton = `<a
                    href="admin-dashboard.html"
                    id="btn-admin"
                    class="btn btn-outline-secondary btn-lg px-4"
                    ><i class="bi bi-shield-lock me-2"></i>Dashboard</a
                  >`;
  } else {
    renderButton = `                <div class="d-flex flex-wrap gap-3">
                  <a href="${startPage}" class="btn btn-primary btn-lg px-4"
                    ><i class="bi bi-play-circle me-2"></i>Mulai Test</a
                  >
                  
                </div>`;
  }

  document.getElementById("page-content").innerHTML = `
<section class="hero-card app-card hero-wrapper">
  <div class="row g-4 align-items-stretch">
    
    <div class="col-lg-7 position-relative z-1">
      <h1 class="page-title mb-3">
        Kenali gaya komunikasi dan kecenderungan kepribadianmu lewat
        DISC test.
      </h1>

      <p class="text-muted-custom mb-4">
        DISC adalah metode untuk memahami gaya perilaku seseorang yang dibagi ke dalam empat tipe: Dominance (D), Influence (I), Steadiness (S), dan Compliance (C). Dengan tes ini, kamu bisa mengetahui bagaimana cara kamu mengambil keputusan, berinteraksi, bekerja dalam tim, dan merespons aturan atau tekanan. Aplikasi ini menggunakan metode Most–Least (forced-choice), di mana kamu memilih pernyataan yang paling dan paling tidak menggambarkan diri kamu. Pendekatan ini membantu menghasilkan profil yang lebih akurat karena berdasarkan perbandingan langsung antar pilihan.
      </p>

      ${renderButton}
    </div>

    <div class="col-lg-5 position-relative z-1">
      <div class="row g-3">
        <div class="col-6">
          <div class="kpi-box">
            <div class="small text-muted-custom mb-1">
              Jumlah Soal
            </div>
            <div class="h3 mb-0">24</div>
          </div>
        </div>

        <div class="col-6">
          <div class="kpi-box">
            <div class="small text-muted-custom mb-1">Profile</div>
            <div class="h3 mb-0">16</div>
          </div>
        </div>

        <div class="col-12">
          <div class="kpi-box">
            <div class="small text-muted-custom mb-2">Path App</div>
            <div class="d-flex flex-wrap gap-2">
              <span class="badge text-bg-light">Home</span>
              <span class="badge text-bg-light">Test</span>
              <span class="badge text-bg-light">Result</span>
              <span class="badge text-bg-light">Admin Login</span>
              <span class="badge text-bg-light">Admin Dashboard</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <img
    src="./asset/orangduduk-nobg.png"
    alt="DISC Illustration"
    class="hero-bg-image"
  />
</section>
`;
  if (user.userName && user.isAdmin === false) {
    adminBtn.classList.add("disabled");
    adminBtn.style.pointerEvents = "none";
    adminBtn.style.opacity = "0.5";
  }
});
