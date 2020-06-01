import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import {Subscription} from 'rxjs';
import {Person} from '../../../../shared/models/enum/person';
import {CustomerGroup} from '../../../../shared/models/customer-group';
import {Customer} from '../../../../shared/models/customer';
import {Message} from '../../../../shared/message';
import {cpfCpnjAsyncValidator} from '../customer-validators';
import {CustomerService} from '../customer.service';
import * as CustomerActions from '../store/customer.actions';
import * as CustomerCommonActions from '../../store/common.actions';
import * as fromCustomers from '../../store/index';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['../../customers.component.scss']
})
export class CustomerEditComponent implements OnInit, OnDestroy {

  private storeSub: Subscription;
  public isEditMode: boolean;
  public message: Message;
  public customerForm: FormGroup;
  public cpfCnpjTitle = 'CPF';
  public rgIeTitle = 'RG';
  public customerGroups: CustomerGroup[] = [];

  public get phoneControls(): FormArray {
    return (this.customerForm.get('phones') as FormArray);
  }

  public get cpfCnpjFormControl(): FormControl {
    return (this.customerForm.get('cpfCnpj') as FormControl);
  }

  public get cpfCnpjMask(): string {
    return this.cpfCnpjTitle === 'CPF' ? '000.000.000-00' : '00.000.000/0000-00';
  }

  public get rgIeMask(): string {
    // Mask de IE para SP
    return this.rgIeTitle === 'RG' ? '00.000.000-0' : '000.000.000.000';
  }

  public get isFormValid(): boolean {
    const { dirty, invalid, pending } = this.customerForm;
    return (invalid || dirty && invalid || pending);
  }

  constructor(
    private fb: FormBuilder,
    private store: Store<fromCustomers.State>,
    private route: ActivatedRoute,
    private customerService: CustomerService
    ) { }

  ngOnInit(): void {
    this.createForm();
    // Verificando se existe um id na rota, que indica que é uma edição
    this.isEditMode = !!this.route.snapshot.params?.id;

    this.storeSub = this.store.pipe( select(fromCustomers.getFeatureRootState) )
      .subscribe( customersState => {

        this.message = customersState.common.message;

        if (this.isEditMode) {
          const currentCustomer = customersState.customer.current;
          // Atualizando o form com os valores CustomerGroup
          this.customerForm.patchValue({
            name: currentCustomer?.name,
            type: currentCustomer?.type,
            cpfCnpj: currentCustomer?.cpfCnpj,
            rgIe: currentCustomer?.rgIe,
            registerDate: new Date(currentCustomer?.registerDate),
            customerGroup: currentCustomer?.customerGroup?.id,
            status: currentCustomer?.status,
            phones: currentCustomer?.phones ? currentCustomer.phones : []
          });
          // Atualizando o Validator
          this.customerForm.get('cpfCnpj').setAsyncValidators(
            cpfCpnjAsyncValidator(this.customerService, currentCustomer?.cpfCnpj)
          );
        } else {
          this.customerForm.get('cpfCnpj').setAsyncValidators(
            cpfCpnjAsyncValidator(this.customerService, '')
          );
        }
    });

    // Recebendo o valor da ação disparada pelo CustomerGroupsResolver e atribuindo os grupos disponíveis no formulário
    this.store.pipe(select(fromCustomers.getCustomerGroupState))
      .subscribe( customerGroupState => {
      this.customerGroups = customerGroupState.customerGroups;
      // Ativando o select
      if (this.customerGroups.length > 0) {
        this.customerForm.get('customerGroup').enable();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }

  private createForm(): void {
    this.customerForm = this.fb.group({
      name: ['', Validators.required],
      type: [Person.FISICA, Validators.required],
      cpfCnpj: ['', {
        validators: [Validators.required]
      }],
      rgIe: [''],
      registerDate: [new Date()],
      customerGroup: [{
        value: null,
        disabled: true
      }],
      status: [true],
      phones: this.fb.array([
        this.fb.control('')
      ])
    });

    this.customerForm.get('type').valueChanges.subscribe(value => {
      if (value === Person.FISICA) {
        this.cpfCnpjTitle = 'CPF';
        this.rgIeTitle = 'RG';
      } else {
        this.cpfCnpjTitle = 'CNPJ';
        this.rgIeTitle = 'IE';
      }

      this.customerForm.updateValueAndValidity();
    });
  }

  // Actions
  public onAddPhone(): void {
    this.phoneControls.push(
      this.fb.control('')
    );
  }

  public oneRemovePhone(index: number): void {
    this.phoneControls.removeAt(index);
  }

  public onDismissMessage(): void {
    this.store.dispatch(CustomerCommonActions.dismissMessage());
  }

  public onSubmit(): void {
    const customer: Customer = {
      ...this.customerForm.value,
      phones: [...this.customerForm.value.phones],
      registerDate: new Date(this.customerForm.value.registerDate).getTime(),
      customerGroup: this.customerGroups[this.customerForm.value.customerGroup]
    };

    if (this.isEditMode) {
      customer.id = this.route.snapshot.params.id;
      this.store.dispatch(CustomerActions.updateCustomer({ payload: customer }));
    } else {
      this.store.dispatch(CustomerActions.createCustomer({ payload: customer }));
    }
  }
}
