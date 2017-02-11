

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