import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { WishlistService } from '../wishlist-service';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';


@Component({
  selector: 'app-movies-wishlist',
  imports: [RouterModule, CommonModule, RatingModule, FormsModule, ButtonModule],
  templateUrl: './movies-wishlist.html',
  styleUrl: './movies-wishlist.scss'
})
export class MoviesWishlist {
  wishlistService = inject(WishlistService)

  movies = computed(() => this.wishlistService.lovableMovies())

  toggle(id: number) {
    const movie = this.movies().find(p => p.id === id);
    if (movie) {
      this.wishlistService.toggleBtn(movie);
    }
  }

  isInWishlist(id: number): boolean {
    return this.wishlistService.lovableMovies().some(p => p.id === id);
  }
}
