document.addEventListener("DOMContentLoaded", function () {
  components.navbar();
  components.footer();
  document.getElementById("page-content").innerHTML = `
  <section class="hero-card app-card">
            <div class="row align-items-center g-4">
              <div class="col-lg-7">
                <h1 class="page-title mb-3">
                  Kenali gaya komunikasi dan kecenderungan kepribadianmu lewat
                  DISC test.
                </h1>
                <p class="text-muted-custom mb-4">
                  DISC adalah alat penilaian kepribadian dan perilaku manusia
                  yang dikembangkan oleh Dr. William Moulton Marston, yang
                  membagi gaya perilaku ke dalam empat tipe: Dominance
                  (dominan), Influence (pengaruh), Steadiness (stabil), dan
                  Compliance (kesadaran). Umumnya digunakan dalam dunia kerja,
                  tes ini mengukur bagaimana individu menanggapi tantangan,
                  mempengaruhi orang lain, bekerja dalam lingkungan terstruktur,
                  dan mematuhi aturan.
                </p>
                <div class="d-flex flex-wrap gap-3">
                  <a href="test.html" class="btn btn-primary btn-lg px-4"
                    ><i class="bi bi-play-circle me-2"></i>Mulai Test</a
                  >
                  <a
                    href="admin-login.html"
                    class="btn btn-outline-secondary btn-lg px-4"
                    ><i class="bi bi-shield-lock me-2"></i>Masuk Admin</a
                  >
                </div>
              </div>
              <div class="col-lg-5">
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
                        <span class="badge text-bg-light">Home</span
                        ><span class="badge text-bg-light">Test</span
                        ><span class="badge text-bg-light">Result</span
                        ><span class="badge text-bg-light">Admin Login</span
                        ><span class="badge text-bg-light"
                          >Admin Dashboard</span
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>`;
});
