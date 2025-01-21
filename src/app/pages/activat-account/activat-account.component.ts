import { Component } from '@angular/core';
import { AuthenticationService } from '../../openapi/services/services';
import { Route, Router } from '@angular/router';
import { CodeInputModule } from 'angular-code-input';
import { Token } from '../../model/Token';

@Component({
  selector: 'app-activat-account',
  standalone: true,
  imports: [CodeInputModule],
  templateUrl: './activat-account.component.html',
  styleUrl: './activat-account.component.css',
})
export class ActivatAccountComponent {
  public message: string = '';
  isOkay: boolean = false;
  submit: boolean = false;

  constructor(
    private authService: AuthenticationService,
    private route: Router
  ) {}

  public onCodeCompleted(code: string) {
    this.confirmateAccount(code);
  }

  public login() {
    this.route.navigate(['login']);
  }
  public activeAccount() {
     this.isOkay = false;
     this.submit = false;
  }

  private confirmateAccount(token: string) {
    this.authService.confirmation({ token }).subscribe({
      next: (resp) => {
        this.submit = true;
        this.isOkay = true;
        this.message = 'Your account has been activated, you can now login';
        console.log(resp + 'success');
      },
      error: (err) => {
        this.isOkay = false;
        this.submit = true;
        this.message = this.extractErrorMessages(err.error);
      },
    });
  }

  private extractErrorMessages(jsonString: string) {
    // Parse the JSON string into an object
    const jsonObject = JSON.parse(jsonString);

    // Check if "error" key exists and return its value
    if (jsonObject.error) {
      return jsonObject.error;
    }
  }
}
