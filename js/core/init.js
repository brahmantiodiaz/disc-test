let components = {};
let data = {};
let services = {};
let auth = {
  username: "SuperAdmin",
  password: "glvf123",
  fullName: "Super Admin",
};
let userData = function () {
  if (!services.storage) {
    return {};
  }

  return services.storage.get("userLogin", {});
};

document.addEventListener("DOMContentLoaded", function () {
  if (!services.user) {
    return;
  }

  let admin = services.user.getByUserName(auth.username);

  if (!admin) {
    services.user.add({
      userName: auth.username,
      password: auth.password,
      isAdmin: true,
      fullName: auth.fullName,
    });
  }
});
