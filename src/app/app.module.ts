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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SidebarComponent,
    MainpageComponent,
    MenuComponent,
    UserManagementComponent,
    WarehouseManagementComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DataTablesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
