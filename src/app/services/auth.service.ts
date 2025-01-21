import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Token } from '../model/Token';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}
  private token:String = '';
  private http = inject(HttpClient);

  public getUrl(url: any):Observable<any>  {
    return this.http.get('http://localhost:8080/' + url);
  }

  public getPrivateUrl(url: any) {
    return this.http.get('http://localhost:8080' + url, {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + this.token }),
    });
  }


  public getToken(code: String):Observable<boolean> {
    return this.http.get<Token>('http://localhost:8080/auth/callback?code=' + code, {
      observe: 'response',
    }).pipe(map((response: HttpResponse<Token>)=> {
      if (response.status == 200 && response.body !== null) {
        this.token = response.body.token
        return true

      } else {
        return false
      }
    }))
  }
}
