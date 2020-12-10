import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Provider } from './provider.model';
import { ProviderPopupService } from './provider-popup.service';
import { ProviderService } from './provider.service';

@Component({
    selector: 'jhi-provider-dialog',
    templateUrl: './provider-dialog.component.html'
})
export class ProviderDialogComponent implements OnInit {
    provider: Provider;
    isSaving: boolean;

    constructor(public activeModal: NgbActiveModal, private providerService: ProviderService, private eventManager: JhiEventManager) {}

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.provider.id !== undefined) {
            this.subscribeToSaveResponse(this.providerService.update(this.provider));
        } else {
            this.subscribeToSaveResponse(this.providerService.create(this.provider));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Provider>>) {
        result.subscribe((res: HttpResponse<Provider>) => this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Provider) {
        this.eventManager.broadcast({ name: 'providerListModification', content: 'OK' });
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-provider-popup',
    template: ''
})
export class ProviderPopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private providerPopupService: ProviderPopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if (params['id']) {
                this.providerPopupService.open(ProviderDialogComponent as Component, params['id']);
            } else {
                this.providerPopupService.open(ProviderDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
