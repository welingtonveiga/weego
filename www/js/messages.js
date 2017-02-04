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

function carregarMensagens(sucesso, falha) {
    $.ajax({
        url: mensagensUrl,
        type: 'get',
        dataType: 'json',
        success: sucesso,
        error: falha
    });
}
