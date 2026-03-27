document.addEventListener("DOMContentLoaded", function () {
  components.navbar();
  components.footer();
  //generete dummyData List Participants
  let listParticipants = generateDummyParticipants();
  console.log(listParticipants);
  console.log(listParticipants[0]);
  //create&Save dummyData to localStorage
  // saveDummyParticipants();
});
