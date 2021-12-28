import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import {JwtHelperService} from '@auth0/angular-jwt';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly accessTokenLocalStorageKey = 'access_token';
  isLoggedIn = new BehaviorSubject(false);

  constructor(
    private http: HttpClient,
    private router: Router,
    private jwtHelperService: JwtHelperService,
    private snackbar: MatSnackBar
  ) {
    const token = localStorage.getItem(this.accessTokenLocalStorageKey);
    if (token) {
      console.log('Token expiration date: ' + this.jwtHelperService.getTokenExpirationDate(token));
      const tokenValid = !this.jwtHelperService.isTokenExpired(token);
      this.isLoggedIn.next(tokenValid);
    }
  }

  login(userData: { username: string, password: string }): void {
    this.http.post('/api/api-token-auth/', userData)
      .subscribe((res: any) => {
        this.isLoggedIn.next(true);
        localStorage.setItem('access_token', res.token);
        this.router.navigate(['index']);
        this.snackbar.open('Successfully logged in', 'OK',{duration:3000});
      }, () => {
        this.snackbar.open('Invalid credentials', 'OK',{duration:3000})
      });
  }

  logout(): void {
    localStorage.removeItem(this.accessTokenLocalStorageKey);
    this.isLoggedIn.next(false);
    this.router.navigate(['/login']);
  }


}
