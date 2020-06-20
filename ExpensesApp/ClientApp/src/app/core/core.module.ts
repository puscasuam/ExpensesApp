import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { HttpRequestInterceptor } from './services/http-request-interceptor';

import { SecurityService } from './services/security.service';
import { TokenService } from './services/token.service';
import { ApplicationService } from './services/application.service';
import { AuthenticationGuard } from './guards/authentification.guard';

@NgModule({
  declarations: [
  ],
  imports: [],
  providers: [
    AuthenticationGuard,
    SecurityService,
    TokenService,
    ApplicationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptor,
      multi: true
    }
  ],
  exports: []
})

export class CoreModule {

}
