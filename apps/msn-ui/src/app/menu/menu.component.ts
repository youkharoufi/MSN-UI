import { allUsers } from './../../../../../store/src/lib/AccountStore/account.actions';
import { FriendFacade } from './../../../../../store/src/lib/FriendStore/friend.facade';
import { MessageFacade } from './../../../../../store/src/lib/MessageStore/message.facade';
import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
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
export class MenuComponent implements OnInit{
  @ViewChild('scrollMe') scrollMe!: ElementRef;

  @Input() userNameOuEmail!: string;

  allUsers$ = this.accountFacade.allUsers$;

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

  currentUserWithFriends?: ApplicationUser;

  messageContent = '';

  allMessages!: ChatMessage[];

  scrollbar!: ElementRef;

  showChatFlow = false;

  allUsers?: ApplicationUser[];

  allOfTheUsers!: ApplicationUser[];

  totalRecords?: number;
  currentPage = 0;
  rowsPerPage = 4;

  tabKey = 1;

  noChatDisplay = false;

  visible = false;

  targetU!: ApplicationUser;

  currentUser?: ApplicationUser;

  loggedUser$ = this.accountFacade.loggedUser$;

  allFriend$ = this.friendFacade.allFriend$;

  searchForFriends?: string;
  originalUsers: any[] =[];

  filteredUsers$ = this.accountFacade.filteredUsers$;

  constructor(
    private accountFacade: AccountFacade,
    public messageFacade: MessageFacade,
    public messageService: MessageService,
    private cdr: ChangeDetectorRef,
    private friendFacade: FriendFacade
  ) {

  }

   ngOnInit(): void {



    if(localStorage.getItem('user') !== null){

      this.currentUserWithFriends = JSON.parse(localStorage.getItem('user')!)



      this.friendFacade.getAllFriends(this.currentUserWithFriends!.userName);

      this.accountFacade.getUsersByFilter(this.searchForFriends!);


      this.filteredUsers$.subscribe({
        next: (users?: ApplicationUser[]) => {
          this.totalRecords = users?.length;
          this.updateDisplayedUsers();

        },
      });

    }else{
      console.log("No connected User")
    }




  }

  private scrollToBottom(): void {
    try {
      this.scrollMe.nativeElement.scrollTop =
        this.scrollMe.nativeElement.scrollHeight;
    } catch (err) {
      console.error('Could not scroll to bottom:', err);
    }
  }

  sendFriendRequest(){

    this.friendFacade.sendFriendRequest(this.currentUserWithFriends!.userName, this.targetU.userName);

    this.visible = false;

  }

  displayChat(user: ApplicationUser) {
    this.targetUser = user;

    const messageThread: MessageThread = {
      currentUsername: this.currentUserWithFriends?.userName,
      otherUsername: this.targetUser.userName,
    };

    this.messageFacade.createHubConnection(
      this.currentUserWithFriends!,
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
      senderUsername: this.currentUserWithFriends!.userName,
      targetId: this.targetUser?.id,
      content: this.messageContent,
      messageSent: new Date(),
    };

    this.messageFacade.createMessage(messageSent);
  }



  updateDisplayedUsers() {
    const start = this.currentPage * this.rowsPerPage;


    this.filteredUsers$.pipe(take(1)).subscribe(users => {
      this.allUsers = users?.slice(start, start + this.rowsPerPage);
    });
  }


  paginate(event:any) {
    this.currentPage = event.page;
    setTimeout(()=>{
      this.updateDisplayedUsers();
    })
    this.cdr.detectChanges();
  }

  openModal(user:ApplicationUser){
    this.targetU = user;
    this.visible = true;
  }

  dynamicFiltering(){
    if(this.searchForFriends === '' || this.searchForFriends === undefined || this.searchForFriends === null){
      this.searchForFriends = undefined;
      this.accountFacade.getUsersByFilter(this.searchForFriends!);


      this.filteredUsers$.subscribe({
        next: (users?: ApplicationUser[]) => {
          this.totalRecords = users?.length;
          this.updateDisplayedUsers();

        },
      });

    }else{
      this.accountFacade.getUsersByFilter(this.searchForFriends);

      this.filteredUsers$.subscribe({
          next:(value: ApplicationUser[] | undefined)=>{
            const start = this.currentPage * this.rowsPerPage;
            this.allUsers = value?.slice(start, start + this.rowsPerPage);

          }
      })

    }


  }

  launchFiltering(){

    if(this.searchForFriends === '' || this.searchForFriends === undefined || this.searchForFriends === null){
      this.searchForFriends = "All";
      this.accountFacade.getUsersByFilter(this.searchForFriends);


      this.filteredUsers$.subscribe({
        next: (users?: ApplicationUser[]) => {
          this.totalRecords = users?.length;
          this.updateDisplayedUsers();

        },
      });

    }else{
      this.accountFacade.getUsersByFilter(this.searchForFriends);

      this.filteredUsers$.subscribe({
          next:(value: ApplicationUser[] | undefined)=>{
            const start = this.currentPage * this.rowsPerPage;
            this.allUsers = value?.slice(start, start + this.rowsPerPage);

          }
      })

    }


  }
}
