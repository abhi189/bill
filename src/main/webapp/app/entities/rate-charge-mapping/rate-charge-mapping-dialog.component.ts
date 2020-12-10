import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { RateChargeMapping } from './rate-charge-mapping.model';
import { RateChargeMappingPopupService } from './rate-charge-mapping-popup.service';
import { RateChargeMappingService } from './rate-charge-mapping.service';
import { Provider, ProviderService } from '../provider';
import { InvoiceSectionEnum } from '../tariff';

@Component({
    selector: 'jhi-rate-charge-mapping-dialog',
    templateUrl: './rate-charge-mapping-dialog.component.html'
})
export class RateChargeMappingDialogComponent implements OnInit {
    rateChargeMapping: RateChargeMapping;
    isSaving: boolean;

    providers: Provider[];
    InvoiceSectionEnum = InvoiceSectionEnum;
    invoiceSectionsMap = Object.keys(InvoiceSectionEnum).map(k => ({ key: k, value: InvoiceSectionEnum[k as any] }));

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private rateChargeMappingService: RateChargeMappingService,
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
        if (this.rateChargeMapping.id !== undefined) {
            this.subscribeToSaveResponse(this.rateChargeMappingService.update(this.rateChargeMapping));
        } else {
            this.subscribeToSaveResponse(this.rateChargeMappingService.create(this.rateChargeMapping));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<RateChargeMapping>>) {
        result.subscribe(
            (res: HttpResponse<RateChargeMapping>) => this.onSaveSuccess(res.body),
            (res: HttpErrorResponse) => this.onSaveError()
        );
    }

    private onSaveSuccess(result: RateChargeMapping) {
        this.eventManager.broadcast({ name: 'rateChargeMappingListModification', content: 'OK' });
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
    selector: 'jhi-rate-charge-mapping-popup',
    template: ''
})
export class RateChargeMappingPopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private rateChargeMappingPopupService: RateChargeMappingPopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if (params['id']) {
                this.rateChargeMappingPopupService.open(RateChargeMappingDialogComponent as Component, params['id']);
            } else {
                this.rateChargeMappingPopupService.open(RateChargeMappingDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
