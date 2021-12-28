import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import {JwtHelperService} from '@auth0/angular-jwt';
import {MatSnackBar} from "@angular/material/snack-bar";
import {Sport} from "./sport.service";
import {SportChimpApiService} from "./sportchimp-api.service";
import {stringify} from "@angular/compiler/src/util";


export interface User {
  id: number;
  username: string;
}


@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly accessTokenLocalStorageKey = 'access_token';
  isLoggedIn = new BehaviorSubject(false);
  userId: string | null = ''
  username: string = ''

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

  }

  getUser() {
    let data = this.http.get<User>(`${this.sportChimpApiService.base_url}/users/${this.userId}/`)
    return data;
  }

  login(userData: { username: string, password: string }): void {
    this.http.post('/api/api-token-auth/', userData)
      .subscribe((res: any) => {
        this.isLoggedIn.next(true);
        localStorage.setItem('access_token', res.token);
        localStorage.setItem('user_id', res.user_id);
        this.userId = localStorage.getItem("user_id");

        // display username test :)))
        let test = this.http.get<User>(`${this.sportChimpApiService.base_url}/users/${this.userId}/`).subscribe(
          data =>  {
            this.username = data.username;
            console.log(data)
            console.log(data.username)
          }
        )
        console.log(test)
        this.router.navigate(['index']);
        this.snackbar.open('Successfully logged in', 'OK',{duration:3000});
      }, () => {
        this.snackbar.open('Invalid credentials', 'OK',{duration:3000})
      });
  }

  logout(): void {
    localStorage.removeItem(this.accessTokenLocalStorageKey);
    this.username = '';
    this.isLoggedIn.next(false);
    this.router.navigate(['/login']);
  }


}
