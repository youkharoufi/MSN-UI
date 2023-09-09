import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { ApplicationUser } from '../Entities/applicationUser';
import { environment } from 'apps/msn-ui/src/environments/environment';
import { LoginUser } from '../Entities/loginUser';
import { ConfirmationEmail } from '../Entities/emailConfirmation';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseUrl = environment.API_URL;
  private currentUserSource = new BehaviorSubject<ApplicationUser | null>(null);
  currentUser$ = this.currentUserSource.asObservable();

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

}
