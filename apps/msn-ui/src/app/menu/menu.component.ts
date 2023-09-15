import { MessageFacade } from './../../../../../store/src/lib/MessageStore/message.facade';
import { connectedUser } from './../../../../../store/src/lib/AccountStore/account.actions';
import { AfterContentChecked, AfterContentInit, AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ApplicationUser } from '@msn-ui/store';
import { AccountFacade } from 'store/src/lib/AccountStore/account.facade';
import { AccountService } from 'store/src/lib/AccountStore/account.service';
import { ChatMessage } from 'store/src/lib/Entities/chatMessage';
import { MessageSent } from 'store/src/lib/Entities/messageSent';
import { MessageService } from 'store/src/lib/MessageStore/message.service';
import { MessageThread } from 'store/src/lib/Entities/messageThread';
import { filter, map, switchMap, take } from 'rxjs';
import { ScrollPanel } from 'primeng/scrollpanel';

@Component({
  selector: 'msn-ui-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit, AfterContentInit {

  @ViewChild('scrollMe') scrollMe!: ElementRef;


  @Input() userNameOuEmail!: string;

  allUsers$ = this.accountFacade.allUsers$;

  connectedUser$ = this.accountFacade.connectedUser$;

  currentUser$ = this.accountFacade.byUsernameUser$;

  allMessages$ = this.messageFacade.messageThread$;

  userNameOrEmail!: string;

  showChatBox!: boolean[];

  currentUserName = '';

  targetUser: ApplicationUser = {
    id:'',
  userName:'',
  email:'',
  password:'',
  link:'',

  role:'',
  friends:[]
  };

  currentUser!: ApplicationUser;

  currentUserWithFriends?: ApplicationUser;

  messageContent = '';

  allMessages!: ChatMessage[];

  scrollbar!:ElementRef;

  showChatFlow = false;

  constructor(
    private accountFacade: AccountFacade,
    public messageFacade: MessageFacade,
    public messageService: MessageService
  ) {}

  ngOnInit(): void {

    this.accountFacade.allUsers();

    this.currentUser = JSON.parse(localStorage.getItem('user')!);

    this.accountFacade.getUserByUserName(this.currentUser.userName);

    // this.currentUser$.subscribe({
    //   next:(user:ApplicationUser | undefined)=>{
    //     this.currentUserWithFriends = user;
    //     console.log(this.currentUserWithFriends);
    //   }
    // })

    this.accountFacade.byUsernameUser$
  .pipe(
    filter((byUsernameUser) => !!byUsernameUser),
    switchMap(byUsernameUser => this.currentUser$),
    take(1)
  )
  .subscribe((currentUserWithFriends) => {
    this.currentUserWithFriends = currentUserWithFriends;
    console.log(this.currentUserWithFriends);
  });




    this.allMessages$.subscribe({
      next:(messages:ChatMessage[])=>{
        this.allMessages = messages
      }
    })
  }

  ngAfterContentInit(): void {
      this.scrollToBottom()
  }

  private scrollToBottom(): void {
    try {
      if(this.scrollMe !== undefined){
        this.scrollMe.nativeElement.scrollTop = this.scrollMe.nativeElement.scrollHeight;
      }else{
        console.error('scrollbar is undefined');
      }
    } catch(err) {
      console.error('Could not scroll to bottom:', err);
    }
  }

  addFriend(userName: string) {
    console.log('Add friends store');
  }

  displayChat(user:ApplicationUser){
    this.targetUser = user;

    const messageThread: MessageThread = {
      currentUsername: this.currentUser.userName,
      otherUsername: this.targetUser.userName,
    };

    this.messageFacade.createHubConnection(
      this.currentUser,
      this.targetUser.userName
    );

    this.messageFacade.messageThread(messageThread);

  }

  createMessage() {
    const messageSent: MessageSent = {
      senderUsername: this.currentUser.userName,
      targetId: this.targetUser?.id,
      content: this.messageContent,
      messageSent: new Date(),
    };

    this.messageFacade.createMessage(messageSent);



  }



}
