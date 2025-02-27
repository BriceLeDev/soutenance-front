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

import { checkStatusNotify } from '../fn/transaction-controler/check-status-notify';
import { CheckStatusNotify$Params } from '../fn/transaction-controler/check-status-notify';
import { checkStatusNotify1 } from '../fn/transaction-controler/check-status-notify-1';
import { CheckStatusNotify1$Params } from '../fn/transaction-controler/check-status-notify-1';
import { getAllTransaction } from '../fn/transaction-controler/get-all-transaction';
import { GetAllTransaction$Params } from '../fn/transaction-controler/get-all-transaction';
import { getAllTransactionByAbonnement } from '../fn/transaction-controler/get-all-transaction-by-abonnement';
import { GetAllTransactionByAbonnement$Params } from '../fn/transaction-controler/get-all-transaction-by-abonnement';
import { getPaymentLink } from '../fn/transaction-controler/get-payment-link';
import { GetPaymentLink$Params } from '../fn/transaction-controler/get-payment-link';
import { LinkPayementRespons } from '../models/link-payement-respons';
import { PageResponseTransactionResponse } from '../models/page-response-transaction-response';
import { returnTo } from '../fn/transaction-controler/return-to';
import { ReturnTo$Params } from '../fn/transaction-controler/return-to';
import { returnTo1 } from '../fn/transaction-controler/return-to-1';
import { ReturnTo1$Params } from '../fn/transaction-controler/return-to-1';

@Injectable({ providedIn: 'root' })
export class TransactionControlerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `returnTo1()` */
  static readonly ReturnTo1Path = '/payment/return';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `returnTo1()` instead.
   *
   * This method doesn't expect any request body.
   */
  returnTo1$Response(params?: ReturnTo1$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return returnTo1(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `returnTo1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  returnTo1(params?: ReturnTo1$Params, context?: HttpContext): Observable<{
}> {
    return this.returnTo1$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `returnTo()` */
  static readonly ReturnToPath = '/payment/return';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `returnTo()` instead.
   *
   * This method doesn't expect any request body.
   */
  returnTo$Response(params: ReturnTo$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return returnTo(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `returnTo$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  returnTo(params: ReturnTo$Params, context?: HttpContext): Observable<{
}> {
    return this.returnTo$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `checkStatusNotify1()` */
  static readonly CheckStatusNotify1Path = '/payment/notification';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `checkStatusNotify1()` instead.
   *
   * This method doesn't expect any request body.
   */
  checkStatusNotify1$Response(params?: CheckStatusNotify1$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return checkStatusNotify1(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `checkStatusNotify1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  checkStatusNotify1(params?: CheckStatusNotify1$Params, context?: HttpContext): Observable<{
}> {
    return this.checkStatusNotify1$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `checkStatusNotify()` */
  static readonly CheckStatusNotifyPath = '/payment/notification';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `checkStatusNotify()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  checkStatusNotify$Response(params: CheckStatusNotify$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return checkStatusNotify(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `checkStatusNotify$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  checkStatusNotify(params: CheckStatusNotify$Params, context?: HttpContext): Observable<{
}> {
    return this.checkStatusNotify$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `getPaymentLink()` */
  static readonly GetPaymentLinkPath = '/payment/link';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPaymentLink()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPaymentLink$Response(params: GetPaymentLink$Params, context?: HttpContext): Observable<StrictHttpResponse<LinkPayementRespons>> {
    return getPaymentLink(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getPaymentLink$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPaymentLink(params: GetPaymentLink$Params, context?: HttpContext): Observable<LinkPayementRespons> {
    return this.getPaymentLink$Response(params, context).pipe(
      map((r: StrictHttpResponse<LinkPayementRespons>): LinkPayementRespons => r.body)
    );
  }

  /** Path part for operation `getAllTransaction()` */
  static readonly GetAllTransactionPath = '/payment/all-transaction';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllTransaction()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllTransaction$Response(params?: GetAllTransaction$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseTransactionResponse>> {
    return getAllTransaction(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllTransaction$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllTransaction(params?: GetAllTransaction$Params, context?: HttpContext): Observable<PageResponseTransactionResponse> {
    return this.getAllTransaction$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseTransactionResponse>): PageResponseTransactionResponse => r.body)
    );
  }

  /** Path part for operation `getAllTransactionByAbonnement()` */
  static readonly GetAllTransactionByAbonnementPath = '/payment/all-transaction-by-abnmt/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllTransactionByAbonnement()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllTransactionByAbonnement$Response(params: GetAllTransactionByAbonnement$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseTransactionResponse>> {
    return getAllTransactionByAbonnement(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllTransactionByAbonnement$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllTransactionByAbonnement(params: GetAllTransactionByAbonnement$Params, context?: HttpContext): Observable<PageResponseTransactionResponse> {
    return this.getAllTransactionByAbonnement$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseTransactionResponse>): PageResponseTransactionResponse => r.body)
    );
  }

}
