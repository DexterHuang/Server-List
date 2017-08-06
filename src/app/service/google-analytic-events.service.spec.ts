import { TestBed, inject } from '@angular/core/testing';

import { GoogleAnalyticEventsService } from './google-analytic-events.service';

describe('GoogleAnalyticEventsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GoogleAnalyticEventsService]
    });
  });

  it('should be created', inject([GoogleAnalyticEventsService], (service: GoogleAnalyticEventsService) => {
    expect(service).toBeTruthy();
  }));
});
