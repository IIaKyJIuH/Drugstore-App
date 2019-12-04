import { Component, EventEmitter, Output } from '@angular/core';

***REMOVED****
***REMOVED*** Side navigation for mobile phones.
***REMOVED***/
@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent {

 ***REMOVED*****REMOVED****
  ***REMOVED*** For emmiting close action of the sidenav.
  ***REMOVED***/
  @Output() sidenavClose = new EventEmitter();

 ***REMOVED*****REMOVED****
  ***REMOVED*** .ctor
  ***REMOVED***/
  constructor() { }

 ***REMOVED*****REMOVED****
  ***REMOVED*** Emits sidenav close action.
  ***REMOVED***/
  public onSidenavClose(): void {
    this.sidenavClose.emit();
  }

}
