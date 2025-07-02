import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private http = inject(HttpClient);

  apiKey = "5838ca2fa450db8e8e0ab75971b82512"

  getMovies(){
    return this.http.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${this.apiKey}`)
  }

  getMovieById(id: number) {
    return this.http.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${this.apiKey}`);
  }

  getRecommendedById(id: number) {
    return this.http.get(`https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${this.apiKey}`);
  }
  getReviewsById(id: number) {
    return this.http.get(`https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${this.apiKey}`);
  }
  getPage(page: number){
    return this.http.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${this.apiKey}&page=${page}`)
  }
}
