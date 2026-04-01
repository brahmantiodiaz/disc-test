services.participant = {
  key: "disc_participants",

  getAll: function () {
    let result = localStorage.getItem(this.key);
    if (!result) {
      return [];
    }

    try {
      return JSON.parse(result);
    } catch (error) {
      return [];
    }
  },

  saveAll: function (list) {
    localStorage.setItem(this.key, JSON.stringify(list));
  },

  add: function (participant) {
    let list = this.getAll().filter(function (item) {
      return item.userName !== participant.userName;
    });
    list.unshift(participant);
    this.saveAll(list);
  },

  getById: function (id) {
    let list = this.getAll();
    for (let i = 0; i < list.length; i++) {
      if (list[i].id === id) {
        return list[i];
      }
    }
    return null;
  },
  getByUserName: function (username) {
    let list = this.getAll();
    for (let i = 0; i < list.length; i++) {
      if (list[i].userName === username) {
        return list[i];
      }
    }
    return null;
  },

  deleteById: function (id) {
    let list = this.getAll().filter(function (item) {
      return item.id !== id;
    });
    this.saveAll(list);
  },
};
