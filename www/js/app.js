
const mensagensUrl = 'http://service-api.herokuapp.com/mensagens';

const toastMessages = {
    SETTINGS_SAVED: 'Preferências atualizadas!',
    MESSAGE_SENT: 'Mensagem enviada com sucesso!'
};

const dbVersion = 1;

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

var db = null; 

function openDB(callback){
    if (db === null) {
        setTimeout(function(){
            openDB(callback);
        }, 1000);
    } else {
        callback(db);
    }
}

document.addEventListener('deviceready', function() {
   db = window.sqlitePlugin.openDatabase({name: 'demo.db', location: 'default'});
   db.transaction(function(tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS mensagem ('+
        'id integer PRIMARY KEY, '+
        'autor_nome text, '+
        'autor_login text, '+
        'mensagem text, '+
        'dataCriacao text, '+
        'local_lat text, '+
        'local_lon text);');
  }, function(error) {
      db = false;
      console.log('Falha na preparação do banco de dados', error.message);
  }, function() {
    console.log('Banco de dados pronto.');
  });
});
