import { AfterContentInit, AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ApplicationUser } from '@msn-ui/store';
import { filter, take } from 'rxjs';
import { AccountFacade } from 'store/src/lib/AccountStore/account.facade';
import { ChatMessage } from 'store/src/lib/Entities/chatMessage';
import { MessageSent } from 'store/src/lib/Entities/messageSent';
import { MessageThread } from 'store/src/lib/Entities/messageThread';
import { MessageFacade } from 'store/src/lib/MessageStore/message.facade';

@Component({
  selector: 'msn-ui-message-flow',
  templateUrl: './message-flow.component.html',
  styleUrls: ['./message-flow.component.scss'],
})
export class MessageFlowComponent implements AfterViewInit{

  @Input() targetUser?: ApplicationUser;

  @ViewChild('scrollMe') scrollMe !: ElementRef;

  scrollbar!: ElementRef;

  allMessages$ = this.messageFacade.messageThread$;

  allMessages!: ChatMessage[];

  currentUser!: ApplicationUser;

  messageContent ='';

  constructor(private messageFacade : MessageFacade, private accountFacade : AccountFacade){
  }

  ngOnInit(): void{
    console.log(this.targetUser);


    const messageThread: MessageThread = {
      currentUsername: this.currentUser.userName,
      otherUsername: this.targetUser?.userName,  // Use the user from the observable directly
    };

    this.messageFacade.createHubConnection(
      this.currentUser,
      this.targetUser!.userName // Use the user from the observable directly
    );

    this.messageFacade.messageThread(messageThread);


  }

  ngAfterViewInit(): void{
    this.scrollToBottom();
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

  private scrollToBottom(): void {
    try {
      this.scrollbar = this.scrollMe;
      if(this.scrollbar !== undefined){
        this.scrollbar.nativeElement.scrollTop = this.scrollbar.nativeElement.scrollHeight;
      }else{
        console.error('scrollbar is undefined');
      }
    } catch(err) {
      console.error('Could not scroll to bottom:', err);
    }
  }



}


