const {io}=require('../index');
const Band = require('../models/band');
const Bands=require('../models/bands');

const bands=new Bands(); 

bands.addBand(new Band('Queen'));
bands.addBand(new Band('Flow'));
bands.addBand(new Band('Metalica'));
bands.addBand(new Band('Kana-Boom'));

console.log(bands);

//mensajes de sokets
io.on('connection',client=>{
    console.log('Cliente Conectado');

    client.emit('active-bands',bands.getBands());

    client.on('disconnect',()=>{ 
        console.log('Cliente Desconectado');
     });

     client.on('mensaje',function (payload) {
        console.log('Mensaje!!!',payload);
        io.emit('mensaje',{admin:'Nuevo Mensaje'});
     });

     client.on('vote-band',(payload)=>{
      bands.voteBand(payload.id);
      io.emit('active-bands',bands.getBands());
     });

     client.on('delete-band',(payload)=>{
         bands.deleteBand(payload.id);
         io.emit('active-bands',bands.getBands());
     });

     client.on('emitir-mensaje',(payload)=>{
      //io.emit('nuevo-mensaje',payload);
      //console.log(payload);
      client.broadcast.emit('nuevo-mensaje',payload);
     });

     client.on('add-band',(payload)=>{
      const newBand=new Band(payload.name);
      bands.addBand(newBand);
      io.emit('active-bands',bands.getBands());
     });
});
