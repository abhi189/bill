import { Component, OnInit, Renderer, ElementRef, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';
import { JhiLanguageService } from 'ng-jhipster';
import { RegisterCompleteService } from './register-complete.service';

import { EMAIL_ALREADY_USED_TYPE, LOGIN_ALREADY_USED_TYPE } from 'app/shared';

@Component({
    selector: 'jhi-register-complete-component',
    templateUrl: './register-complete.component.html',
    styleUrls: ['./register-complete.component.scss']
})
export class RegisterCompleteComponent implements OnInit {
    @Output() goToLogin = new EventEmitter();
    confirmPassword: string;
    doNotMatch: string;
    error: string;
    errorEmailExists: string;
    errorUserExists: string;
    registerAccount: any;
    success: boolean;
    tokenExpired: boolean;

    constructor(
        private languageService: JhiLanguageService,
        private elementRef: ElementRef,
        private renderer: Renderer,
        private route: ActivatedRoute,
        private router: Router,
        private registerComplete: RegisterCompleteService
    ) {}

    ngOnInit() {
        if (!this.route.snapshot.params['tokenId']) {
            this.router.navigate(['']);
        }
        this.success = false;
        this.registerAccount = {};
        const tokenJson = this.registerComplete.parseJwt(this.route.snapshot.params['tokenId']);
        if (tokenJson && this.checkIfTokenExpired(tokenJson)) {
            this.tokenExpired = true;
            return;
        } else {
            if (tokenJson && tokenJson.email) {
                this.registerAccount.email = tokenJson.email;
            }
        }
        // this.route.paramMap.pipe(switchMap((params: ParamMap) => this.registerComplete.validateToken(params.get('tokenId')))).subscribe(
        //     res => {
        //         console.log('Response: ', res);
        //     },
        //     err => {
        //         console.log('Error: ', err);
        //     }
        // );
    }

    checkIfTokenExpired(json): boolean {
        if (!json.exp) {
            return false;
        }
        const exp = new Date(json.exp * 1000);
        const currentDate = new Date();

        return Math.abs(+exp - +currentDate) / (1000 * 60 * 60) > 24;
    }

    register() {
        if (this.registerAccount.password !== this.confirmPassword) {
            this.doNotMatch = 'ERROR';
        } else {
            this.doNotMatch = null;
            this.error = null;
            this.errorUserExists = null;
            this.errorEmailExists = null;
            this.registerComplete.save(this.registerAccount).subscribe(
                () => {
                    this.success = true;
                },
                response => this.processError(response)
            );
        }
    }

    private processError(response: HttpErrorResponse) {
        this.success = null;
        if (response.status === 400 && response.error.errorKey === 'userexists') {
            this.errorUserExists = 'ERROR';
        } else if (response.status === 400 && response.error.errorKey === 'emailexists') {
            this.errorEmailExists = 'ERROR';
        } else {
            this.error = 'ERROR';
        }
    }
}
