import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerAbnDetailComponent } from './customer-abn-detail.component';

describe('CustomerAbnDetailComponent', () => {
  let component: CustomerAbnDetailComponent;
  let fixture: ComponentFixture<CustomerAbnDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerAbnDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerAbnDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
