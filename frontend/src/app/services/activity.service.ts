import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Sport} from "./sport.service";
import {SportChimpApiService} from "./sportchimp-api.service";

export interface Activity {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  is_public: boolean;
  sport_genre: Sport;
  created_by_user: any;
  participants: [];
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
    return this.http.put<Activity>(`${this.sportChimpApiService.base_url}/activities/${activity.id}`, activity);
  }
  deleteActivity(activity: Activity) {
    return this.http.delete<Activity>(`${this.sportChimpApiService.base_url}/activities/${activity.id}`);
  }
}

