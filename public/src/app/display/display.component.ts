import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {
  restaurants: Array<Object>;
  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {}
  ngOnInit() {
    let obs = this._httpService.allRestaurants();
    obs.subscribe(data => {
      this.restaurants = data as Array<Object>;
    });
  }
  onDelete(restaurant: Object) {
    const id = restaurant['_id'];
    let obs = this._httpService.removeRestaurant(id);
    obs.subscribe(data => {
      this.ngOnInit();
    });
  }
}
