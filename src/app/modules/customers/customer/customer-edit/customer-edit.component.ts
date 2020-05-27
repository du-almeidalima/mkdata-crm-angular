import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {select, Store} from "@ngrx/store";
import {Person} from "../../../../shared/models/enum/person";
import {CustomerGroup} from "../../../../shared/models/customer-group";
import {Customer} from "../../../../shared/models/customer";
import * as CustomerActions from '../store/customer.actions';
import * as fromCustomers from '../../store/index';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.scss']
})
export class CustomerEditComponent implements OnInit {

  public customerForm: FormGroup;
  public cpfCnpjTitle = 'CPF';
  public rgIeTitle = 'RG';
  public customerGroups: CustomerGroup[] = [];

  public get phoneControls(): FormArray {
    return (this.customerForm.get('phones') as FormArray);
  }

  constructor(private fb: FormBuilder, private store: Store<fromCustomers.CustomersState>) { }

  ngOnInit(): void {
    this.createForm();
    // Recebendo o valor da ação disparada pelo CustomerGroupResolver e atribuindo os grupos disponíveis no formulário
    this.store.pipe(
      select(fromCustomers.getCustomerGroups)
    ).subscribe( customerGroups => {
      this.customerGroups = customerGroups;
      // Ativando o select
      if (this.customerGroups.length > 0) {
        this.customerForm.get('customerGroup').enable();
      }
    })
  }

  private createForm(): void {
    this.customerForm = this.fb.group({
      name: ['', Validators.required],
      type: [Person.FISICA, Validators.required],
      cpfCnpj: ['', Validators.required],
      rgIe: [''],
      registerDate: [new Date()],
      customerGroup: [{value: null, disabled: true}],
      status: [true],
      phones: this.fb.array([
        this.fb.control('')
      ])
    })

    this.customerForm.get('type').valueChanges.subscribe(v => {
      this.cpfCnpjTitle = v === 'FISICA' ? 'CPF' : 'CNPJ';
      this.rgIeTitle = v === 'FISICA' ? 'RG' : 'IE';
    })
  }

  public onAddPhone(): void {
    this.phoneControls.push(
      this.fb.control('')
    )
  }

  public oneRemovePhone(index: number): void {
    this.phoneControls.removeAt(index)
  }

  public onSubmit() {
    const customer: Customer = {
      ...this.customerForm.value,
      phones: [...this.customerForm.value.phones],
      registerDate: new Date(this.customerForm.value.registerDate).getTime(),
      customerGroup: this.customerGroups[this.customerForm.value.customerGroup]
    }
    this.store.dispatch(CustomerActions.createCustomer({ payload: customer }))
  }
}
