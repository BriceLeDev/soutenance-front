import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../../model/Client';
import { Message } from '../../model/Message';
import { Panneau } from '../../model/Panneau';
/*
 ***************************************************************
 * servise qui s occupe de l'admin dashboard dans son ensemble *
 ***************************************************************
 */

@Injectable({
  providedIn: 'root',
})
export class AdministrationService {
  constructor() {}
  private http = inject(HttpClient);

  private urlClient = 'http://localhost:8088';
  private urlMessage = 'http://localhost:8088';
  private urlPanneau = 'http://localhost:8088';

  /********** Début Opérations sur les clients *************/

  //liste des clients
  public getAllClient(): Observable<Client[]> {
    return this.http.get<Client[]>(this.urlClient);
  }

  //avoir un clien par son id
  public getClientById(clientId: number): Observable<Client> {
    return this.http.get<Client>(this.urlClient + `/${clientId}`);
  }

  /**********  Fin Opérations sur les clients    *************/

  /**********  Début Opérations sur les administrateurs *************/

  /********** Fin Opérations sur les administrateurs  *************/

  /**********Début Opérations sur les Panneaux ********************/

  public addPanneau() {}
  public getAllPanneau(): Observable<Panneau[]> {
    return this.http.get<Panneau[]>(this.urlPanneau);
  }

  public getPanneauById(panneauId:number):Observable<Panneau> {
    return this.http.get<Panneau>(this.urlPanneau + `/${panneauId}`)
  }

  public updatePanneau(){}
  public deletePanneau() {}

  /********** Fin Opérations sur les Panneaux  *******************/

  /**********Début Opérations sur nouveau messagerie *************/

  public getAllMessage(): Observable<Message[]> {
    return this.http.get<Message[]>(this.urlMessage);
  }

  public checkMessage(message: Message): Observable<Message> {
    return this.http.patch<Message>(this.urlMessage + `/` + message.id, {
      verified: true,
    });
  }

  /********** Fin Opérations sur nouveau messagerie  *************/
}
