import { CommonModule } from '@angular/common';
import { AfterViewChecked, ElementRef, ViewChild, AfterViewInit, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ChatService } from '../chat.service';
import { flag , username } from '../../../global';

@Component({
  selector: 'app-room',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './room.component.html',
  styleUrl: './room.component.css'
})
export class RoomComponent implements OnInit, AfterViewInit, AfterViewChecked {

  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;

  messages$ = new BehaviorSubject<any[]>([]);
  user: string = '';
  message: string = '';

  // messages: { user: string, message: string }[] = [{
  //   user: 'John',
  //   message: 'Hello, how are you?'
  // },
  // {
  //   user: 'Jane',
  //   message: 'Hi, I am good. How about you?'
  // },
  // {
  //   user: 'John',
  //   message: 'I am good too. Thanks for asking!'
  // },
  // {
  //   user: 'Jane',
  //   message: 'You are welcome!'
  // },
  // {
  //   user: 'John',
  //   message: 'Bye, see you later!'
  // }, {
  //   user: 'Jane',
  //   message: 'Bye, see you later!'
  // }];

  constructor(private chatService: ChatService, private router: Router) {

    if (localStorage.getItem('globalCR') === null) {
      this.sendBackToHome();
    } else {
      let dataFromDB = localStorage.getItem('globalCR');
      if (dataFromDB) {
        this.user = JSON.parse(dataFromDB).name;
        flag.set(true);
        username.set(this.user);
      }
    }
    this.chatService.getMessages().subscribe(data => this.messages$.next(data));
    this.chatService.sendMessage('system', this.user + " has joined the chat! 🎉");
  }


  ngOnInit() { }

  sendBackToHome() {
    this.router.navigate(['/']);
  }

  handleKeyPressForSendMessage(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.handleSendMessage();
    }
  }

  handleSendMessage() {
    if (this.message.length > 0 && this.user.length > 0) {
      this.chatService.sendMessage(this.user, this.message);
      // this.messages.push({ user: 'John', message: this.message });
      this.message = '';
    }
  }

  ngAfterViewInit() {
    this.scrollToBottom();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    } catch (err) {
      console.error("Scroll Error:", err);
    }
  }
}


