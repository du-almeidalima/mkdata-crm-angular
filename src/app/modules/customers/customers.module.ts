import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import {ReactiveFormsModule} from "@angular/forms";

import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatRadioModule} from "@angular/material/radio";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatSelectModule} from "@angular/material/select";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatButtonModule} from "@angular/material/button";
import {MatNativeDateModule} from "@angular/material/core";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {NgxMaskModule} from "ngx-mask";
import {NgbAlertModule} from "@ng-bootstrap/ng-bootstrap";

import {CustomersComponent} from './customers.component';
import {SearchComponent} from './search/search.component';
import {CustomerComponent} from './customer/customer.component';
import {CustomerGroupComponent} from './customer-group/customer-group.component';
import {CustomersRoutesModule} from "./customers-routes.module";
import { CustomerEditComponent } from './customer/customer-edit/customer-edit.component';
import { CustomerDetailsComponent } from './customer/customer-details/customer-details.component';
import { CustomerGroupDetailsComponent } from './customer-group/customer-group-details/customer-group-details.component';
import { CustomerGroupEditComponent } from './customer-group/customer-group-edit/customer-group-edit.component';
import { SearchInputComponent } from './search/search-input/search-input.component';
import { SearchResultComponent } from './search/search-result/search-result.component';
import * as fromCustomers from './store';


@NgModule({
  declarations: [
    CustomersComponent,
    SearchComponent,
    CustomerComponent,
    CustomerGroupComponent,
    CustomerEditComponent,
    CustomerDetailsComponent,
    CustomerGroupDetailsComponent,
    CustomerGroupEditComponent,
    SearchInputComponent,
    SearchResultComponent],
  imports: [
    CommonModule,
    CustomersRoutesModule,
    ReactiveFormsModule,
    StoreModule.forFeature('customers', fromCustomers.customersReducers),
    EffectsModule.forFeature(fromCustomers.customersEffects),
    NgxMaskModule.forChild(),
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
    MatSlideToggleModule,
    NgbAlertModule
  ]
})
export class CustomersModule { }
