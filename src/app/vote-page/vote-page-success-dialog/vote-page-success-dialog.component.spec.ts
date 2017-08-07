import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotePageSuccessDialogComponent } from './vote-page-success-dialog.component';

describe('VotePageSuccessDialogComponent', () => {
  let component: VotePageSuccessDialogComponent;
  let fixture: ComponentFixture<VotePageSuccessDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotePageSuccessDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotePageSuccessDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
