import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { MenuComponent } from './menu/menu.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { WarehouseManagementComponent } from './warehouse-management/warehouse-management.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
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
        path: 'ware-manage',
        component: WarehouseManagementComponent,
        outlet: 'child1'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
