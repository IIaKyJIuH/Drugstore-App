import { Component, EventEmitter, Output } from "@angular/core";

/**
 * Side navigation for mobile phones.
 */
@Component({
  selector: "app-sidenav-list",
  templateUrl: "./sidenav-list.component.html",
  styleUrls: ["./sidenav-list.component.css"],
})
export class SidenavListComponent {
  /**
   * For emmiting close action of the sidenav.
   */
  @Output() sidenavClose = new EventEmitter();

  /**
   * .ctor
   */
  constructor() {}

  /**
   * Emits sidenav close action.
   */
  public onSidenavClose(): void {
    this.sidenavClose.emit();
  }
}
