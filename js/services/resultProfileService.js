services.resultProfile = {
  PURE_PROFILE_THRESHOLD: 5,
  resolveProfileKey: function (line3) {
    let sorted = getLine3Ranking(line3);
    if (!sorted.length) return "C";
    let topCode = sorted[0][0],
      topValue = sorted[0][1];
    let secondCode = sorted[1] ? sorted[1][0] : topCode;
    let secondValue = sorted[1] ? sorted[1][1] : topValue;
    return topValue - secondValue >= this.PURE_PROFILE_THRESHOLD
      ? topCode
      : topCode + secondCode;
  },
  resolve: function (line3) {
    let key = this.resolveProfileKey(line3);
    return data.profiles[key] || data.profiles.C;
  },
  buildReason: function (line3, profile) {
    let meanings = {
      D: "ketegasan, dorongan mengambil kendali, dan orientasi hasil",
      I: "antusiasme, pengaruh sosial, dan kemudahan membangun relasi",
      S: "kestabilan, kesabaran, dan kecenderungan menjaga harmoni",
      C: "ketelitian, akurasi, dan kecenderungan bekerja secara sistematis",
    };
    let sorted = getLine3Ranking(line3);
    if (!sorted.length) {
      return "Belum ada data score.";
    }
    let topCode = sorted[0][0],
      topValue = sorted[0][1];
    let secondCode = sorted[1] ? sorted[1][0] : topCode;
    let secondValue = sorted[1] ? sorted[1][1] : topValue;

    if (topValue - secondValue >= this.PURE_PROFILE_THRESHOLD) {
      return (
        "Profile kamu adalah " +
        profile.title +
        " karena skor tertinggi ada pada " +
        topCode +
        " (" +
        topValue +
        ") dan selisihnya cukup jauh dari skor kedua " +
        secondCode +
        " (" +
        secondValue +
        ")."
      );
    }
    return (
      "Profile kamu adalah " +
      profile.title +
      " karena skor tertinggi ada pada " +
      topCode +
      " (" +
      topValue +
      ") dan didukung oleh " +
      secondCode +
      " (" +
      secondValue +
      "), yaitu perpaduan antara " +
      meanings[topCode] +
      " dengan " +
      meanings[secondCode] +
      "."
    );
  },
};

function getLine3Ranking(line3) {
  let result = [];

  for (let key in line3) {
    result.push([key, line3[key]]);
  }

  result.sort(function (a, b) {
    return b[1] - a[1];
  });

  return result;
}
