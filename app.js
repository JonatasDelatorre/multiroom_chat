/* importar as configurações do servidor*/
var app = require('./config/server');

/*parametrizar a porta de escuta */
var server = app.listen(80, function(){
    console.log('Servidor online');
})

var io = require('socket.io').listen(server);

app.set('io', io);

/* criar a conexão por websocket */
io.on('connection', function(socket){

    console.log('usuario conectado');
    socket.on('disconnect', function(){
        console.log('usuario desconectado');
    });

    /* dialogo */
    socket.on('msgParaServidor', function(data){
        socket.emit(
            'msgParaCliente', 
            {apelido: data.apelido, mensagem: data.mensagem}
        );

        socket.broadcast.emit(
            'msgParaCliente', 
            {apelido: data.apelido, mensagem: data.mensagem}
        );

    /* participantes */
        socket.emit(
            'participantesParaCliente', 
            {apelido: data.apelido}
        );

        socket.broadcast.emit(
            'participantesParaCliente', 
            {apelido: data.apelido}
        );


    });
});