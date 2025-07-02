import { Routes } from '@angular/router';
import { MovieDetails } from './movie-details/movie-details';
import { Home } from './home/home';
import { MoviesWishlist } from './movies-wishlist/movies-wishlist';

export const routes: Routes = [

    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: Home },
    { path: 'wishlist', component: MoviesWishlist },
    { path: 'movie/:id', component: MovieDetails },

];
