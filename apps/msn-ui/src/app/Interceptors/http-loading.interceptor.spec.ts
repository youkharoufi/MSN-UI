import { TestBed } from '@angular/core/testing';

import { HttpLoadingInterceptor } from './http-loading.interceptor';

describe('HttpLoadingInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      HttpLoadingInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: HttpLoadingInterceptor = TestBed.inject(HttpLoadingInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
