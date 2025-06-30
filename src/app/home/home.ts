import { Component, inject, OnInit, signal } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MovieService } from '../movie-service';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';


@Component({
  selector: 'app-home',
  imports: [InputTextModule, ButtonModule, PaginatorModule],
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

  first: number = 0;

  rows: number = 10;

  onPageChange(event: PaginatorState) {
    this.first = event.first ?? 0;
    this.rows = event.rows ?? 10;
  }

}