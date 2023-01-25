import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private http:HttpClient) { }
  url='https://jsonplaceholder.typicode.com/users'

  getBD(){
    return this.http.get<any>(this.url)
  }

}
