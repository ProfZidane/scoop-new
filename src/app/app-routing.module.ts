import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { MenuComponent } from './menu/menu.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { WarehouseManagementComponent } from './warehouse-management/warehouse-management.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { WarehouseDetailComponent } from './warehouse-detail/warehouse-detail.component';
import { UserChmodComponent } from './user-chmod/user-chmod.component';
import { TrackerManagementComponent } from './tracker-management/tracker-management.component';
import { TrackerProfilComponent } from './tracker-profil/tracker-profil.component';
import { PartnerManagementComponent } from './partner-management/partner-management.component';
import { PartnerProfileComponent } from './partner-profile/partner-profile.component';
import { AccountManagementComponent } from './account-management/account-management.component';
import { FinanceManagementComponent } from './finance-management/finance-management.component';
import { PreFinanceManagementComponent } from './pre-finance-management/pre-finance-management.component';
import { CampaignManagementComponent } from './campaign-management/campaign-management.component';
import { CampaignDetailComponent } from './campaign-detail/campaign-detail.component';
import { PlanterManagementComponent } from './planter-management/planter-management.component';
import { PlanterProfilComponent } from './planter-profil/planter-profil.component';
import { SalesBuyingManagementComponent } from './sales-buying-management/sales-buying-management.component';
import { SalesBuyingDetailComponent } from './sales-buying-detail/sales-buying-detail.component';
import { SalesHistoryComponent } from './sales-history/sales-history.component';
import { ObjectiveManagementComponent } from './objective-management/objective-management.component';
import { ChargeManagementComponent } from './charge-management/charge-management.component';
import { ChargeDetailComponent } from './charge-detail/charge-detail.component';
import { EntrystockManagementComponent } from './entrystock-management/entrystock-management.component';
import { ChargeInsertComponent } from './charge-insert/charge-insert.component';
import { ChargeModificationComponent } from './charge-modification/charge-modification.component';
import { VenteManagementComponent } from './vente-management/vente-management.component';
import { VenteHistoryComponent } from './vente-history/vente-history.component';
import { InventoryManagementComponent } from './inventory-management/inventory-management.component';


const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: MainpageComponent,
        outlet: 'child1',
      },
      {
        path: 'menu',
        component: MenuComponent,
        outlet: 'child1'
      },
      {
        path: 'user-manage',
        component: UserManagementComponent,
        outlet: 'child1'
      },
      {
        path: 'user-right/:id',
        component: UserChmodComponent,
        outlet: 'child1'
      },
      {
        path: 'ware-manage',
        component: WarehouseManagementComponent,
        outlet: 'child1',
      },
      {
        path: 'ware-detail/:id',
        component: WarehouseDetailComponent,
        outlet: 'child1',
        canActivate: [AuthGuard]
      },
      {
        path: 'tracker-manage',
        component: TrackerManagementComponent,
        outlet: 'child1'
      },
      {
        path: 'tracker-profile/:id',
        component: TrackerProfilComponent,
        outlet: 'child1'
      },
      {
        path: 'partner-manage',
        component: PartnerManagementComponent,
        outlet: 'child1'
      },
      {
        path: 'partner-profile/:id',
        component: PartnerProfileComponent,
        outlet: 'child1'
      },
      {
        path: 'account-manage',
        component: AccountManagementComponent,
        outlet: 'child1'
      },
      {
        path: 'finance-manage',
        component: FinanceManagementComponent,
        outlet: 'child1'
      },
      {
        path: 'pre-finance-manage',
        component: PreFinanceManagementComponent,
        outlet: 'child1'
      },
      {
        path: 'campaign-manage',
        component: CampaignManagementComponent,
        outlet: 'child1'
      },
      {
        path: 'campaign-detail/:id',
        component: CampaignDetailComponent,
        outlet: 'child1'
      },
      {
        path: 'planter-manage',
        component: PlanterManagementComponent,
        outlet: 'child1'
      },
      {
        path: 'planter-profil/:id',
        component: PlanterProfilComponent,
        outlet: 'child1'
      },
      {
        path: 'sales-manage',
        component: SalesBuyingManagementComponent,
        outlet: 'child1'
      },
      {
        path: 'sales-detail/:id',
        component: SalesBuyingDetailComponent,
        outlet: 'child1'
      },
      {
        path: 'sales-history',
        component: SalesHistoryComponent,
        outlet: 'child1'
      },
      {
        path: 'objectif-manage',
        component: ObjectiveManagementComponent,
        outlet: 'child1'
      },
      {
        path: 'charge-manage',
        component: ChargeManagementComponent,
        outlet: 'child1'
      },
      {
        path: 'charge-detail/:id',
        component: ChargeDetailComponent,
        outlet: 'child1'
      },
      {
        path: 'entry-stock',
        component: EntrystockManagementComponent,
        outlet: 'child1'
      },
      {
        path: 'charge-insert',
        component: ChargeInsertComponent,
        outlet: 'child1'
      },
      {
        path: 'charge-modify/:id',
        component: ChargeModificationComponent,
        outlet: 'child1'
      },
      {
        path: 'vente-manage',
        component: VenteManagementComponent,
        outlet: 'child1'
      },
      {
        path: 'vente-history',
        component: VenteHistoryComponent,
        outlet: 'child1'
      },
      {
        path: 'inventory-manage',
        component: InventoryManagementComponent,
        outlet: 'child1'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
