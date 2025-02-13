import { PageResponseUserResponse } from './../../openapi/services/models/page-response-user-response';
import { Injectable, signal } from '@angular/core';
import { PageResponseBoulevardResponse, PageResponsePanneauResponse } from '../../openapi/services/models';


/*

***************************************************************************
*service qui s'occupe des données partagées par tous les composents admin *
***************************************************************************

*/
@Injectable({
  providedIn: 'root',
})
export class SharedServiceService {
  constructor() {}

  //Close or open admin mobile-menu
  open = signal(false);

  //etat des clients
  public AdminClientState: any = {
    Clients : [] ,
    NbrClient: signal(0),
    Error:""
  };
  public customerResponse:PageResponseUserResponse={};
  public boulevardresponse: PageResponseBoulevardResponse = {};
  public panneauResponse: PageResponsePanneauResponse = {};
  public paymentLink :string | undefined = ""

  public isAuthenticate : boolean = false

  public NbrTotalBoulevard?: number;
  public NbrTotalPanneau?: number;
  public NbrTotalClient?: number;
}
