import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

/**
 * Application configurations.
 */
@Injectable({
  providedIn: 'root',
})
export class AppConfig {

  /**
   * Web-API key of my FireBase Db.
   */
  public readonly API_KEY = environment.firebase.apiKey;

  /**
   * Firebase url related to the data.
   */
  public readonly FIREBASE_DATA_URL = environment.firebase.databaseURL + '/';

}
