
const mensagensUrl = 'http://service-api.herokuapp.com/mensagens';

const toastMessages = {
    SETTINGS_SAVED: 'Preferências atualizadas!',
    MESSAGE_SENT: 'Mensagem enviada com sucesso!'
};

function getParameter(name){
    var value = undefined;
    location.search
        .replace('?', '')
        .split('&')
        .forEach(function(part){
            if (part.indexOf(name)!=-1) {
                var parts = part.split('=');
                value = parts[1];
            }
        });
        return value;
}

function showToast() {
    var toast = getParameter('toast');
    if (toast) {
        Materialize.toast(toastMessages[toast], 1500);
    }       
}

// Inicializa todos os componentes do template.
$(function(){
    $(".dropdown-button").dropdown();
    $(".button-collapse").sideNav();
    $('ul.tabs').tabs();
        
    $('#loading').modal({
      dismissible: false
    });

    Materialize.updateTextFields();
    showToast();
});

function showLoader() {   
    $('#loading').modal("open");
}

function hideLoader() {
    $('#loading').modal("close");
}

document.addEventListener('deviceready', function() {

   
});
