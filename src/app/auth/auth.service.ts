import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

const BACKEND_URL = environment.apiUrl + '/user/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token: string;
  private isAuthenticated = false;
  private userId: string;
  private authStatusListener = new Subject<{ isAuthenticated: boolean, userEmailId?: string }>();
  private tokenTimer: any;
  // private userId: string;
  constructor(private http: HttpClient, private router: Router) { }

  public getToken() {
    return this.token;
  }

  public getAuth() {
    return this.isAuthenticated;
  }

  public getUserId() {
    return this.userId;
  }

  public getAuthStatusListner() {
    return this.authStatusListener.asObservable();
  }

  public createUser(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    this.http.post<{ message: string, userId: string }>(BACKEND_URL + 'signup', authData)
      .subscribe((UserCreated) => {
        console.log(UserCreated)
        this.router.navigate(['/auth/login']);
      }, error => {
        console.log(error);
        this.authStatusListener.next({ isAuthenticated: false });// Telling the whole app that we are not authenticated
      });
  }

  public login(email: string, password: string) {
    const currentUser: AuthData = { email: email, password: password };
    this.http.post<{ token: string, userId: string, expiresIn: number, userEmailId?: string }>(BACKEND_URL + 'login', currentUser)
      .subscribe((loggedUser) => {
        this.token = loggedUser.token;
        const expiresInDuration = loggedUser.expiresIn;
        this.saveAuthTimer(expiresInDuration);
        if (this.token) {
          this.userId = loggedUser.userId;
          this.isAuthenticated = true;
          this.authStatusListener.next({ isAuthenticated: true, userEmailId: loggedUser.userEmailId });
          const currentDate = new Date();
          const expirationDate = new Date(currentDate.getTime() + expiresInDuration * 1000);
          this.saveAuthData(this.token, expirationDate, this.userId);
          this.router.navigate(['/']);
        }
      }, error => {
        console.log(error);
        this.authStatusListener.next({ isAuthenticated: true });// Telling the whole app that we are not authenticated
      });
  }

  public logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.userId = null;
    this.authStatusListener.next({ isAuthenticated: false });
    this.clearAuthData();
    clearInterval(this.tokenTimer);
    this.router.navigate(['/auth/login']);
  }

  private saveAuthData(token: string, expirationDate: Date, userId: string) {
    const authData = {
      token: token,
      expirationDate: expirationDate.toISOString(),
      userId: userId
    };
    localStorage.setItem('authData', JSON.stringify(authData));

    // localStorage.setItem('token', token);
    // localStorage.setItem('expirationDate', expirationDate.toISOString());
    // localStorage.setItem('userId', userId);
  }

  private saveAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000); // duration is converted in seconds
  }

  private getAuthData() {
    const authData = JSON.parse(localStorage.getItem('authData'));
    if (!authData) {
      return
    }

    return {
      token: authData.token,
      expirationDate: new Date(authData.expirationDate),
      userId: authData.userId
    }
  }

  private clearAuthData() {
    localStorage.removeItem('authData');
  }

  public autoAuthUser() { // After refreshing the page, check wether token is still valid
    const authInfo = this.getAuthData();
    if (!authInfo) return;
    const currentDate = new Date();
    const expiresTime = authInfo.expirationDate.getTime() - currentDate.getTime();

    if (expiresTime > 0) {
      this.token = authInfo.token;
      this.isAuthenticated = true;
      this.userId = authInfo.userId;
      this.saveAuthTimer(expiresTime / 1000); // converting milliseconds to seconds by dividing by 1000
      this.authStatusListener.next({ isAuthenticated: true });
    }

  }
}
