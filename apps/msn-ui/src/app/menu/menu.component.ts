import { Component, OnInit } from '@angular/core';
import { ApplicationUser } from '@msn-ui/store';
import { AccountFacade } from 'store/src/lib/AccountStore/account.facade';
import { MessageService } from 'store/src/lib/MessageStore/message.service';

@Component({
  selector: 'msn-ui-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit{

  allUsers$ = this.accountFacade.allUsers$;

  connectedUser$ = this.accountFacade.connectedUser$;

  byUsernameUser$ = this.accountFacade.byUsernameUser$;

  userNameOrEmail!: string;

  showChatBox!:boolean[];

  currentUserName = "";

  targetUser?: ApplicationUser;

  currentUser?: ApplicationUser;

  constructor(private accountFacade : AccountFacade, public messageService: MessageService){}

  ngOnInit(): void{
    this.accountFacade.allUsers();
    this.accountFacade.connectedUser();

    this.allUsers$.subscribe({
      next:(users:ApplicationUser[])=>{
        users.forEach((u)=>{
          console.log(u.friends)
        })
      }
    })

  }

  displayOneChatAtATime(userName:string){

    this.currentUserName = userName;

    this.accountFacade.getUserByUserName(userName);

    this.connectedUser$.subscribe({
      next:(user?:ApplicationUser)=>{
        this.currentUser = user
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
}
