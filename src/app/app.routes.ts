import { ProfileComponent } from './customer/profile/profile.component';
import { DoAbonnementComponent } from './customer/do-abonnement/do-abonnement.component';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { DashboardCustomerComponent } from './customer/dashboard-customer/dashboard-customer.component';
import { WelcomComponent } from './pages/welcom/welcom.component';
import { ClientComponent } from './admin/client/client.component';
import { BoulevardComponent } from './admin/boulevard/boulevard.component';
import { PanneauComponent } from './admin/panneau/panneau.component';
import { VoirPlusComponent } from './admin/components/voir-plus/voir-plus.component';
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
        path: 'panneau',
        component: PanneauComponent,
      },
      {
        path: 'client/detail/:id',
        component: VoirPlusComponent,
      },
      {
        path: 'detail/message/:id',
        component: DetailMessageComponent,
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
