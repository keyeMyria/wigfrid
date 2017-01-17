import {Component, ViewChild, Input} from "@angular/core";
import {FlexGridComponent} from "../../../../clarity-angular/wigfrid/components/FlexGrid/Grid/FlexGridComponent";
@Component(
    {
        moduleId: module.id,
        selector: 'app',
        template: `
        <h6>This is FlexGrid Directive</h6>
        <p>单击列左右边框,自动改变列宽. 单击上下行边框,自动改变行高</p>
        <ar-flex-grid keyboard 
        [autoGenerateColumns]="false"
        [style.height.px]="300" 
        [itemsSource]="data" 
        [selectionMode]="_selectionMode">
            <columns>
                <column label="ID" width="40*" binding="id" name="index">
                     <!--define ColumnHeaderTemplate -->
                    <template HeaderTemplate let-header>
                        <div style="background-color: #adff2f; width: 50px; height:30px; background-image: url(https://dummyimage.com/50x30/9fbcc7/000000.png);">
                        {{header.column.name}}
                        </div>
                    </template>
                    <template CellTemplate let-cellTemplate let-cell="cell">
                        <div 
                        style="background-color: #daa520; width:100px; height:50px; background-image: url(https://dummyimage.com/100x50/9fbcc7/000000.png);"
                        [style.textAlign]= "cell.column.getAlignment()">{{cell.content}}</div>
                    </template>
                    <template CellEditingTemplate let-cellEditTemplate let-cell="cell">
                        <input [(ngModel)]="cell.data" />
                    </template>
                </column>
                <column label="Type" width="100px" [binding]="'country'" name="country">
                    <template HeaderTemplate let-header>
                        <div style="background-color: #adff2f">
                        {{header.column.name}}
                        </div>
                    </template>
                    
                    <template CellTemplate let-cellTemplate let-cell="cell">
                        <div 
                        style="background-color: #da5075"
                        [style.textAlign]= "cell.column.getAlignment()">{{cell.content}}</div>
                    </template>
                </column>
                <!--<column label="Salesperson" width="100px"></column>-->
                <!--<column label="Sales" ></column>-->
            </columns>
            <!--<template HeaderTemplate></template>-->
            
        </ar-flex-grid>
       `,

    }
)
export class AutoResizeWigfridGridDemo {
    @Input()
    public get frozenColumns() {
        return this._frozenColumns;
    }

    public set frozenColumns(value) {
        this._frozenColumns          = value;
        this._flexGrid.frozenColumns = value;
    }

    @Input()
    public get frozenRows() {
        return this._frozenRows;
    }

    public set frozenRows(value) {
        this._frozenRows          = value;
        this._flexGrid.frozenRows = value;
    }

    @ViewChild(FlexGridComponent)
    public _flexGrid;
    @ViewChild('flexGrid2')
    public _flexGrid2;
    public data;
    private comboBoxData;
    public _selectionMode;

    private _frozenRows;
    private _frozenColumns;

    constructor() {
    }

    ngAfterViewInit() {
        const countries = 'US,Germany,UK,Japan,Italy,Greece'.split(',');
        const data      = [];
        for (let i = 0; i < 100; i++) {
            data.push(
                {
                    id: i,
                    country: countries[i % countries.length],
                    date: new Date(2014, i % 12, i % 28),
                    amount: Math.random() * 10000,
                    active: i % 4 === 0
                }
            );
        }
        this.data         = data;
        this.comboBoxData = [
            "None",
            "Cell",
            "CellRange",
            "Row",
            "RowRange",
            "ListBox",
        ];
        //   this._flexGrid.itemsSource = this.data;
        //   // this._flexGrid2.itemsSource = this.data;
    }

    changeData(value) {
        try {
            let json = JSON.parse(value);
            if (json) {
                this.data = json;
            }
        } catch (e) {
            console.log(e);
        }
    }

    selectionMode($event) {
        this._selectionMode = $event.selectedValue;
    }
}
