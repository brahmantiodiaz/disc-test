const Toast = Swal.mixin({
  toast: true,
  position: "bottom-start",
  iconColor: "white",
  customClass: {
    popup: "colored-toast",
  },
  showConfirmButton: false,
  timer: 1500,
  timerProgressBar: true,
});

services.alert = {
  success: function (message) {
    return Swal.fire({
      icon: "success",
      title: "Berhasil",
      text: message,
      confirmButtonText: "OK",
    });
  },

  error: function (message) {
    return Swal.fire({
      icon: "error",
      title: "Oops",
      text: message,
      confirmButtonText: "OK",
    });
  },

  warning: function (message) {
    return Swal.fire({
      icon: "warning",
      title: "Perhatian",
      text: message,
      confirmButtonText: "OK",
    });
  },

  confirmDelete: function () {
    return Swal.fire({
      icon: "warning",
      title: "Hapus data?",
      text: "Data peserta akan dihapus permanen dari list.",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus",
      cancelButtonText: "Batal",
    });
  },

  toastSuccess: function (message) {
    return Toast.fire({
      icon: "success",
      title: message,
    });
  },

  toastError: function (message) {
    return Toast.fire({
      icon: "error",
      title: message,
    });
  },

  toastWarning: function (message) {
    return Toast.fire({
      icon: "warning",
      title: message,
    });
  },
};
