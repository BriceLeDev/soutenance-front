import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowMoreAbonnementComponent } from './show-more-abonnement.component';

describe('ShowMoreAbonnementComponent', () => {
  let component: ShowMoreAbonnementComponent;
  let fixture: ComponentFixture<ShowMoreAbonnementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowMoreAbonnementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowMoreAbonnementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
