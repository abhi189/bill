import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { UtilityChargeConfiguration } from './utility-charge-configuration.model';
import { UtilityChargeConfigurationPopupService } from './utility-charge-configuration-popup.service';
import { UtilityChargeConfigurationService } from './utility-charge-configuration.service';
import { MeterService } from '../meter';

@Component({
    selector: 'jhi-utility-charge-configuration-dialog',
    templateUrl: './utility-charge-configuration-dialog.component.html'
})
export class UtilityChargeConfigurationDialogComponent implements OnInit {
    utilityChargeConfiguration: UtilityChargeConfiguration;
    isSaving: boolean;
    serviceTypes: string[];

    constructor(
        public activeModal: NgbActiveModal,
        private utilityChargeConfigurationService: UtilityChargeConfigurationService,
        private eventManager: JhiEventManager,
        private meterService: MeterService
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.meterService
            .findServiceTypes()
            .subscribe((res: HttpResponse<string[]>) => (this.serviceTypes = res.body), (res: HttpErrorResponse) => {});
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.utilityChargeConfiguration.id !== undefined) {
            this.subscribeToSaveResponse(this.utilityChargeConfigurationService.update(this.utilityChargeConfiguration));
        } else {
            this.subscribeToSaveResponse(this.utilityChargeConfigurationService.create(this.utilityChargeConfiguration));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<UtilityChargeConfiguration>>) {
        result.subscribe(
            (res: HttpResponse<UtilityChargeConfiguration>) => this.onSaveSuccess(res.body),
            (res: HttpErrorResponse) => this.onSaveError()
        );
    }

    private onSaveSuccess(result: UtilityChargeConfiguration) {
        this.eventManager.broadcast({ name: 'utilityChargeConfigurationListModification', content: 'OK' });
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-utility-charge-configuration-popup',
    template: ''
})
export class UtilityChargeConfigurationPopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private utilityChargeConfigurationPopupService: UtilityChargeConfigurationPopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if (params['id']) {
                this.utilityChargeConfigurationPopupService.open(UtilityChargeConfigurationDialogComponent as Component, params['id']);
            } else {
                this.utilityChargeConfigurationPopupService.open(UtilityChargeConfigurationDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
