import { TestBed } from '@angular/core/testing';

import { TrackerDeObjetivos } from './tracker-de-objetivos';

describe('TrackerDeObjetivos', () => {
  let service: TrackerDeObjetivos;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrackerDeObjetivos);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
