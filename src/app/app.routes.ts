import { ProfileComponent } from './customer/profile/profile.component';
import { DoAbonnementComponent } from './customer/do-abonnement/do-abonnement.component';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { DashboardCustomerComponent } from './customer/dashboard-customer/dashboard-customer.component';
import { WelcomComponent } from './pages/welcom/welcom.component';
import { ClientComponent } from './admin/client/client.component';
import { BoulevardComponent } from './admin/boulevard/boulevard.component';
import { PanneauComponent } from './admin/panneau/panneau.component';
import { VoirPlusComponent } from './admin/components/user-detail/voir-plus.component';
import { DetailMessageComponent } from './admin/components/detail-message/detail-message.component';
import { LoginComponent } from './pages/login/login.component';
import { NgModule } from '@angular/core';
import { RegisterComponent } from './pages/register/register.component';
import { ActivatAccountComponent } from './pages/activat-account/activat-account.component';
import { AllAbonnementComponent } from './customer/all-abonnement/all-abonnement.component';
import { InboxComponent } from './customer/inbox/inbox.component';
import { AbonnementDetailComponent } from './customer/abonnement-detail/abonnement-detail.component';
import { PaymentComponent } from './customer/payment/payment.component';
import { AbonnementComponent } from './customer/abonnement/abonnement.component';
import { AbonnementsComponent } from './admin/abonnements/abonnements.component';
import { ShowAbonnementComponent } from './admin/show-abonnement/show-abonnement.component';
import { authGuard } from './guards/auth.guard';
import { authAdminGuard } from './guards/auth-admin.guard';
import { NoFoundComponent } from './pages/no-found/no-found.component';
import { UnauthorizeComponent } from './pages/unauthorize/unauthorize.component';
import { LoadingComponent } from './shared/components/loading/loading.component';
import { StatisticComponent } from './admin/components/statistic/statistic.component';
import { AdministrationComponent } from './admin/administration/administration.component';
import { PanneauDetailsComponent } from './admin/voirPlusComponents/panneau-details/panneau-details.component';
import { AbonnementDetailsComponent } from './admin/voirPlusComponents/abonnement-details/abonnement-details.component';
import { BoulevardsDetailsComponent } from './admin/voirPlusComponents/boulevards-details/boulevards-details.component';
import { ShowMoreAbonnementComponent } from './customer/show-more-abonnement/show-more-abonnement.component';
import { TransactionComponent } from './admin/transaction/transaction.component';
import { AdminAbnDetailComponent } from './admin/admin-abn-detail/admin-abn-detail.component';

export const routes: Routes = [
  {
    path: 'admin',
    component: DashboardComponent,
    canActivate: [authAdminGuard],
    children: [
      {
        path: 'client',
        component: ClientComponent,
      },
      {
        path: 'abonnements',
        component: AbonnementsComponent,
      },
      {
        path: 'show-abonnement',
        component: ShowAbonnementComponent,
      },
      {
        path: 'boulevard',
        component: BoulevardComponent,
      },
      {
        path: 'panneau/panneau-affiche',
        component: PanneauComponent,
      },
      {
        path: 'statistic',
        component: StatisticComponent,
      },
      {
        path: 'administration',
        component: AdministrationComponent,
      },
      {
        path: 'transaction',
        component: TransactionComponent,
      },
      {
        path: 'client/detail/:id',
        component: VoirPlusComponent,
      },
      {
        path: 'pannneau/detail/:id',
        component: PanneauDetailsComponent,
      },
      {
        path: 'abonnement/detail/:abonnementId/:userId',
        component: AdminAbnDetailComponent,
      },
      {
        path: 'boulevard/detail/:id',
        component: BoulevardsDetailsComponent,
      },
    ],
  },
  {
    path: 'welcom',
    component: WelcomComponent,
  },
  {
    path: 'customer',
    component: DashboardCustomerComponent,
    canActivate: [authGuard],
    children:[
      {
        path: 'do-abonnement', pathMatch: 'full',
       component: DoAbonnementComponent,
      },
      {
        path: 'abonnement',
       component: AbonnementComponent,
      },
      {
        path: 'all-abonnement',
       component: AllAbonnementComponent,
      },
      {
        path: 'inbox',
       component: InboxComponent,
      },
      {
        path: 'profile',
       component: ProfileComponent,
      },
      {
        path: 'abonnement-detail',
        component: AbonnementDetailComponent,
      },
      {
        path: 'payment',
        component: PaymentComponent,
      },
      {
        path: 'abonnement/:id',
        component: ShowMoreAbonnementComponent,
      },

    ]
  },
  {
    path: 'login',
    component: LoginComponent,
  },

  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'activate-account',
    component: ActivatAccountComponent,
  },
  {
    path: 'no-found',
    component: NoFoundComponent,
  },
  {
    path: 'unauthorize',
    component: UnauthorizeComponent,
  },
  {
    path: 'redirection',
    component: LoadingComponent,
  },

  {
    path: '',
    redirectTo: 'welcom',
    pathMatch: 'full',
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutes {}
