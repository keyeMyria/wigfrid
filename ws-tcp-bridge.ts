import {IServerOptions} from "ws";
const net = require('net');
import {Buffer} from "buffer";
import * as WebSocket from "ws";

//00 00 00 0d  00 00 00 0a  02 00 00 00 04


class InitSocket {

    protected state = {
        sReady: false,
        wsReady: false,
        wsBuffer: [],
        sBuffer: []
    };

    public constructor(protected ws, protected s){}

    public static init(wsServerOptions: IServerOptions, socketOptions) {
        let wss = new WebSocket.Server(wsServerOptions);
        wss.on('connection', (ws) => {
            console.log('Websocket Connected');
            const s = net.connect(socketOptions);
            const init = new InitSocket(ws, s);
            init.bind();
        });

    }

    private bind() {
        const ws = this.ws, s = this.s;

        s.on('close', (had_error) => {
            console.log('Tcp Socket Closed');
            ws.removeAllListeners('close');
            ws.close();
        });

        ws.on('close', () => {
            console.log('Websocket Closed');
            s.removeAllListeners('close');
            s.end();
        });

        ws.on('error', (e) => {
            console.log('websocket error');
            console.log(e);
            ws.removeAllListeners('close');
            s.removeAllListeners('close');
            ws.close();
            s.end();
        });

        s.on('error', (e) => {
            console.log('socket error');
            console.log(e);
            ws.removeAllListeners('close');
            s.removeAllListeners('close');
            ws.close();
            s.end();
        });

        s.on('connect', () => {
            console.log('Tcp Socket Connected');
            this.state.sReady = true;
            this.flushSocketBuffer();
        });

        ws.on('open', () => {
            this.state.wsReady = true;
            this.flushWebsocketBuffer();
        });

        s.on('data',  (data) =>{
            if (!this.state.wsReady) {
                this.state.wsBuffer.push(data);
            } else {
                ws.send(data, {binary: true, mask: true});
            }
        });

        ws.on('message', (m, flags) => {
            if (!this.state.sReady) {
                this.state.sBuffer.push(m);
            } else {
                s.write(m);
            }
        });
    }

    private flushSocketBuffer() {
        if (this.state.sBuffer.length > 0) {
            this.s.write(Buffer.concat(this.state.sBuffer));
        }
        this.state.sBuffer = [];
    };

    private flushWebsocketBuffer() {
        if (this.state.wsBuffer.length > 0) {
            this.ws.send(Buffer.concat(this.state.wsBuffer), {binary: true, mask: true});
        }
        this.state.wsBuffer = [];
    };

}


InitSocket.init({port: 1337}, {host: "msfwifi.3g.qq.com", port: "8080"});
