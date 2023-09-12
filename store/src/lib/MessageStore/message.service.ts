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


  private hubConnection?: HubConnection;
  private messageThreadSource = new BehaviorSubject<ChatMessage[]>([]);
  messageThread$ = this.messageThreadSource.asObservable();

  baseUrl = environment.API_URL;
  hubUrl = environment.HUB_URL;

  constructor(private http: HttpClient) { }

  createHubConnection(user: ApplicationUser | null, otherId: string) {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(this.hubUrl + 'message?user=' + otherId, {
        accessTokenFactory: () => user!.token || ""
      })
      .withAutomaticReconnect()
      .build();

    this.hubConnection.start().catch(error => console.log(error));

    this.hubConnection.on('ReceivedMessageThread', messages => {
      this.messageThreadSource.next(messages);
    })

    this.hubConnection.on('NewMessage', message => {
      this.messageThread$.pipe(take(1)).subscribe({
        next: messages => {
          this.messageThreadSource.next([...messages, message])
        }
      })
    })
  }

  stopHubConnection() {
    if (this.hubConnection) {
      this.hubConnection.stop();

    }
  }

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
    return this.http.get<ChatMessage[]>(this.baseUrl + `chatMessages/thread/${messageThread.currentUsername}/${messageThread.otherUsername}`);
  }

  unreadMessagesCount(): Observable<number> {
    return this.http.get<number>(this.baseUrl + `unread-messages-count`);
  }



}
