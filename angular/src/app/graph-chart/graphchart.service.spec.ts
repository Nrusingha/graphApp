import { TestBed, inject } from '@angular/core/testing';

import { GraphchartService } from './graphchart.service';

describe('GraphchartService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GraphchartService]
    });
  });

  it('should be created', inject([GraphchartService], (service: GraphchartService) => {
    expect(service).toBeTruthy();
  }));
});
