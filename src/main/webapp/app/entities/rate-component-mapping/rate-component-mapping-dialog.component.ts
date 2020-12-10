import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { RateComponentMapping } from './rate-component-mapping.model';
import { RateComponentMappingPopupService } from './rate-component-mapping-popup.service';
import { RateComponentMappingService } from './rate-component-mapping.service';
import { Provider, ProviderService } from '../provider';

@Component({
    selector: 'jhi-rate-component-mapping-dialog',
    templateUrl: './rate-component-mapping-dialog.component.html'
})
export class RateComponentMappingDialogComponent implements OnInit {
    rateComponentMapping: RateComponentMapping;
    isSaving: boolean;

    providers: Provider[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private rateComponentMappingService: RateComponentMappingService,
        private providerService: ProviderService,
        private eventManager: JhiEventManager
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.providerService.query().subscribe(
            (res: HttpResponse<Provider[]>) => {
                this.providers = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.rateComponentMapping.id !== undefined) {
            this.subscribeToSaveResponse(this.rateComponentMappingService.update(this.rateComponentMapping));
        } else {
            this.subscribeToSaveResponse(this.rateComponentMappingService.create(this.rateComponentMapping));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<RateComponentMapping>>) {
        result.subscribe(
            (res: HttpResponse<RateComponentMapping>) => this.onSaveSuccess(res.body),
            (res: HttpErrorResponse) => this.onSaveError()
        );
    }

    private onSaveSuccess(result: RateComponentMapping) {
        this.eventManager.broadcast({ name: 'rateComponentMappingListModification', content: 'OK' });
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackProviderById(index: number, item: Provider) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-rate-component-mapping-popup',
    template: ''
})
export class RateComponentMappingPopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private rateComponentMappingPopupService: RateComponentMappingPopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if (params['id']) {
                this.rateComponentMappingPopupService.open(RateComponentMappingDialogComponent as Component, params['id']);
            } else {
                this.rateComponentMappingPopupService.open(RateComponentMappingDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
