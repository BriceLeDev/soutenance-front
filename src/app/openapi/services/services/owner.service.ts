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

import { getAllAdmin } from '../fn/owner/get-all-admin';
import { GetAllAdmin$Params } from '../fn/owner/get-all-admin';
import { getAllCustomer } from '../fn/owner/get-all-customer';
import { GetAllCustomer$Params } from '../fn/owner/get-all-customer';
import { getAllCustomerWithAbonnementFalse } from '../fn/owner/get-all-customer-with-abonnement-false';
import { GetAllCustomerWithAbonnementFalse$Params } from '../fn/owner/get-all-customer-with-abonnement-false';
import { getAllCustomerWithAbonnementTrue } from '../fn/owner/get-all-customer-with-abonnement-true';
import { GetAllCustomerWithAbonnementTrue$Params } from '../fn/owner/get-all-customer-with-abonnement-true';
import { getTheUserById } from '../fn/owner/get-the-user-by-id';
import { GetTheUserById$Params } from '../fn/owner/get-the-user-by-id';
import { getUserByEmail } from '../fn/owner/get-user-by-email';
import { GetUserByEmail$Params } from '../fn/owner/get-user-by-email';
import { PageResponseUserResponse } from '../models/page-response-user-response';
import { register } from '../fn/owner/register';
import { Register$Params } from '../fn/owner/register';
import { removeUserFidelisation } from '../fn/owner/remove-user-fidelisation';
import { RemoveUserFidelisation$Params } from '../fn/owner/remove-user-fidelisation';
import { updateUser } from '../fn/owner/update-user';
import { UpdateUser$Params } from '../fn/owner/update-user';
import { updateUserBlocked } from '../fn/owner/update-user-blocked';
import { UpdateUserBlocked$Params } from '../fn/owner/update-user-blocked';
import { updateUserDeBlocked } from '../fn/owner/update-user-de-blocked';
import { UpdateUserDeBlocked$Params } from '../fn/owner/update-user-de-blocked';
import { updateUserFidelisationToFalse } from '../fn/owner/update-user-fidelisation-to-false';
import { UpdateUserFidelisationToFalse$Params } from '../fn/owner/update-user-fidelisation-to-false';
import { UserResponse } from '../models/user-response';

