import { TestBed, inject } from '@angular/core/testing';

import { TypeDeProblemeService } from './type-de-probleme.service';

describe('TypeDeProblemeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TypeDeProblemeService]
    });
  });

  it('should be created', inject([TypeDeProblemeService], (service: TypeDeProblemeService) => {
    expect(service).toBeTruthy();
  }));
});
