import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

export interface Sport {
  id: number;
  name: string;
  description: string;
}

@Injectable({providedIn: 'root'})
export class SportService {
  availableSports: Sport[] = []

  constructor(private http: HttpClient) {
    this.getSports().subscribe(sports => this.availableSports = sports);
  }

  getSports() {
    return this.http.get<Sport[]>('/api/sports/');
  }
  getSportNames(sports: number[]) {
    return this.availableSports.filter(sport => sports.includes(sport.id)).map(sport => sport.name).join(', ');
  }
  getSport(id: string) {
    return this.http.get<Sport>(`/api/sports/${id}/`);
  }
  createSport(sport: Sport) {
    return this.http.post<Sport>(`/api/sports/`, sport);
  }
  updateSport(sport: Sport) {
    return this.http.put<Sport>(`/api/sports/${sport.id}/`, sport);
  }
  deleteSport(sport: Sport) {
    return this.http.delete<Sport>(`/api/sports/${sport.id}/`);
  }
}

