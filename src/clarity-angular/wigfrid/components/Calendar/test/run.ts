import {bootstrap} from "@angular/platform-browser-dynamic";
import {Injectable} from "@angular/core";
import {provide} from "@angular/core";
import {ListboxComponent} from "../../ListBox/ListboxComponent";
import {Component} from "@angular/core";
import {ListBox} from "../../ListBox/ListBox";
import {ListBoxItemDirective} from "../../ListBox/ListBoxItemDirective";
import {AppComponent} from "./AppComponent";
import {DropDown} from "../../DropDown/DropDown";



//

bootstrap(
    AppComponent, [
        provide('options', {useValue: {}})
    ]
);

