import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { ApplicationUser } from '../Entities/applicationUser';
import { environment } from 'apps/msn-ui/src/environments/environment';
import { LoginUser } from '../Entities/loginUser';
import { ConfirmationEmail } from '../Entities/emailConfirmation';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseUrl = environment.API_URL;


  constructor(private http: HttpClient) { }

  login(loginUser: LoginUser): Observable<ApplicationUser> {

    return this.http.post<ApplicationUser>(this.baseUrl + "account/login", loginUser);
  }

  register(registerUser: FormData): Observable<ApplicationUser> {

    return this.http.post<ApplicationUser>(this.baseUrl + "account/register", registerUser);
  }

  emailConfirmation(confEmail:ConfirmationEmail): Observable<ApplicationUser>{
    return this.http.post<ApplicationUser>(this.baseUrl+'account/email-confirmation', confEmail);
  }

  getAllUsers(currentUsername:string): Observable<ApplicationUser[]>{
    return this.http.get<ApplicationUser[]>(this.baseUrl+"account/all-users/"+currentUsername);
  }

  connectedUser(username:string): Observable<ApplicationUser>{
    return this.http.get<ApplicationUser>(this.baseUrl+"account/current-user/"+username);
  }

  getUserByUsername(userName:string): Observable<ApplicationUser>{
    return this.http.get<ApplicationUser>(this.baseUrl+"account/get-user-by-username/"+userName);
  }

  getUsersByFilter(search:string): Observable<ApplicationUser[]>{
    return this.http.get<ApplicationUser[]>(this.baseUrl+"account/filter-by-input/"+search);
  }

}
