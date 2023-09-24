import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpResponse } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { AppComponent } from '../app.component';

@Injectable()
export class HttpLoadingInterceptor implements HttpInterceptor {

  constructor(private appComponent: AppComponent) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    this.appComponent.isLoading = true;

    return next.handle(req).pipe(
      tap(
        event => {
          if (event instanceof HttpResponse) {
            this.appComponent.isLoading = false;
          }
        },
        error => {
          this.appComponent.isLoading = false;
        }
      )
    );
  }
}
