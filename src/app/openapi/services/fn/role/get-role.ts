/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { RoleRespons } from '../../models/role-respons';

export interface GetRole$Params {
  'role-id': number;
}

export function getRole(http: HttpClient, rootUrl: string, params: GetRole$Params, context?: HttpContext): Observable<StrictHttpResponse<RoleRespons>> {
  const rb = new RequestBuilder(rootUrl, getRole.PATH, 'get');
  if (params) {
    rb.path('role-id', params['role-id'], {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<RoleRespons>;
    })
  );
}

getRole.PATH = '/role/add-role/{role-id}';
