import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpErrorResponse, HttpEventType, HttpHeaders} from '@angular/common/http';
import { map } from  'rxjs/operators';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {ContractsModel} from '../model/contracts.model';
const API_CURRENT_VERSION = 'v1';
const API_AUTH = environment.auth.domain;
const API_URL = environment.api + '/' + API_CURRENT_VERSION + '/upload';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private httpClient: HttpClient) { }

  public upload(event, path) {
    console.log(event);
    const formData = new FormData()
    formData.append('attachment', event);

    const userToken = localStorage.getItem(environment.authTokenKey);
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Authorization', 'Bearer ' + userToken);
    return this.httpClient.post<any>(API_URL + '/' + path, formData, {headers: httpHeaders});
  }
}




