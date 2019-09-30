import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { HttpService } from '../http.service';

function generateRestaurant(route: ActivatedRoute, httpService: HttpService) {
  let result = {
    _id: "",
    name: "",
    cuisine: ""
  };
  route.params.subscribe((params: Params) => {
    const id = params['id'];
    let obs = httpService.getRestaurant(id);
    obs.subscribe(data => {
      const o = data as Object;
      result._id = o['_id'];
      result.name = o['name'];
      result.cuisine = o['cuisine'];
    });
  });
  return result;
}

interface ErrorMessage {
  message: string,
  name: string,
  kind: string,
  path: string,
  value: string,
  properties: any
};

function generateErrorMessages(errors): Array<string> {
  let result: Array<string> = [];
  if (errors.hasOwnProperty('name')) {
    let fn: ErrorMessage = errors['name'];
    result.push(fn.message);
  } else if (errors.hasOwnProperty('cuisine')) {
    let ln: ErrorMessage = errors['cuisine'];
    result.push(ln.message);
  }
  return result;
}

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  restaurant: any;
  messages: Array<string>;
  flash: boolean;
  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {}
  ngOnInit() {
    this.restaurant = generateRestaurant(this._route, this._httpService);
    this.messages = [];
    this.flash = false;
  }
  onSubmit() {
    let obs = this._httpService.updateRestaurant(this.restaurant['_id'], this.restaurant);
    obs.subscribe(data => {
      if (data.hasOwnProperty('errors')) {
        this.restaurant = generateRestaurant(this._route, this._httpService);
        this.messages = generateErrorMessages(data['errors']);
        this.flash = true;
      } else {
        this.restaurant = generateRestaurant(this._route, this._httpService);
        this.messages = [];
        this.flash = false;
        this._router.navigate(['/restaurants']);
      }
    });
  }
}
