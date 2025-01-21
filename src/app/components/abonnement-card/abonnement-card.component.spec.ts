import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbonnementCardComponent } from './abonnement-card.component';

describe('AbonnementCardComponent', () => {
  let component: AbonnementCardComponent;
  let fixture: ComponentFixture<AbonnementCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbonnementCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AbonnementCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
