import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, take } from 'rxjs';
import { environment } from 'apps/msn-ui/src/environments/environment';
import { MessageSent } from '../Entities/messageSent';
import { ChatMessage } from '../Entities/chatMessage';
import { MessageThread } from '../Entities/messageThread';
import { ApplicationUser } from '../Entities/applicationUser';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  baseUrl = environment.API_URL;

  constructor(private http: HttpClient) { }



  createMessage(messageSent: MessageSent): Observable<ChatMessage> {

    return this.http.post<ChatMessage>(this.baseUrl + "chatMessages/createMessage", messageSent);
  }

  inbox(): Observable<ChatMessage[]> {

    return this.http.get<ChatMessage[]>(this.baseUrl + "chatMessages/inbox");
  }

  outbox(): Observable<ChatMessage[]> {

    return this.http.get<ChatMessage[]>(this.baseUrl + "chatMessages/outbox");
  }

  messageThread(messageThread : MessageThread): Observable<ChatMessage[]> {
    return this.http.get<ChatMessage[]>(this.baseUrl + `chatmessages/thread/${messageThread.currentUsername}/${messageThread.otherUsername}`);
  }

  unreadMessagesCount(): Observable<number> {
    return this.http.get<number>(this.baseUrl + `chatmessages/unread-messages-count`);
  }



}
