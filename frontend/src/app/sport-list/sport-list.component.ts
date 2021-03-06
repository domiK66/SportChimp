import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Sport, SportService } from "../services/sport.service";

@Component({
  selector: 'app-sport-list',
  templateUrl: './sport-list.component.html',
  styleUrls: ['./sport-list.component.scss']
})
export class SportListComponent implements OnInit {

  displayedColumns = ['id', 'name', 'description', 'edit', 'delete'];
  sports: Sport[] = [];

  constructor(private http: HttpClient,
              private sportService: SportService
  ) {

  }

  ngOnInit(): void {
    this.sportService.getSports().subscribe((response: any[]) => { this.sports = response })
  }

  deleteSport(sport: Sport): void {
    this.sportService.deleteSport(sport).subscribe( () => { this.ngOnInit() });
  }
  // confirmation dialog for deleting sport entries
  confirmDelete(sport: Sport){
    if (confirm("Are you sure to delete '" + sport.name +"'?")){
      console.log(this.deleteSport(sport))
    }
  }
}
