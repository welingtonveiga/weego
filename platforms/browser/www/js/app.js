
// Inicializa todos os componentes do template.
$(function(){
    $(".dropdown-button").dropdown();
    $(".button-collapse").sideNav();
    $('ul.tabs').tabs();
        
    $('#loading').modal({
      dismissible: false
    });

     Materialize.updateTextFields();
});


function showLoader() {   
    $('#loading').modal("open");
}

function hideLoader() {
    $('#loading').modal("close");
}

