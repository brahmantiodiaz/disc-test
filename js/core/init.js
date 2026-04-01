let components = {};
let data = {};
let services = {};
let auth = {
  username: "SuperAdmin",
  password: "glvf123",
  fullName: "Super Admin",
};
let userData = function () {
  return services.storage.get("userLogin", {});
};
document.addEventListener("DOMContentLoaded", function () {
  let getUserList = localStorage.getItem("user_list");
  if (!getUserList) {
    getUserList = [];
  }

  try {
    getUserList = JSON.parse(getUserList);
  } catch (error) {
    getUserList = [];
  }
  let admin;
  for (let i = 0; i < getUserList.length; i++) {
    if (getUserList[i].userName === auth.username) {
      admin = getUserList[i];
    }
  }

  if (!admin) {
    services.user.add({
      userName: auth.username,
      password: auth.password,
      isAdmin: true,
      fullName: auth.fullName,
    });
  }
});
