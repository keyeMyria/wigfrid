import {Component} from "@angular/core";
import {ListBoxItemDirective} from "../../ListBox/ListBoxItemDirective";
import {CORE_DIRECTIVES} from "@angular/common";
import {Input} from "@angular/core";
import {CalendarDirective} from "../CalendarDirective";

@Component(
    {
        selector  : 'app',
        template  : `
        <h4>This is Calendar Directive</h4>
        <arCalendar>
            <!--<template><div>{{item}}</div></template>-->
            <template #item><div class="wj-listbox-item">{{item}}</div></template>
            <!--<arListBoxItemTemplate></arListBoxItemTemplate>-->
        </arCalendar>
       <!-- <ul>
              <template ngFor #hero [ngForOf]="heroes">
              <li>
                {{ hero }}
              </li>
              </template>
        </ul>-->
        `,
        directives: [CalendarDirective, CORE_DIRECTIVES]
    }
)
export class AppComponent {

}