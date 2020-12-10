import { Component, OnInit } from '@angular/core';

import { Principal } from '../../shared';
import { PasswordService } from './password.service';

@Component({
    selector: 'jhi-password',
    templateUrl: './password.component.html'
})
export class PasswordComponent implements OnInit {
    doNotMatch: string;
    error: string;
    success: string;
    account: any;
    currentPassword: string;
    newPassword: string;
    password: string;
    confirmPassword: string;

    constructor(private passwordService: PasswordService, private principal: Principal) {}

    ngOnInit() {
        this.principal.identity().then(account => {
            this.account = account;
        });
    }

    changePassword() {
        this.doNotMatch = null;
        this.error = null;
        if (this.currentPassword === this.newPassword) {
            this.error = null;
            this.success = null;
            this.doNotMatch = 'ERROR';
        } else {
            this.passwordService.save({ currentPassword: this.currentPassword, newPassword: this.newPassword }).subscribe(
                () => {
                    this.error = null;
                    this.success = 'OK';
                },
                () => {
                    this.success = null;
                    this.error = 'ERROR';
                }
            );
        }
    }
}
