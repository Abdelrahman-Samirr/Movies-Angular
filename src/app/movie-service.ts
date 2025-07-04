import { inject, Injectable, signal } from '@angular/core';
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
  
  getSearchPage(name: string){
    return this.http.get(`https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&query=${name}`)
  }

  searchInput = signal('');

  getTvShows(){
    return this.http.get(`https://api.themoviedb.org/3/tv/popular?api_key=${this.apiKey}`)
  }

  getTvShowsById(id: number){
    return this.http.get(`https://api.themoviedb.org/3/tv/${id}?api_key=${this.apiKey}`)
  }

  getTvPage(page: number){
    return this.http.get(`https://api.themoviedb.org/3/tv/on_the_air?api_key=${this.apiKey}&page=${page}`)
  }

  getRecommendedTvShowsById(id: number) {
    return this.http.get(`https://api.themoviedb.org/3/tv/${id}/recommendations?api_key=${this.apiKey}`);
  }
}
