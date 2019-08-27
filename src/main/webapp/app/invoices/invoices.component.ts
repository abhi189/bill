import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginModalService } from 'app/core/login/login-modal.service';
import { AccountService, UserService, User } from 'app/core';

@Component({
    selector: 'jhi-invoices',
    templateUrl: './invoices.component.html',
    styleUrls: ['./invoices.component.scss']
})
export class InvoicesComponent implements OnInit {
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
}
