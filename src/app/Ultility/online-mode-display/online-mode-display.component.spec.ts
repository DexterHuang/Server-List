import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineModeDisplayComponent } from './online-mode-display.component';

describe('OnlineModeDisplayComponent', () => {
  let component: OnlineModeDisplayComponent;
  let fixture: ComponentFixture<OnlineModeDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnlineModeDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlineModeDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
