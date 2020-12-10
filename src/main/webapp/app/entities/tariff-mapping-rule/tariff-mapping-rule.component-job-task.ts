import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiAlertService, JhiEventManager } from 'ng-jhipster';

import { TariffMappingRule } from './tariff-mapping-rule.model';
import { TariffMappingRuleService } from './tariff-mapping-rule.service';
import { UtilityMappingRule } from '../utility-mapping-rule';
import { ImportMapping } from '../import-mapping';
import { Principal } from '../../shared';
import { TaskDescription } from '../tariff/rate-import-job/rate-import.model';

@Component({
    selector: 'jhi-tariff-mapping-rule-job-task',
    templateUrl: './tariff-mapping-rule.component.html',
    styles: [
        `
            #title {
                margin-bottom: -1rem;
            }
        `
    ]
})
export class TariffMappingRuleJobTaskComponent implements OnInit, OnDestroy {
    currentAccount: any;
    tariffMappingRules: TariffMappingRule[];
    error: any;
    success: any;
    eventSubscriber: Subscription;
    routeData: any;
    predicate: any;
    extendedView = false;
    importMapping: ImportMapping;
    disableEdit = false;

    constructor(
        private tariffMappingRuleService: TariffMappingRuleService,
        private jhiAlertService: JhiAlertService,
        private principal: Principal,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private eventManager: JhiEventManager
    ) {
        this.routeData = this.activatedRoute.queryParams.subscribe(data => {
            this.importMapping = data as ImportMapping;
            this.disableEdit = this.importMapping.currentMapJobTask !== TaskDescription.MAP_TARIFF;
        });
    }

    searchTariffMappingRules() {
        const tariffId = this.importMapping.externalTariffId.toString();
        const jobId = this.importMapping.jobId.toString();
        this.tariffMappingRuleService
            .findByTariffIdAndJobId(tariffId, jobId)
            .subscribe(
                (res: HttpResponse<UtilityMappingRule>) => this.onSuccess(res.body),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    loadAll() {
        this.searchTariffMappingRules();
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInTariffMappingRules();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: TariffMappingRule) {
        return item.id;
    }
    registerChangeInTariffMappingRules() {
        this.eventSubscriber = this.eventManager.subscribe('tariffMappingRuleListModification', response => this.loadAll());
    }

    private onSuccess(data) {
        this.tariffMappingRules = [];
        this.tariffMappingRules.push(data);
    }
    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
