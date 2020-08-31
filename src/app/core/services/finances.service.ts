import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpErrorResponse, HttpEventType, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {BillsReceivesModel} from '../model/bills-receives.model';
import {UserModel} from '../model/users-system.model';
import {ServicesModel} from '../model/services.model';
import {ClientsModel} from '../model/clients.model';
const API_CURRENT_VERSION = 'v1';
const API_URL = environment.api + '/' + API_CURRENT_VERSION;

@Injectable({
  providedIn: 'root'
})
export class FinancesService {

  constructor(private http: HttpClient) { }


  getReceives(): Observable<BillsReceivesModel>{
    const userToken = localStorage.getItem(environment.authTokenKey);
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Authorization', 'Bearer ' + userToken);
    return this.http.get<BillsReceivesModel>(API_URL + `/receives`, {headers: httpHeaders});
  }

  deleteReceives(user: number): Observable<BillsReceivesModel> {
    const userToken = localStorage.getItem(environment.authTokenKey);
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Authorization', 'Bearer ' + userToken);
    const url = API_URL + `/receives/${user}`;
    return this.http.delete<BillsReceivesModel>(url, {headers: httpHeaders});
  }

  getReceivesById(serviceId: number): Observable<BillsReceivesModel> {
    const userToken = localStorage.getItem(environment.authTokenKey);
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Authorization', 'Bearer ' + userToken);
    return this.http.get<BillsReceivesModel>(API_URL + `/receives/${serviceId}`,{headers: httpHeaders});
  }

  craeteReceives(client: BillsReceivesModel): Observable<BillsReceivesModel> {
    const userToken = localStorage.getItem(environment.authTokenKey);
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Authorization', 'Bearer ' + userToken);
    return this.http.post<BillsReceivesModel>(API_URL + `/receives/`, client, {headers: httpHeaders});
  }

}
