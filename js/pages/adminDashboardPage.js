document.addEventListener("DOMContentLoaded", function () {
  components.navbar();
  components.footer();
  //generete dummyData List Participants
  let listParticipants = generateDummyParticipants();
  // console.log(listParticipants);
  // console.log(listParticipants[0]);

  //create&Save dummyData to localStorage
  // saveDummyParticipants();

  let data = services.participant.getAll();

  // tampilin total data
  document.getElementById("totalData").innerHTML = `Total data: ${data.length}`;

  console.log(data);
  if (data.length > 0) {
    document.getElementById("participantTable").innerHTML =
      `              <table class="table align-middle mb-0">
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
                  ${bindTable(data)}
                </tbody>
              </table>
`;
  }
});

function checkParticipant(){
  
}

document.addEventListener("click", deleteButton(id));

function bindTable(data) {
  let result = "";
  for (let i = 0; i < data.length; i++) {
    const participant = data[i];

    // console.log(participant);

    const isoDate = participant.createdAt;
    const dateObj = new Date(isoDate);
    const newDate = dateObj;

    // Format: M/D/YYYY (numeric month, day, and 4-digit year)
    const dateFormatOptions = {
      year: "numeric",
      month: "numeric",
      day: "string",
      hour: 2 - digit,
      minute: 2 - digit,
    };

    const newFormattedDate = new Intl.DateTimeFormat(
      "en-US",
      dateFormatOptions,
    ).format(eventDate);

    result += `<tr>
                    <td>${i + 1}</td>
                    <td>${participant.name}</td>
                    <td>${participant.gender}</td>
                    <td>${participant.age}</td>
                    <td>${participant.profile.title}</td>
                    <td>${newFormattedDate}</td>
                    <td class="text-nowrap">
                      <a
                        href="result.html?id=${participant.id}"
                        class="btn btn-sm btn-outline-primary"
                        >View</a
                      >
                      <button
                        type="button"
                        class="btn btn-sm btn-outline-danger"
                        data-delete-id="${participant.id}"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>`;
  }
  return result;
}

function deleteButton(id) {
  //get the button element using its ID

  let confirmDelete = confirm("Apakah Anda yakin akan menghapus data ini?");

  if (!confirmDelete) {
    return;
  }

  let data = services.participant.getAll();
  let filteredData = data.filter(item);
}
