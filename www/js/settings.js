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

    getUser(function(usuario){
        deserializarUsuario(usuario)
        getAvatar(usuario.login, function(avatar){
            $('#avatar').attr('src', avatar); 
        });
    }, function (erros) {
        Materialize.toast("Sinto muito... erro ao carregar preferências.", 1500);
    });

    $('#upload').on('click', function () {

        var sucesso = function(image) {
            $('#avatar').attr('src', image);

            uploadAvatar($('#login').val(), image, function (){
                Materialize.toast("Avatar alterado com sucesso!", 1500);
            }, function (){
                Materialize.toast("Erro ao enviar avatar...", 1500);
            })
        };

        var falha = function(){
            Materialize.toast("Erro ao tentar acionar câmera do dispositivo", 1500);
        };

        navigator.camera.getPicture(sucesso, falha, {
            quality: 75,
            destinationType: navigator.camera.DestinationType.FILE_URI,
            correctOrientation: true,
            targetWidth:200
        }); 

        return false;
    });

});
