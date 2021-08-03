class Sockets {

    constructor(io) {
        this.io = io;

        this.socketEvents();
    }

    socketEvents() {
        this.io.on('connection', client => {

         client.on('msj-input-server', (data) => {
                         console.log(data)
                         this.io.emit('msj-output-client', data);
                     })

                     client.on('refrescar', () => {
                         this.io.emit('clear');
                     })

                     client.on('quedo', ()=>{
                         this.players.push(client)
                         if(this.player%2==1){
                             client.emit('SEGUNDO', this.players[this.player-1].id)
                             this.players[this.player-1].emit('PRIMERO', client.id)
                         }
                         console.log("Cliente actual: "+this.player+"  "+client.id)
                         this.player++
                     })

                     client.emit('connection', 'EXITOSA CONEXION')

        });
    }

}


module.exports = Sockets;