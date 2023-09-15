import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Network } from './app.interfaces';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getChainList() {
    return this.http.get<Network[]>('https://chainid.network/chains.json');
  }
}
