import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoulevardComponent } from './boulevard.component';

describe('BoulevardComponent', () => {
  let component: BoulevardComponent;
  let fixture: ComponentFixture<BoulevardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoulevardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BoulevardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
