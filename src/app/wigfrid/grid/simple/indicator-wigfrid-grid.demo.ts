import {Component, ViewChild, Input, ChangeDetectorRef} from "@angular/core";
import {FlexGridDirective} from "../../../../clarity-angular/wigfrid/components/FlexGrid/Grid/FlexGridDirective";
@Component(
    {
        moduleId: module.id,
        selector:   'app',
        template:   `
        <h4>This is FlexGrid Directive Drag Indicator Demo</h4>
        <form>
            <section class="form-block">
                <div class="form-group">
                    <label>Column Indicator</label>
                    <input [ngModel]="columnIndicator" [ngModelOptions]="{standalone:true}">
                </div>
            </section>
        </form>
        <div style="position:relative;width:100%;height:100%;overflow:hidden;max-width:inherit;max-height:inherit">
            <ar-flex-grid 
            [autoGenerateColumns]="false"
            [style.height.px]="300" 
            [itemsSource]="data" 
            [selectionMode]="_selectionMode"
            [deferResizing]="true"
            (scrollPositionChanged)="onScrollPositionChanged($event)"
            [columnIndicator]="columnIndicator"
            >
                <columns>
                    <column label="ID"      width="40*"   binding="id" name="index"></column>
                    <column label="Type"    width="100px" binding="country"></column>
                    <column label="amount"  width="100px" binding="amount" ></column>
                    <!--<column label="Sales" ></column>-->
                </columns>
                <!--<template HeaderTemplate></template>-->
                
            </ar-flex-grid>
        </div>
        <form>
            <section class="form-block">
                <div class="form-group">
                    <label for="">scrollPosition</label>
                    <input type="text" [ngModel]="scrollPosition?.x" [ngModelOptions]="{standalone: true}"/>
                    <input type="text" [ngModel]="scrollPosition?.y" [ngModelOptions]="{standalone: true}"/>
                </div>
            </section>
            <section class="form-block">
                <div class="form-group">
                    <label>Column Resize Indicator</label>
                    <input type="text" [ngModel]="indicatorPosition" [ngModelOptions]="{standalone: true}">
                    <button class="btn btn-sm btn-primary">hello</button>
                </div>
            </section>
        </form>
        `,
    }
)
export class IndicatorWigfridGridDemo {

    @ViewChild(FlexGridDirective)
    public _flexGrid;
    public data;

    constructor(private _cdr: ChangeDetectorRef,
    ) {
            // left: this._szRowCol.pos + sz,
            // top: 0,
            // right: '',
            // bottom: 0,
            // width: 2,
            // height: ''
    }

    indicatorPosition;

    public scrollPosition;

    onScrollPositionChanged(scrollPosition) {
        this.scrollPosition = scrollPosition;
    }

    ngAfterViewInit() {
        setTimeout(() => {
            const countries = 'US,Germany,UK,Japan,Italy,Greece'.split(',');
            const data      = [];
            for (let i = 0; i < 1000; i++) {
                data.push(
                    {
                        id:      i,
                        country: countries[i % countries.length],
                        date:    new Date(2014, i % 12, i % 28),
                        amount:  Math.random() * 10000,
                        active:  i % 4 === 0
                    }
                );
            }
            this.data         = data;
        });
        // this._cdr.detectChanges();
    }
}
