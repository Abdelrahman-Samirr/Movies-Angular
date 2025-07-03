import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { Rating } from 'primeng/rating';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../movie-service';
import { Tag } from 'primeng/tag';
import { BadgeModule } from 'primeng/badge';
import { CarouselModule } from 'primeng/carousel';
import { WishlistService } from '../wishlist-service';



@Component({
  selector: 'app-movie-details',
  imports: [RouterModule, CommonModule, RatingModule, FormsModule, Rating, Tag, BadgeModule, CarouselModule],
  templateUrl: './movie-details.html',
  styleUrl: './movie-details.scss'
})
export class MovieDetails implements OnInit {

  route = inject(ActivatedRoute);
  movieService = inject(MovieService);
  wishlistService = inject(WishlistService);


  movies = computed(() => this.wishlistService.lovableMovies())

  movie = signal<any>(null);
  genres = signal<any[]>([]);
  recommended = signal<any[]>([]);

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      if (id) {
        window.scrollTo({ top: 0, behavior: 'smooth' });

        this.movieService.getMovieById(id).subscribe((mov: any) => {
          this.movie.set(mov);
          this.genres.set(mov.genres)

          console.log(mov)
        });
      }
      if (id) {
        window.scrollTo({ top: 0, behavior: 'smooth' });

        this.movieService.getRecommendedById(id).subscribe((mov: any) => {
          this.recommended.set(mov.results);

          console.log(mov)
        });
      }
    });
  }

  getPercentage(p: number) {
    return Math.round((p / 10) * 100)
  }

  toggle(id: number) {
    const movie = this.movie();
    if (movie) {
      this.wishlistService.toggleBtn(movie);
    }
  }

  toggleRecommended(id: number) {
    const movie = this.recommended().find(p => p.id === id);
    if (movie) {
      this.wishlistService.toggleBtn(movie);
    }
  }

  isInWishlist(id: number): boolean {
    return this.wishlistService.lovableMovies().some(p => p.id === id);
  }

  responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 3,
      numScroll: 1
    },
    {
      breakpoint: '768px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '560px',
      numVisible: 1,
      numScroll: 1
    }
  ];

}
