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
  selector: 'app-home',
  imports: [RouterModule, InputTextModule, ButtonModule, PaginatorModule, CommonModule, BadgeModule, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit {

  movieService = inject(MovieService);
  wishlistService = inject(WishlistService);

  movies = signal<any[]>([]);

  searchInput = this.movieService.searchInput;

  ngOnInit() {
    this.movieService.getMovies().subscribe({
      next: (data: any) => {
        console.log(data);
        this.movies.set(data.results);
      },
      error: (err) => {
        console.error('Failed to load movies:', err);
      }
    });
  }

  onPageChange(event: PaginatorState) {
    const page = (event.page ?? 0) + 1;
    this.movieService.getPage(page).subscribe((res: any) => {
      this.movies.set(res.results);
    });
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  toggle(id: number) {
    const movie = this.movies().find(p => p.id === id);
    if (movie) {
      this.wishlistService.toggleBtn(movie);
    }
  }

  isInWishlist(id: number): boolean {
    return this.wishlistService.lovableMovies().some(p => p.id === id);
  }

  getPercentage(p: number) {
    return Math.round((p / 10) * 100)
  }

}