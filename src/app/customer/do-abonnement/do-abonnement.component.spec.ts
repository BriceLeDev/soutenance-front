import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoAbonnementComponent } from './do-abonnement.component';

describe('DoAbonnementComponent', () => {
  let component: DoAbonnementComponent;
  let fixture: ComponentFixture<DoAbonnementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoAbonnementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DoAbonnementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
