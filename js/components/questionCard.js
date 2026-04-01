components.questionCard = function (question, currentAnswer) {
  let rows = "";

  for (let i = 0; i < question.statements.length; i++) {
    let optionNumber = i + 1;
    let isMostChecked =
      currentAnswer && currentAnswer.mostChoice === optionNumber
        ? "checked"
        : "";

    let isLeastChecked =
      currentAnswer && currentAnswer.leastChoice === optionNumber
        ? "checked"
        : "";

    rows += `
      <tr class="statement-row">
        <td class="text-center fw-semibold">${optionNumber}</td>

        <td class="text-center">
          <input
            class="form-check-input pick-most"
            type="radio"
            name="mostChoice"
            value="${optionNumber}"
            ${isMostChecked}
          />
        </td>

        <td class="text-center">
          <input
            class="form-check-input pick-least"
            type="radio"
            name="leastChoice"
            value="${optionNumber}"
            ${isLeastChecked}
          />
        </td>

        <td class="statement-text">${question.statements[i]}</td>
      </tr>
    `;
  }

  return `
    <div class="app-card p-3 p-md-4">
      <div class="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
        <div>
          <h2 class="h5 mb-1">Soal ${question.id}</h2>
          <p class="text-muted-custom mb-0">
            Pilih satu yang paling menggambarkan diri kamu (P) dan satu yang paling tidak menggambarkan diri kamu (K).
          </p>
        </div>

        <div class="d-flex gap-2">
          <span class="badge bg-primary">P = Paling sesuai</span>
          <span class="badge text-bg-secondary">K = Kurang sesuai</span>
        </div>
      </div>

      <div class="table-responsive">
        <table class="table align-middle question-table mb-0">
          <thead>
            <tr>
              <th class="text-center" style="width: 60px;">No</th>
              <th class="text-center" style="width: 70px;">P</th>
              <th class="text-center" style="width: 70px;">K</th>
              <th>Pernyataan</th>
            </tr>
          </thead>
          <tbody>
            ${rows}
          </tbody>
        </table>
      </div>

      <div class="mt-3 small text-muted-custom">
        Catatan: pilihan P dan K tidak boleh berada pada pernyataan yang sama.
      </div>
    </div>
  `;
};
