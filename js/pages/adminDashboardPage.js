// saveDummyParticipants();
components.navbar();
components.footer();

// GLOBAL VARIABEL
let dataTabelParticipant = services.participant.getAll();
const tabel = document.getElementById("participantTable");
const totalDataTabel = document.getElementById("totalData");

let hasTabel =
  Array.isArray(dataTabelParticipant) && dataTabelParticipant.length > 0;

// function untuk menampilkan totalData participant
function renderTotalDataTabelParticipant() {
  if (hasTabel) {
    console.log(dataTabelParticipant.length);
    return (totalDataTabel.innerHTML = `Total data: ${dataTabelParticipant.length}`);
  } else {
    return (totalDataTabel.innerHTML = `Total data: ${dataTabelParticipant.length}`);
    // return null;
  }
}

// totalDataTabel.innerHTML = `Total data: ${dataTabelParticipant.length}`

function renderDataTabel() {
  if (hasTabel) {
    return (tabel.innerHTML = `<table class="table align-middle mb-0">
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
                  <tbody> 
                  ${renderTabelBody(dataTabelParticipant)}
                  </tbody>
                </table>
  `);
  } else {
    return null;
  }
}

function renderTabelBody(payloadParticipant) {
  let result = "";
  payloadParticipant.map((participant, idx) => {
    return (result += `<tr>
                     <td>${idx + 1}</td>
                     <td>${participant.name}</td>
                     <td>${participant.gender}</td>
                     <td>${participant.age}</td>
                     <td>${participant.profile.title}</td>
                     <td>${changeDateformStr(participant.createdAt)}</td>
                     <td class="text-nowrap">
                       <a
                         href="result.html?id=${participant?.id}"
                         class="btn btn-sm btn-outline-primary"
                         >View</a
                       >
                       <button
                         type="button"
                         class="btn btn-sm btn-outline-danger" 
                         data-id="${participant.id}" 
                       >
                         Delete
                       </button>
                     </td>
                   </tr>`);
  });
  return result;
}

function changeDateformStr(date) {
  let newDate = new Date(date);

  return newDate.toLocaleDateString("id-ID");
  // let year = newDate.getFullYear();
  // let tanggel = newDate.getDate();
  // let month = newDate.getMonth();
  // result = `${tanggel}-${month}-${year}`;
  // return result;
}
// render button delete setelah tabel dibuat
function renderButtonDelete() {
  document.addEventListener("click", function (e) {
    if (e.target.matches("[data-id]")) {
      const id = e.target.dataset.id;
      services.alert.confirmDelete().then((result) => {
        if (result.isConfirmed) {
          getParticipantId(id);
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
    }
  });
}
// exesuksi untuk menghapus data berdasarkan id
function getParticipantId(id) {
  services.participant.deleteById(id);
  dataTabelParticipant = services.participant.getAll();
  renderDataTabel();
  // return window.location.reload();
}

// panggil / jalankan fungsi
renderTotalDataTabelParticipant();
renderDataTabel();
renderButtonDelete();
saveDummyParticipants();
