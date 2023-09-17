import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { AccountFacade } from 'store/src/lib/AccountStore/account.facade';
import { ApplicationUser, LoginUser } from '@msn-ui/store';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuComponent } from './../menu/menu.component';

export interface Roling{
  name:string;
  code:string;
}
@Component({
  selector: 'msn-ui-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit{

  @ViewChild('childReset') childReset !: MenuComponent;

  loginUser: LoginUser = {
    UserNameOrEmail: '',
    Password: '',
  };

  registerUser: ApplicationUser = {
    id:'',
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

  logoutDropdown: MenuItem[] = [
    {
      label: 'Logout',
      icon: 'pi pi-user',
      command: () => {
        this.logoutUser();
      },
    }
  ];

  loginDialog = false;

  registerDialog = false;

  passwordConfirmation = '';

  fileValidation = [''];

  currentUserConnected?: ApplicationUser;

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private accountFacade: AccountFacade,
    private route: ActivatedRoute,
    private menuComponent : MenuComponent,
    private router : Router
  ) {}


  ngOnInit(): void{
    this.currentUserConnected = JSON.parse(localStorage.getItem('user')!);


  }

  logoutUser(){
    localStorage.setItem('user', JSON.stringify(''));
    this.currentUserConnected = undefined;
  }


  openLoginModal() {
    this.loginDialog = true;
  }

  openRegisterModal() {
    this.registerDialog = true;
  }

  login() {
    this.messageService.clear()

    this.accountFacade.login(this.loginUser);

    this.messageService.add({
      severity: 'info',
      summary: 'Confirmed',
      detail: 'You have been logged in successfully'
    });

    const currentUrl = this.router.url;
    console.log(currentUrl);
    this.router.navigateByUrl('/email-confirmation', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });

  }

  onFileSelect(event: any) {

    this.fileValidation = [];

    if (event && event.files && event.files.length > 0) {
      this.registerUser.file = event.files[0];
      console.log(this.registerUser.file?.type)
    }else{
      this.fileValidation.push("The picture is required to register")
    }

    if(this.registerUser.file?.type !== 'image/jpeg' && this.registerUser.file?.type !== 'image/png' && this.registerUser.file?.type !== 'image/webp'){
      this.fileValidation.push("Your file needs to be either : jpeg, png or webp to be uploaded")
    }
  }

  register() {

    this.registerUser.role = this.role.name;
    this.registerUser.link = window.location.protocol + '//' + window.location.host + "/email-confirmation?email=" + this.registerUser.email + "&token="

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

    this.messageService.clear()

    this.messageService.add({
      severity: 'info',
      summary: 'Confirmed',
      detail:
        'A confirmation Email has been sent to you. Please consult your inbox',
    });

    const currentUrl = this.router.url;
    console.log(currentUrl);
    this.router.navigateByUrl('/email-confirmation', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
  }

  reinitializeChild() {
    this.childReset.reinitialize();
  }
}
