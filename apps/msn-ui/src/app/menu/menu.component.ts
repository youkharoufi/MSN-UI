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

@Component({
  selector: 'msn-ui-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit{

  @Input() userNameOuEmail!: string;

  allUsers$ = this.accountFacade.allUsers$;

  connectedUser$ = this.accountFacade.connectedUser$;

  byUsernameUser$ = this.accountFacade.byUsernameUser$;

  userNameOrEmail!: string;

  showChatBox!:boolean[];

  currentUserName = "";

  targetUser?: ApplicationUser;

  currentUser?: ApplicationUser;

  messageContent = "";

  allMessages!: ChatMessage[];

  constructor(private accountFacade : AccountFacade, private messageFacade: MessageFacade, public messageService: MessageService){}

  ngOnInit(): void{
    this.accountFacade.allUsers();


    this.allUsers$.subscribe({
      next:(users:ApplicationUser[])=>{
        users.forEach((u)=>{
          console.log(u.friends)
        })
      }
    });

    this.connectedUser$.subscribe({
      next:(user:ApplicationUser | undefined)=>{

        this.currentUser = user;

            }});

            const messageThread : MessageThread = {
              currentUsername:this.userNameOuEmail,
              otherUsername:this.targetUser?.userName

            }




    this.messageFacade.messageThread(messageThread);

    this.messageService.messageThread(messageThread).subscribe({
      next:(messages:any)=>{
        this.allMessages = messages
      }
    })

  }

  displayOneChatAtATime(userName:string){

    this.currentUserName = userName;
    this.accountFacade.connectedUser(this.userNameOuEmail);

    this.accountFacade.getUserByUserName(userName);

    const messageThread : MessageThread = {
      currentUsername:this.userNameOuEmail,
      otherUsername:userName

    }

    this.messageService.messageThread(messageThread).subscribe({
      next:(messages:any)=>{
        this.allMessages = messages
      }
    })

    this.byUsernameUser$.subscribe({
      next:(user?:ApplicationUser)=>{
        this.targetUser = user;
      }
    })

  }

  addFriend(userName:string){
    console.log("Add friends store");
  }

  createMessage(){

    this.connectedUser$.subscribe({
      next:(user:ApplicationUser | undefined)=>{

        console.log(user)
        this.currentUser= user!;


        const messageSent: MessageSent = {
          senderUsername:this.currentUser.userName,
          targetId:this.targetUser?.id,
          content:this.messageContent,
          messageSent: new Date()
        }

        this.messageFacade.createMessage(messageSent);


                const messageThread : MessageThread = {
                  currentUsername:this.userNameOuEmail,
                  otherUsername:this.targetUser?.userName

                }

        this.messageFacade.messageThread(messageThread);

        this.messageService.messageThread(messageThread).subscribe({
          next:(messages:any)=>{
            console.log(messages);
          }
        })
      }
    })


    }




}
