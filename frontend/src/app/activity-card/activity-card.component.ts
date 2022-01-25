import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-activity-card',
  templateUrl: './activity-card.component.html',
  styleUrls: ['./activity-card.component.scss']
})
export class ActivityCardComponent implements OnInit {

  @Input()
  activity: any
  constructor() { }

  ngOnInit(): void {
  }

}
