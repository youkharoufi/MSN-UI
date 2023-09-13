import { MessageFacade } from './../../../../../store/src/lib/MessageStore/message.facade';
import { connectedUser } from './../../../../../store/src/lib/AccountStore/account.actions';
import { Component, Input, OnInit } from '@angular/core';
import { ApplicationUser } from '@msn-ui/store';
import { AccountFacade } from 'store/src/lib/AccountStore/account.facade';
import { AccountService } from 'store/src/lib/AccountStore/account.service';
import { ChatMessage } from 'store/src/lib/Entities/chatMessage';
import { MessageSent } from 'store/src/lib/Entities/messageSent';
import { MessageService } from 'store/src/lib/MessageStore/message.service';
import { MessageThread } from 'store/src/lib/Entities/messageThread';
import { filter, map, take } from 'rxjs';

@Component({
  selector: 'msn-ui-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit{

  @Input() userNameOuEmail!: string;

  allUsers$ = this.accountFacade.allUsers$;

  connectedUser$ = this.accountFacade.connectedUser$;

  targetUser$ = this.accountFacade.byUsernameUser$;

  userNameOrEmail!: string;

  showChatBox!:boolean[];

  currentUserName = "";

  targetUser?: ApplicationUser;

  currentUser!: ApplicationUser

  messageContent = "";

  allMessages!: ChatMessage[];

  constructor(private accountFacade : AccountFacade, public messageFacade: MessageFacade, public messageService: MessageService){}

  ngOnInit(): void{
    this.accountFacade.allUsers();


    this.currentUser = JSON.parse(localStorage.getItem('user')!);



    // this.connectedUser$.subscribe({
    //   next:(user:ApplicationUser | undefined)=>{

    //     this.currentUser = user;

    //         }});

    //         const messageThread : MessageThread = {
    //           currentUsername:this.userNameOuEmail,
    //           otherUsername:this.targetUser?.userName

    //         }




    // this.messageService.messageThread(messageThread).subscribe({
    //   next:(messages:any)=>{
    //     this.allMessages = messages
    //   }
    // })

  }

  displayOneChatAtATime(userName: string) {
    this.currentUserName = userName;

    console.log(userName);

    // Dispatch the action to fetch the user by username
    this.accountFacade.getUserByUserName(userName);


    // Subscribe to the observable and wait for a non-undefined value
    this.accountFacade.byUsernameUser$.pipe(
      filter(byUsernameUser => !!byUsernameUser), // Wait for a non-undefined value
      take(1) // Take only one value and then complete
    ).subscribe(byUsernameUser => {
      // Now, the user data is available in byUsernameUser

      this.targetUser$.subscribe({
        next:(user:ApplicationUser | undefined)=>{
          this.targetUser = user;
        }
      });

      const messageThread: MessageThread = {
        currentUsername: this.currentUser.userName,
        otherUsername: userName
      }

      this.messageFacade.createHubConnection(this.currentUser, this.targetUser!.userName);

      this.messageFacade.messageThread(messageThread);
    });
  }



  addFriend(userName:string){
    console.log("Add friends store");
  }

  createMessage(){




        const messageSent: MessageSent = {
          senderUsername:this.currentUser.userName,
          targetId:this.targetUser?.id,
          content:this.messageContent,
          messageSent: new Date()
        }

        this.messageFacade.createMessage(messageSent);

      }







}
