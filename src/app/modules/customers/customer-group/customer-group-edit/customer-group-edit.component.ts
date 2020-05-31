import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {select, Store} from "@ngrx/store";
import {Subscription} from "rxjs";

import {CustomerGroupService} from "../customer-group.service";
import {customerGroupNameValidator} from "../customer-group-validators";
import {Message} from "../../../../shared/message";
import {CustomerGroup} from "../../../../shared/models/customer-group";
import * as CustomerGroupActions from '../store/customer-group.actions'
import * as fromCustomers from '../../store/index';

@Component({
  selector: 'app-customer-group-edit',
  templateUrl: './customer-group-edit.component.html',
  styleUrls: ['../../customers.component.scss']
})
export class CustomerGroupEditComponent implements OnInit, OnDestroy {

  private storeSub: Subscription;
  public message: Message;
  public customerGroupForm: FormGroup;
  public isEditMode: boolean;

  get nameFormControl(): FormControl  {
    return this.customerGroupForm.get('name') as FormControl;
  };

  get isFormValid(): boolean {
    const { dirty, invalid, pending } = this.customerGroupForm;
    return (invalid || dirty && invalid || pending);
  }

  constructor(
    private store: Store<fromCustomers.State>,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private customerGroupService: CustomerGroupService) { }

  ngOnInit(): void {
    this.createForm();

    // Verificando se existe um id na rota, que indica que é uma edição
    this.isEditMode = !!this.route.snapshot.params.id;

    this.storeSub = this.store.pipe( select(fromCustomers.getCustomerGroupState))
      .subscribe(customerGroupState => {
        this.message = customerGroupState.message;

        if (this.isEditMode) {
          const currentCustomerGroup = customerGroupState.current;
          // Atualizando o form com os valores CustomerGroup
          this.customerGroupForm.patchValue({
            name: currentCustomerGroup?.name,
            status: currentCustomerGroup?.status
          });
          // Atualizando o Validator
          this.customerGroupForm.get('name').setAsyncValidators(
            customerGroupNameValidator(this.customerGroupService, currentCustomerGroup?.name)
          );
        } else {
          this.customerGroupForm.get('name')
            .setAsyncValidators(customerGroupNameValidator(this.customerGroupService, ''));
        }
      })
  }

  ngOnDestroy(): void {
    if (this.storeSub) {
       this.storeSub.unsubscribe();
    }
  }

  private createForm(): void {
    this.customerGroupForm = this.fb.group({
      name: ['', {
        validators: [Validators.required]
      }],
      status: [true]
    })
  }

  // Actions
  public onDismissMessage(): void {
    this.store.dispatch(CustomerGroupActions.dismissMessage());
  }

  public onSubmit(): void {
    const customerGroup: CustomerGroup = this.customerGroupForm.value;

    if (this.isEditMode) {
      customerGroup.id = this.route.snapshot.params.id;
      this.store.dispatch(CustomerGroupActions.updateCustomerGroup({ payload: customerGroup }));
    } else {
      this.store.dispatch(CustomerGroupActions.createCustomerGroup({ payload: customerGroup }));
    }
  }
}
