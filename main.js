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
    document.getElementById('budget').value = "";
    
    
    // Fungsi Untuk menfilter menu dengan budget
    var prices = document.querySelectorAll('.harga');
    prices.forEach(function(price){
      console.log(price)
      var harga = parseInt(price.textContent.split('.').join(''));
      if(harga <= saldo){
        price.parentNode.parentNode.parentNode.style.display = 'block';
      }
      else{
        price.parentNode.parentNode.parentNode.style.display = 'none';
      };
    });
});

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

// warning jika saldo tidak cukup
function jumlah_porsi(id,nilai,tombol,warning){
  var total = 0;
  var prices = document.querySelectorAll('.harga');
  var btn2 = document.getElementById(tombol);
  var harga = parseInt(document.getElementById(id).innerHTML.split('.').join(''));
  var hasil = nilai*harga;
  total += hasil;
  console.log('Total = ',total,'Saldo = ',saldo);
  if(total>saldo){
    console.log('if')
    document.getElementById(tombol).disabled = true;
    document.getElementById(warning).style.color = 'red';
  }
  else{
    console.log('else')
    document.getElementById(tombol).disabled = false;
    document.getElementById(warning).style.color = 'white';
  };

  // Fungsi filter jika saldo berkurang
  btn2.addEventListener('click',function filter(){
      prices.forEach(function(price){
          var harga = parseInt(price.textContent.split('.').join(''));
          if(harga <= saldo){
            price.parentNode.parentNode.parentNode.style.display = 'block';
          }
          else{
              price.parentNode.parentNode.parentNode.style.display = 'none';
          };
      });
  });
};


// Fungsi untuk inputan Pop Up porsi
var database = {}
function porsi(data){
  var total = 0
  var inputan = document.querySelectorAll('.porsi');
  if(data != 'batal'){
    var harga = parseInt(document.getElementById(data).innerHTML.split('.').join(''));
    inputan.forEach(function(value){
      if(value.value != 0){
      console.log(value.value)
      var hasil = harga * value.value;
      total += hasil;
      if(data in database && saldo>=harga){
        database[data][0] += parseInt(value.value);
        database[data][1] += parseInt(total);
        saldo -= total;
        var rubah = saldo.toString().split('').reverse().join('');
        var hasil = rubah.match(/\d{1,3}/g);
        hasil = hasil.join('.').split('').reverse().join(''); 
        document.getElementById('jumlah_saldo').innerHTML = 'Saldo : Rp. '+hasil;
        value.value = ''
      }
      else{
        if(saldo>=harga){
          database[data] = [parseInt(value.value),total];
          saldo -= total;
          var rubah = saldo.toString().split('').reverse().join('');
          var hasil = rubah.match(/\d{1,3}/g);
          hasil = hasil.join('.').split('').reverse().join('');
          document.getElementById('jumlah_saldo').innerHTML = 'Saldo : Rp. '+hasil;
          value.value = '';
        }
      }
    };
  });
}
  else{
    inputan.forEach(function(value){
      value.value = '';
    });
  };
  console.log(database);
};


// fungsi untuk pengganti page
function slide(value){
  if(value == "True"){
  document.getElementById('page1').style.display = 'none'
  document.getElementById('page2').style.display = 'block'
}
else{
    document.getElementById('page1').style.display = 'none'
    document.getElementById('page2').style.display = 'none'
    document.getElementById('page3').style.display = 'block'

  }
}
