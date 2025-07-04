import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  lovableMovies = signal<any[]>([]);

  lovableTvShows = signal<any[]>([]);

  toggleTvBtn(tv: any) {

    const currentTv = this.lovableTvShows()

    const isSelected = currentTv.some(p => p.id === tv.id);

    let updated: any[];

    if (isSelected) {

      updated = currentTv.filter(p => p.id !== tv.id)

    } else {
      updated = [...currentTv, { ...tv}]
    }

    this.lovableTvShows.set(updated);

  }
  toggleBtn(movie: any) {

    const currentMovies = this.lovableMovies()

    const isSelected = currentMovies.some(p => p.id === movie.id);

    let updated: any[];

    if (isSelected) {

      updated = currentMovies.filter(p => p.id !== movie.id)

    } else {
      updated = [...currentMovies, { ...movie}]
    }

    this.lovableMovies.set(updated);

  }

  getCount(){
    return this.lovableMovies().length + this.lovableTvShows().length
  }
}
