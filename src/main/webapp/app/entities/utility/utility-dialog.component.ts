import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Utility } from './utility.model';
import { UtilityPopupService } from './utility-popup.service';
import { UtilityService } from './utility.service';

@Component({
    selector: 'jhi-utility-dialog',
    templateUrl: './utility-dialog.component.html'
})
export class UtilityDialogComponent implements OnInit {
    utility: Utility;
    isSaving: boolean;

    constructor(public activeModal: NgbActiveModal, private utilityService: UtilityService, private eventManager: JhiEventManager) {}

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        this.utility.utilityProviderKey = this.buildUtilityProviderKey(this.utility);
        if (this.utility.id !== undefined) {
            this.subscribeToSaveResponse(this.utilityService.update(this.utility));
        } else {
            this.subscribeToSaveResponse(this.utilityService.create(this.utility));
        }
    }

    private buildUtilityProviderKey(utility: Utility) {
        const country = !utility.country ? '' : this.utility.country.concat('-');
        const state = !utility.state ? '' : this.utility.state.concat('-');
        const name = !utility.name ? '' : this.utility.name;
        return country.concat(state).concat(name);
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Utility>>) {
        result.subscribe((res: HttpResponse<Utility>) => this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Utility) {
        this.eventManager.broadcast({ name: 'utilityListModification', content: 'OK' });
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-utility-popup',
    template: ''
})
export class UtilityPopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private utilityPopupService: UtilityPopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if (params['id']) {
                this.utilityPopupService.open(UtilityDialogComponent as Component, params['id']);
            } else {
                this.utilityPopupService.open(UtilityDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
