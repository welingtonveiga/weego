




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
            window.location = 'index.html?toast=MESSAGE_SENT';
       };

       var falha = function(){
          Materialize.toast("Sinto muito... erro ao enviar mensagem.", 1500);
           $('#loading').modal("close");
       };

       var mensagem = $('#mensagem').val();
       
       var local = null; 

       getUser(function(usuario){
            enviarMensagem(montarMensagem(mensagem, usuario, local), sucesso, falha);   
       }, falha);
       
       return false;
   });   
});