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
        outlet: 'child1'
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
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
