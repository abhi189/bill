import { Component, OnInit, AfterViewInit, Renderer, ElementRef, EventEmitter, Output } from '@angular/core';
import { EMAIL_NOT_FOUND_TYPE } from 'app/shared';
import { PasswordResetInitService } from './reset.service';

@Component({
    selector: 'jhi-reset-component',
    templateUrl: './reset.component.html',
    styleUrls: ['./reset.component.scss']
})
export class ResetPassowrdInitComponent implements OnInit, AfterViewInit {
    @Output() gotToLogin = new EventEmitter();
    error: string;
    errorEmailNotExists: string;
    resetAccount: any;
    success: string;

    constructor(private passwordResetInitService: PasswordResetInitService, private elementRef: ElementRef, private renderer: Renderer) {}

    ngOnInit() {
        this.resetAccount = {};
    }

    ngAfterViewInit() {
        setTimeout(() => {
            if (this.elementRef.nativeElement.querySelector('#email')) {
                this.renderer.invokeElementMethod(this.elementRef.nativeElement.querySelector('#email'), 'focus', []);
            }
        }, 0);
    }

    onLoginClick() {
        this.gotToLogin.next('login');
    }

    requestReset() {
        this.error = null;
        this.errorEmailNotExists = null;

        this.passwordResetInitService.save(this.resetAccount.email).subscribe(
            () => {
                this.success = 'OK';
            },
            response => {
                this.success = null;
                if (response.status === 400 && response.error.type === EMAIL_NOT_FOUND_TYPE) {
                    this.errorEmailNotExists = 'ERROR';
                } else {
                    this.error = 'ERROR';
                }
            }
        );
    }
}
