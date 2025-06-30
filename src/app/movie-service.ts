import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private http = inject(HttpClient);

  getMovies(){
    return this.http.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${"5838ca2fa450db8e8e0ab75971b82512"}`)
  }
}
