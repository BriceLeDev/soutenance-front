import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAbnDetailComponent } from './admin-abn-detail.component';

describe('AdminAbnDetailComponent', () => {
  let component: AdminAbnDetailComponent;
  let fixture: ComponentFixture<AdminAbnDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminAbnDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminAbnDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
