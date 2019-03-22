import { TestBed } from '@angular/core/testing';

import { ParquesService } from './parques.service';

describe('ParquesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ParquesService = TestBed.get(ParquesService);
    expect(service).toBeTruthy();
  });
});
