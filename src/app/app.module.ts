import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { MenuComponent } from './menu/menu.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataTablesModule } from "angular-datatables";
import { WarehouseManagementComponent } from './warehouse-management/warehouse-management.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { AuthService } from './services/auth.service';
import { WarehouseService } from './services/warehouse.service';
import { WarehouseDetailComponent } from './warehouse-detail/warehouse-detail.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UserChmodComponent } from './user-chmod/user-chmod.component';
import { TrackerManagementComponent } from './tracker-management/tracker-management.component';
import { OperationManagementComponent } from './operation-management/operation-management.component';
import { TrackerProfilComponent } from './tracker-profil/tracker-profil.component';
import { PartnerManagementComponent } from './partner-management/partner-management.component';
import { PartnerProfileComponent } from './partner-profile/partner-profile.component';
import { AccountManagementComponent } from './account-management/account-management.component';
import { FinanceManagementComponent } from './finance-management/finance-management.component';
import { CampaignManagementComponent } from './campaign-management/campaign-management.component';
import { PreFinanceManagementComponent } from './pre-finance-management/pre-finance-management.component';
import { CampaignDetailComponent } from './campaign-detail/campaign-detail.component';
import { PlanterManagementComponent } from './planter-management/planter-management.component';
import { PlanterProfilComponent } from './planter-profil/planter-profil.component';
import { SalesBuyingManagementComponent } from './sales-buying-management/sales-buying-management.component';
import { SalesBuyingDetailComponent } from './sales-buying-detail/sales-buying-detail.component';
import { SalesHistoryComponent } from './sales-history/sales-history.component';
import { ObjectiveManagementComponent } from './objective-management/objective-management.component';
import { ObjectiveDetailComponent } from './objective-detail/objective-detail.component';
import { ChargeManagementComponent } from './charge-management/charge-management.component';
import { ChargeDetailComponent } from './charge-detail/charge-detail.component';
import { EntrystockManagementComponent } from './entrystock-management/entrystock-management.component';
import { ChargeInsertComponent } from './charge-insert/charge-insert.component';
import { ChargeModificationComponent } from './charge-modification/charge-modification.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SidebarComponent,
    MainpageComponent,
    MenuComponent,
    UserManagementComponent,
    WarehouseManagementComponent,
    LoginComponent,
    WarehouseDetailComponent,
    NavbarComponent,
    UserChmodComponent,
    TrackerManagementComponent,
    OperationManagementComponent,
    TrackerProfilComponent,
    PartnerManagementComponent,
    PartnerProfileComponent,
    AccountManagementComponent,
    FinanceManagementComponent,
    CampaignManagementComponent,
    PreFinanceManagementComponent,
    CampaignDetailComponent,
    PlanterManagementComponent,
    PlanterProfilComponent,
    SalesBuyingManagementComponent,
    SalesBuyingDetailComponent,
    SalesHistoryComponent,
    ObjectiveManagementComponent,
    ObjectiveDetailComponent,
    ChargeManagementComponent,
    ChargeDetailComponent,
    EntrystockManagementComponent,
    ChargeInsertComponent,
    ChargeModificationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DataTablesModule,
    HttpClientModule,
    FormsModule,
    MatProgressBarModule
  ],
  providers: [
    AuthService,
    WarehouseService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
