/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfiguration, ApiConfigurationParams } from './api-configuration';

import { TypePanneauService } from './services/type-panneau.service';
import { PanneauService } from './services/panneau.service';
import { OwnerService } from './services/owner.service';
import { BoulevardService } from './services/boulevard.service';
import { AbonnementService } from './services/abonnement.service';
import { RoleService } from './services/role.service';
import { TransactionControlerService } from './services/transaction-controler.service';
import { ImageService } from './services/image.service';
import { AuthenticationService } from './services/authentication.service';
import { MessageControllerService } from './services/message-controller.service';
import { LigneAbonnmentService } from './services/ligne-abonnment.service';
import { FactureControlerService } from './services/facture-controler.service';

/**
 * Module that provides all services and configuration.
 */
@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [
    TypePanneauService,
    PanneauService,
    OwnerService,
    BoulevardService,
    AbonnementService,
    RoleService,
    TransactionControlerService,
    ImageService,
    AuthenticationService,
    MessageControllerService,
    LigneAbonnmentService,
    FactureControlerService,
    ApiConfiguration
  ],
})
export class ApiModule {
  static forRoot(params: ApiConfigurationParams): ModuleWithProviders<ApiModule> {
    return {
      ngModule: ApiModule,
      providers: [
        {
          provide: ApiConfiguration,
          useValue: params
        }
      ]
    }
  }

  constructor( 
    @Optional() @SkipSelf() parentModule: ApiModule,
    @Optional() http: HttpClient
  ) {
    if (parentModule) {
      throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
    }
    if (!http) {
      throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
      'See also https://github.com/angular/angular/issues/20575');
    }
  }
}
