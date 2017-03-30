import { Injector } from "@angular/core";
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
export declare class ComboBoxHelper {
    private _injector;
    private _injector;
    private _combobox;
    private _listbox;
    constructor(_injector: Injector);
    register(injector: Injector): void;
    /**
     * should after ngInit
     */
    run(): void;
}
