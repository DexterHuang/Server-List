import { TestBed, inject } from '@angular/core/testing';

import { SortMethodService } from './sort-method.service';

describe('SortMethodService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SortMethodService]
    });
  });

  it('should be created', inject([SortMethodService], (service: SortMethodService) => {
    expect(service).toBeTruthy();
  }));
});
