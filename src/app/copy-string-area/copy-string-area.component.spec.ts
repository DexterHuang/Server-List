import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CopyStringAreaComponent } from './copy-string-area.component';

describe('CopyStringAreaComponent', () => {
  let component: CopyStringAreaComponent;
  let fixture: ComponentFixture<CopyStringAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CopyStringAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CopyStringAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
