import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MenuService {
  constructor(private httpClient: HttpClient) {}

  public getMenuData() {
    return this.httpClient.get('/assets/menu.json')
    .toPromise().then(response => response);
  }
}
