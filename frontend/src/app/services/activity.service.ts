import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Sport} from "./sport.service";

export interface Activity {
  id: string;
  title: string;
  description: string;
  date: Date;
  location: string;
  is_public: Boolean;
  sport_genre: Sport;
  created_by_user: any;
  participants: [];
}

@Injectable({providedIn: 'root'})
export class ActivityService {
  base_url: string = '/api/activities/'

  constructor(private http: HttpClient) {

  }
  getActivities() {
    return this.http.get<Activity[]>(`${(this.base_url)}`);
  }
  getActivity(id: string) {
    return this.http.get<Activity>(`${(this.base_url)}${id}/`);
  }
  createActivity(sport: Activity) {
    return this.http.post<Activity>(`${(this.base_url)}`, sport);
  }
  updateActivity(sport: Activity) {
    return this.http.put<Activity>(`${(this.base_url)}${sport.id}/`, sport);
  }
  deleteActivity(sport: Activity) {
    return this.http.delete<Activity>(`${(this.base_url)}${sport.id}/`);
  }
}

