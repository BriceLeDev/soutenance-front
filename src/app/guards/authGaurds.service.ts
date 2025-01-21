import { Injectable } from '@angular/core';
import { SharedServiceService } from '../admin/admin-services/shared-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private adminService : SharedServiceService) { }

  public isAuthenticate : boolean = this.adminService.isAuthenticate


  public login(){

    this.isAuthenticate = false

  }
  public loggout(){

    this.isAuthenticate = false

  }

  public isAuthenticated(): boolean{
    return this.isAuthenticate
  }
}
