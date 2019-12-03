import {Directive, HostBinding, HostListener} from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.open') dropDownOpened = false;

  @HostListener('click') toggleOpen() {
    this.dropDownOpened = !this.dropDownOpened;
  }
  // constructor(private elRef: ElementRef<any>, private r: Renderer2) {
  // }
}
