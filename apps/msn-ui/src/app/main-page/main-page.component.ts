import { FriendFacade } from './../../../../../store/src/lib/FriendStore/friend.facade';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { AccountFacade } from 'store/src/lib/AccountStore/account.facade';
import { ApplicationUser, LoginUser } from '@msn-ui/store';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuComponent } from './../menu/menu.component';
import { filter, of, take } from 'rxjs';

export interface Roling{
  name:string;
  code:string;
}
@Component({
  selector: 'msn-ui-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent{

  @ViewChild('childReset') childReset !: MenuComponent;

  loginUser: LoginUser = {
    UserName: '',
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

  currentUserWithFriends$ = this.accountFacade.byUsernameUser$;

  currentUserWithFriends: ApplicationUser | undefined;

  friendRequestsCount$ = this.friendFacade.count$;

  isLoading = false;


  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private accountFacade: AccountFacade,
    private route: ActivatedRoute,
    private menuComponent : MenuComponent,
    private router : Router,
    private crd : ChangeDetectorRef,
    private friendFacade : FriendFacade
  ) {}


  ngOnInit(): void{

    if(localStorage.getItem('user')!== null){
      const currentUser : ApplicationUser =JSON.parse(localStorage.getItem('user')!);

      this.friendFacade.getFriendRequestsCount(currentUser.userName);
      this.crd.detectChanges();


    }else{
      this.friendRequestsCount$ = of(0);
      console.log("no connected User");
    }

  }

  getLoggedStatus(){
    if(localStorage.getItem('user') !== null) return true;
    else return false
  }

  logoutUser(){
    this.isLoading = true;
    localStorage.removeItem('user');

    this.crd.detectChanges();

    this.messageService.add({
      key: 'logout',
      severity: 'info',
      summary: 'Confirmed',
      detail: 'You have been logged out successfully'
    });


    setTimeout(()=>{
      const currentUrl = this.router.url;
      this.router.navigateByUrl('/email-confirmation', {skipLocationChange: true}).then(() => {
          this.router.navigate([currentUrl]);
      });
      this.isLoading = false;
    },3000)


  }


  openLoginModal() {
    this.loginDialog = true;
  }

  openRegisterModal() {
    this.registerDialog = true;
  }

  login() {

    this.isLoading = true;

    this.messageService.clear();

    this.accountFacade.login(this.loginUser);

    this.crd.detectChanges();

    //   this.messageService.add({
    //   key: 'login',
    //   severity: 'info',
    //   summary: 'Confirmed',
    //   detail: 'You have been logged in successfully'
    // });

    setTimeout(()=>{
      const currentUrl = this.router.url;
      this.router.navigateByUrl('/email-confirmation', {skipLocationChange: true}).then(() => {
          this.router.navigate([currentUrl]);
      });
      this.isLoading = false;
    },3000)

    this.loginDialog = false;


  }

  onFileSelect(event: any) {

    this.fileValidation = [];

    if (event && event.files && event.files.length > 0) {
      this.registerUser.file = event.files[0];
    }else{
      this.fileValidation.push("The picture is required to register")
    }

    if(this.registerUser.file?.type !== 'image/jpeg' && this.registerUser.file?.type !== 'image/png' && this.registerUser.file?.type !== 'image/webp'){
      this.fileValidation.push("Your file needs to be either : jpeg, png or webp to be uploaded")
    }
  }

  register() {

    this.isLoading = true;
    this.messageService.clear();

    this.registerUser.role = this.role.name;
    this.registerUser.link = window.location.protocol + '//' + window.location.host + "/email-confirmation?email=" + this.registerUser.email + "&token="

    const formData = new FormData();
    formData.append('userName', this.registerUser.userName);
    formData.append('email', this.registerUser.email);
    formData.append('role', this.registerUser.role);
    formData.append('file', this.registerUser.file!);
    formData.append('link', this.registerUser.link);
    formData.append('password', this.registerUser.password);



    this.accountFacade.register(formData);

    this.messageService.clear()

    this.messageService.add({
      key:'register',
      severity: 'info',
      summary: 'Confirmed',
      detail:
        'A confirmation Email has been sent to you. Please consult your inbox',
    });

    const currentUrl = this.router.url;
    this.router.navigateByUrl('/email-confirmation', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
        this.isLoading = false;
    });

    this.registerDialog = false;
  }

  redirectToFriendRequests(){
    this.router.navigateByUrl('/friend-requests');
  }

}
