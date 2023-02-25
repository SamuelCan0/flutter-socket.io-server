const {io}=require('../index');

//mensajes de sokets
io.on('connection',client=>{
    console.log('Cliente Conectado');

    client.on('disconnect',()=>{ 
        console.log('Cliente Desconectado');
     });

     client.on('mensaje',function (payload) {
        console.log('Mensaje!!!',payload);
        io.emit('mensaje',{admin:'Nuevo Mensaje'});
     })
});
