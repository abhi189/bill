import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { UtilityMappingRule } from './utility-mapping-rule.model';
import { UtilityMappingRuleService } from './utility-mapping-rule.service';
import { ImportMapping } from '../import-mapping';
import { Principal } from '../../shared';
import { TaskDescription } from '../tariff/rate-import-job/rate-import.model';

@Component({
    selector: 'jhi-utility-mapping-rule-job-task',
    templateUrl: './utility-mapping-rule.component.html',
    styles: [
        `
            #title {
                margin-bottom: -1rem;
            }
        `
    ]
})
export class UtilityMappingRuleJobTaskComponent implements OnInit, OnDestroy {
    currentAccount: any;
    utilityMappingRules: UtilityMappingRule[];
    error: any;
    success: any;
    eventSubscriber: Subscription;
    currentSearch: string;
    routeData: any;
    links: any;
    reverse: any;
    importMapping: ImportMapping;
    extendedView = false;
    disableEdit = false;

    constructor(
        private utilityMappingRuleService: UtilityMappingRuleService,
        private jhiAlertService: JhiAlertService,
        private principal: Principal,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private eventManager: JhiEventManager
    ) {
        this.routeData = this.activatedRoute.data.subscribe(data => {
            this.reverse = data.pagingParams.ascending;
        });
        this.routeData = this.activatedRoute.queryParams.subscribe(data => {
            this.importMapping = data as ImportMapping;
            this.disableEdit = this.importMapping.currentMapJobTask !== TaskDescription.MAP_UTILITY;
        });
    }

    loadAll() {
        this.searchUtilityMappingRules();
    }

    searchUtilityMappingRules() {
        const tariffId = this.importMapping.externalTariffId.toString();
        const jobId = this.importMapping.jobId.toString();
        this.utilityMappingRuleService
            .findByTariffIdAndJobId(tariffId, jobId)
            .subscribe(
                (res: HttpResponse<UtilityMappingRule>) => this.onSuccess(res.body),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInUtilityMappingRules();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: UtilityMappingRule) {
        return item.id;
    }
    registerChangeInUtilityMappingRules() {
        this.eventSubscriber = this.eventManager.subscribe('utilityMappingRuleListModification', response => this.loadAll());
    }

    private onSuccess(data) {
        this.utilityMappingRules = [];
        this.utilityMappingRules.push(data);
    }
    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
