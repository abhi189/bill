import { Component, AfterViewInit, Renderer, ElementRef } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { JhiEventManager } from 'ng-jhipster';

import { LoginService } from './login.service';
import { Principal } from '../auth/principal.service';
import { AccountService } from '../auth/account.service';
import { StateStorageService } from '../auth/state-storage.service';

@Component({
    selector: 'jhi-login-modal',
    templateUrl: './login.component.html'
})
export class JhiLoginModalComponent implements AfterViewInit {
    authenticationError: boolean;
    password: string;
    rememberMe: boolean;
    username: string;
    credentials: any;
    unauthError: boolean;

    constructor(
        private eventManager: JhiEventManager,
        private loginService: LoginService,
        private stateStorageService: StateStorageService,
        private elementRef: ElementRef,
        private renderer: Renderer,
        private router: Router,
        public activeModal: NgbActiveModal,
        private accountService: AccountService,
        private principal: Principal
    ) {
        this.credentials = {};
    }

    ngAfterViewInit() {
        this.renderer.invokeElementMethod(this.elementRef.nativeElement.querySelector('#username'), 'focus', []);
    }

    cancel() {
        this.credentials = {
            username: null,
            password: null,
            rememberMe: true
        };
        this.authenticationError = false;
        this.activeModal.dismiss('cancel');
    }

    async login() {
        this.unauthError = false;
        this.loginService
            .login({
                username: this.username,
                password: this.password,
                rememberMe: this.rememberMe
            })
            .then(async () => {
                const account: any = await this.accountService.get().toPromise();
                const {
                    body: { authorities = [] }
                } = account;
                if (authorities && (authorities.includes('ROLE_USER') || authorities.includes('ROLE_ADMIN'))) {
                    this.authenticationError = false;
                    this.activeModal.dismiss('login success');
                    if (this.router.url === '/register' || /^\/activate\//.test(this.router.url) || /^\/reset\//.test(this.router.url)) {
                        this.router.navigate(['']);
                    }

                    this.eventManager.broadcast({
                        name: 'authenticationSuccess',
                        content: 'Sending Authentication Success'
                    });

                    // // previousState was set in the authExpiredInterceptor before being redirected to login modal.
                    // // since login is succesful, go to stored previousState and clear previousState
                    const redirect = this.stateStorageService.getUrl();
                    if (redirect) {
                        this.stateStorageService.storeUrl(null);
                        this.router.navigate([redirect]);
                    }
                } else {
                    this.unauthError = true;
                    this.loginService.logout();
                    this.principal.authenticate(null);
                    console.log('Account: ', account);
                }
            })
            .catch(() => {
                this.authenticationError = true;
            });
    }

    register() {
        this.activeModal.dismiss('to state register');
        this.router.navigate(['/register']);
    }

    requestResetPassword() {
        this.activeModal.dismiss('to state requestReset');
        this.router.navigate(['/reset', 'request']);
    }
}
