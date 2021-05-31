// fungsi untuk pengganti page
function slide(value) {
  if (value == "True") {
    document.getElementById("page1").style.display = "none";
    document.getElementById("page2").style.display = "block";
  } else {
    document.getElementById("page1").style.display = "none";
    document.getElementById("page2").style.display = "none";
    document.getElementById("page3").style.display = "block";
  }
}

// fungsi untuk layanan bantuan JS KHARISMA JANGAN DIHAPUS
function bantuan(value) {
  if (value == "True") {
    document.getElementById("yes").style.display = "none";
    document.getElementById("servis").style.display = "none";
    document.getElementById("no").style.display = "block";
  } else {
    document.getElementById("no").style.display = "none";
    document.getElementById("servis").style.display = "none";
    document.getElementById("yes").style.display = "block";
  }
}

// fungsi notif untuk klik kategori jika saldo 0
var not = document.getElementById("kategori");
not.addEventListener("click", function () {
  if (saldo == 0) {
    Swal.fire("Saldo Anda Rp. 0, Mohon Isi Saldo Terlebih Dahulu", "", "warning");
  }
});
