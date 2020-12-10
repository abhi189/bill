import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { ChargeUtilityChargeConfiguration } from './charge-utility-charge-configuration.model';
import { UtilityChargeConfigurationService } from './utility-charge-configuration.service';
import { ITEMS_PER_PAGE } from '../../shared';

@Component({
    selector: 'jhi-charge-utility-charge-configuration',
    templateUrl: './charge-utility-charge-configuration.component.html'
})
export class ChargeUtilityChargeConfigurationComponent implements OnInit {
    chargeUtilityChargeConfigurations: ChargeUtilityChargeConfiguration[];
    error: any;
    success: any;
    routeData: any;
    links: any;
    totalItems: any;
    queryCount: any;
    itemsPerPage: any;
    page: any;
    predicate: any;
    previousPage: any;
    reverse: any;

    constructor(
        private utilityChargeConfigurationService: UtilityChargeConfigurationService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService
    ) {
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.page = 1;
    }

    loadAll() {
        this.utilityChargeConfigurationService
            .queryCharges({
                page: this.page - 1,
                size: this.itemsPerPage
            })
            .subscribe(
                (res: HttpResponse<ChargeUtilityChargeConfiguration[]>) => this.onSuccess(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    loadPage(page: number) {
        if (page !== this.previousPage) {
            this.previousPage = this.page;
            this.page = page;
            this.loadAll();
        }
    }

    clear() {
        this.page = 0;
        this.loadAll();
    }

    ngOnInit() {
        this.loadAll();
    }

    trackId(index: number, item: ChargeUtilityChargeConfiguration) {
        return item.chargeId;
    }

    private onSuccess(data, headers) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        this.queryCount = this.totalItems;
        this.chargeUtilityChargeConfigurations = data;
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
