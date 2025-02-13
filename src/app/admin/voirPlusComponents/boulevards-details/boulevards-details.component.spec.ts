import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoulevardsDetailsComponent } from './boulevards-details.component';

describe('BoulevardsDetailsComponent', () => {
  let component: BoulevardsDetailsComponent;
  let fixture: ComponentFixture<BoulevardsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoulevardsDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BoulevardsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
