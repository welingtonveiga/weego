
$(function(){

   $("#mensagem").on("input", function () {
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

       var mensagem = $('#mensagem').val();
       var usuario = {
            "login": "welingtonveiga",
            "nome": "Welington Veiga"
        };
       var local = null; 

       enviarMensagem(montarMensagem(mensagem, usuario, local), sucesso, falha);
       return false;
   });   
});