if (permissions.preventAdminLoginPageIfLoggedIn()) {
  document.addEventListener("DOMContentLoaded", function () {
    components.navbar();
    components.footer();
    document
      .getElementById("admin-login-form")
      .addEventListener("submit", function (event) {
        event.preventDefault();

        let username = document.getElementById("username").value.trim();
        let password = document.getElementById("password").value.trim();
        console.log(username);

        if (!username || !password) {
          services.alert.toastWarning("Username dan password wajib diisi.");
          return;
        }

        if (username === auth.username && password === auth.password) {
          localStorage.setItem("adminUsername", username);

          services.alert.success("Login admin berhasil.").then(function () {
            window.location.href = "admin-dashboard.html";
          });

          return;
        }

        services.alert.toastError("Username atau password salah.");
      });
  });
}
