import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivatAccountComponent } from './activat-account.component';

describe('ActivatAccountComponent', () => {
  let component: ActivatAccountComponent;
  let fixture: ComponentFixture<ActivatAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivatAccountComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActivatAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
