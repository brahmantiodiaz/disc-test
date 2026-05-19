// saveDummyParticipants();
if (permissions.requireAdmin()) {
  components.navbar();
  components.footer();

  let dataTabelParticipant = services.participant.getAll();
  const tabel = document.getElementById("participantTable");
  const totalDataTabel = document.getElementById("totalData");

  function renderTotalDataTabelParticipant() {
    totalDataTabel.innerHTML = `Total data: ${dataTabelParticipant.length}`;
  }

  function renderDataTabel() {
    if (Array.isArray(dataTabelParticipant) && dataTabelParticipant.length > 0) {
      tabel.innerHTML = `<table class="table align-middle mb-0">
        <thead>
          <tr>
            <th>No</th>
            <th>Nama</th>
            <th>Gender</th>
            <th>Umur</th>
            <th>Profile</th>
            <th>Tanggal Test</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>${renderTabelBody(dataTabelParticipant)}</tbody>
      </table>`;
      return;
    }

    tabel.innerHTML = `<h3 class="h5 mb-2">Belum ada partisipan</h3>
      <p class="text-muted-custom mb-0">
        Data peserta yang selesai test akan muncul di sini.
      </p>`;
  }

  function renderTabelBody(payloadParticipant) {
    let result = "";

    payloadParticipant.forEach(function (participant, idx) {
      result += `<tr>
        <td>${idx + 1}</td>
        <td>${participant.name}</td>
        <td>${participant.gender}</td>
        <td>${participant.age}</td>
        <td>${participant.profile.title}</td>
        <td>${changeDateformStr(participant.createdAt)}</td>
        <td class="text-nowrap">
          <a href="result.html?id=${participant.id}" class="btn btn-sm btn-outline-primary">View</a>
          <button type="button" class="btn btn-sm btn-outline-danger" data-id="${participant.id}">
            Delete
          </button>
        </td>
      </tr>`;
    });

    return result;
  }

  function changeDateformStr(date) {
    let newDate = new Date(date);
    return newDate.toLocaleDateString("id-ID");
  }

  function renderButtonDelete() {
    document.addEventListener("click", function (e) {
      if (e.target.matches("[data-id]")) {
        const id = e.target.dataset.id;
        services.alert.confirmDelete().then(function (result) {
          if (result.isConfirmed) {
            deleteParticipantById(id);
          }
        });
      }
    });
  }

  function deleteParticipantById(id) {
    services.participant.deleteById(id);
    dataTabelParticipant = services.participant.getAll();
    renderTotalDataTabelParticipant();
    renderDataTabel();
  }

  renderTotalDataTabelParticipant();
  renderDataTabel();
  renderButtonDelete();
}
