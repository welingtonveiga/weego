

function slugfy(login){
        return login.toString().toLowerCase()
        .replace(/\s+/g, '_')           
        .replace(/[^\w\-]+/g, '')       
        .replace(/\-\-+/g, '_')         
        .replace(/^-+/, '')             
        .replace(/-+$/, ''); 
}

function saveUser(user, sucesso, falha) {
    var prefs = window.plugins.appPreferences;
    user.login = slugfy(user.login);
    prefs.store (sucesso, falha, 'user', user);
}

function getUser(sucesso, falha) {
    var prefs = window.plugins.appPreferences;
    prefs.fetch(sucesso, falha, 'user');
}

function uploadAvatar(login, imagem, sucesso, falha) {
    var _sucesso = function (r) {
        console.log("Imagem enviada com Sucesso!", r);
        sucesso(imagem);
    }

    var _falha = function (error) {
        console.log("Erro no envio da Mensagem", error);
        falha(error);
    }

    var opcoes = new FileUploadOptions();
    opcoes.fileKey = "file";
    opcoes.fileName = login;
    opcoes.mimeType = "image/jpeg";

    var ft = new FileTransfer();
    ft.upload(imagem, encodeURI(uploadUrl+login), _sucesso, _falha, opcoes);
}

function getAvatar(login, sucesso) {
    var avatar = avatarUrl+login+'.jpg';
    $.ajax({
        url: avatar,
        type:'HEAD',
        success:function(){
            sucesso(avatar);
        },
        error:function(){
            sucesso('img/cordova.png');
        }
    });
}