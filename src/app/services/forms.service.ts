import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class FormsService {
  constructor(private httpClient: HttpClient) {  }
  public getParentForm() {
    return this.httpClient.get('/assets/parent-form.json')
    .toPromise().then(response => response);
  }
  public getChildForm() {
    return this.httpClient.get('/assets/child-form.json')
    .toPromise().then(response => response);
  }
  public getFormData() {
    return this.httpClient.get('/assets/parent-form.json')
    .toPromise().then(response => response);
  }
}
