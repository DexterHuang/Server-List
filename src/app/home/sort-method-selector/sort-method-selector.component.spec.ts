import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SortMethodSelectorComponent } from './sort-method-selector.component';

describe('SortMethodSelectorComponent', () => {
  let component: SortMethodSelectorComponent;
  let fixture: ComponentFixture<SortMethodSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SortMethodSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SortMethodSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
