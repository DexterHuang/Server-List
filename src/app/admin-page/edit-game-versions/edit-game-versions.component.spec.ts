import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGameVersionsComponent } from './edit-game-versions.component';

describe('EditGameVersionsComponent', () => {
  let component: EditGameVersionsComponent;
  let fixture: ComponentFixture<EditGameVersionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditGameVersionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditGameVersionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
