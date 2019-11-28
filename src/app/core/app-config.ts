import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

***REMOVED****
***REMOVED*** Application configurations.
***REMOVED***/
@Injectable({
  providedIn: 'root',
})
export class AppConfig {

***REMOVED*****REMOVED*****REMOVED****
 ***REMOVED*****REMOVED*** API URL.
 ***REMOVED*****REMOVED***/
  public readonly API_URL = environment.API_URL;

***REMOVED*****REMOVED*****REMOVED****
 ***REMOVED*****REMOVED*** Web-API key of my FireBase Db.
 ***REMOVED*****REMOVED***/
  public readonly API_KEY = environment.firebase.apiKey;

***REMOVED*****REMOVED*****REMOVED****
 ***REMOVED*****REMOVED*** Firebase url related to the uploaded file swapi.json.
 ***REMOVED*****REMOVED***/
  public readonly FIREBASE_SWAPI_URL = environment.firebase.databaseURL + '/swapi';

***REMOVED*****REMOVED*****REMOVED****
 ***REMOVED*****REMOVED*** Url for refreshing secure token and thus the access token.
 ***REMOVED*****REMOVED***/
  public readonly REFRESH_SECURE_TOKEN_URL = environment.REFRESH_SECURE_TOKEN_URL;

}
