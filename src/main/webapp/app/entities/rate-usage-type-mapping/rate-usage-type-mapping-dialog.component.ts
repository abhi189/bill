import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { RateUsageTypeMapping } from './rate-usage-type-mapping.model';
import { RateUsageTypeMappingPopupService } from './rate-usage-type-mapping-popup.service';
import { RateUsageTypeMappingService } from './rate-usage-type-mapping.service';
import { Provider, ProviderService } from '../provider';

@Component({
    selector: 'jhi-rate-usage-type-mapping-dialog',
    templateUrl: './rate-usage-type-mapping-dialog.component.html'
})
export class RateUsageTypeMappingDialogComponent implements OnInit {
    rateUsageTypeMapping: RateUsageTypeMapping;
    isSaving: boolean;

    providers: Provider[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private rateUsageTypeMappingService: RateUsageTypeMappingService,
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
        if (this.rateUsageTypeMapping.id !== undefined) {
            this.subscribeToSaveResponse(this.rateUsageTypeMappingService.update(this.rateUsageTypeMapping));
        } else {
            this.subscribeToSaveResponse(this.rateUsageTypeMappingService.create(this.rateUsageTypeMapping));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<RateUsageTypeMapping>>) {
        result.subscribe(
            (res: HttpResponse<RateUsageTypeMapping>) => this.onSaveSuccess(res.body),
            (res: HttpErrorResponse) => this.onSaveError()
        );
    }

    private onSaveSuccess(result: RateUsageTypeMapping) {
        this.eventManager.broadcast({ name: 'rateUsageTypeMappingListModification', content: 'OK' });
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
    selector: 'jhi-rate-usage-type-mapping-popup',
    template: ''
})
export class RateUsageTypeMappingPopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private rateUsageTypeMappingPopupService: RateUsageTypeMappingPopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if (params['id']) {
                this.rateUsageTypeMappingPopupService.open(RateUsageTypeMappingDialogComponent as Component, params['id']);
            } else {
                this.rateUsageTypeMappingPopupService.open(RateUsageTypeMappingDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
