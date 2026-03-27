function generateDummyParticipants(count = 3) {
  const names = [
    "Kiragaya Banyak Gaya",
    "Budi Santoso",
    "Citra Lestari",
    "Dewi Anggraini",
    "Eko Saputra",
    "Fajar Nugroho",
    "Gilang Ramadhan",
    "Hana Maharani",
    "Indra Kurniawan",
    "Jihan Putri",
    "Tanjidor DorDor",
    "Charizar Ngantuk",
    "Sule Prikitiw",
    "Andre Tauaja",
  ];

  const genders = ["Laki-laki", "Perempuan"];

  function randomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function generateId(index) {
    return "PRT-" + Date.now() + "-" + index;
  }

  function generateAnswers() {
    let answers = [];

    for (let i = 0; i < data.questions.length; i++) {
      let question = data.questions[i];

      let mostChoice = randomNumber(1, 4);
      let leastChoice = randomNumber(1, 4);

      while (leastChoice === mostChoice) {
        leastChoice = randomNumber(1, 4);
      }

      answers.push({
        questionId: question.id,
        mostChoice: mostChoice,
        leastChoice: leastChoice,
      });
    }

    return answers;
  }

  let participants = [];

  for (let i = 0; i < count; i++) {
    let answers = generateAnswers();
    let result = services.scoring.calculate(answers);
    let profile = services.resultProfile.resolve(result.line3);
    let reason = services.resultProfile.buildReason(result.line3, profile);

    let participant = {
      id: generateId(i),
      name: randomItem(names),
      gender: randomItem(genders),
      age: randomNumber(20, 35),
      createdAt: new Date().toISOString(),
      answers: answers,
      result: result,
      profile: profile,
      reason: reason,
    };

    participants.push(participant);
  }

  return participants;
}

function saveDummyParticipants() {
  let dummyParticipants = generateDummyParticipants();

  for (let i = 0; i < dummyParticipants.length; i++) {
    services.participant.add(dummyParticipants[i]);
  }

  return dummyParticipants;
}
