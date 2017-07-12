import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewServerComponent } from './new-server.component';

describe('NewServerComponent', () => {
  let component: NewServerComponent;
  let fixture: ComponentFixture<NewServerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewServerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewServerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
