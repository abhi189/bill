import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { UserModalService } from './user-modal.service';
import { JhiLanguageHelper, User, UserService } from '../../shared';

@Component({
    selector: 'jhi-user-mgmt-dialog',
    templateUrl: './user-management-dialog.component.html'
})
export class UserMgmtDialogComponent implements OnInit {
    user: User;
    languages: any[];
    authorities: any[];
    isSaving: Boolean;
    loginError: Boolean;
    emailError: boolean;
    authorityError: boolean;
    langKeyError: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private languageHelper: JhiLanguageHelper,
        private userService: UserService,
        private eventManager: JhiEventManager
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.authorities = [];
        this.userService.authorities().subscribe(authorities => {
            this.authorities = authorities;
        });
        this.languageHelper.getAll().then(languages => {
            this.languages = languages;
        });
        this.user.defaultPartner = this.user.defaultPartner ? this.user.defaultPartner : 'BUDDERFLY';
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save(form: any = {}) {
        let errorFound = false;
        this.loginError = this.emailError = this.authorityError = this.langKeyError = false;
        if (form && form.controls['login'] && !form.controls['login'].value) {
            this.loginError = true;
            errorFound = true;
        }
        if (form && form.controls['email'] && !form.controls['email'].value) {
            this.emailError = true;
            errorFound = true;
        }
        if (form && form.controls['authority'] && !form.controls['authority'].value) {
            this.authorityError = true;
            errorFound = true;
        }
        if (form && form.controls['langKey'] && !form.controls['langKey'].value) {
            this.langKeyError = true;
            errorFound = true;
        }
        if (errorFound) {
            return;
        }

        this.isSaving = true;
        if (this.user.id !== null) {
            this.userService.update(this.user).subscribe(response => this.onSaveSuccess(response), () => this.onSaveError());
        } else {
            this.userService.create(this.user).subscribe(response => this.onSaveSuccess(response), () => this.onSaveError());
        }
    }

    private onSaveSuccess(result) {
        this.eventManager.broadcast({ name: 'userListModification', content: 'OK' });
        this.isSaving = false;
        this.activeModal.dismiss(result.body);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-user-dialog',
    template: ''
})
export class UserDialogComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private userModalService: UserModalService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if (params['login']) {
                this.userModalService.open(UserMgmtDialogComponent as Component, params['login']);
            } else {
                this.userModalService.open(UserMgmtDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
