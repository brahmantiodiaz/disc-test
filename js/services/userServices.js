services.user = {
  key: "user_list",

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

  add: function (user) {
    let list = this.getAll();
    list.unshift(user);
    this.saveAll(list);
  },
  update: function (user) {
    let list = this.getAll();
    let index = 0;
    for (let i = 0; i < list.length; i++) {
      if (list[i].userName === user.userName) {
        list[i] = user;
      }
    }
    console.log(list);
    this.saveAll(list);
  },
  getByUserName: function (userName) {
    let list = this.getAll();
    for (let i = 0; i < list.length; i++) {
      if (list[i].userName === userName) {
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
  encryptDecrypt: function (str, isEncrypt) {
    let shift = isEncrypt ? 3 : -3;
    let result = "";

    for (let i = 0; i < str.length; i++) {
      let char = str[i];
      let code = str.charCodeAt(i);
      if (code >= 65 && code <= 90) {
        code = ((code - 65 + shift) % 26) + 65;
        char = String.fromCharCode(code);
      } else if (code >= 97 && code <= 122) {
        code = ((code - 97 + shift) % 26) + 97;
        char = String.fromCharCode(code);
      }
      result += char;
    }
    return result;
  },
};
function caesarCipher(str, shift) {
  // Ensure the shift value is within the alphabet range
  shift = ((shift % 26) + 26) % 26;
}
