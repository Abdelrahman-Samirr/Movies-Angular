import { Component, inject, OnInit, signal } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MovieService } from '../movie-service';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { CommonModule } from '@angular/common';
import { BadgeModule } from 'primeng/badge';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterModule, InputTextModule, ButtonModule, PaginatorModule, CommonModule, BadgeModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit {

  movieService = inject(MovieService);

  movies = signal<any[]>([]);

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
  }



  getPercentage(p: number) {
    return Math.round((p / 10) * 100)
  }

}