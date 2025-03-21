/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { TypePanRequest } from '../../models/type-pan-request';
import { TypePanResponse } from '../../models/type-pan-response';

export interface UpdatePanneauById$Params {
  'type-id': number;
      body: TypePanRequest
}

export function updatePanneauById(http: HttpClient, rootUrl: string, params: UpdatePanneauById$Params, context?: HttpContext): Observable<StrictHttpResponse<TypePanResponse>> {
  const rb = new RequestBuilder(rootUrl, updatePanneauById.PATH, 'put');
  if (params) {
    rb.path('type-id', params['type-id'], {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<TypePanResponse>;
    })
  );
}

updatePanneauById.PATH = '/type-panneau/update/{type-id}';
