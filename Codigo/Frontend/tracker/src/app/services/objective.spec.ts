import { TestBed } from '@angular/core/testing';

import { Objective } from './objective';

describe('Objective', () => {
  let service: Objective;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Objective);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
