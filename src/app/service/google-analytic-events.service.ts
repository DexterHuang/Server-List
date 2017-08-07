import { Injectable } from '@angular/core';

declare let ga: Function;
@Injectable()
export class GoogleAnalyticEventsService {

  constructor() {
  }
  public emitEvent(eventCategory: string,
    eventAction: string,
    eventLabel: string = null,
    eventValue: number = null) {
    const data = {
      eventCategory: eventCategory,
      eventLabel: eventLabel,
      eventAction: eventAction,
      eventValue: eventValue
    };
    ga('send', 'event', data);
    console.log('event send', data)
  }
}
