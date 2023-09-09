import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountFacade } from 'store/src/lib/AccountStore/account.facade';
import { ConfirmationEmail } from 'store/src/lib/Entities/emailConfirmation';

@Component({
  selector: 'msn-ui-email-confirmation',
  templateUrl: './email-confirmation.component.html',
  styleUrls: ['./email-confirmation.component.scss'],
})
export class EmailConfirmationComponent {
  constructor(
    private accountFacade: AccountFacade,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const email = this.route.snapshot.queryParamMap.get('email');
    console.log(email);

    const token = this.route.snapshot.queryParamMap.get('token');
    console.log(token);

    const confEmail : ConfirmationEmail = {
      email:email!,
      token:token!
    }

    this.accountFacade.confirmationEmail(confEmail);
  }
}
