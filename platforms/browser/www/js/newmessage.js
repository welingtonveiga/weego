


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
       
       var local = {lat: $('#lat').val(), lon:$('#lon').val()}; 

       getUser(function(usuario){
            enviarMensagem(montarMensagem(mensagem, usuario, local), sucesso, falha);   
       }, falha);
       
       return false;
   });  

   getLocalizacao(function(posicao){
       
       $('#lat').val(posicao.coords.latitude);
       $('#lon').val(posicao.coords.longitude);

       getNomeLocalizacao(posicao.coords, function(nome) {
           $('#localizacao').text(nome);
       }, function(){
           $('#localizacao').text("Desconhecido.");
       })


   }, function(erro){
       console.log("erro", erro);
   }); 
});