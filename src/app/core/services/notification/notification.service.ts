import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  /**
   * .ctor
   * @param toaster - out module, that is used as toasting service.
   */
  constructor(
    private toaster: ToastrService
  ) { }

  /**
   * With green background.
   * @param message - will be displayed as normal text.
   * @param title - will be displayed in bold at the top.
   */
  showSuccess(message, title): void {
      this.toaster.success(message, title);
  }

  /**
   * With red background.
   * @param message - will be displayed as normal text.
   * @param title - will be displayed in bold at the top.
   */
  showError(message, title): void {
    this.toaster.error(message, title);
  }

  /**
   * With yellow background.
   * @param message - will be displayed as normal text.
   * @param title - will be displayed in bold at the top.
   */
  showWarning(message, title): void {
    this.toaster.warning(message, title);
  }
}
