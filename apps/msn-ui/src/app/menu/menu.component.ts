import { MessageFacade } from './../../../../../store/src/lib/MessageStore/message.facade';
import { connectedUser } from './../../../../../store/src/lib/AccountStore/account.actions';
import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ApplicationUser } from '@msn-ui/store';
import { AccountFacade } from 'store/src/lib/AccountStore/account.facade';
import { AccountService } from 'store/src/lib/AccountStore/account.service';
import { ChatMessage } from 'store/src/lib/Entities/chatMessage';
import { MessageSent } from 'store/src/lib/Entities/messageSent';
import { MessageService } from 'store/src/lib/MessageStore/message.service';
import { MessageThread } from 'store/src/lib/Entities/messageThread';
import { filter, map, of, switchMap, take } from 'rxjs';
import { ScrollPanel } from 'primeng/scrollpanel';

interface PageEvent {
  first?: number;
  rows?: number;
  page?: number;
  pageCount?: number;
}

@Component({
  selector: 'msn-ui-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
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
    id: '',
    userName: '',
    email: '',
    password: '',
    link: '',

    role: '',
    friends: [],
  };

  currentUser!: ApplicationUser;

  currentUserWithFriends?: ApplicationUser;

  messageContent = '';

  allMessages!: ChatMessage[];

  scrollbar!: ElementRef;

  showChatFlow = false;

  allUsers!: ApplicationUser[];

  totalRecords!: number;
  currentPage = 0;
  rowsPerPage = 4;

  constructor(
    private accountFacade: AccountFacade,
    public messageFacade: MessageFacade,
    public messageService: MessageService,
    private cdr: ChangeDetectorRef
  ) {

  }

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
        switchMap((byUsernameUser) => this.currentUser$),
        take(1)
      )
      .subscribe((currentUserWithFriends) => {
        this.currentUserWithFriends = currentUserWithFriends;
        console.log(this.currentUserWithFriends);
      });


      this.allUsers$.subscribe({
        next: (users: ApplicationUser[]) => {
          this.totalRecords = users.length;
          this.updateDisplayedUsers();

        },
      });



  }

  private scrollToBottom(): void {
    try {
      this.scrollMe.nativeElement.scrollTop =
        this.scrollMe.nativeElement.scrollHeight;
    } catch (err) {
      console.error('Could not scroll to bottom:', err);
    }
  }

  addFriend(userName: string) {
    console.log('Add friends store');
  }

  displayChat(user: ApplicationUser) {
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

    this.allMessages$.subscribe({
      next: (messages: ChatMessage[]) => {
        this.allMessages = messages;
        setTimeout(() => {
          this.scrollToBottom();
        });
      },
    });
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



  updateDisplayedUsers() {
    const start = this.currentPage * this.rowsPerPage;

    this.allUsers$.pipe(take(1)).subscribe(users => {
      this.allUsers = users.slice(start, start + this.rowsPerPage);
    });
  }

  paginate(event:any) {
    this.currentPage = event.page;
    setTimeout(()=>{
      this.updateDisplayedUsers();
    })
    this.cdr.detectChanges();
  }

  reinitialize(){
    this.accountFacade.allUsers();
  this.allUsers$.subscribe({
    next: (users: ApplicationUser[]) => {
      console.log(users);
      this.allUsers = users;
      this.totalRecords = this.allUsers.length;
      this.cdr.markForCheck();
      this.updateDisplayedUsers();

    }
  });

  }
}
