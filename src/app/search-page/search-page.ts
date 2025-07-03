import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../movie-service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BadgeModule } from 'primeng/badge';
import { WishlistService } from '../wishlist-service';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-search-page',
  imports: [FormsModule, RouterModule, BadgeModule, ButtonModule, InputTextModule],
  templateUrl: './search-page.html',
  styleUrl: './search-page.scss'
})
export class SearchPage implements OnInit {

  route = inject(ActivatedRoute);
  movieService = inject(MovieService);
  wishlistService = inject(WishlistService);

  searchResults = signal<any[]>([]);
  searchInput = this.movieService.searchInput;


  ngOnInit() {
    this.route.paramMap.subscribe(params => {

      const name = params.get('name');

      if (name) {
        this.searchInput.set(name);

        this.movieService.getSearchPage(name).subscribe((res: any) => {
          this.searchResults.set(res.results);
        });
      }
      
    });

  }


  toggle(id: number) {
    const movie = this.searchResults().find(p => p.id === id);
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
