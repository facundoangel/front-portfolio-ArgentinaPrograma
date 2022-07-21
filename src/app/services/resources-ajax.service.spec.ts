import { TestBed } from '@angular/core/testing';

import { ResourcesAjaxService } from './resources-ajax.service';

describe('ResourcesAjaxService', () => {
  let service: ResourcesAjaxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResourcesAjaxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
