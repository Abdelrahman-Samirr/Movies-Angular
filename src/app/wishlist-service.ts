import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  lovableMovies = signal<any[]>([])

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
    return this.lovableMovies().length
  }
}
