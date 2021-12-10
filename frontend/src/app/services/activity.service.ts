import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Sport} from "./sport.service";

export interface Activity {
  id: string;
  title: string;
  description: string;
  date: Date;
  location: string;
  sport_genre: Sport;
}

@Injectable({providedIn: 'root'})
export class ActivityService {

  constructor(private http: HttpClient) {
  }
  getActivities() {
    return this.http.get<Activity[]>('/api/activities/');
  }
}
