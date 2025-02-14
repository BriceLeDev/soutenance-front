/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { Abonnement } from '../models/abonnement';
export interface Transaction {
  abonnement?: Abonnement;
  amount?: number;
  currency?: 'XOF (West African CFA Franc)' | 'XAF (Central African CFA Franc)' | 'CDF (Congolese Franc)' | 'GNF (Guinean Franc)' | 'USD (United States Dollar)';
  dateTrans?: string;
  description?: string;
  id?: number;
  status?: string;
  transactionId?: string;
}
