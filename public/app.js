$(document).ready(function() {


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

  //Active and desactive
  busqueda.on('change', (e) => {
      if (this.customSearch == false) {
        this.customSearch = true
        active = false;
      } else {
        active = true;
        this.customSearch = false;
        filter(active)
        $('#ciudad, #tipo').show();
      }
      $('#personalizada').toggleClass('invisible')
  })

  var filter = function (custom) {
    $.ajax({
      url: '/filter',
      data: {customizable:custom},
      type: 'POST',
      success: function (data) {
        for (var i = 0; i < data.ciudades.length; i++) {
          $('#ciudad').append(`<option value="${data.ciudades[i]}">${data.ciudades[i]}</option>`)
        }

        for (var i = 0; i < data.tipo.length; i++) {
          $('#tipo').append(`<option value="${data.tipo[i]}">${data.tipo[i]}</option>`)
        }
      },
      error: function () {
        console.log("Error al enviar los datos");
      }
    })
  }

  //Request real state
  var realState = function (custom) {
    $.ajax({
      url: '/realState',
      data: custom,
      type: 'POST',
      success: function(data){
        $('body > div.row > div.col.m8.lista > div').remove()
        for (var i = 0; i < data.length; i++) {
          $('.lista').append(
            `<div class="card horizontal">
              <div class="card-image">
                <img src="img/home.jpg">
              </div>
              <div class="card-stacked">
                <div class="card-content">
                  <div>
                    <b>${data[i].Direccion}</b><p></p>
                  </div>
                  <div>
                    <b>${data[i].Ciudad}</b><p></p>
                  </div>
                  <div>
                    <b>${data[i].Telefono}</b><p></p>
                  </div>
                  <div>
                    <b>${data[i].Codigo_Postal}</b><p></p>
                  </div>
                  <div>
                    <b>${data[i].Precio}</b><p></p>
                  </div>
                  <div>
                    <b>${data[i].Tipo}</b><p></p>
                  </div>
                </div>
                <div class="card-action right-align">
                  <a href="#">Ver más</a>
                </div>
              </div>
            </div>`
          )
        }

      },
      error: function(){
        console.log("error al enviar los datos");
      }
    });
  }

  $("#buscar").on("click", function () {
    let rango = $('#rangoPrecio').val();
    let config = {
      personalizada:active,
      ciudad:$('#ciudad').val(),
      tipo:$('#tipo').val(),
      precio: rango
    }
    realState(config);
  })

})
