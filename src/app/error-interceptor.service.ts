import { Injectable } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { MatDialog } from '@angular/material';
import { ErrorComponent } from './error/error.component';
import { Router } from '@angular/router';


@Injectable({
  'providedIn': 'root'
})

export class ErrorInterceptorService {
  constructor(private dialog: MatDialog, private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {// Watching the HTTP response error
        switch (error.status) {
          case 401:
            console.log(error.error.message);
            let errorMessage = 'An unknown error occured!';
            if (error.error.message) {
              errorMessage = error.error.message;
            } else if (error.error.error && error.error.error.message) {
              errorMessage = error.error.error.message;
            }
            let dialogRef = this.dialog.open(ErrorComponent, { data: { message: errorMessage } });
            dialogRef.afterClosed().subscribe(result => {
              this.router.navigate(['/auth/login']);
            });
        }


        return throwError(error);// Return the Observable error
      })
    );
  }
}
