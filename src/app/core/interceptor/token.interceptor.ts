import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from '../app-config';
import { AuthenticationService as AuthorizationService } from '../services/authentication/authentication.service';


***REMOVED****
***REMOVED*** Interceptor transforming http requests to simplify all other requests to the Db.
***REMOVED***/
@Injectable({
  providedIn: 'root',
})
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private auth: AuthorizationService,
    private config: AppConfig,
  ) { }

 ***REMOVED*****REMOVED****
  ***REMOVED*** HttpInterceptor realization.
  ***REMOVED*** @param request - incoming request.
  ***REMOVED*** @param next - command to transit modified http request to the next interceptor.
  ***REMOVED***/
  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (request.method === 'POST') {
      return next.handle(request.clone({ params: request.params.set('key', this.config.API_KEY) }));
    }
    // return next.handle(request).pipe(
    //   catchError((error: HttpErrorResponse) => {
    //     if (error.status === 401) {
    //       return this.auth.refreshToken().pipe(
    //         concatMap((tokens: UserTokensModel) => next.handle(request.clone({
    //           params: request.params.set('auth', tokens.idToken),
    //         })),
    //         ),
    //       );
    //     }
    //     return next.handle(request);
    //   }),
    // );
    return next.handle(request);
  }
}
