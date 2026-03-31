components.navbar = function () {
  let userSection = "";
  let userName = localStorage.getItem("adminUsername");
  if (userName) {
    userSection = `
    <div class="ms-auto d-flex align-items-center gap-3">
          <span class="text-muted small">${userName}</span>
          <button id="logout-btn" class="btn btn-danger btn-sm">Logout</button>
    </div>`;
  }
  document.getElementById("navbar").innerHTML = `
    <nav class="navbar navbar-expand-lg bg-white border-bottom sticky-top">
      <div class="container d-flex align-items-center">
        
        <a class="navbar-brand fw-bold" href="index.html">
          DISC Personality Test
        </a>

        ${userSection}
      </div>
    </nav>
  `;
  if (userName) {
    document.getElementById("logout-btn").addEventListener("click", onLogout);
  }
};

function onLogout() {
  Swal.fire({
    icon: "warning",
    title: "Logout admin?",
    text: "Session admin akan dihapus dari browser ini.",
    showCancelButton: true,
    confirmButtonText: "Ya, logout",
    cancelButtonText: "Batal",
  }).then(function (result) {
    if (result.isConfirmed) {
      localStorage.removeItem("adminUsername");

      services.alert.success("Logout berhasil.").then(function () {
        window.location.href = "/index.html";
      });
    }
  });
}
