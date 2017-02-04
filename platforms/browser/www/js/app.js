
const mensagensUrl = 'http://service-api.herokuapp.com/mensagens';

// Inicializa todos os componentes do template.
$(function(){
    $(".dropdown-button").dropdown();
    $(".button-collapse").sideNav();
    $('ul.tabs').tabs();
        
    $('#loading').modal({
      dismissible: false
    });

     Materialize.updateTextFields();

     const url = new URL(location);
     const params = new URLSearchParams(url.search);
     if (params.has("toast")) {
        Materialize.toast(params.get("toast"), 1500);
     }

});


function showLoader() {   
    $('#loading').modal("open");
}

function hideLoader() {
    $('#loading').modal("close");
}

// Mensagens

function montarMensagem() {
    return {
        "mensagem": $('#mensagem').val(),
        "autor": {
            "login": "welingtonveiga",
            "nome": "Welington Veiga"
        },
        "dataCriacao": new Date(),
        "local": null
    };
}

function enviarMensagem (mensagem, sucesso, falha) {
    $.ajax({
        url: mensagensUrl,
        type: 'post',
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        success: sucesso,
        error: falha,
        data: JSON.stringify(mensagem)
    });
}


$(function(){

   $("#mensagem").on("input", function () {
       console.log("Aqui!")
       var txt = $(this).val();
       if (txt.length > 0 && txt.length <= 140) {
           $('#enviar').removeClass('disabled');
       } else {
           $('#enviar').addClass('disabled');
       }
   });  

   $('#formmensagem').on('submit',function(){
        
       $('#loading').modal('open');
       var sucesso = function(){
            var params = new URLSearchParams("toast=Mensagem enviada com sucesso!");
            window.location = '/index.html?'+ params.toString();
       };

       var falha = function(){
            Materialize.toast("Sinto muito... erro ao enviar mensagem.", 1500);
           $('#loading').modal("close");
       };

       enviarMensagem(montarMensagem(), sucesso, falha);
       return false;
   });   
});