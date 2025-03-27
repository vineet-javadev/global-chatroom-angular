import { Component, computed, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { flag , username } from '../../../global';
import { CommonModule } from '@angular/common';
import { selectedServer } from '../../../global';

@Component({
  selector: 'app-home',
  imports: [RouterModule , CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  selectedServerComp = computed(()=> selectedServer());
  
  userData: { sellectedServer: string, name: string } = { sellectedServer: selectedServer(), name: '' }

  constructor(private router: Router) {

    if (typeof window !== 'undefined' && localStorage) { 
      let fromDB = localStorage.getItem('globalCR');
      if ( fromDB !== null) {
        username.set(JSON.parse(fromDB).name);
        flag.set(true);
        this.router.navigate(['/room']);
      }
    }
  }


  handleChangeServer(event: Event) {
    const target = event.target as HTMLAnchorElement;
    const value = target.innerText.trim(); 
    switch (value) {
      case 'India':
        selectedServer.set('server-ind');
        break;
      case 'Russia':
        selectedServer.set('server-rus');
        break;
      case 'USA':
        selectedServer.set('server-usa');
        break;
      case 'Canada':
        selectedServer.set('server-can');
        break;

      default:
        selectedServer.set('server-global');
        break;
    }
  }

  handleLogin() {
    const target = document.getElementById('username') as HTMLInputElement;
    if (target.value.length > 0) {
      let name = target.value;
      this.userData.name = name.charAt(0).toUpperCase()+name.substring(1);
      localStorage.setItem('globalCR', JSON.stringify(this.userData));
      username.set(this.userData.name);
      flag.set(true);
      this.router.navigate(['/room']);
      
    } else {
      alert('Please enter your name first.');
    }

  }

}
