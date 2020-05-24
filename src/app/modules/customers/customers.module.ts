import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CustomersComponent} from './customers.component';
import {SearchComponent} from './search/search.component';
import {CustomerComponent} from './customer/customer.component';
import {CustomerGroupComponent} from './customer-group/customer-group.component';
import {CustomersRoutesModule} from "./customers-routes.module";
import { CustomerEditComponent } from './customer/customer-edit/customer-edit.component';
import { CustomerDetailsComponent } from './customer/customer-details/customer-details.component';
import { CustomerGroupDetailsComponent } from './customer-group/customer-group-details/customer-group-details.component';
import { CustomerGroupEditComponent } from './customer-group/customer-group-edit/customer-group-edit.component';


@NgModule({
  declarations: [CustomersComponent, SearchComponent, CustomerComponent, CustomerGroupComponent, CustomerEditComponent, CustomerDetailsComponent, CustomerGroupDetailsComponent, CustomerGroupEditComponent],
  imports: [
    CommonModule,
    CustomersRoutesModule
  ]
})
export class CustomersModule { }
