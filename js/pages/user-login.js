if (permissions.preventAdminLoginPageIfLoggedIn()) {
  document.addEventListener("DOMContentLoaded", function () {
    components.navbar();
    components.footer();
    document
      .getElementById("user-login-form")
      .addEventListener("submit", function (event) {
        event.preventDefault();

        let username = document.getElementById("username").value.trim();
        let password = document.getElementById("password").value.trim();

        if (!username || !password) {
          services.alert.toastWarning("Username dan password wajib diisi.");
          return;
        }
        let findUser = services.user.getByUserName(username);
        if (!findUser) {
          services.alert.toastError("username tidak ada");
          return;
        }
        if (
          username === findUser.userName &&
          services.user.encryptDecrypt(password, true) === findUser.password
        ) {
          services.storage.set("userLogin", {
            userName: findUser.userName,
            fullName: findUser.fullName,
            isAdmin: findUser.isAdmin,
          });
          if (findUser.isAdmin) {
            services.alert.success("Login admin berhasil.").then(function () {
              window.location.href = "admin-dashboard.html";
            });
            return;
          }
          services.alert.success("Login berhasil.").then(function () {
            window.location.href = "index.html";
          });

          return;
        }

        services.alert.toastError("Username atau password salah.");
      });
  });
}
