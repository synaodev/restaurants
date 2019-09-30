import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { HttpService } from '../http.service';

function generateRestaurant() {
  let result = {
    name: "",
    cuisine: ""
  };
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
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  restaurant: any;
  messages: Array<string>;
  flash: boolean;
  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {}
  ngOnInit() {
    this.restaurant = generateRestaurant();
    this.messages = [];
    this.flash = false;
  }
  onSubmit() {
    let obj = this._httpService.createRestaurant(this.restaurant);
    obj.subscribe(data => {
      if (data.hasOwnProperty('errors')) {
        this.restaurant = generateRestaurant();
        this.messages = generateErrorMessages(data['errors']);
        this.flash = true;
      } else {
        this.restaurant = generateRestaurant();
        this.messages = [];
        this.flash = false;
        this._router.navigate(['/restaurants']);
      }
    });
  }
}
