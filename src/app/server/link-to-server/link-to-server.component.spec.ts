import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkToServerComponent } from './link-to-server.component';

describe('LinkToServerComponent', () => {
  let component: LinkToServerComponent;
  let fixture: ComponentFixture<LinkToServerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkToServerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkToServerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
