import {Component, EventEmitter, OnInit, DoCheck} from "@angular/core"
import {forwardRef, Inject, Injectable} from "@angular/core"
import {CORE_DIRECTIVES, NgModel} from "@angular/common"
import {CellEditorInterface} from "./CellEditorInterface";
import {MicroCellComponent} from "../Grid/MicroCellComponent";
/**
 *
 */
@Component(
  {
    selector  : 'inputCellEditor',
    template  : `<input [(ngModel)]="value" class="wj-grid-editor wj-form-control"/>`,
    directives: [CORE_DIRECTIVES, NgModel],
  }
)
@Injectable()
export class TextInputEditor implements OnInit, DoCheck, CellEditorInterface {

  public beginEdit: EventEmitter = new EventEmitter();
  public endEdit: EventEmitter = new EventEmitter();
  public value: any;

  constructor(@Inject(forwardRef(() =>MicroCellComponent)) private comp: MicroCellComponent) {
    console.log(comp);
  }

  ngOnInit() {
    this.beginEdit.emit(this.value);
  }

  ngDoCheck() {
  }

}