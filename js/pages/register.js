if (permissions.preventAdminLoginPageIfLoggedIn()) {
  document.addEventListener("DOMContentLoaded", function () {
    components.navbar();
    components.footer();
    document
      .getElementById("user-register-form")
      .addEventListener("submit", function (event) {
        event.preventDefault();
        let username = document.getElementById("username").value.trim();
        let password = document.getElementById("password").value.trim();
        let nama = document.getElementById("name").value.trim();

        if (!username || !password || !nama) {
          services.alert.toastWarning("Username dan password wajib diisi.");
          return;
        }

        let findUsername = services.user.getByUserName(username);
        if (findUsername) {
          services.alert.toastWarning("Username sudah terdaftar");
          return;
        }
        services.user.add({
          userName: username,
          fullName: nama,
          password: services.user.encryptDecrypt(password, true),
          isAdmin: false,
        });
        services.alert
          .success("register berhasil. silahkan login")
          .then(function () {
            window.location.href = "user-login.html";
          });
      });
  });
}
