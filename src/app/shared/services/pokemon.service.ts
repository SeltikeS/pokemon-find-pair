import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService implements OnInit {
  private url = 'https://pokeapi.co/api/v2/';
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
