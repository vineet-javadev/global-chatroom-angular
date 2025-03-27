import { inject, Injectable } from '@angular/core';
import { Firestore, collection, addDoc, query, orderBy, collectionData, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { setLogLevel, LogLevel } from "@angular/fire";
import { selectedServer } from '../../global';



interface ChatMessage {
  user: string;
  message: string;
  timestamp: number;
  id?: string;
}

@Injectable({ providedIn: 'root' })
export class ChatService {

  currentTimestamp : number | undefined;

  private firestore = inject(Firestore); // Use inject function for Firestore

  constructor() {
    this.currentTimestamp = Date.now();
    setLogLevel(LogLevel.VERBOSE);
  }

  sendMessage(user: string, message: string) {
    if (user && message) {
      const chatCollection = collection(this.firestore, selectedServer());
      return addDoc(chatCollection, {
        user,
        message,
        timestamp: Date.now(),
      });
    }
    return null;
  }

  getMessages(): Observable<ChatMessage[]> {
    const chatCollection = collection(this.firestore, selectedServer()); 
    const chatQuery = query(chatCollection, where('timestamp', '>', this.currentTimestamp) ,orderBy('timestamp', 'asc')); 
    return collectionData(chatQuery, { idField: 'id' }) as Observable<ChatMessage[]>; 
  }
}
