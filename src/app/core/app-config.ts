import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

***REMOVED****
***REMOVED*** Application configurations.
***REMOVED***/
@Injectable({
  providedIn: 'root',
})
export class AppConfig {

 ***REMOVED*****REMOVED****
  ***REMOVED*** Web-API key of my FireBase Db.
  ***REMOVED***/
  public readonly API_KEY = environment.firebase.apiKey;

 ***REMOVED*****REMOVED****
  ***REMOVED*** Firebase url related to the data.
  ***REMOVED***/
  public readonly FIREBASE_DATA_URL = environment.firebase.databaseURL + '/';

}
