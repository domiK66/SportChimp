import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import {JwtHelperService} from '@auth0/angular-jwt';
import {MatSnackBar} from "@angular/material/snack-bar";
import {SportChimpApiService} from "./sportchimp-api.service";


export interface User {
  id: number;
  username: string;
}


@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly accessTokenLocalStorageKey = 'access_token';
  readonly userIdLocalStorageKey = 'user_id';

  isLoggedIn = new BehaviorSubject(false);

  userId: number = 0
  user: User | any = {}

  constructor(
    private http: HttpClient,
    private router: Router,
    private jwtHelperService: JwtHelperService,
    private snackbar: MatSnackBar,
    private sportChimpApiService: SportChimpApiService
  ) {

    const token = localStorage.getItem(this.accessTokenLocalStorageKey);
    if (token) {
      console.log('Token expiration date: ' + this.jwtHelperService.getTokenExpirationDate(token));
      const tokenValid = !this.jwtHelperService.isTokenExpired(token);
      this.isLoggedIn.next(tokenValid);
    }
    this.getUserData();
  }

  getUserData(){
    const userIdString = localStorage.getItem(this.userIdLocalStorageKey)
    this.userId = parseFloat(<string>userIdString);
    if (userIdString == null) {
      this.user = {}
    } else {
      this.http.get<User>(`${this.sportChimpApiService.base_url}/users/${this.userId}/`).subscribe(
        data => this.user = data
      )
    }
  }

  login(userData: { username: string, password: string }): void {
    this.http.post('/api/api-token-auth/', userData)
      .subscribe((res: any) => {
        this.isLoggedIn.next(true);
        localStorage.setItem('access_token', res.token);
        localStorage.setItem('user_id', res.user_id);

        this.getUserData();


        this.snackbar.open('Successfully logged in', 'OK',{duration:3000});
        this.router.navigate(['/index']);
      }, () => {
        this.snackbar.open('Invalid credentials', 'OK',{duration:3000})
      }
    );
  }

  logout(): void {
    this.isLoggedIn.next(false);
    localStorage.removeItem(this.accessTokenLocalStorageKey);
    localStorage.removeItem(this.userIdLocalStorageKey);

    this.getUserData();

    this.snackbar.open('Successfully logged out', 'OK',{duration:3000});
    this.router.navigate(['/index']);
  }

}
