import {Component, Inject, provide, forwardRef} from "@angular/core";
import { COMMON_DIRECTIVES } from "@angular/common";
import {ListboxComponent} from "../ListboxComponent";
import {ListService} from "./ListService";

import * as Mock from "mockjs";

let Mock:any = Mock;

@Component({
  selector: 'ahri-app',
  providers: [ListService],
  directives: [ListboxComponent, COMMON_DIRECTIVES],
  template: `
<h3>Simple listbox</h3>
<ar-listbox [itemsSource]="normalItem">
    <template let-item><div class="wj-listbox-item">{{item}}</div></template>
</ar-listbox>

<h3>listbox with checkbox</h3>
<ar-listbox 
  [itemsSource]="checkedItem"
  [selectedValuePath]="'customSelectedValuePath'"
  [maxHeight]="200"
>
    <template let-item>
        <div class="wj-listbox-item">
            <label><input type="checkbox" [(ngModel)]="item.customCheckedMemberPath" > {{item.customDisplayMemberPath}}</label>
        </div>
    </template>
</ar-listbox>
`
})
export class ListboxDirectiveRun {
  private items;
  private _mockData;

  constructor(@Inject(forwardRef(()=>ListService)) list:any) {
    this._mockData = Mock.mock({
      "normalItem|5-10": ['@cword(1, 5)'],
      "checkedItem|10-20": [
        {
          "customCheckedMemberPath|1": '@boolean', //多选时有
          "customDisplayMemberPath": '@cword(1, 10)',
          "customSelectedValuePath": '@boolean'
        }
      ],

    });
  }

  public get normalItem(){
    return this._mockData.normalItem;
  }

  public get checkedItem(){
    return this._mockData.checkedItem;
  }
}
