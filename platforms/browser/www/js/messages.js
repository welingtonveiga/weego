function montarMensagem(mensagem, usuario, local) {
    return {
        "mensagem": mensagem,
        "autor": usuario,
        "dataCriacao": new Date(),
        "local": local
    };
}

function enviarMensagem (mensagem, sucesso, falha) {
    $.ajax({
        url: mensagensUrl,
        type: 'post',
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        success: sucesso,
        error: falha,
        data: JSON.stringify(mensagem)
    });
}

function carregarMensagens(filtros, sucesso, falha) {

    var query = '';
    $.each(filtros, function(i, filtro){
        query+= '&'+filtro.nome+'='+filtro.valor;
    });

    $.ajax({
        url: mensagensUrl+'?&_sort=dataCriacao&_order=DESC'+query,
        type: 'get',
        dataType: 'json',
        success: sucesso,
        error: falha
    });
}

function carregarTodasAsMensagens(sucesso, falha) {
   return carregarMensagens([], sucesso, falha);
}

function carregarMensagensEnviadas(sucesso, falha) {
    getUser(function(usuario){
        return carregarMensagens([{nome:'autor.login', valor: usuario.login}], sucesso, falha);
    }, falha);    
}

function messageToggleLike(mensagem) {
    console.log(mensagem);
}