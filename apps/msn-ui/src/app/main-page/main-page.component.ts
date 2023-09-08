import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { Component } from '@angular/core';
import { AccountFacade } from 'store/src/lib/AccountStore/account.facade';
import { ApplicationUser, LoginUser } from '@msn-ui/store';

export interface Roling{
  name:string;
  code:string;
}
@Component({
  selector: 'msn-ui-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent {
  loginUser: LoginUser = {
    UserNameOrEmail: '',
    Password: '',
  };

  registerUser: ApplicationUser = {
    userName: '',
    email: '',
    password: '',
    link: '',
    token: '',
    photoUrl: '',
    file: undefined,
    role: '',
  };

  roles = [
    { name: 'Admin', code: 'AD' },
    { name: 'Member', code: 'ME' },
  ];

  role !: Roling;

  userDropdown: MenuItem[] = [
    {
      label: 'Login',
      icon: 'pi pi-user',
      command: () => {
        this.openLoginModal();
      },
    },
    {
      label: 'Register',
      icon: 'pi pi-user-edit',
      command: () => {
        this.openRegisterModal();
      },
    },
  ];

  loginDialog = false;

  registerDialog = false;

  passwordConfirmation = '';

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private accountFacade: AccountFacade
  ) {}

  openLoginModal() {
    this.loginDialog = true;
  }

  openRegisterModal() {
    this.registerDialog = true;
  }

  login() {
    this.accountFacade.login(this.loginUser);
    this.messageService.add({
      severity: 'info',
      summary: 'Confirmed',
      detail: 'You have been logged in successfully',
    });
  }

  onFileSelect(event: any) {
    if (event && event.files && event.files.length > 0) {
      this.registerUser.file = event.files[0];
    }
  }

  register() {

    this.registerUser.role = this.role.name;
    this.registerUser.link = window.location.protocol + '//' + window.location.host + "/email-confirmation/search?email=" + this.registerUser.email + "&token="

    console.log(this.registerUser.file);
    const formData = new FormData();
    formData.append('userName', this.registerUser.userName);
    formData.append('email', this.registerUser.email);
    formData.append('role', this.registerUser.role);
    formData.append('file', this.registerUser.file!);
    formData.append('link', this.registerUser.link);
    formData.append('password', this.registerUser.password);



    console.log(this.registerUser);

    this.accountFacade.register(formData);
    this.messageService.add({
      severity: 'info',
      summary: 'Confirmed',
      detail:
        'A confirmation Email has been sent to you. Please consult your inbox',
    });
  }
}
