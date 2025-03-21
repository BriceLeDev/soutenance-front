/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { LigneAbonnementResponse } from '../../models/ligne-abonnement-response';

export interface GetAllLigneAbn$Params {
}

export function getAllLigneAbn(http: HttpClient, rootUrl: string, params?: GetAllLigneAbn$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<LigneAbonnementResponse>>> {
  const rb = new RequestBuilder(rootUrl, getAllLigneAbn.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<LigneAbonnementResponse>>;
    })
  );
}

getAllLigneAbn.PATH = '/line-abonnement/all-line';