@Injectable({ providedIn: 'root' })
export class OwnerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `updateUser()` */
  static readonly UpdateUserPath = '/owner/update/{owner-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateUser()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateUser$Response(params: UpdateUser$Params, context?: HttpContext): Observable<StrictHttpResponse<UserResponse>> {
    return updateUser(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateUser$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateUser(params: UpdateUser$Params, context?: HttpContext): Observable<UserResponse> {
    return this.updateUser$Response(params, context).pipe(
      map((r: StrictHttpResponse<UserResponse>): UserResponse => r.body)
    );
  }

  /** Path part for operation `updateUserFidelisationToFalse()` */
  static readonly UpdateUserFidelisationToFalsePath = '/owner/update/set-fidelisation/{owner-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateUserFidelisationToFalse()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateUserFidelisationToFalse$Response(params: UpdateUserFidelisationToFalse$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return updateUserFidelisationToFalse(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateUserFidelisationToFalse$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateUserFidelisationToFalse(params: UpdateUserFidelisationToFalse$Params, context?: HttpContext): Observable<{
}> {
    return this.updateUserFidelisationToFalse$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `removeUserFidelisation()` */
  static readonly RemoveUserFidelisationPath = '/owner/update/remove-fidelisation/{owner-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `removeUserFidelisation()` instead.
   *
   * This method doesn't expect any request body.
   */
  removeUserFidelisation$Response(params: RemoveUserFidelisation$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return removeUserFidelisation(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `removeUserFidelisation$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  removeUserFidelisation(params: RemoveUserFidelisation$Params, context?: HttpContext): Observable<{
}> {
    return this.removeUserFidelisation$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `updateUserDeBlocked()` */
  static readonly UpdateUserDeBlockedPath = '/owner/update/de-blocked-user/{owner-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateUserDeBlocked()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateUserDeBlocked$Response(params: UpdateUserDeBlocked$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return updateUserDeBlocked(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateUserDeBlocked$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateUserDeBlocked(params: UpdateUserDeBlocked$Params, context?: HttpContext): Observable<{
}> {
    return this.updateUserDeBlocked$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `updateUserBlocked()` */
  static readonly UpdateUserBlockedPath = '/owner/update/blocked-user/{owner-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateUserBlocked()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateUserBlocked$Response(params: UpdateUserBlocked$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return updateUserBlocked(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateUserBlocked$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateUserBlocked(params: UpdateUserBlocked$Params, context?: HttpContext): Observable<{
}> {
    return this.updateUserBlocked$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `register()` */
  static readonly RegisterPath = '/owner/add-admin';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `register()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  register$Response(params: Register$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return register(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `register$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  register(params: Register$Params, context?: HttpContext): Observable<{
}> {
    return this.register$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `getUserByEmail()` */
  static readonly GetUserByEmailPath = '/owner/{owner-email}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getUserByEmail()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUserByEmail$Response(params: GetUserByEmail$Params, context?: HttpContext): Observable<StrictHttpResponse<UserResponse>> {
    return getUserByEmail(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getUserByEmail$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUserByEmail(params: GetUserByEmail$Params, context?: HttpContext): Observable<UserResponse> {
    return this.getUserByEmail$Response(params, context).pipe(
      map((r: StrictHttpResponse<UserResponse>): UserResponse => r.body)
    );
  }

  /** Path part for operation `getTheUserById()` */
  static readonly GetTheUserByIdPath = '/owner/user-by-id';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getTheUserById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTheUserById$Response(params: GetTheUserById$Params, context?: HttpContext): Observable<StrictHttpResponse<UserResponse>> {
    return getTheUserById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getTheUserById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTheUserById(params: GetTheUserById$Params, context?: HttpContext): Observable<UserResponse> {
    return this.getTheUserById$Response(params, context).pipe(
      map((r: StrictHttpResponse<UserResponse>): UserResponse => r.body)
    );
  }

  /** Path part for operation `getAllCustomer()` */
  static readonly GetAllCustomerPath = '/owner/all-customer';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllCustomer()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllCustomer$Response(params?: GetAllCustomer$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseUserResponse>> {
    return getAllCustomer(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllCustomer$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllCustomer(params?: GetAllCustomer$Params, context?: HttpContext): Observable<PageResponseUserResponse> {
    return this.getAllCustomer$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseUserResponse>): PageResponseUserResponse => r.body)
    );
  }

  /** Path part for operation `getAllCustomerWithAbonnementFalse()` */
  static readonly GetAllCustomerWithAbonnementFalsePath = '/owner/all-customer-no-abonnement';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllCustomerWithAbonnementFalse()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllCustomerWithAbonnementFalse$Response(params?: GetAllCustomerWithAbonnementFalse$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseUserResponse>> {
    return getAllCustomerWithAbonnementFalse(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllCustomerWithAbonnementFalse$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllCustomerWithAbonnementFalse(params?: GetAllCustomerWithAbonnementFalse$Params, context?: HttpContext): Observable<PageResponseUserResponse> {
    return this.getAllCustomerWithAbonnementFalse$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseUserResponse>): PageResponseUserResponse => r.body)
    );
  }

  /** Path part for operation `getAllCustomerWithAbonnementTrue()` */
  static readonly GetAllCustomerWithAbonnementTruePath = '/owner/all-customer-abonnement';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllCustomerWithAbonnementTrue()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllCustomerWithAbonnementTrue$Response(params?: GetAllCustomerWithAbonnementTrue$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseUserResponse>> {
    return getAllCustomerWithAbonnementTrue(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllCustomerWithAbonnementTrue$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllCustomerWithAbonnementTrue(params?: GetAllCustomerWithAbonnementTrue$Params, context?: HttpContext): Observable<PageResponseUserResponse> {
    return this.getAllCustomerWithAbonnementTrue$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseUserResponse>): PageResponseUserResponse => r.body)
    );
  }

  /** Path part for operation `getAllAdmin()` */
  static readonly GetAllAdminPath = '/owner/all-admin';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllAdmin()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllAdmin$Response(params?: GetAllAdmin$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseUserResponse>> {
    return getAllAdmin(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllAdmin$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllAdmin(params?: GetAllAdmin$Params, context?: HttpContext): Observable<PageResponseUserResponse> {
    return this.getAllAdmin$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseUserResponse>): PageResponseUserResponse => r.body)
    );
  }

}
