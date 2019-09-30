import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private _http: HttpClient) {}
  allRestaurants() {
    return this._http.get('/api/restaurants');
  }
  getRestaurant(id: string) {
    return this._http.get(`/api/restaurants/${id}`);
  }
  createRestaurant(data: any) {
    return this._http.post('/api/restaurants', data);
  }
  createReview(id: string, data: any) {
    return this._http.post(`/api/restaurants/${id}/review`, data);
  }
  updateRestaurant(id: string, data: any) {
    return this._http.patch(`/api/restaurants/${id}/review`, data);
  }
  removeRestaurant(id: string) {
    return this._http.delete(`/api/restaurants/${id}`);
  }
}
