import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationUser, LoginUser } from '@msn-ui/store';
import { take } from 'rxjs';
import { AccountFacade } from 'store/src/lib/AccountStore/account.facade';
import { FriendRequest } from 'store/src/lib/Entities/friendRequest';
import { FriendFacade } from 'store/src/lib/FriendStore/friend.facade';

@Component({
  selector: 'msn-ui-friend-requests',
  templateUrl: './friend-requests.component.html',
  styleUrls: ['./friend-requests.component.scss'],
})
export class FriendRequestsComponent implements OnInit {
  currentUser!: ApplicationUser;
  allFriendRequest$ = this.friendFacade.friendRequest$;
  requestingUsers: ApplicationUser[] = [];
  getUser$ = this.accountFacade.byUsernameUser$;
  allUsersThatRequested: ApplicationUser[] = [];
  displayedUsers: ApplicationUser[] = [];
  allUser$ = this.friendFacade.allUser$;

  visibleA = false;
  visibleB = false;

  allFriendRequestsPaginated: ApplicationUser[] = [];

  totalRecords!: number;
  currentPage = 0;
  rowsPerPage = 1;

  friendRequest$ = this.friendFacade.friendRequest$;
  friendRequest!: FriendRequest;

  allUsers$ = this.accountFacade.allUsers$;

  isLoading = false;

  constructor(
    private accountFacade: AccountFacade,
    private friendFacade: FriendFacade,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private crd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('user') !== null) {
      this.currentUser = JSON.parse(localStorage.getItem('user')!);

      this.friendFacade.getAllFriendRequests(this.currentUser?.userName);

      this.friendFacade.getAllUsers(this.currentUser.userName);

      this.allUser$.subscribe({
        next: (users?: ApplicationUser[]) => {
          console.log(users);
          this.allUsersThatRequested = users!;
          this.totalRecords = users!.length;

          this.updateDisplayedUsers();
        },
      });

      this.accountFacade.allUsers(this.currentUser.userName);
    } else {
      console.log('Nothing in local storage');
    }
  }

  addFriend(userName: string) {
    this.visibleA = false;
    this.isLoading = true;
    this.friendFacade.confirmFriendRequest(this.currentUser.userName, userName);

    setTimeout(()=>{
      const currentUrl = this.router.url;
      this.router.navigateByUrl('/email-confirmation', {skipLocationChange: true}).then(() => {
          this.router.navigate([currentUrl]);
      });
      this.isLoading = false;
    },3000)
  }

  denyFriend(userName: string) {

    this.visibleB = false;
    this.isLoading = true;


    this.friendRequest$.subscribe({
      next: (frs?: FriendRequest[]) => {
        frs?.forEach((fr) => {
          if (fr.userName === userName) {
            this.friendFacade.denyFriendRequest(
              this.currentUser.userName,
              userName
            );

            this.friendFacade.getAllUsers(this.currentUser.userName);

            this.allUser$.subscribe({
              next: (users?: ApplicationUser[]) => {
                console.log(users);
                this.allUsersThatRequested = users!;
                this.totalRecords = users!.length;

                this.updateDisplayedUsers();
              },
            });

            setTimeout(()=>{
              const currentUrl = this.router.url;
              this.router.navigateByUrl('/email-confirmation', {skipLocationChange: true}).then(() => {
                  this.router.navigate([currentUrl]);
              });
              this.isLoading = false;
            },3000)
          }
        });

      },
    });
  }

  updateDisplayedFriendRequests() {
    const start = this.currentPage * this.rowsPerPage;
    this.allFriendRequestsPaginated = this.allUsersThatRequested.slice(
      start,
      start + this.rowsPerPage
    );
  }

  updateDisplayedUsers() {
    const start = this.currentPage * this.rowsPerPage;

    this.allUser$.pipe(take(1)).subscribe((users) => {
      if (users !== undefined)
        this.displayedUsers = users.slice(start, start + this.rowsPerPage);
    });
  }

  paginate(event: any) {
    this.currentPage = event.page;
    setTimeout(() => {
      this.updateDisplayedUsers();
    });
    this.cdr.detectChanges();
  }

  backToMain() {
    this.router.navigateByUrl('/');
  }



}
