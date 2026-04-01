document.addEventListener("DOMContentLoaded", function () {
  components.navbar();
  components.footer();

  const user = services.storage.get("userLogin", null);

  if (!user) {
    window.location.href = "./user-login.html";
    return;
  }
  const testData = services.participant.getByUserName(user.userName);
  if (testData) {
    renderButtonResult(testData.id);
  }
  const userDetail = services.user.getByUserName(user.userName);

  document.getElementById("username").value = userDetail.userName || "";
  document.getElementById("name").value = userDetail.fullName || "";
  document.getElementById("gender").value = userDetail.gender || "";
  document.getElementById("age").value = userDetail.age || "";

  document
    .getElementById("profile-form")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      const username = document.getElementById("name").value.trim();

      const name = document.getElementById("name").value.trim();
      const gender = document.getElementById("gender").value;
      const age = Number(document.getElementById("age").value);

      if (!name || !gender || !age) {
        return services.alert.error("Semua field wajib diisi!");
      }
      services.user.update({
        userName: userDetail.userName,
        fullName: name,
        password: userDetail.password,
        gender: gender,
        age: age,
      });

      services.alert.success("Profile berhasil diupdate!");
    });
});

function renderButtonResult(id) {
  document.getElementById("buttonTest").innerHTML =
    `<a href="result.html?id=${id}" class="btn btn-success">
                    <i class="bi bi-bar-chart-line me-1"></i>
                    Lihat Hasil Test
                  </a>`;
}
