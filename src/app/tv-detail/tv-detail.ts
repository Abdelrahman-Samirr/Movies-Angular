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
  selector: 'app-tv-detail',
  imports: [RouterModule, CommonModule, RatingModule, FormsModule, Rating, Tag, BadgeModule, CarouselModule],
  templateUrl: './tv-detail.html',
  styleUrl: './tv-detail.scss'
})
export class TvDetail implements OnInit {

  route = inject(ActivatedRoute);
  movieService = inject(MovieService);
  wishlistService = inject(WishlistService);


  tvShow = signal<any>(null);
  genres = signal<any[]>([]);

  recommended = signal<any[]>([]);

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      if (id) {
        window.scrollTo({ top: 0, behavior: 'smooth' });

        this.movieService.getTvShowsById(id).subscribe((tv: any) => {
          this.tvShow.set(tv);
          this.genres.set(tv.genres)

          console.log(tv)
        });
      }
      if (id) {
        window.scrollTo({ top: 0, behavior: 'smooth' });

        this.movieService.getRecommendedTvShowsById(id).subscribe((tv: any) => {
          this.recommended.set(tv.results);

          console.log(tv)
        });
      }
    });
  }

  getPercentage(p: number) {
    return Math.round((p / 10) * 100)
  }

  toggle() {
    const tv = this.tvShow();
    if (tv) {
      this.wishlistService.toggleTvBtn(tv);
    }
  }

  toggleRecommended(id: number) {
    const tv = this.recommended().find(p => p.id === id);
    if (tv) {
      this.wishlistService.toggleTvBtn(tv);
    }
  }

  isInWishlist(id: number): boolean {
    return this.wishlistService.lovableTvShows().some(p => p.id === id);
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
