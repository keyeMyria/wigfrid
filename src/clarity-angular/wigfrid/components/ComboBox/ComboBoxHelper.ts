
import {Injectable, Injector, forwardRef, ChangeDetectorRef} from "@angular/core";
import {ComboBoxComponent} from "./ComboBoxComponent";
import {ListboxComponent} from "../ListBox/ListboxComponent";


/**
 * Feature: ComboBoxHelper behavior as Business Logical Layer
 * Scenario: init combobox
 *  Given input, button, listbox
 *  And
 *  When
 *  Then
 * Scenario: input behavior
 *  Given input clicked
 *  And other not change
 *  When listbox is not dropped down
 *  Then listbox should drop down
 *
 * Scenario: listbox behavior
 *  Given listbox droped down
 *  And select no item
 *  When select a item
 *  Then input should have text belongs to selected item
 *  And input text should whole selected
 *
 *
 *
 */
@Injectable()
export class ComboBoxHelper{
  private _injector: ChangeDetectorRef;
  private _combobox;
  private _listbox;

  constructor(private _injector: Injector){
    console.log(_injector);
    // debugger;
    // console.log(_injector.get(ComboBoxComponent));
  }

  register(injector: Injector) {
    this._injector = injector;
    console.log(this._injector);
  }

  /**
   * should after ngInit
   */
  run(){
    debugger;
    console.log(this);
  }


}
