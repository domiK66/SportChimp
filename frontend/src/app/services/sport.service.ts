import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SportChimpApiService} from "./sportchimp-api.service";

export interface Sport {
  id: number;
  name: string;
  description: string;
}

@Injectable({providedIn: 'root'})
export class SportService {
  availableSports: Sport[] = [];
  constructor(
    private http: HttpClient,
    private sportChimpApiService: SportChimpApiService
  ) {
    this.getSports().subscribe(sports => this.availableSports = sports);
  }
  getSports() {
    return this.http.get<Sport[]>(`${this.sportChimpApiService.base_url}/sports/?order_by=name`);
  }
  getSport(id: string) {
    return this.http.get<Sport>(`${this.sportChimpApiService.base_url}/sports/${id}/`);
  }
  createSport(sport: Sport) {
    return this.http.post<Sport>(`${this.sportChimpApiService.base_url}/sports/`, sport);
  }
  updateSport(sport: Sport) {
    return this.http.put<Sport>(`${this.sportChimpApiService.base_url}/sports/${sport.id}/`, sport);
  }
  deleteSport(sport: Sport) {
    return this.http.delete<Sport>(`${this.sportChimpApiService.base_url}/sports/${sport.id}/`);
  }
}

