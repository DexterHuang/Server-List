import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerEditorComponent } from './server-editor.component';

describe('ServerEditorComponent', () => {
  let component: ServerEditorComponent;
  let fixture: ComponentFixture<ServerEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServerEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServerEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
