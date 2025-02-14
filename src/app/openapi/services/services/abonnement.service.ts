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

import { AbonnementResponse } from '../models/abonnement-response';
import { doAbonnement } from '../fn/abonnement/do-abonnement';
import { DoAbonnement$Params } from '../fn/abonnement/do-abonnement';
import { getAbonnementById } from '../fn/abonnement/get-abonnement-by-id';
import { GetAbonnementById$Params } from '../fn/abonnement/get-abonnement-by-id';
import { getAbonnementByOwner } from '../fn/abonnement/get-abonnement-by-owner';
import { GetAbonnementByOwner$Params } from '../fn/abonnement/get-abonnement-by-owner';
import { getAllAbonnement } from '../fn/abonnement/get-all-abonnement';
import { GetAllAbonnement$Params } from '../fn/abonnement/get-all-abonnement';
import { getAllAbonnementExpired } from '../fn/abonnement/get-all-abonnement-expired';
import { GetAllAbonnementExpired$Params } from '../fn/abonnement/get-all-abonnement-expired';
import { getAllAbonnementExpiredByUser } from '../fn/abonnement/get-all-abonnement-expired-by-user';
import { GetAllAbonnementExpiredByUser$Params } from '../fn/abonnement/get-all-abonnement-expired-by-user';
import { invalidate } from '../fn/abonnement/invalidate';
import { Invalidate$Params } from '../fn/abonnement/invalidate';
import { PageResponseAbonnementResponse } from '../models/page-response-abonnement-response';
import { validate } from '../fn/abonnement/validate';
import { Validate$Params } from '../fn/abonnement/validate';

@Injectable({ providedIn: 'root' })
export class AbonnementService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `validate()` */
  static readonly ValidatePath = '/abonnement/validate';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `validate()` instead.
   *
   * This method doesn't expect any request body.
   */
  validate$Response(params: Validate$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return validate(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `validate$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  validate(params: Validate$Params, context?: HttpContext): Observable<void> {
    return this.validate$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `invalidate()` */
  static readonly InvalidatePath = '/abonnement/invalidate';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `invalidate()` instead.
   *
   * This method doesn't expect any request body.
   */
  invalidate$Response(params: Invalidate$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return invalidate(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `invalidate$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  invalidate(params: Invalidate$Params, context?: HttpContext): Observable<void> {
    return this.invalidate$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `doAbonnement()` */
  static readonly DoAbonnementPath = '/abonnement';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `doAbonnement()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  doAbonnement$Response(params: DoAbonnement$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return doAbonnement(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `doAbonnement$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  doAbonnement(params: DoAbonnement$Params, context?: HttpContext): Observable<number> {
    return this.doAbonnement$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `getAbonnementById()` */
  static readonly GetAbonnementByIdPath = '/abonnement/{abonnement-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAbonnementById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAbonnementById$Response(params: GetAbonnementById$Params, context?: HttpContext): Observable<StrictHttpResponse<AbonnementResponse>> {
    return getAbonnementById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAbonnementById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAbonnementById(params: GetAbonnementById$Params, context?: HttpContext): Observable<AbonnementResponse> {
    return this.getAbonnementById$Response(params, context).pipe(
      map((r: StrictHttpResponse<AbonnementResponse>): AbonnementResponse => r.body)
    );
  }

  /** Path part for operation `getAllAbonnementExpired()` */
  static readonly GetAllAbonnementExpiredPath = '/abonnement/expired-abonnements';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllAbonnementExpired()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllAbonnementExpired$Response(params?: GetAllAbonnementExpired$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseAbonnementResponse>> {
    return getAllAbonnementExpired(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllAbonnementExpired$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllAbonnementExpired(params?: GetAllAbonnementExpired$Params, context?: HttpContext): Observable<PageResponseAbonnementResponse> {
    return this.getAllAbonnementExpired$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseAbonnementResponse>): PageResponseAbonnementResponse => r.body)
    );
  }

  /** Path part for operation `getAllAbonnementExpiredByUser()` */
  static readonly GetAllAbonnementExpiredByUserPath = '/abonnement/expired-abonnements/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllAbonnementExpiredByUser()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllAbonnementExpiredByUser$Response(params: GetAllAbonnementExpiredByUser$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseAbonnementResponse>> {
    return getAllAbonnementExpiredByUser(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllAbonnementExpiredByUser$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllAbonnementExpiredByUser(params: GetAllAbonnementExpiredByUser$Params, context?: HttpContext): Observable<PageResponseAbonnementResponse> {
    return this.getAllAbonnementExpiredByUser$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseAbonnementResponse>): PageResponseAbonnementResponse => r.body)
    );
  }

  /** Path part for operation `getAbonnementByOwner()` */
  static readonly GetAbonnementByOwnerPath = '/abonnement/by-user/{user-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAbonnementByOwner()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAbonnementByOwner$Response(params: GetAbonnementByOwner$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseAbonnementResponse>> {
    return getAbonnementByOwner(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAbonnementByOwner$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAbonnementByOwner(params: GetAbonnementByOwner$Params, context?: HttpContext): Observable<PageResponseAbonnementResponse> {
    return this.getAbonnementByOwner$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseAbonnementResponse>): PageResponseAbonnementResponse => r.body)
    );
  }

  /** Path part for operation `getAllAbonnement()` */
  static readonly GetAllAbonnementPath = '/abonnement/all-abonnements';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllAbonnement()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllAbonnement$Response(params?: GetAllAbonnement$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseAbonnementResponse>> {
    return getAllAbonnement(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllAbonnement$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllAbonnement(params?: GetAllAbonnement$Params, context?: HttpContext): Observable<PageResponseAbonnementResponse> {
    return this.getAllAbonnement$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseAbonnementResponse>): PageResponseAbonnementResponse => r.body)
    );
  }

}
