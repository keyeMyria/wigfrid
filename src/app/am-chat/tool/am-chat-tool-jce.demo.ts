import {Component} from "@angular/core";

import {Buffer} from "buffer";

import {HeadData, TarsInputStream} from "./TarsInputStream";
import {TarsStructBase} from "./TarsStructBase";
import {JceData} from "./JceData";
import {forEach} from "@angular/router/src/utils/collection";
import {isArray, isObject, isPrimitive} from "util";
import {TarsContext} from "./TarsContext";


@Component({
    selector: 'am-chat-tool-jce',
    template: `
        <form>
            <div class="form-group row">
                <div class="col-lg-2 col-md-12 col-sm-12 col-xs-12">
                    <label>十六进制数据</label>
                </div>
                <div class="col-lg-10 col-md-12 col-sm-12 col-xs-12">
                    <textarea name="jce" style="font-family: monospace" [(ngModel)]="jceData"></textarea>
                </div>
            </div>
            <button class="btn btn-primary" (click)="decodeMe()">给我解</button>

            <div [innerHtml]="result">

            </div>

            <div class="row">
                <div class="col-xs-12">
                    <clr-tree-node *ngFor="let directory of rootDirectory" [clrTreeNodeExpanded]="directory.expanded">
                        <clr-icon [attr.shape]="directory.icon"></clr-icon>
                        {{directory.name}}
                        <clr-tree-node *ngFor="let file of directory.files">
                            <button
                                (click)="openFile(directory.name, file.name)"
                                class="clr-treenode-link"
                                [class.active]="file.active">
                                <clr-icon [attr.shape]="file.icon"></clr-icon>
                                {{file.name}}
                            </button>
                        </clr-tree-node>
                    </clr-tree-node>
                </div>
            </div>
        </form>
    `
})
export class AmChatToolJceDemo {

    public jceData = `10 03 2C 3C 41 27 15 56 29 6D 71 71 2E 49 4D 53
65 72 76 69 63 65 2E 46 72 69 65 6E 64 4C 69 73
74 53 65 72 76 69 63 65 53 65 72 76 61 6E 74 4F
62 6A 66 11 47 65 74 54 72 6F 6F 70 4C 69 73 74
52 65 71 56 32 7D 00 00 2A 08 00 01 06 11 47 65
74 54 72 6F 6F 70 4C 69 73 74 52 65 71 56 32 1D
00 00 10 0A 03 00 00 00 00 B6 80 11 1C 1C 40 01
50 05 0B 8C 98 0C A8 0C 
`;

    public result = "<b>sfsdf</b>";
    private root: any[];

    public decodeMe() {

        let tarsInputStream = TarsInputStream.fromHexString(this.jceData.replace(/\s+/g, ''));
        let jce             = new JceData();

        jce.iVersion     = tarsInputStream.read(1, true);
        jce.cPacketType  = tarsInputStream.read(2, true);
        jce.iMessageType = tarsInputStream.read(3, true);
        jce.iRequestId   = tarsInputStream.read(4, true);
        jce.sServantName = tarsInputStream.read(5, true);
        jce.sFuncName    = tarsInputStream.read(6, true);
        jce.sBuffer      = tarsInputStream.read(7, true);
        jce.iTimeout     = tarsInputStream.read(8, true);
        jce.context      = tarsInputStream.read(9, true);
        jce.status       = tarsInputStream.read(10, true);

        console.log(jce);

        this.tryParse(jce.sBuffer)
    }

    private dataMap: Map<number, string> = new Map(
        [
            [TarsStructBase.BYTE, 'BYTE'],
            [TarsStructBase.SHORT, 'SHORT'],
            [TarsStructBase.INT, 'INT'],
            [TarsStructBase.LONG, 'LONG'],
            [TarsStructBase.FLOAT, 'FLOAT'],
            [TarsStructBase.DOUBLE, 'DOUBLE'],
            [TarsStructBase.STRING1, 'STRING1'],
            [TarsStructBase.STRING4, 'STRING4'],
            [TarsStructBase.MAP, 'MAP'],
            [TarsStructBase.LIST, 'LIST'],
            [TarsStructBase.STRUCT_BEGIN, 'STRUCT_BEGIN'],
            [TarsStructBase.STRUCT_END, 'STRUCT_END'],
            [TarsStructBase.ZERO_TAG, 'ZERO_TAG'],
            [TarsStructBase.SIMPLE_LIST, 'SIMPLE_LIST'],
        ]
    );

    private tryParse(buffer) {

        let tarsInputStream = TarsInputStream.fromBuffer(buffer);

        let tars    = new TarsStructBase();
        let context = new TarsContext();
        tars.readFrom(tarsInputStream, context);

        // console.log(context);

    }
}
