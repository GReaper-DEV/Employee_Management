import { TestBed } from '@angular/core/testing';

import { UniqueEmailService } from './unique-email.service';

describe('UniqueEmailService', () => {
  let service: UniqueEmailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UniqueEmailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
