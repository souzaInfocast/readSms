import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { resolveReflectiveProviders } from '../../../node_modules/@angular/core/src/di/reflective_provider';
/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {

  constructor(public http: HttpClient) {
    console.log('Hello RestProvider Provider');
  }
  
  rest =  "http://192.168.254.64/rest";
  
  header = new Headers({
    'Content-Type':'application/json'
  });

  private _getHeaders():HttpHeaders {
    let header = new HttpHeaders().set('Content-Type', 'application/json');
    return header;
 }

  get(url,params,callback){
      this.http.get(this.rest+url,params)
      .map(res => console.log(res))
      .subscribe(data=>{
        callback(data)
      })
  }
  
  post(url,params,callback){
      let headers = new HttpHeaders().set('Content-Type', 'application/json');
      headers = headers.set('Accept', 'text/javascript');
      this.http.post(this.rest+url,params,{headers})
      .map(res => console.log(res))
      .subscribe(data=>{
        callback(data)
      })
  }
}
