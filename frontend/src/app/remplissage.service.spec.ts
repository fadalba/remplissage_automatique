import { TestBed } from '@angular/core/testing';

import { RemplissageService } from './remplissage.service';

describe('RemplissageService', () => {
  let service: RemplissageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RemplissageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
