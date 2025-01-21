import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAbonnementComponent } from './show-abonnement.component';

describe('ShowAbonnementComponent', () => {
  let component: ShowAbonnementComponent;
  let fixture: ComponentFixture<ShowAbonnementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowAbonnementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowAbonnementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
