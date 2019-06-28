$(document).ready(function() {

  var form_data = new FormData();

  //Inicializador del elemento Slider
  $("#rangoPrecio").ionRangeSlider({
    type: "double",
    grid: false,
    min: 0,
    max: 100000,
    from: 1000,
    to: 20000,
    prefix: "$"
  })

  let busqueda = $('#checkPersonalizada')
  let active = false;
  busqueda.on('change', (e) => {
      if (this.customSearch == false) {
        this.customSearch = true
        active = false;
      } else {
        active = true;
        this.customSearch = false
      }
      $('#personalizada').toggleClass('invisible')
  })

  let filter = function (custom) {
    $.ajax({
      url: 'http://localhost:3000/hola',
      dataType: "json",
      cache: false,
      contentType: false,
      processData: false,
      crossDomain:true,
      data: custom,
      type: 'GET',
      success: function(data){
        console.log(data);
      },
      error: function(){
        console.log("error al enviar los datos");
      }
    });
  }

  $("#buscar").on("click", function () {
    if (active === false) {
      filter({'personalizado':active})
    } else if(active === true) {
      filter({'personalizado':active})
    }
  })

})
