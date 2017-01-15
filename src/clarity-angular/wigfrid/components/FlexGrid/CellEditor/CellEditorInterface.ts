import {EventEmitter} from "@angular/core";


export interface CellEditorInterface {

  beginEdit: EventEmitter;

  endEdit: EventEmitter;

  /**
   * the value to be edited
   */
  value: any;
  
}