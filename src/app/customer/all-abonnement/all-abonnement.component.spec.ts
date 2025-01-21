import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllAbonnementComponent } from './all-abonnement.component';

describe('AllAbonnementComponent', () => {
  let component: AllAbonnementComponent;
  let fixture: ComponentFixture<AllAbonnementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllAbonnementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllAbonnementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
