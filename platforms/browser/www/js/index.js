
const containers = {
    '#todas':carregarTodasAsMensagens,
    '#recebidas': function(sucesso, falha){sucesso([]);},
    '#enviadas':carregarMensagensEnviadas,
    '#favoritas':function(sucesso, falha){sucesso([]);}
};

function montaTemplate(mensagem) {
    var template = $("#mensagem_template").html();
    return template.replace('{{mensagem}}', mensagem.mensagem)
        .replace('{{nome}}', mensagem.autor.nome)
        .replace('{{login}}', mensagem.autor.login)
        .replace('{{local}}', 'Desconhecido')
        .replace('{{data}}', mensagem.dataCriacao)
        .replace('{{indice}}', mensagem.indice);
}


function adicionaMensagem(container, mensagem) {
    $(container+' .tweets-container').append(montaTemplate(mensagem));
}

function exibirMensagens(container, onComplete) {
    $('#loading').modal("open");

    var sucesso = function (data) {        
        $.each(data, function(i, mensagem) {
            mensagem.indice = i;
            adicionaMensagem(container, mensagem);
        });
        $('#loading').modal("close");
        onComplete(data);
    };

    var falha = function(){
        Materialize.toast("Sinto muito... erro ao enviar mensagem.", 1500);
        $('#loading').modal("close");
    };

    var operacao = containers[container];
    operacao(sucesso, falha);
}


$(function(){
    
    var onComplete = function (mensagens) {
        $('.likebutton').on('click', function(e){
            var mensagem = mensagens[$(this).attr('ref')];
            messageToggleLike(mensagens);
        });
    };

    exibirMensagens('#todas',onComplete);
    
    $('.aba').on('click', function(){
       exibirMensagens($(this).attr('href'), onComplete);
    })
});