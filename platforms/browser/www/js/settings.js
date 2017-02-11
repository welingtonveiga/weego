function serializarUsuario() {
    return {
        'nome': $('#nome').val(),
        'login': $('#login').val(),
        'email': $('#email').val()
    };
}

function deserializarUsuario(usuario) {
    $('#nome').val(usuario.nome);
    $('#login').val(usuario.login);
    $('#email').val(usuario.email);
}


document.addEventListener('deviceready', function() {

    $('#save').on('click', function() {

        var sucesso = function(){
            window.location = 'index.html?toast=SETTINGS_SAVED';
        };

        var falha = function(erros){
            Materialize.toast("Sinto muito... erro salvar preferências.", 1500);
        };

        saveUser(serializarUsuario(), sucesso, falha);               
    });

    $('#more').on('click', function() {
        var prefs = window.plugins.appPreferences;
        prefs.show (function(ok){
            console.log(ok);
        }, function(){});
    });

    getUser(deserializarUsuario, function (erros) {
        console.log('aqui', erros);
        Materialize.toast("Sinto muito... erro ao carregar preferências.", 1500);
    });

});
