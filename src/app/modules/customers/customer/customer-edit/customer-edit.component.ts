import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import * as CustomerActions from '../store/customer.actions';
import * as fromCustomers from '../store/customer.reducer';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.scss']
})
export class CustomerEditComponent implements OnInit {

  public customerForm: FormGroup;
  public cpfCnpjTitle = 'CPF';
  public rgIeTitle = 'RG';
  public customerGroups = ['Distribuidor', 'Revendedor', 'Manutenção']

  public get phoneControls(): AbstractControl[] {
    return (this.customerForm.get('phones') as FormArray).controls
  }

  constructor(private fb: FormBuilder, private store: Store<fromCustomers.CustomerState>) { }

  ngOnInit(): void {
    this.createForm();

    // TODO: Store Get Groups
  }

  private createForm(): void {
    this.customerForm = this.fb.group({
      name: ['', Validators.required],
      type: ['fisica', Validators.required],
      cpfCnpj: ['', Validators.required],
      rgIe: [''],
      registerDate: [''],
      group: [''],
      status: [true],
      phones: this.fb.array([
        this.fb.control('')
      ])
    })

    this.customerForm.get('type').valueChanges.subscribe(v => {
      this.cpfCnpjTitle = v === 'fisica' ? 'CPF' : 'CNPJ';
      this.rgIeTitle = v === 'fisica' ? 'RG' : 'IE';
    })
  }

  public onAddPhone(): void {
    (this.customerForm.get('phones') as FormArray).push(
      this.fb.control('')
    )
  }

  public oneRemovePhone(index: number): void {
    (this.customerForm.get('phones') as FormArray).removeAt(index)
  }

  public onSubmit() {
    const customer = {...this.customerForm.value}
    this.store.dispatch(CustomerActions.createCustomer(customer))
  }
}
