import {Component, ViewChild, Input, ChangeDetectorRef} from "@angular/core";
import {FlexGridDirective} from "../../../../clarity-angular/wigfrid/components/FlexGrid/Grid/FlexGridDirective";
@Component(
    {
        moduleId: module.id,
        selector:   'app',
        template:   `
        <h4>This is FlexGrid Directive</h4>
        <div style="position:relative;width:100%;height:100%;overflow:hidden;max-width:inherit;max-height:inherit">
            <ar-flex-grid 
            [autoGenerateColumns]="false"
            [style.height.px]="300" 
            [itemsSource]="data" 
            [selectionMode]="_selectionMode"
            (scrollPositionChanged)="onScrollPositionChanged($event)"
            >
                <columns>
                    <column label="ID"      width="40*"   binding="id" name="index">
                        <template>
                            <render column cell></render>
                            <ar-flex-grid-column-filter></ar-flex-grid-column-filter>
                        </template>
                    </column>
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
        </form>
        `,
    }
)
export class SimpleWigfridGridDemo {

    @ViewChild(FlexGridDirective)
    public _flexGrid;
    public data;

    constructor(private _cdr: ChangeDetectorRef) {
    }

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
