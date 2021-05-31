// fungsi untuk inputan pop up menambah saldo
var btn = document.getElementById('plus');
var saldo = 0 ;
btn.addEventListener('click',function uang(){
    var budget = document.getElementById('budget').value;
    saldo += parseInt(budget.split('Rp. ')[1].split('.').join(''))
    document.getElementById('jumlah_saldo').innerHTML = 'Saldo : Rp. '+format(saldo);
    document.getElementById('jumlah_saldo1').innerHTML = 'Saldo : Rp. '+format(saldo);
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

// Fungsi merubah angka menjadi format uang
function format(uang){
  var rubah = uang.toString().split('').reverse().join('');
  var hasil = rubah.match(/\d{1,3}/g);
  hasil = hasil.join('.').split('').reverse().join('');
  return hasil
}

var rupiah = document.getElementById("budget");
rupiah.addEventListener("keyup", function(e) {
  // tambahkan 'Rp.' pada saat form di ketik
  // gunakan fungsi formatRupiah() untuk mengubah angka yang di ketik menjadi format angka
  rupiah.value = formatRupiah(this.value, "Rp. ");
});

/* Fungsi formatRupiah */
function formatRupiah(angka, prefix) {
  var number_string = angka.replace(/[^,\d]/g, "").toString();
    var split = number_string.split(",");
    var sisa = split[0].length % 3;
    var rupiah = split[0].substr(0, sisa);
    var ribuan = split[0].substr(sisa).match(/\d{3}/gi);

  // tambahkan titik jika yang di input sudah menjadi angka ribuan
  if (ribuan) {
    var separator = sisa ? "." : "";
    rupiah += separator + ribuan.join(".");
  }

  rupiah = split[1] != undefined ? rupiah + "," + split[1] : rupiah;
  return prefix == undefined ? rupiah : rupiah ? "Rp. " + rupiah : "";
};

// Fungsi filter menu dengan jenis/kategori
var katalog = 'AllOfMenu';
var titles = {
    AllOfMenu: "MENU RESTAURANT",
    nusantara: "NUSANTARA FOOD",
    asia: "ASIAN FOOD",
    chinees: "CHINNES FOOD",
    korea: "KOREA FOOD",
    western: "WESTREN FOOD",
    arab: "ARABIC FOOD",
    laut: "SEAFOOD",
    beverage: "BEVERAGE",
};
function menu_filter(value) {
  katalog = value;
  var identitas = document.querySelectorAll(".navbar_menu");
  var title = document.getElementById("develop");
  var prices = document.querySelectorAll('.harga');
  
  identitas.forEach(function (menu,index) {
    var harga = parseInt(prices[index].textContent.split('.').join(''));
    if (value == "AllOfMenu" && harga <= saldo) {
        document.getElementById("carouselExampleControls").style.display = "block";
        title.innerHTML = titles[value];
        menu.style.display = "block";
    }
    else if (menu.attributes[1].nodeValue == value && harga<=saldo) {
        menu.style.display = "block";
        title.innerHTML = titles[value];
    }
    else {
        menu.style.display = "none";
    }
  });
};

// warning jika saldo tidak cukup
function jumlah_porsi(id,nilai,tombol,warning){
  var total = 0;
  var prices = document.querySelectorAll('.harga');
  var identitas = document.querySelectorAll(".navbar_menu");
  var title = document.getElementById("develop");
  var btn2 = document.getElementById(tombol);
  var harga = parseInt(document.getElementById(id).innerHTML.split('.').join(''));
  var hasil = nilai*harga;
  total += hasil;
  console.log('Total = ',total,'Saldo = ',saldo);
  if(total>saldo){
    document.getElementById(tombol).disabled = true;
    document.getElementById(warning).style.color = 'red';
  }
  else{
    document.getElementById(tombol).disabled = false;
    document.getElementById(warning).style.color = 'white';
  };

  // Fungsi filter jika saldo berkurang
  btn2.addEventListener('click',function filter(){
    console.log(katalog)
      identitas.forEach(function(menu,index){
        var harga = parseInt(prices[index].textContent.split('.').join(''));
        if (katalog == "AllOfMenu" && harga <= saldo) {
            document.getElementById("carouselExampleControls").style.display = "block";
            title.innerHTML = titles[katalog];
            menu.style.display = "block";
        }
        else if (menu.attributes[1].nodeValue == katalog && harga<=saldo) {
            menu.style.display = "block";
            title.innerHTML = titles[katalog];
        }
        else {
            menu.style.display = "none";
        };
      });
  });
};


// Fungsi untuk inputan Pop Up porsi Dan di masukkan ke database
var database = {}
var jumlah = 0
function porsi(data){
  var total = 0
  var inputan = document.querySelectorAll('.porsi');
  if(data != 'batal'){
    var harga = parseInt(document.getElementById(data).innerHTML.split('.').join(''));
    inputan.forEach(function(value){
      if(value.value != 0){
        var hasil = harga * value.value;
        total += hasil;
      if(data in database && saldo>=harga){
        database[data][0] += parseInt(value.value);
        database[data][1] = harga;
        database[data][2] += parseInt(total);
        saldo -= total;
        document.getElementById('jumlah_saldo').innerHTML = 'Saldo : Rp. '+format(saldo);
        document.getElementById('jumlah_saldo1').innerHTML = 'Saldo : Rp. '+format(saldo);
        value.value = '';
      } 
      else{
        if(saldo>=harga){
          database[data] = [parseInt(value.value),harga,total];
          saldo -= total;
          document.getElementById('jumlah_saldo').innerHTML = 'Saldo : Rp. '+format(saldo);
          document.getElementById('jumlah_saldo1').innerHTML = 'Saldo : Rp. '+format(saldo);
          value.value = '';
        }
      }
      };
    });
    // menghapus tabel yang ada di keranjang
    var baris = document.querySelectorAll('#row');
    baris.forEach(function(hapus){
      hapus.remove()
    })
    var ind = 0;
    jumlah = 0;
    // menambahkan tabel ke dalam keranjang
    for(let i in database){
      $('#daftar').append(
        '<tr id="row">'+
          '<td>'+i+'</td>'+
          '<td>Rp. '+format(database[i][1])+'</td>'+
          '<td>'+database[i][0]+'</td>'+
          '<td>Rp. '+format(database[i][2])+'</td>'+
          '<td><button type="button" class="btn btn-danger" id="'+ind+'" onclick="hapus(id)">HAPUS</button></td>'+
        '<tr>');
        ind += 1
        jumlah += database[i][2];
    }
    document.getElementById('total').innerHTML = 'Total = Rp. '+format(jumlah);
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

// fungsi untuk menghapus pesanan dari keranjang
function hapus(id){
  var harga = document.getElementById(id).parentNode.parentNode.childNodes[3].textContent.split('Rp. ').join('').split('.').join('');
  var menu = document.getElementById(id).parentNode.parentNode.childNodes[0].innerHTML.split(' ').join('_');
  var total = jumlah-harga;
  saldo += parseInt(harga);
  jumlah = total;
  delete database[menu]
  document.getElementById('total').innerHTML = 'Total = Rp. '+format(jumlah) ;
  document.getElementById('jumlah_saldo').innerHTML = 'Saldo : Rp. '+format(saldo);
  document.getElementById('jumlah_saldo1').innerHTML = 'Saldo : Rp. '+format(saldo);
  document.getElementById(id).parentNode.parentNode.remove();

  var prices = document.querySelectorAll('.harga');
  prices.forEach(function(price){
    var harga = parseInt(price.textContent.split('.').join(''));
    if(harga <= saldo){
      price.parentNode.parentNode.parentNode.style.display = 'block';
    }
    else{
        price.parentNode.parentNode.parentNode.style.display = 'none';
    };
  });
}

// Fungsi validasi Dan Pengambilan Data User
var data_pembeli = [];
var btn_res = document.getElementById('btn_res');
btn_res.addEventListener('click',function(){
  var nama = $('#namacus').val();
  var meja = $('#nomeja').val();
  if (nama==''||meja=='') {
    if (nama==''&& meja==''){
      Swal.fire(
      'Nama Dan Nomor Meja Tidak Boleh Kosong',
      '',
      'error'
    )
    }else if (nama=='') {
      Swal.fire(
        'Nama Tidak Boleh Kosong',
        '',
        'error'
    )
    }else{
      Swal.fire(
        'Nomor Meja Tidak Boleh Kosong',
        '',
        'error'
    )
    }
  }else{
    Swal.fire(
        'Berhasil',
        '',
        'success'
    )
    slide('false')
    data_pembeli.push(nama,meja)
    console.log(data_pembeli);
    console.log(meja);
  }
  
})


// Fungsi menampilkan struk pembayaran
var bayar = document.getElementById('bayar');
bayar.addEventListener('click',function(){
  if(Object.keys(database).length != 0){
    document.getElementById('page3').style.display = 'none';
    document.getElementById('pay').style.display = 'block';
    document.getElementById('customer').innerHTML = data_pembeli[0].toUpperCase();
    document.getElementById('mejacus').innerHTML = data_pembeli[1];
    
    for(let i in database){
      $('#pesanan').append(
        '<tr id="row">'+
          '<td>'+i+'</td>'+
          '<td><td>Rp. </td><td style="text-align: right;">'+format(database[i][1])+'</td></td>'+
          '<td><span style="color:white;">---</span>x '+database[i][0]+'<span style="color:white;">---</span></td>'+
          '<td><td>Rp. </td><td style="text-align: right;">'+format(database[i][2])+'</td></td>'+
        '<tr>');
        document.getElementById('total bayar').innerHTML = format(jumlah);
        document.getElementById('sisa uang').innerHTML = format(saldo);
    };
  }
  else{
    Swal.fire('Masukkan Pesanan Anda','','error')
  };
});


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
var not = document.getElementById('kategori');
not.addEventListener('click',function(){
  if(saldo==0){
    Swal.fire('Saldo Anda Rp. 0, Mohon Isi Saldo Terlebih Dahulu','','warning')
  }
})
