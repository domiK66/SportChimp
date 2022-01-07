import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import {JwtHelperService} from '@auth0/angular-jwt';
import {MatSnackBar} from "@angular/material/snack-bar";
import {SportChimpApiService} from "./sportchimp-api.service";
import {Sport} from "./sport.service";

export interface User {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  date_joined: string;
}

@Injectable({providedIn: 'root'})
export class UserService {

  readonly accessTokenLocalStorageKey = 'access_token';
  readonly userIdLocalStorageKey = 'user_id';

  isLoggedIn = new BehaviorSubject(false);
  isAdmin = new BehaviorSubject(false);

  userId: number | null = 1
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
    this.start();
    this.getUserData();
  }

  private start(): void {
    window.addEventListener("storage", this.storageEventListener.bind(this));
  }
  // EventListener to prevent user from changing anything in the local storage. (security reasons -> user would be able to change user_id)
  private storageEventListener(event: StorageEvent) {
    if (event.storageArea == localStorage && event.newValue != event.oldValue) {
        //this.logout();
    }
  }

  // API
  getUser(id: number) {
    return this.http.get<User>(`${this.sportChimpApiService.base_url}/users/${id}/`);
  }
  getUsers() {
    return this.http.get<User[]>(`${this.sportChimpApiService.base_url}/users/`);
  }
  createUser(user: User) {
    return this.http.post<User>(`${this.sportChimpApiService.base_url}/users/`, user);
  }
  updateUser(user: User) {
    return this.http.put<User>(`${this.sportChimpApiService.base_url}/users/${user.id}/`, user);
  }

  getUserData(){
    const token = localStorage.getItem(this.accessTokenLocalStorageKey);
    const decodedToken = this.jwtHelperService.decodeToken(token ? token : '');
    this.userId = decodedToken?.user_id;
    this.hasAdminPermission()
    console.log(this.userId)
    if (this.userId != null) {
      this.getUser(this.userId).subscribe(data => this.user = data)
    } else {
      this.user = {}
    }
  }

  login(userData: { username: string, password: string }): void {
    this.http.post(`${this.sportChimpApiService.base_url}/api-token-auth/`, userData)
      .subscribe((res: any) => {
        this.isLoggedIn.next(true);
        localStorage.setItem('access_token', res.token);
        this.getUserData()

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
    this.userId = null
    this.getUserData()

    this.snackbar.open('Successfully logged out', 'OK',{duration:3000});
    this.router.navigate(['/index']);
  }
  hasPermission(permission:string): boolean {
    const token = localStorage.getItem(this.accessTokenLocalStorageKey);
    const decodedToken = this.jwtHelperService.decodeToken(token ? token : '');
    const permissions = decodedToken?.permissions;
    if (permissions != undefined) {
      return permission in permissions;
    }
    return false
  }
  hasAdminPermission() {
    if (this.hasPermission('sportapp.add_sport')) {
      this.isAdmin.next(true);
    }
  }

}
