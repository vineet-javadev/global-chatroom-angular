import { Component, computed } from '@angular/core';
import { RouterModule } from '@angular/router';
import { flag, username } from '../../../global';
import { Router } from '@angular/router';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  username = computed(() => username());
  flag = computed(() => flag());

  constructor(private chatService: ChatService, private router: Router) {

  }

  handleLogOut() {
    this.router.navigate(['/']);
    flag.set(false);
    this.chatService.sendMessage('system', username() + " has left the chat. 👋");
    username.set('John Deo');
    if (localStorage.getItem('globalCR')) {
      localStorage.removeItem('globalCR');
    }
  }
}
