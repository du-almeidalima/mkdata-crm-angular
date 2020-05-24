import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerGroupDetailsComponent } from './customer-group-details.component';

describe('CustomerGroupDetailsComponent', () => {
  let component: CustomerGroupDetailsComponent;
  let fixture: ComponentFixture<CustomerGroupDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerGroupDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerGroupDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
