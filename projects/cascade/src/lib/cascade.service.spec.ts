import { TestBed } from '@angular/core/testing';

import { CascadeService } from './cascade.service';

describe('CascadeService', () => {
  let service: CascadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CascadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
