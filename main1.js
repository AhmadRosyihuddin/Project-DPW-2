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

