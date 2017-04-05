import {Component, EventEmitter, Input, Output} from "@angular/core";
import {Buffer} from "buffer";

@Component({
    moduleId: module.id,
    selector: "am-chat-websocket-test-tool",
    templateUrl: "./am-chat-websocket-test-tool.demo.html"
})
export class AmChatWebsocketTestToolDemo {
    private _connected;

    private _wsSocketUrl = "ws://127.0.0.1:1337";

    private ws: WebSocket;

    public format = 'hex';

    public messageInput: string = "";

    public messageOutput: string = "";

    get connected() {
        return this._connected;
    }

    set connected(value) {
        if (!this._connected && value) {
            this.connect();
        } else {
            this.disconnect();
        }
        this._connected = value;
    }

    get wsSocketUrl() {
        return this._wsSocketUrl;
    }

    set wsSocketUrl(value) {
        this._wsSocketUrl = value;
    }

    public connect() {
        this.ws = new WebSocket(this._wsSocketUrl);
        this.ws.addEventListener('open', this.onOpen.bind(this));
        this.ws.addEventListener('close', this.onClose.bind(this));
        this.ws.addEventListener('message', this.onMessage.bind(this));
        this.ws.addEventListener('error', this.onError.bind(this));
    }

    public disconnect() {
        if (this.ws) {
            this.ws.close();
        }
    }

    public onOpen(evt) {
        this.writeToScreen("CONNECTED");
    }

    public onClose(evt) {
        this._connected = false;
        this.writeToScreen("DISCONNECTED");
    }

    public onMessage(evt) {
        this.writeToScreen('<span style="color: blue;">RESPONSE: ' + evt.data + '</span>');
        this.ws.close();
    }

    public onError(evt) {
        this.writeToScreen('<span style="color: red;">ERROR:</span> ' + evt.data);
    }

    public doSend() {
        this.writeToScreen("SENT: " + this.messageInput);
        let msg = this.formatMessage(this.messageInput);
        console.log(Buffer.from(msg).toString('hex'));
        this.ws.send(msg);
    }

    private writeToScreen(message) {
        this.messageOutput += "-----------------------\n";
        this.messageOutput += message + "\n";

        console.log(message);

    }


    private formatMessage(message) {
        switch (this.format) {
            case 'hex':
                return this.handleHex(message);
            case 'encode':
                break;
            case 'base64':
                break;
        }
    }

    private handleHex(message) {
        message = message.replace(/\s/g, '');
        return this.decode(message, false);
    }

    private decode(hex, jsUnicode = true) {
        const _hex = hex.toString();
        if (jsUnicode) {
            return _hex
        }
        const result = [];
        const len    = _hex.length;
        for (let i = 0; i < len; i += 2) {
            result.push(String.fromCharCode(parseInt(_hex.substr(i, 2), 16)))
        }
        return result.join('')
    }


}
