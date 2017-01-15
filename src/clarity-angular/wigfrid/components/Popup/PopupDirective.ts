
import {Directive, ElementRef} from "@angular/core";

@Directive({
  selector: '[popup]',
  inputs: ['popupSource']
})
export class PopupDirective{
  private popupSource;

  constructor(private _elementRef: ElementRef){
    console.log(_elementRef);
  }

  ngAfterViewInit(){
    console.log(this.popupSource);
  }
}
