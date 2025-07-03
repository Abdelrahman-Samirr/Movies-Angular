import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WishlistService } from '../wishlist-service';


@Component({
  selector: 'app-nav',
  imports: [RouterModule],
  templateUrl: './nav.html',
  styleUrl: './nav.scss'
})
export class Nav {
    
    wishlistService = inject(WishlistService)

}
