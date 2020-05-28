import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {CustomersComponent} from "./customers.component";
import {AuthGuard} from "../../core/auth/auth.guard";
import {SearchComponent} from "./search/search.component";
import {CustomerGroupComponent} from "./customer-group/customer-group.component";
import {CustomerEditComponent} from "./customer/customer-edit/customer-edit.component";
import {CustomerDetailsComponent} from "./customer/customer-details/customer-details.component";
import {CustomerGroupDetailsComponent} from "./customer-group/customer-group-details/customer-group-details.component";
import {CustomerGroupEditComponent} from "./customer-group/customer-group-edit/customer-group-edit.component";
import {CustomerGroupResolver} from "./customer-group/customer-group-resolver.service";
import {CustomerResolver} from "./customer/customer-resolver.service";

const CUSTOMERS_ROUTES: Routes = [
  { path: '', component: CustomersComponent, canActivate: [ AuthGuard ], children:
      [
        { path: '', redirectTo: 'consulta/', pathMatch: 'full' },
        { path: 'consulta', redirectTo: 'consulta/'},
        { path: 'consulta/:term', component: SearchComponent},
        { path: 'cliente', component: CustomersComponent, children:
            [
              { path: 'cadastro', component: CustomerEditComponent, resolve: [CustomerGroupResolver] },
              { path: ':id/edit', component: CustomerEditComponent, resolve: [CustomerGroupResolver, CustomerResolver] },
              { path: ':id', component: CustomerDetailsComponent, resolve: [CustomerResolver] },
              { path: '', redirectTo: 'cadastro', pathMatch: 'full' },
            ]
        },
        { path: 'grupo', component: CustomerGroupComponent, children:
            [
              { path: 'cadastro', component: CustomerGroupEditComponent },
              { path: ':id/edit', component: CustomerGroupEditComponent },
              { path: ':id', component: CustomerGroupDetailsComponent },
              { path: '', redirectTo: 'cadastro', pathMatch: 'full' },
            ]
        },
      ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(CUSTOMERS_ROUTES) ],
  exports: [ RouterModule ]
})
export class CustomersRoutesModule {}
