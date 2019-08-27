import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ChangePasswordService } from './chnage-password.service';

@Component({
    selector: 'jhi-change-password',
    templateUrl: 'change-password.component.html',
    styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {
    currentPassword: string;
    newPassword: string;
    doNotMatch: string;
    error: string;
    keyMissing: boolean;
    resetAccount: any;
    success: string;
    key: string;

    constructor(private changePasswordService: ChangePasswordService, private router: Router) {}

    changePassword() {
        this.error = null;
        this.changePasswordService.save({ currentPassword: this.currentPassword, newPassword: this.newPassword }).subscribe(
            () => {
                this.success = 'OK';
            },
            () => {
                this.success = null;
                this.error = 'ERROR';
            }
        );
    }
}
