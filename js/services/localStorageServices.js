services.storage = {
  get: function (key, fallback) {
    try {
      let raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback === undefined ? null : fallback;
    } catch (e) {
      return fallback === undefined ? null : fallback;
    }
  },
  set: function (key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },
  remove: function (key) {
    localStorage.removeItem(key);
  },
};
