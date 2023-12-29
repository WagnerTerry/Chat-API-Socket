import express from 'express'
import { Server, createServer } from 'http'
import { Server as Io } from 'socket.io';

class App {
    public app: express.Application;
    public server: Server;
    private socketIo: Io

    constructor(){
        this.app = express();
        this.server = createServer(this.app)
        this.socketIo = new Io(this.server, {
            cors: {
                origin: '*'
            }
        });

        // escutando eventos socket.io
        this.socketIo.on('connection', socket => {
            console.log("teste de conexão socket", socket.listeners.length)

            socket.on('disconnect', () => {
                console.log("usuario desconectado")
            })

            socket.on("message", message => {
                this.socketIo.emit('message', message) // Envia pra todo mundo, inclusive o emissor
                //socket.broadcast.emit('message', message); Envia pra todo mundo, exceto o emissor
                
                console.log("mensagem", message.body)
            })
        })
    }
}

export default App;