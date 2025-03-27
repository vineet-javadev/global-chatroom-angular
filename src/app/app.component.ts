import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./navbar/navbar.component";
import { selectedServer } from '../../global';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'global-chatroom';

  async getCurrentCountry() {
    try {
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      return data.country_name; // Returns the country name
    } catch (error) {
      console.error("Error fetching country:", error);
      return "Unknown";
    }
  }


  constructor() {
    this.getCurrentCountry().then(country => {
      switch (country) {
        case 'India':
          selectedServer.set('server-ind');
          break;
        case 'USA':
          selectedServer.set('server-usa');
          break;
        case 'Russia':
          selectedServer.set('server-rus');
          break;
        case 'Canada':
          selectedServer.set('server-can');
          break;

        default:
          selectedServer.set('server-global');
          break;
      }
    });
  }
}
