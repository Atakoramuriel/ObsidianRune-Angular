import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadWritingComponent } from './read-writing.component';

describe('ReadWritingComponent', () => {
  let component: ReadWritingComponent;
  let fixture: ComponentFixture<ReadWritingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadWritingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadWritingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
