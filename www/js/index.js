
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
        .replace('{{data}}', mensagem.dataCriacao);
}


function adicionaMensagem(container, mensagem) {
    $(container+' .tweets-container').append(montaTemplate(mensagem));
}

function exibirMensagens(container) {
    $('#loading').modal("open");

    var sucesso = function (data) {        
        $.each(data, function(i, mensagem) {
            adicionaMensagem(container, mensagem);
        });
         $('#loading').modal("close");
    };

    var falha = function(){
        Materialize.toast("Sinto muito... erro ao enviar mensagem.", 1500);
        $('#loading').modal("close");
    };

    var operacao = containers[container];
    operacao(sucesso, falha);
}


$(function(){
    
    exibirMensagens('#todas');
    
    $('.aba').on('click', function(){
       exibirMensagens($(this).attr('href'));
    })
});