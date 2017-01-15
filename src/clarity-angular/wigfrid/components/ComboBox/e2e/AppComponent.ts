import {Component, provide, Inject, enableProdMode} from "@angular/core";
import {ListboxComponent} from "../../ListBox/ListboxComponent";
import {CORE_DIRECTIVES} from "@angular/common";
import {ComboBoxComponent} from "../ComboBoxComponent";
import * as Mock from "mockjs";

enableProdMode();

@Component(
  {
    selector  : 'ahri-app',
    template  : `
        <h4>This is ComboBox Diective</h4>
        <ar-combobox 
          [itemsSource]="comboBoxData"
          [maxDropDownWidth]="200"
          [maxDropDownHeight]="100"
        >
            <template let-item><div class="wj-listbox-item">{{item}}</div></template>
        </ar-combobox>
        <p>this is a text</p>
        `,
    directives: [ListboxComponent, ComboBoxComponent, CORE_DIRECTIVES],
  }
)
export class AppComponent {
  get comboBoxData(){
      return this._comboBoxData;
      }

  set comboBoxData(value){
      this._comboBoxData=value;
      }

  private _comboBoxData;
  private _mockData;

  constructor() {
    this._mockData = (<any>Mock).mock({
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

  ngAfterViewInit() {
    this._comboBoxData = this._mockData.normalItem;
  }

}
