
const serviceUrl = 'http://service-api.herokuapp.com';
const mensagensUrl = serviceUrl+'/mensagens';
const uploadUrl = serviceUrl+'/uploads/';
const avatarUrl = serviceUrl+'/public/';

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

function parseNomeLocalizacao(place) {
    var location = [];
    console.log(place);
    for (var i = 0; i < place.address_components.length; i++)
    {
        var component = place.address_components[i];
        switch(component.types[0])
        {
            case 'locality':
                location.push(component.long_name);
                break;
            case 'administrative_area_level_1':
                location.push(component.long_name);
                break;
            case 'country':
                location.push(component.long_name);
                break;
        }
    };

    if (location.length==0) {
        location = 'Desconhecido';
    } else {
        location = location.join(", ");
    }

    return location;
}


function getNomeLocalizacao(posicao, sucesso, falha) {
     var geocode = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' 
            + posicao.latitude + '%2C' + posicao.longitude 
            + '&language=pt-BR';

    $.ajax({
        url: geocode,
        type: 'get',
        dataType: 'json',
        success: function(data){
            sucesso(parseNomeLocalizacao(data.results[0]));
        },
        error: function(erro){
            falha(erro);
        }
    });
}

function getLocalizacao(sucesso, falha){
    navigator.geolocation.getCurrentPosition(sucesso, falha);
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


