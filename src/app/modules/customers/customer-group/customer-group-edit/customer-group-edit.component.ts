import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {select, Store} from "@ngrx/store";
import {CustomerGroupService} from "../customer-group.service";
import {customerGroupNameValidator} from "../customer-group-validators";
import {CustomerGroup} from "../../../../shared/models/customer-group";
import * as CustomerGroupActions from '../store/customer-group.actions'
import * as fromCustomers from '../../store/index';
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-customer-group-edit',
  templateUrl: './customer-group-edit.component.html',
  styleUrls: ['../../customers.component.scss']
})
export class CustomerGroupEditComponent implements OnInit {

  public customerGroupForm: FormGroup;
  public isEditMode: boolean;
  private storeSub: Subscription;

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
    private route: ActivatedRoute,
    private router: Router,
    private customerGroupService: CustomerGroupService) { }

  ngOnInit(): void {
    this.createForm();

    // Verificando se existe um id na rota, que indica que é uma edição
    this.isEditMode = !!this.route.snapshot.params.id;

    if (this.isEditMode) {
      this.storeSub = this.store.pipe( select(fromCustomers.getCustomerGroupState))
        .subscribe(customerGroupState => {
          const currentCustomerGroup = customerGroupState.current;

          this.customerGroupForm.patchValue({
            name: currentCustomerGroup?.name,
            status: currentCustomerGroup?.status
          });

          // Atualizando o Validator
          this.customerGroupForm.get('name').setAsyncValidators(
            customerGroupNameValidator(this.customerGroupService, currentCustomerGroup?.name)
          );
        })
    } else {
      this.customerGroupForm.get('name')
        .setAsyncValidators(customerGroupNameValidator(this.customerGroupService, ''))
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
  public onSubmit(): void {
    const customerGroup: CustomerGroup = this.customerGroupForm.value;

    this.store.dispatch(CustomerGroupActions.createCustomerGroup({ payload: customerGroup }));
  }
}
