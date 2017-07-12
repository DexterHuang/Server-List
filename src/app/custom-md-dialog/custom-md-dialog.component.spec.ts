import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomMdDialogComponent } from './custom-md-dialog.component';

describe('CustomMdDialogComponent', () => {
  let component: CustomMdDialogComponent;
  let fixture: ComponentFixture<CustomMdDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomMdDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomMdDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
