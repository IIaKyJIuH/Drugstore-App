import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

 ***REMOVED*****REMOVED****
  ***REMOVED*** .ctor
  ***REMOVED*** @param toaster - out module, that is used as toasting service.
  ***REMOVED***/
  constructor(
    private toaster: ToastrService
  ) { }

 ***REMOVED*****REMOVED****
  ***REMOVED*** With green background.
  ***REMOVED*** @param message - will be displayed as normal text.
  ***REMOVED*** @param title - will be displayed in bold at the top.
  ***REMOVED***/
  showSuccess(message, title): void {
      this.toaster.success(message, title);
  }

 ***REMOVED*****REMOVED****
  ***REMOVED*** With red background.
  ***REMOVED*** @param message - will be displayed as normal text.
  ***REMOVED*** @param title - will be displayed in bold at the top.
  ***REMOVED***/
  showError(message, title): void {
    this.toaster.error(message, title);
  }

 ***REMOVED*****REMOVED****
  ***REMOVED*** With yellow background.
  ***REMOVED*** @param message - will be displayed as normal text.
  ***REMOVED*** @param title - will be displayed in bold at the top.
  ***REMOVED***/
  showWarning(message, title): void {
    this.toaster.warning(message, title);
  }
}
