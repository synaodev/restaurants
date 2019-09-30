import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { HttpService } from '../http.service';

function generateReview() {
  let result = {
    customer: "",
    stars: 0,
    description: ""
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
  if (errors.hasOwnProperty('customer')) {
    let fn: ErrorMessage = errors['customer'];
    result.push(fn.message);
  } else if (errors.hasOwnProperty('stars')) {
    let ln: ErrorMessage = errors['stars'];
    result.push(ln.message);
  } else if (errors.hasOwnProperty('description')) {
    let em: ErrorMessage = errors['description'];
    result.push(em.message);
  }
  return result;
}

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  review: any;
  restaurant: Object;
  messages: Array<string>;
  flash: boolean;
  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {}
  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      const id = params['id'];
      let obs = this._httpService.getRestaurant(id);
      obs.subscribe(data => {
        this.restaurant = data as Object;
      });
    });
    this.review = generateReview();
    this.messages = [];
    this.flash = false;
  }
  onSubmit() {
    console.log(this.review)
    let obs = this._httpService.createReview(this.restaurant['_id'], this.review);
    obs.subscribe(data => {
      console.log("REUTRN DATA FORM MONGO: ,  ",data)
      if (data.hasOwnProperty('errors')) {
        this.review = generateReview();
        this.messages = generateErrorMessages(data['errors']);
        this.flash = true;
      } else {
        this.review = generateReview();
        this.messages = [];
        this.flash = false;
        this._router.navigate(['/restaurants', this.restaurant['_id']]);
      }
    });
  }
}
