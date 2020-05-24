import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.scss']
})
export class CustomerEditComponent implements OnInit {
  public customerForm: FormGroup;
  public cpfCnpjTitle = 'CPF';
  public rgIeTitle = 'RG';

  public get phoneControls(): AbstractControl[] {
    return (this.customerForm.get('phones') as FormArray).controls
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
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
    console.log(this.customerForm.value);
  }
}
