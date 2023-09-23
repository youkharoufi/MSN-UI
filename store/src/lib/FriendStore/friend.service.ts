import { ApplicationUser } from '@msn-ui/store';
import { Injectable } from "@angular/core";
import { environment } from "apps/msn-ui/src/environments/environment";
import { Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { FriendRequest } from '../Entities/friendRequest';


@Injectable({
  providedIn: 'root'
})
export class FriendService {

  baseUrl = environment.API_URL;


  constructor(private http: HttpClient) { }

  sendFriendRequest(currentUserName: string, senderUserName:string): Observable<ApplicationUser> {

    return this.http.post<ApplicationUser>(this.baseUrl + "friends/send-friend-request/"+currentUserName+'/'+senderUserName, {});
  }


  confirmFriendRequest(currentUserName: string, senderUserName:string): Observable<ApplicationUser> {

    return this.http.post<ApplicationUser>(this.baseUrl + "friends/accept-friend-request/"+currentUserName+'/'+senderUserName, {});
  }

  denyFriendRequest(currentUserName: string, senderUserName:string): Observable<ApplicationUser> {

    return this.http.post<ApplicationUser>(this.baseUrl + "friends/deny-friend-request/"+currentUserName+'/'+senderUserName, {});
  }


  getFriendRequestsCount(currentUserName: string): Observable<number> {

    return this.http.get<number>(this.baseUrl + "friends/get-friend-requests-count/"+currentUserName);

  }

  getFriendRequests(currentUserName: string, senderUserName:string): Observable<FriendRequest> {

    return this.http.get<FriendRequest>(this.baseUrl + "friends/get-friend-request-by-sender-username/"+senderUserName+'/'+currentUserName);

  }

  getAllFriendRequests(currentUserName: string): Observable<FriendRequest[]> {

    return this.http.get<FriendRequest[]>(this.baseUrl + "friends/get-all-friend-requests/"+currentUserName);

  }

  getAllUsers(currentUserName: string): Observable<ApplicationUser[]> {

    return this.http.get<ApplicationUser[]>(this.baseUrl + "friends/get-all-users-based-on-user-username/"+currentUserName);

  }

}
