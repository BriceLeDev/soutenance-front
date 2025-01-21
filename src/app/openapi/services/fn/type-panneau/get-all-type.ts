/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { TypePanResponse } from '../../models/type-pan-response';

export interface GetAllType$Params {
}

export function getAllType(http: HttpClient, rootUrl: string, params?: GetAllType$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<TypePanResponse>>> {
  const rb = new RequestBuilder(rootUrl, getAllType.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<TypePanResponse>>;
    })
  );
}

getAllType.PATH = '/type-panneau/all-type-panneau';
