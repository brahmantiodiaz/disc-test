let permissions = {
  requireCurrentParticipant: function () {
    if (!localStorage.getItem("disc_current_participant")) {
      // services.alert.warning(
      //   "Isi data peserta dulu sebelum masuk ke halaman test.",
      // );
      // setTimeout(function () {
      //   window.location.href = "user-form.html";
      // }, 800);
      return false;
    }
    return true;
  },

  requireAdmin: function () {
    let userName = localStorage.getItem("adminUsername");

    if (!userName) {
      services.alert.warning("Login admin terlebih dahulu.");

      setTimeout(function () {
        window.location.href = "admin-login.html";
      }, 900);

      return false;
    }

    return true;
  },

  isAdmin: function () {
    let userName = localStorage.getItem("adminUsername");

    return userName ? true : false;
  },

  preventAdminLoginPageIfLoggedIn: function () {
    let userName = localStorage.getItem("adminUsername");
    if (userName) {
      window.location.href = "admin-dashboard.html";
      // return false;
    }

    return true;
  },
};
