import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {CustomerGroupService} from "../customer-group.service";
import {customerGroupNameValidator} from "../customer-group-validators";
import {CustomerGroup} from "../../../../shared/models/customer-group";
import * as CustomerGroupActions from '../store/customer-group.actions'
import * as fromCustomers from '../../store/index';

@Component({
  selector: 'app-customer-group-edit',
  templateUrl: './customer-group-edit.component.html',
  styleUrls: ['../../customers.component.scss']
})
export class CustomerGroupEditComponent implements OnInit {

  public customerGroupForm: FormGroup;

  get nameFormControl(): FormControl  {
    return this.customerGroupForm.get('name') as FormControl;
  };

  get isFormValid(): boolean {
    const { pristine, dirty, invalid, pending } = this.customerGroupForm;

    return (pristine || (dirty && invalid) || pending);
  }

  constructor(
    private store: Store<fromCustomers.State>,
    private fb: FormBuilder,
    private customerGroupService: CustomerGroupService) { }

  ngOnInit(): void {
    this.createForm();
  }

  private createForm(): void {
    this.customerGroupForm = this.fb.group({
      name: ['', {
        validators: [Validators.required],
        asyncValidators: [customerGroupNameValidator(this.customerGroupService)]
      }],
      status: [true]
    })
  }

  public onSubmit(): void {
    const customerGroup: CustomerGroup = this.customerGroupForm.value;

    this.store.dispatch(CustomerGroupActions.createCustomerGroup({ payload: customerGroup }));
  }
}
