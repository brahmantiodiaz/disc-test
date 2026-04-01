components.navbar = function () {
  let user = services.storage.get("userLogin", {});
  let userSection = "";
  console.log(user.fullName);
  if (user.fullName) {
    userSection = `
      <ul class="navbar-nav ms-auto align-items-center">
        <li class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle d-flex align-items-center gap-2"
            href="#"
            id="userDropdown"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i class="bi bi-person-circle"></i>
            <span id="navbar-username">${user.fullName}</span>
          </a>

          <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
            <li>
              <a class="dropdown-item" href="profile.html">
                <i class="bi bi-pencil-square me-2"></i>profile
              </a>
            </li>
            <li><hr class="dropdown-divider" /></li>
            <li>
              <a class="dropdown-item text-danger" href="#" id="logout-btn">
                <i class="bi bi-box-arrow-right me-2"></i>Logout
              </a>
            </li>
          </ul>
        </li>
      </ul>
    `;
  } else {
    userSection = `
      <ul class="navbar-nav ms-auto align-items-center">
       <a href="user-login.html" class="btn btn-primary">login</a>
      </ul>
    `;
  }

  document.getElementById("navbar").innerHTML = `
    <nav class="navbar navbar-expand-lg border-bottom sticky-top" style="background-color: #ffd4d2;">
  <div class="container">
    <a class="navbar-brand d-flex align-items-center gap-2" href="index.html">
      <img src="./asset/home-logo.png" alt="Logo" height="32" />
      <span class="fw-bold">DISC Personality Test</span>
    </a>

    ${userSection}
  </div>
</nav>
  `;

  if (user.fullName) {
    document
      .getElementById("logout-btn")
      .addEventListener("click", function (e) {
        e.preventDefault();
        onLogout();
      });
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
      localStorage.removeItem("userLogin");

      services.alert.success("Logout berhasil.").then(function () {
        window.location.href = "index.html";
      });
    }
  });
}
