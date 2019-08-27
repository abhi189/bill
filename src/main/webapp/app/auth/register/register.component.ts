import { Component, OnInit, AfterViewInit, Renderer, ElementRef, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiLanguageService } from 'ng-jhipster';

import { EMAIL_ALREADY_USED_TYPE, LOGIN_ALREADY_USED_TYPE } from 'app/shared';
import { LoginModalService } from 'app/core';
import { Register } from './register.service';

@Component({
    selector: 'jhi-register-component',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, AfterViewInit {
    @Output() goToLogin = new EventEmitter();
    confirmPassword: string;
    doNotMatch: string;
    error: string;
    errorEmailExists: string;
    errorUserExists: string;
    registerAccount: any;
    success: boolean;
    modalRef: NgbModalRef;

    constructor(
        private languageService: JhiLanguageService,
        private loginModalService: LoginModalService,
        private registerService: Register,
        private elementRef: ElementRef,
        private renderer: Renderer,
        private router: Router
    ) {}

    ngOnInit() {
        this.success = false;
        this.registerAccount = {};
    }

    ngAfterViewInit() {
        setTimeout(() => {
            if (this.elementRef.nativeElement.querySelector('#login')) {
                this.renderer.invokeElementMethod(this.elementRef.nativeElement.querySelector('#login'), 'focus', []);
            }
        }, 0);
    }

    // register() {
    //     if (this.registerAccount.password !== this.confirmPassword) {
    //         this.doNotMatch = 'ERROR';
    //     } else {
    //         this.doNotMatch = null;
    //         this.error = null;
    //         this.errorUserExists = null;
    //         this.errorEmailExists = null;
    //         this.languageService.getCurrent().then(key => {
    //             this.registerAccount.langKey = key;
    //             this.registerService.save(this.registerAccount).subscribe(
    //                 () => {
    //                     this.success = true;
    //                 },
    //                 response => this.processError(response)
    //             );
    //         });
    //     }
    // }

    register() {
        this.error = null;
        this.errorUserExists = null;
        this.errorEmailExists = null;
        this.registerService.save(this.registerAccount).subscribe(
            () => {
                this.success = true;
            },
            response => (this.success = true) // this.processError(response)
        );
    }

    openLogin() {
        this.goToLogin.next('login');
    }

    private processError(response: HttpErrorResponse) {
        this.success = null;
        if (response.status === 400 && response.error.type === LOGIN_ALREADY_USED_TYPE) {
            this.errorUserExists = 'ERROR';
        } else if (response.status === 400 && response.error.type === EMAIL_ALREADY_USED_TYPE) {
            this.errorEmailExists = 'ERROR';
        } else {
            this.error = 'ERROR';
        }
    }
}
