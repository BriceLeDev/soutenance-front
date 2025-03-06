import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { RouterModule, provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { requestInterceptorInterceptor } from './interceptor/request-interceptor.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideNativeDateAdapter } from '@angular/material/core';
import {SweetAlert2Module} from '@sweetalert2/ngx-sweetalert2'
import { provideToastr } from 'ngx-toastr';
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withFetch()),
    provideHttpClient(withInterceptors([requestInterceptorInterceptor])), provideAnimationsAsync('noop'),
    provideNativeDateAdapter(),
    provideAnimationsAsync(),
    importProvidersFrom( [SweetAlert2Module.forRoot()]),
    provideToastr(),
  ],


};
