/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { boulevardFindAll } from '../fn/boulevard/boulevard-find-all';
import { BoulevardFindAll$Params } from '../fn/boulevard/boulevard-find-all';
import { boulevardFindById } from '../fn/boulevard/boulevard-find-by-id';
import { BoulevardFindById$Params } from '../fn/boulevard/boulevard-find-by-id';
import { BoulevardResponse } from '../models/boulevard-response';
import { deleteBoulevard } from '../fn/boulevard/delete-boulevard';
import { DeleteBoulevard$Params } from '../fn/boulevard/delete-boulevard';
import { PageResponseBoulevardResponse } from '../models/page-response-boulevard-response';
import { saveBoulevard } from '../fn/boulevard/save-boulevard';
import { SaveBoulevard$Params } from '../fn/boulevard/save-boulevard';
import { updateBoulevard } from '../fn/boulevard/update-boulevard';
import { UpdateBoulevard$Params } from '../fn/boulevard/update-boulevard';

@Injectable({ providedIn: 'root' })
export class BoulevardService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `updateBoulevard()` */
  static readonly UpdateBoulevardPath = '/boulevard/update/{boulevard-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateBoulevard()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateBoulevard$Response(params: UpdateBoulevard$Params, context?: HttpContext): Observable<StrictHttpResponse<BoulevardResponse>> {
    return updateBoulevard(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateBoulevard$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateBoulevard(params: UpdateBoulevard$Params, context?: HttpContext): Observable<BoulevardResponse> {
    return this.updateBoulevard$Response(params, context).pipe(
      map((r: StrictHttpResponse<BoulevardResponse>): BoulevardResponse => r.body)
    );
  }

  /** Path part for operation `saveBoulevard()` */
  static readonly SaveBoulevardPath = '/boulevard';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `saveBoulevard()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveBoulevard$Response(params: SaveBoulevard$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return saveBoulevard(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `saveBoulevard$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveBoulevard(params: SaveBoulevard$Params, context?: HttpContext): Observable<number> {
    return this.saveBoulevard$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `boulevardFindById()` */
  static readonly BoulevardFindByIdPath = '/boulevard/{boulevard-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `boulevardFindById()` instead.
   *
   * This method doesn't expect any request body.
   */
  boulevardFindById$Response(params: BoulevardFindById$Params, context?: HttpContext): Observable<StrictHttpResponse<BoulevardResponse>> {
    return boulevardFindById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `boulevardFindById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  boulevardFindById(params: BoulevardFindById$Params, context?: HttpContext): Observable<BoulevardResponse> {
    return this.boulevardFindById$Response(params, context).pipe(
      map((r: StrictHttpResponse<BoulevardResponse>): BoulevardResponse => r.body)
    );
  }

  /** Path part for operation `deleteBoulevard()` */
  static readonly DeleteBoulevardPath = '/boulevard/{boulevard-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteBoulevard()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteBoulevard$Response(params: DeleteBoulevard$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return deleteBoulevard(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteBoulevard$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteBoulevard(params: DeleteBoulevard$Params, context?: HttpContext): Observable<void> {
    return this.deleteBoulevard$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `boulevardFindAll()` */
  static readonly BoulevardFindAllPath = '/boulevard/all-boulevard';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `boulevardFindAll()` instead.
   *
   * This method doesn't expect any request body.
   */
  boulevardFindAll$Response(params?: BoulevardFindAll$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseBoulevardResponse>> {
    return boulevardFindAll(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `boulevardFindAll$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  boulevardFindAll(params?: BoulevardFindAll$Params, context?: HttpContext): Observable<PageResponseBoulevardResponse> {
    return this.boulevardFindAll$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseBoulevardResponse>): PageResponseBoulevardResponse => r.body)
    );
  }

}
