import {Component} from "@angular/core";

import {TarsInputStream} from "./TarsInputStream";
import {TarsStructBase} from "./TarsStructBase";
import {JceData} from "./JceData";
import {TarsContext} from "./TarsContext";
import {isPrimitive} from "util";


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

            <div class="row">
                <div class="col-xs-12">
                    <clr-tree>
                        <clr-tree-node *ngFor="let data of root" [clrTreeNodeExpanded]="data.expanded">
                            {{data.name[0]}} : {{data.name[1]}}
                            <clr-tree-node *ngFor="let data of data.children" [clrTreeNodeExpanded]="data.expanded">
                                {{data.name}}
                                <clr-tree-node *ngFor="let data of data.children" [clrTreeNodeExpanded]="data.expanded">
                                    {{data.name}}
                                    <clr-tree-node *ngFor="let data of data.children"
                                                   [clrTreeNodeExpanded]="data.expanded">
                                        {{data.name[0]}} : {{data.name[1]}}
                                    </clr-tree-node>
                                </clr-tree-node>
                            </clr-tree-node>
                        </clr-tree-node>
                    </clr-tree>
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

    private root: any = [];

    public decodeMe() {

        let tarsInputStream = TarsInputStream.fromHexString(this.jceData.replace(/\s+/g, ''));
        let jce             = new TarsContext();

        jce.setField('iVersion', tarsInputStream.read(1, true));
        jce.setField('cPacketType', tarsInputStream.read(2, true));
        jce.setField('iMessageType', tarsInputStream.read(3, true));
        jce.setField('iRequestId', tarsInputStream.read(4, true));
        jce.setField('sServantName', tarsInputStream.read(5, true));
        jce.setField('sFuncName', tarsInputStream.read(6, true));
        jce.setField('sBuffer', this.tryParse(tarsInputStream.read(7, true)));
        jce.setField('iTimeout', tarsInputStream.read(8, true));
        jce.setField('context', tarsInputStream.read(9, true));
        jce.setField('status', tarsInputStream.read(10, true));

        console.log(this.root);
        this.root = this.handleContext(jce)
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

        return context;
    }

    private handleContext(context: TarsContext) {
        let func = (map) => {
            let rst = [];
            map.forEach((mValue, mKey) => {

                if (isPrimitive(mKey)) {
                    if (mValue instanceof TarsContext) {
                        rst.push({
                            name: [mKey],
                            expanded: true,
                            children: this.handleContext(mValue)
                        })
                    } else if (mValue instanceof Map) {
                        if (mValue.size > 0) {
                            rst.push({
                                name: [`${mKey}`],
                                expanded: true,
                                children: func(mValue)
                            });
                        } else {
                            rst.push({
                                name: [`${mKey}`, `Map count 0`],
                                expanded: true,
                                children: []
                            });
                        }
                    } else {
                        rst.push({
                            name: [`${mKey}`, `${mValue}`],
                            expanded: false,
                            children: []
                        })
                    }
                } else if (mKey instanceof TarsContext) {
                    if (mValue instanceof TarsContext) {
                        rst.push({
                            name: ['Map key and value both '],
                            expanded: true,
                            children: [
                                this.handleContext(mKey),
                                this.handleContext(mValue),
                            ]
                        })
                    } else {
                        rst.push({
                            name: ['Map key and value both'],
                            expanded: false,
                            children: [
                                this.handleContext(mKey),
                                mValue
                            ]
                        })
                    }
                }
            });
            return rst;
        };

        return func(context.fieldMap);
    }
}
