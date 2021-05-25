// fungsi untuk inputan pop up menambah saldo
var btn = document.getElementById('plus');
var saldo = 0;
btn.addEventListener('click',function uang(){
    var budget = document.getElementById('budget').value;
    saldo += parseInt(budget.split('Rp. ')[1].split('.').join(''))
    var rubah = saldo.toString().split('').reverse().join('');
    var hasil = rubah.match(/\d{1,3}/g);
    hasil = hasil.join('.').split('').reverse().join('');
    document.getElementById('jumlah_saldo').innerHTML = 'Saldo : Rp. '+hasil;
    document.getElementById('budget').value = ""
});

// live membuat inputan berformat rupiah
var rupiah = document.getElementById("budget");
rupiah.addEventListener("keyup", function(e) {
  // tambahkan 'Rp.' pada saat form di ketik
  // gunakan fungsi formatRupiah() untuk mengubah angka yang di ketik menjadi format angka
  rupiah.value = formatRupiah(this.value, "Rp. ");
});

/* Fungsi formatRupiah */
function formatRupiah(angka, prefix) {
  var number_string = angka.replace(/[^,\d]/g, "").toString(),
    split = number_string.split(","),
    sisa = split[0].length % 3,
    rupiah = split[0].substr(0, sisa),
    ribuan = split[0].substr(sisa).match(/\d{3}/gi);

  // tambahkan titik jika yang di input sudah menjadi angka ribuan
  if (ribuan) {
    separator = sisa ? "." : "";
    rupiah += separator + ribuan.join(".");
  }

  rupiah = split[1] != undefined ? rupiah + "," + split[1] : rupiah;
  return prefix == undefined ? rupiah : rupiah ? "Rp. " + rupiah : "";
};

// Fungsi untuk memfilter menu dari nilai bdget
var prices = document.querySelectorAll('.harga');
btn.addEventListener('click',function filter(){
    prices.forEach(function(price){
        var harga = parseInt(price.textContent.split('.').join(''));
        if(harga <= saldo){
          price.parentNode.parentNode.parentNode.style.display = 'block';
        }
        else{
            price.parentNode.parentNode.parentNode.style.display = 'none';

        }
    });
});
