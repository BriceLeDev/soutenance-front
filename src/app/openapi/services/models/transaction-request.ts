/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

export interface TransactionRequest {
  abonnementId?: number;
  amount?: number;
  chanel?: 'ALL' | 'MOBILE_MONEY' | 'CREDIT_CARD' | 'WALLET';
  currency?: 'XOF' | 'XAF' | 'CDF (Congolese Franc)' | 'GNF' | 'USD';
  dateTrans?: string;
  description?: string;
}
