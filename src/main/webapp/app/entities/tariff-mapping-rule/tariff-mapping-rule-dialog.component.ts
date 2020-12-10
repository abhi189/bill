import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TariffMappingRule } from './tariff-mapping-rule.model';
import { TariffMappingRulePopupService } from './tariff-mapping-rule-popup.service';
import { TariffMappingRuleService } from './tariff-mapping-rule.service';
import { Provider, ProviderService } from '../provider';
import { TariffName, TariffNameService } from '../tariff-name';

@Component({
    selector: 'jhi-tariff-mapping-rule-dialog',
    templateUrl: './tariff-mapping-rule-dialog.component.html'
})
export class TariffMappingRuleDialogComponent implements OnInit {
    tariffMappingRule: TariffMappingRule;
    isSaving: boolean;

    providers: Provider[];
    tariffNames: TariffName[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private tariffMappingRuleService: TariffMappingRuleService,
        private tariffNameService: TariffNameService,
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
        this.tariffNameService.all().subscribe(
            (res: HttpResponse<Provider[]>) => {
                this.tariffNames = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.tariffMappingRule.id !== undefined) {
            this.subscribeToSaveResponse(this.tariffMappingRuleService.update(this.tariffMappingRule));
        } else {
            this.subscribeToSaveResponse(this.tariffMappingRuleService.create(this.tariffMappingRule));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<TariffMappingRule>>) {
        result.subscribe(
            (res: HttpResponse<TariffMappingRule>) => this.onSaveSuccess(res.body),
            (res: HttpErrorResponse) => this.onSaveError()
        );
    }

    private onSaveSuccess(result: TariffMappingRule) {
        this.eventManager.broadcast({ name: 'tariffMappingRuleListModification', content: 'OK' });
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

    trackTariffNameById(index: number, item: TariffName) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-tariff-mapping-rule-popup',
    template: ''
})
export class TariffMappingRulePopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private tariffMappingRulePopupService: TariffMappingRulePopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if (params['id']) {
                this.tariffMappingRulePopupService.open(TariffMappingRuleDialogComponent as Component, params['id']);
            } else {
                this.tariffMappingRulePopupService.open(TariffMappingRuleDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
