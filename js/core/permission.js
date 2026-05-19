let permissions = {
  requireCurrentParticipant: function () {
    if (!localStorage.getItem("disc_current_participant")) {
      return false;
    }
    return true;
  },

  requireAdmin: function () {
    let user = services.storage.get("userLogin", {});

    if (!user.userName) {
      services.alert.warning("Login admin terlebih dahulu.");

      setTimeout(function () {
        window.location.href = "user-login.html";
      }, 900);

      return false;
    }

    if (!user.isAdmin) {
      services.alert.warning("Page ini hanya bisa di akses oleh admin.");

      setTimeout(function () {
        window.location.href = "index.html";
      }, 900);

      return false;
    }

    return true;
  },

  isAdmin: function () {
    let user = services.storage.get("userLogin", {});
    return !!user.isAdmin;
  },

  preventAdminLoginPageIfLoggedIn: function () {
    let user = services.storage.get("userLogin", {});

    if (user.isAdmin) {
      window.location.href = "admin-dashboard.html";
      return false;
    }

    if (user.userName && user.isAdmin === false) {
      window.location.href = "index.html";
      return false;
    }

    return true;
  },

  requireUser: function () {
    let user = userData();

    if (!user.userName || user.isAdmin) {
      if (user.isAdmin) {
        services.alert.warning("Admin tidak bisa melakukan assessment.");
      } else {
        services.alert.warning("User harus login terlebih dahulu.");
      }

      setTimeout(function () {
        window.location.href = "user-login.html";
      }, 1500);

      return false;
    }

    return true;
  },
};
