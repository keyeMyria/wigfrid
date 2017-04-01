"use strict";
var net = require('net');
var buffer_1 = require("buffer");
var WebSocket = require("ws");
//00 00 00 0d  00 00 00 0a  02 00 00 00 04
var InitSocket = (function () {
    function InitSocket(ws, s) {
        this.ws = ws;
        this.s = s;
        this.state = {
            sReady: false,
            wsReady: false,
            wsBuffer: [],
            sBuffer: []
        };
    }
    InitSocket.init = function (wsServerOptions, socketOptions) {
        var wss = new WebSocket.Server(wsServerOptions);
        wss.on('connection', function (ws) {
            console.log('Websocket Connected');
            var s = net.connect(socketOptions);
            var init = new InitSocket(ws, s);
            init.bind();
        });
    };
    InitSocket.prototype.bind = function () {
        var _this = this;
        var ws = this.ws, s = this.s;
        s.on('close', function (had_error) {
            console.log('Tcp Socket Closed');
            ws.removeAllListeners('close');
            ws.close();
        });
        ws.on('close', function () {
            console.log('Websocket Closed');
            s.removeAllListeners('close');
            s.end();
        });
        ws.on('error', function (e) {
            console.log('websocket error');
            console.log(e);
            ws.removeAllListeners('close');
            s.removeAllListeners('close');
            ws.close();
            s.end();
        });
        s.on('error', function (e) {
            console.log('socket error');
            console.log(e);
            ws.removeAllListeners('close');
            s.removeAllListeners('close');
            ws.close();
            s.end();
        });
        s.on('connect', function () {
            console.log('Tcp Socket Connected');
            _this.state.sReady = true;
            _this.flushSocketBuffer();
        });
        ws.on('open', function () {
            _this.state.wsReady = true;
            _this.flushWebsocketBuffer();
        });
        s.on('data', function (data) {
            if (!_this.state.wsReady) {
                _this.state.wsBuffer.push(data);
            }
            else {
                ws.send(data, { binary: true, mask: true });
            }
        });
        ws.on('message', function (m, flags) {
            if (!_this.state.sReady) {
                _this.state.sBuffer.push(m);
            }
            else {
                s.write(m);
            }
        });
    };
    InitSocket.prototype.flushSocketBuffer = function () {
        if (this.state.sBuffer.length > 0) {
            this.s.write(buffer_1.Buffer.concat(this.state.sBuffer));
        }
        this.state.sBuffer = [];
    };
    ;
    InitSocket.prototype.flushWebsocketBuffer = function () {
        if (this.state.wsBuffer.length > 0) {
            this.ws.send(buffer_1.Buffer.concat(this.state.wsBuffer), { binary: true, mask: true });
        }
        this.state.wsBuffer = [];
    };
    ;
    return InitSocket;
}());
InitSocket.init({ port: 1337 }, { host: "msfwifi.3g.qq.com", port: "8080" });
