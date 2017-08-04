import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationControllerComponent } from './notification-controller.component';

describe('NotificationControllerComponent', () => {
  let component: NotificationControllerComponent;
  let fixture: ComponentFixture<NotificationControllerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationControllerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
