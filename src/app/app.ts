import { Component } from '@angular/core';
import { Nav } from './nav/nav';
import { Home } from './home/home';

import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { ToolbarModule } from 'primeng/toolbar';

@Component({
  selector: 'app-root',
  imports: [ Nav, Home],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'E-Commerce';
}
