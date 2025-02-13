import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanneauDetailsComponent } from './panneau-details.component';

describe('PanneauDetailsComponent', () => {
  let component: PanneauDetailsComponent;
  let fixture: ComponentFixture<PanneauDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanneauDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PanneauDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
