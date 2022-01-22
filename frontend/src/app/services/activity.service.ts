import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Sport} from "./sport.service";
import {SportChimpApiService} from "./sportchimp-api.service";
import {User} from "./user.service";

export interface Activity {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  min_players: number;
  max_players: number;
  location: string;
  equipment_needed: boolean;
  sport_genre: Sport;
  created_by_user: any;
  participants: User[];
}

@Injectable({providedIn: 'root'})
export class ActivityService {
  constructor(
    private http: HttpClient,
    private sportChimpApiService: SportChimpApiService
  ) {}
  getActivities() {
    return this.http.get<Activity[]>(`${this.sportChimpApiService.base_url}/activities/`);
  }
  getActivity(id: string) {
    return this.http.get<Activity>(`${this.sportChimpApiService.base_url}/activities/${id}/`);
  }
  createActivity(activity: Activity) {
    return this.http.post<Activity>(`${this.sportChimpApiService.base_url}/activities/`, activity);
  }
  updateActivity(activity: Activity) {
    return this.http.put<Activity>(`${this.sportChimpApiService.base_url}/activities/${activity.id}/`, activity);
  }
  attendActivity(activity: Activity) {
    return this.http.put<Activity>(`${this.sportChimpApiService.base_url}/activities/${activity.id}/`, null);
  }
  deleteActivity(activity: Activity) {
    return this.http.delete<Activity>(`${this.sportChimpApiService.base_url}/activities/${activity.id}/`);
  }
}

