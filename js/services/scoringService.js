services.scoring = {
  createLineTemplate: function (withStar) {
    return withStar
      ? { D: 0, I: 0, S: 0, C: 0, "*": 0, total: 0 }
      : { D: 0, I: 0, S: 0, C: 0 };
  },
  calculate: function (answers) {
    let line1 = this.createLineTemplate(true);
    let line2 = this.createLineTemplate(true);
    let questions = data.questions || [];

    for (let i = 0; i < answers.length; i++) {
      let answer = answers[i];
      let question = null;
      for (let j = 0; j < questions.length; j++) {
        if (questions[j].id === answer.questionId) {
          question = questions[j];
          break;
        }
      }
      if (!question) continue;

      let mostCode = question.mapping.most[answer.mostChoice];
      let leastCode = question.mapping.least[answer.leastChoice];
      answer.mostCode = mostCode;
      answer.leastCode = leastCode;

      if (mostCode) {
        line1[mostCode] += 1;
        line1.total += 1;
      }
      if (leastCode) {
        line2[leastCode] += 1;
        line2.total += 1;
      }
    }

    return {
      line1: line1,
      line2: line2,
      line3: {
        D: line1.D - line2.D,
        I: line1.I - line2.I,
        S: line1.S - line2.S,
        C: line1.C - line2.C,
      },
    };
  },
};
