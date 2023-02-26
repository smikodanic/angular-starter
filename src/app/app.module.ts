/* MODULES */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// custom modules
import { AppRoutingModule } from './app-routing.module';
import { NgboostAuthModule, JwtTokenInterceptor } from './ng/modules/ngboost-auth';


/* COMPONENTS */
import { AppComponent } from './app.component';


/* SERVICES */
import { GlobalsService } from './ng/services/globals.service';
import { TextService } from './ng/services/text.service';


/* CONSTANTS */
import { environment } from '../environments/environment';
import AUTH_URLS from './ng/constants/AUTH_URLS.config'; // required for ngboost-auth module
import API from './ng/constants/API.constant';





@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgboostAuthModule,
    HttpClientModule,
  ],
  providers: [
    GlobalsService,
    TextService,

    // constants
    { provide: 'ENV', useValue: environment },
    { provide: 'API', useValue: API},

    // required for ngboost-auth
    { provide: 'AUTH_URLS', useValue: AUTH_URLS }, // send AUTH_URLS to ngboost-auth
    { provide: HTTP_INTERCEPTORS, useClass: JwtTokenInterceptor, multi: true }, // take JwtTokenInterceptor from ngboost-auth and send to HttpClientModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
