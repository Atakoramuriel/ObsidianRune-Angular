import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLegacyComponent } from './edit-legacy.component';

describe('EditLegacyComponent', () => {
  let component: EditLegacyComponent;
  let fixture: ComponentFixture<EditLegacyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditLegacyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLegacyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
