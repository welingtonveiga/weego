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

function eFavorita(mensagem, callback) {

    console.log('eFavorita', mensagem);
    openDB(function(db){
         console.log('eFavorita Open!', db);
         db.transaction(function(tx) {
                tx.executeSql('SELECT id FROM mensagem where id=? limit 1', [mensagem.id],  function(transaction, result){
                callback(result.rows.length!=0);
          
       }, function(tx, error) {
                console.log('SELECT error: ' + error.message);
            });
        });
    });
}

function removeFavorita(mensagem) {     
    openDB(function(db){
         db.transaction(function(tx) {
             console.log('AquI no remove!');
            tx.executeSql('DELETE FROM mensagem where id=?', [mensagem.id], function(tx, rs) {console.log("remove!", rs);}, function(tx, error) {
                console.log('DELETE error: ' + error.message);
            });
        });
    });
}

function insereFavorita(mensagem) {
    openDB(function(db){
         db.transaction(function(tx) {
             var values = [mensagem.id, mensagem.autor.nome, mensagem.autor.login, mensagem.mensagem, mensagem.dataCriacao, null, null]; 
               tx.executeSql('INSERT INTO mensagem (id, autor_nome, autor_login, mensagem, dataCriacao, local_lat, local_lon) VALUES (? , ?, ?, ?, ?, ? ,?);', 
                values, 
                function(tx, rs) {
                   console.log('Inserido', values, rs);
                }, 
                function(tx, error) {
                    console.log('DELETE error: '+error.message);
                });      
             
        });
    });
}


function toggleFavorita(mensagem, callback) {
    eFavorita(mensagem, function(favorita){
        console.log('toggleFavorita', favorita);
        if (favorita) {
            removeFavorita(mensagem);
        } else {
            insereFavorita(mensagem);
        }
        callback(!favorita);
    });
}

function listaFavoritas(sucesso, falha) {

    openDB(function(db){
         console.log('listaFavoritas!', db);
         db.transaction(function(tx) {
            tx.executeSql('SELECT * FROM mensagem', [],  function(transaction, result){
                console.log('Aqui!!', result.rows);
               var mensagens = [];
              for(var i = 0; i < result.rows.length; i++){
                  console.log('Aqui!!', result.rows.item(i));
                mensagens.push(  {
                    "id": result.rows.item(i)[['id']],
                    "autor": {
                        "login": result.rows.item(i)[['autor_login']],
                        "nome": result.rows.item(i)[['autor_nome']]
                    },
                    "mensagem": result.rows.item(i)[['mensagem']],
                    "dataCriacao": result.rows.item(i)[['dataCriacao']],
                    "local": {
                        "lat": result.rows.item(i)[['local_lat']],
                        "lon": result.rows.item(i)[['local_lon']]
                    }
                });   
              }

              sucesso(mensagens);

          
       }, function(tx, error) {
                falha(error);
            });
        });
    });
}