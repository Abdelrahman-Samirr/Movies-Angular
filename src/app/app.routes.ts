import { Routes } from '@angular/router';
import { MovieDetails } from './movie-details/movie-details';
import { Home } from './home/home';
import { MoviesWishlist } from './movies-wishlist/movies-wishlist';
import { SearchPage } from './search-page/search-page';
import { Tvshows } from './tvshows/tvshows';
import { TvDetail } from './tv-detail/tv-detail';

export const routes: Routes = [

    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: Home },
    { path: 'wishlist', component: MoviesWishlist },
    { path: 'movie/:id', component: MovieDetails },
    { path: 'search/:name', component: SearchPage },
    { path: 'tvshows', component: Tvshows },
    { path: 'tvshows/:id', component: TvDetail },

];
