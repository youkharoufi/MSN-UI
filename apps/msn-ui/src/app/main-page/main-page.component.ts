import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { Component, Input } from '@angular/core';
import { AccountFacade } from 'store/src/lib/AccountStore/account.facade';
import { LoginUser } from '@msn-ui/store';

@Component({
  selector: 'msn-ui-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent {


    loginUser : LoginUser = {
      UserNameOrEmail:'',
      Password:''
    }

    userDropdown : MenuItem[] = [
      {
          label: 'Login',
          icon: 'pi pi-user',
          command: () => {
              this.openLoginModal();
          }
      },
      {
          label: 'Register',
          icon: 'pi pi-user-edit',
          command: () => {
            console.log("test");
          }
      }];

      visible = false;





    constructor(private confirmationService: ConfirmationService, private messageService : MessageService, private accountFacade : AccountFacade){}


    openLoginModal(){
      this.visible = true

    }

    login(){
      this.accountFacade.login(this.loginUser);
      this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have been logged in successfully' });
    }




}

