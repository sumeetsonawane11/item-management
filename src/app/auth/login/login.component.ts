import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { relative } from 'path';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit, OnDestroy {
  public isLoading = false;
  public authStatusSub: Subscription;
  public isAuthenticated = false;
  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.isAuthenticated = this.authService.getAuth();
    if (this.isAuthenticated) {
      this.router.navigate(['/dashboard'])
    }
    this.authStatusSub = this.authService.getAuthStatusListner()
      .subscribe((res) => {
        this.isAuthenticated = res.isAuthenticated;
        this.isLoading = false;
      });
  }

  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }
    //this.isLoading = true;
    // this.router.navigate(['/dashboard'])
    this.authService.login(form.value.email, form.value.password);
    // console.log(form.value);
  }

  ngOnDestroy() {
    // this.authStatusSub.unsubscribe();
  }
}
