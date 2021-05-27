// Fungsi filter menu dengan jenis/kategori
function menu_filter(value) {
  var identitas = document.querySelectorAll(".navbar_menu");
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
  var title = document.getElementById("develop");
  var prices = document.querySelectorAll('.harga');
  identitas.forEach(function (menu,index) {
    console.log(index)
    console.log(menu.attributes[1].nodeValue)
    console.log(value)
    var harga = parseInt(prices[index].textContent.split('.').join(''));
    if (value == "AllOfMenu" && harga <= saldo) {
      console.log('all of menu')
        document.getElementById("carouselExampleControls").style.display = "block";
        title.innerHTML = titles[value];
        menu.style.display = "block";
    }
    else if (menu.attributes[1].nodeValue == value && harga<=saldo) {
      console.log('elif')
        menu.style.display = "block";
        title.innerHTML = titles[value];
        document.getElementById("carouselExampleControls").style.display = "none";
    }
    else {
      console.log('else')
        menu.style.display = "none";
    }
  });
};
