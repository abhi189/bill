import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { UtilityMappingRule } from './utility-mapping-rule.model';
import { UtilityMappingRulePopupService } from './utility-mapping-rule-popup.service';
import { UtilityMappingRuleService } from './utility-mapping-rule.service';
import { Provider, ProviderService } from '../provider';
import { UtilityService } from '../utility';

@Component({
    selector: 'jhi-utility-mapping-rule-dialog',
    templateUrl: './utility-mapping-rule-dialog.component.html'
})
export class UtilityMappingRuleDialogComponent implements OnInit {
    utilityMappingRule: UtilityMappingRule;
    isSaving: boolean;

    providers: Provider[];
    countries: String[];
    states: String[];
    bdUtilityProviderKeys: String[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private utilityMappingRuleService: UtilityMappingRuleService,
        private providerService: ProviderService,
        private utilityService: UtilityService,
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
        this.utilityService.getCountries().subscribe(
            (res: HttpResponse<String[]>) => {
                this.countries = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        if (this.utilityMappingRule.id !== undefined) {
            if (this.utilityMappingRule.providerCountry) {
                this.onChangeCountry(this.utilityMappingRule.providerCountry);
                if (this.utilityMappingRule.providerState) {
                    this.onChangeState(this.utilityMappingRule.providerState);
                }
            }
        }
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.utilityMappingRule.id !== undefined) {
            this.subscribeToSaveResponse(this.utilityMappingRuleService.update(this.utilityMappingRule));
        } else {
            this.subscribeToSaveResponse(this.utilityMappingRuleService.create(this.utilityMappingRule));
        }
    }

    onChangeCountry(countryCode: string) {
        if (countryCode) {
            this.utilityService.getStates(countryCode).subscribe(data => {
                this.states = data.body;
                this.bdUtilityProviderKeys = null;
            });
        } else {
            this.states = null;
            this.bdUtilityProviderKeys = null;
        }
    }

    onChangeState(stateCode: string) {
        if (stateCode) {
            this.utilityService.getBdUtilityProviderKeys(this.utilityMappingRule.providerCountry, stateCode).subscribe(data => {
                this.bdUtilityProviderKeys = data.body;
            });
        } else {
            this.bdUtilityProviderKeys = null;
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<UtilityMappingRule>>) {
        result.subscribe(
            (res: HttpResponse<UtilityMappingRule>) => this.onSaveSuccess(res.body),
            (res: HttpErrorResponse) => this.onSaveError()
        );
    }

    private onSaveSuccess(result: UtilityMappingRule) {
        this.eventManager.broadcast({ name: 'utilityMappingRuleListModification', content: 'OK' });
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
    selector: 'jhi-utility-mapping-rule-popup',
    template: ''
})
export class UtilityMappingRulePopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private utilityMappingRulePopupService: UtilityMappingRulePopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if (params['id']) {
                this.utilityMappingRulePopupService.open(UtilityMappingRuleDialogComponent as Component, params['id']);
            } else {
                this.utilityMappingRulePopupService.open(UtilityMappingRuleDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
