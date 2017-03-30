import { ComboBox } from '../ComboBox/ComboBox';
import { Event } from "../../event/Event";
import { EventArgs } from "../../eventArgs/EventArgs";
/**
 * The @see:Menu control shows a text element with a drop-down list of commands that the user
 * can invoke by click or touch.
 *
 * The @see:Menu control inherits from @see:ComboBox, so you populate and style it
 * in the same way that you do the @see:ComboBox (see the @see:itemsSource property).
 *
 * The @see:Menu control adds an @see:itemClicked event that fires when the user selects
 * an item from the menu. The event handler can inspect the @see:Menu control to determine
 * which item was clicked. For example:
 *
 * <pre>
 * var menu = new wijmo.input.Menu(hostElement);
 * menu.header = 'Main Menu';
 * menu.itemsSource = ['option 1', 'option 2', 'option 3'];
 * menu.itemClicked.addHandler(function(sender, args) {
     * var menu = sender;
     *   alert('Thanks for selecting item ' + menu.selectedIndex + ' from menu ' + menu.header + '!');
     * });
 * </pre>
 *
 * The example below illustrates how you can create value pickers, command-based menus, and
 * menus that respond to the <b>itemClicked</b> event. The menus in this example are based
 * on HTML <b>&lt;select;&gt</b> and <b>&lt;option;&gt</b> elements.
 *
 * @fiddle:BX853
 */
export declare class Menu extends ComboBox {
    _hdr: HTMLElement;
    _closing: boolean;
    _command: any;
    _cmdPath: string;
    _cmdParamPath: string;
    _isButton: boolean;
    _defaultItem: any;
    _owner: HTMLElement;
    /**
     * Initializes a new instance of a @see:Menu control.
     *
     * @param element The DOM element that hosts the control, or a selector for the host element (e.g. '#theCtrl').
     * @param options The JavaScript object containing initialization data for the control.
     */
    constructor(element: any, options?: any);
    /**
     * Gets or sets the HTML text shown in the @see:Menu element.
     */
    header: string;
    /**
     * Gets or sets the command to execute when an item is clicked.
     *
     * Commands are objects that implement two methods:
     * <ul>
     *  <li><b>executeCommand(parameter)</b> This method executes the command.</li>
     *  <li><b>canExecuteCommand(parameter)</b> This method returns a Boolean value
     *      that determines whether the controller can execute the command.
     *      If this method returns false, the menu option is disabled.</li>
     * </ul>
     *
     * You can also set commands on individual items using the @see:commandPath
     * property.
     */
    command: any;
    /**
     * Gets or sets the name of the property that contains the command to
     * execute when the user clicks an item.
     *
     * Commands are objects that implement two methods:
     * <ul>
     *  <li><b>executeCommand(parameter)</b> This method executes the command.</li>
     *  <li><b>canExecuteCommand(parameter)</b> This method returns a Boolean value
     *      that determines whether the controller can execute the command.
     *      If this method returns false, the menu option is disabled.</li>
     * </ul>
     */
    commandPath: string;
    /**
     * Gets or sets the name of the property that contains a parameter to use with
     * the command specified by the @see:commandPath property.
     */
    commandParameterPath: string;
    /**
     * Gets or sets a value that determines whether this @see:Menu should act
     * as a split button instead of a regular menu.
     *
     * The difference between regular menus and split buttons is what happens
     * when the user clicks the menu header.
     * In regular menus, clicking the header shows or hides the menu options.
     * In split buttons, clicking the header raises the @see:menuItemClicked event
     * and/or invokes the command associated with the last option selected by
     * the user as if the user had picked the item from the drop-down list.
     *
     * If you want to differentiate between clicks on menu items and the button
     * part of a split button, check the value of the @see:isDroppedDown property
     * of the event sender. If that is true, then a menu item was clicked; if it
     * is false, then the button was clicked.
     *
     * For example, the code below implements a split button that uses the drop-down
     * list only to change the default item/command, and triggers actions only when
     * the button is clicked:
     *
     * <pre>&lt;-- view --&gt;
     * &lt;wj-menu is-button="true" header="Run" value="browser"
     *   item-clicked="menuItemClicked(s, e)"&gt;
     *   &lt;wj-menu-item value="'Internet Explorer'"&gt;Internet Explorer&lt;/wj-menu-item&gt;
     *   &lt;wj-menu-item value="'Chrome'"&gt;Chrome&lt;/wj-menu-item&gt;
     *   &lt;wj-menu-item value="'FireFox'"&gt;FireFox&lt;/wj-menu-item&gt;
     *   &lt;wj-menu-item value="'Safari'"&gt;Safari&lt;/wj-menu-item&gt;
     *   &lt;wj-menu-item value="'Opera'"&gt;Opera&lt;/wj-menu-item&gt;
     * &lt;/wj-menu&gt;
     *
     * // controller
     * $scope.browser = 'Internet Explorer';
     * $scope.menuItemClicked = function (s, e) {
         *   // if not dropped down, click was on the button
         *   if (!s.isDroppedDown) {
         *     alert('running ' + $scope.browser);
         *   }
         *}</pre>
     */
    isButton: boolean;
    /**
     * Gets or sets the element that owns this @see:Menu.
     *
     * This variable is set by the wj-context-menu directive in case a single
     * menu is used as a context menu for several different elements.
     */
    owner: HTMLElement;
    /**
     * Occurs when the user picks an item from the menu.
     *
     * The handler can determine which item was picked by reading the event sender's
     * @see:selectedIndex property.
     */
    itemClicked: Event;
    /**
     * Raises the @see:itemClicked event.
     */
    onItemClicked(e?: EventArgs): void;
    onTextChanged(e?: EventArgs): void;
    onIsDroppedDownChanged(e?: EventArgs): void;
    _raiseCommand(e?: EventArgs): void;
    _getCommand(item: any): any;
    _executeCommand(cmd: any, parm: any): void;
    _canExecuteCommand(cmd: any, parm: any): boolean;
    _enableDisableItems(): void;
}
