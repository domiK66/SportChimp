import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SportService {
  constructor(private http: HttpClient) {
  }
  getSports() {
    return this.http.get<Sport[]>('/api/sports/')
  }
  getSport(id: string) {
    return this.http.get<Sport>(`api/sports/${id}/`)
  }
  createSport(sport: Sport) {
    return this.http.post<Sport>(`api/sports/`, sport)
  }
  updateSport(sport: Sport) {
    return this.http.put<Sport>(`/api/sports/${sport.id}/`, sport)
  }
  deleteSport(sport: Sport) {
    return this.http.delete(`/api/sports/${sport.id}/`)
  }
}

export interface Sport {
  id: number;
  name: string;
  description: string[]
}
