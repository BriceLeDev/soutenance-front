/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ImageResponse } from '../../models/image-response';

export interface GetImageByAbonnement$Params {
  abonnementId: number | undefined;
}

export function getImageByAbonnement(http: HttpClient, rootUrl: string, params: GetImageByAbonnement$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<ImageResponse>>> {
  const rb = new RequestBuilder(rootUrl, getImageByAbonnement.PATH, 'get');
  if (params) {
    rb.query('abonnementId', params.abonnementId, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<ImageResponse>>;
    })
  );
}

getImageByAbonnement.PATH = '/image/get-image-by-abonnement';
