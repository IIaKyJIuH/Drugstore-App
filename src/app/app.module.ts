import { NgModule } from '@angular/core';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { NgxPermissionsModule } from 'ngx-permissions';
import { ToastrModule } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientModule } from './client/client.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

/**
 * @inheritdoc
 */
@NgModule({
   declarations: [AppComponent],
   imports: [
      BrowserModule,
      BrowserAnimationsModule,
      CoreModule.forRoot(),
      ClientModule,
      SharedModule,
      AppRoutingModule,
      AngularFireModule.initializeApp(environment.firebase, 'Drugstore-App'),
      AngularFireAuthModule,
      AngularFireDatabaseModule,
      NgxPermissionsModule.forRoot(),
      ToastrModule.forRoot()
   ],
   bootstrap: [AppComponent],
})
export class AppModule { }
