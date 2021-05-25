// filter jenis makanan

function menu_filter(value){
  var identitas = document.querySelectorAll('.navbar_menu');
  identitas.forEach(function(menu){
    if(value == 'AllOfMenu'){
      menu.style.display = 'block';
    }
    else if(menu.attributes[0].nodeValue == value){
      menu.style.display = 'block';
    }
    else{
      menu.style.display = 'none';
    }
  })
}
