import { Component, inject, OnInit, signal } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MovieService } from '../movie-service';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { CommonModule } from '@angular/common';
import { BadgeModule } from 'primeng/badge';
import { RouterModule } from '@angular/router';
import { WishlistService } from '../wishlist-service';
import { FormsModule} from '@angular/forms';

@Component({
  selector: 'app-tvshows',
  imports: [RouterModule, InputTextModule, ButtonModule, PaginatorModule, CommonModule, BadgeModule, FormsModule],
  templateUrl: './tvshows.html',
  styleUrl: './tvshows.scss'
})
export class Tvshows implements OnInit {

  movieService = inject(MovieService);
  wishlistService = inject(WishlistService);

  tvShows = signal<any[]>([]);

  searchInput = this.movieService.searchInput;

  ngOnInit() {
    this.movieService.getTvShows().subscribe({
      next: (data: any) => {
        console.log(data);
        this.tvShows.set(data.results);
      },
      error: (err) => {
        console.error('Failed to load movies:', err);
      }
    });
  }

  onPageChange(event: PaginatorState) {
    const page = (event.page ?? 0) + 1;
    this.movieService.getTvPage(page).subscribe((res: any) => {
      this.tvShows.set(res.results);
    });
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  toggle(id: number) {
    const tvShow = this.tvShows().find(p => p.id === id);
    if (tvShow) {
      this.wishlistService.toggleTvBtn(tvShow);
    }
  }

  isInWishlist(id: number): boolean {
    return this.wishlistService.lovableTvShows().some(p => p.id === id);
  }

  getPercentage(p: number) {
    return Math.round((p / 10) * 100)
  }
}
