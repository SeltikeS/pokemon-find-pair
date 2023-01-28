import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PokemonService implements OnInit {
  private url = environment.apiBaseUrl;
  public pokemonsNumber = 500;

  constructor(private http: HttpClient) {}

  public ngOnInit(): void {}

  public getPokemonById(id: number): Observable<any> {
    return this.http.get(`${this.url}pokemon/${id}`);
  }

  public getAllPokemons(): Observable<any> {
    return this.http.get(`${this.url}pokemon?limit=100000&offset=0`);
  }
}
