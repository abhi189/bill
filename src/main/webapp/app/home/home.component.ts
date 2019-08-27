import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginModalService } from 'app/core/login/login-modal.service';
import { AccountService, UserService, User } from 'app/core';

@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.scss']
})
export class HomeComponent implements OnInit {
    activeForm: string;

    constructor(private loginModalService: LoginModalService, private accountService: AccountService, private router: Router) {}

    ngOnInit() {
        this.accountService.identity().then(account => {
            if (account) {
                this.router.navigate(['/main']);
            }
        });
        this.activeForm = 'login';
    }

    onLoginClick() {
        this.activeForm = 'login';
    }

    onForgotPasswordClick() {
        this.activeForm = 'reset';
    }

    onRegisterClick() {
        this.activeForm = 'register';
    }
}
