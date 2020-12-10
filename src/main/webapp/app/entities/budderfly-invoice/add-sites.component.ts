import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { BillingCycle } from './../billing-cycle/billing-cycle.model';
import { BudderflyInvoice } from './budderfly-invoice.model';
import { BillingCycleService } from './../billing-cycle/billing-cycle.service';
import { BillingCyclePopupService } from './../billing-cycle/billing-cycle-popup.service';
import { Site } from '../site/site.model';
import { SiteService } from '../site/site.service';
import { BudderflyInvoiceService } from './budderfly-invoice.service';

@Component({
    selector: 'jhi-add-sites',
    templateUrl: './add-sites.component.html'
})
export class AddSitesDialogComponent implements OnInit {
    budderflyInvoice: BudderflyInvoice;
    budderflyInvoices: BudderflyInvoice[];
    billingCycle: BillingCycle;
    previousBillingCycles: Boolean;
    billingCycles: BillingCycle[];
    requestDates: any[];
    itemsPerPage: any;
    page: any;
    links: any;
    totalItems: any;
    queryCount: any;
    sites: Site[];
    predicate: any;
    previousPage: any;
    reverse: any;
    dropdownList = [];
    dropdownSettings = {};
    selectedItems = [];
    selectSites: Boolean;
    activeInvoicing: boolean;
    sitesModel: any;
    billingRequestModel: any;
    billingCyclesModel: any;
    budderflyId: String;
    previousBillingCycle: BillingCycle;
    requestDatesSelection: any;
    billingRequestStatus: any;
    budderflyIds = [];
    billingRequestStatuses = [];

    constructor(
        private siteService: SiteService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager,
        private billingCycleService: BillingCycleService,
        private budderflyInvoiceService: BudderflyInvoiceService,
        private jhiAlertService: JhiAlertService,
        private modalService: NgbModal,
        private parseLinks: JhiParseLinks
    ) {}

    ngOnInit() {
        this.billingRequestModel = false;
        this.sitesModel = false;
        this.billingCyclesModel = false;
        this.activeInvoicing = false;
        this.budderflyInvoices = [];
        //
        // this.dropdownSettings = {
        //     enableSearchFilter: true
        // };

        //
        // this.siteService.query({
        //     page: this.page - 1,
        //     size: this.itemsPerPage,
        //     sort: this.sort()}).subscribe(
        //     (res: HttpResponse<Site[]>) => this.loadCombo(res.body, res.headers),
        //     (res: HttpErrorResponse) => this.onError(res.message)
        // );
        this.billingCycleService
            .query({
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(
                (res: HttpResponse<BillingCycle[]>) => {
                    this.billingCycles = res.body;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );

        this.budderflyInvoiceService.getAllTakeOverDates().subscribe(
            (res: HttpResponse<String[]>) => {
                this.requestDates = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.budderflyInvoiceService.getBillingRequesStatuses().subscribe(
            (res: HttpResponse<String[]>) => {
                this.billingRequestStatuses = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    addSites() {
        if (this.billingRequestModel) {
            if (!this.requestDatesSelection) {
                alert('Field utility request take over date is mandatory.');
                return;
            }
            this.budderflyInvoiceService
                .getSitesByUtilityRequestDateAndStatus(
                    this.requestDatesSelection,
                    this.activeInvoicing,
                    this.billingCycle.id,
                    this.billingRequestStatus
                )
                .subscribe(
                    (response: any) => {},
                    (res: HttpErrorResponse) => {
                        this.onError(res.message);
                    }
                );
        } else if (this.sitesModel) {
            this.budderflyInvoiceService.addSitesBySiteList(this.billingCycle.id, this.budderflyId).subscribe(
                (res: HttpResponse<BudderflyInvoice[]>) => {
                    this.addSingleSite(res.body);
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        } else if (this.billingCyclesModel) {
            this.budderflyInvoiceService
                .generateInvoicesByPreviousBillingCycle(this.billingCycle.id, this.previousBillingCycle.id)
                .subscribe(
                    (response: any) => {},
                    (res: HttpErrorResponse) => {
                        this.onError(res.message);
                    }
                );
        }
        this.activeModal.dismiss();
    }

    private addSingleSite(budderflyInvoice: BudderflyInvoice[]) {
        this.eventManager.broadcast({ name: 'addSitesList', content: 'OK', list: this.budderflyInvoices });
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<BillingCycle>>) {
        result.subscribe((res: HttpResponse<BillingCycle>) => this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: BillingCycle) {
        this.eventManager.broadcast({ name: 'billingCycleListModification', content: 'OK' });
        this.activeModal.dismiss(result);
    }

    private onSaveError() {}
    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    sort() {
        const result = ['statementDate' + ',' + 'desc'];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    private onSuccess(data, headers) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        this.queryCount = this.totalItems;
        // this.page = pagingParams.page;
        this.sites = data;
    }

    private loadCombo(data, headers) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        this.queryCount = this.totalItems;
        this.sites = data;

        for (let i = 0; i < this.sites.length; i++) {
            const checkBoxElement = {
                id: this.sites[i].id,
                itemName: this.sites[i].budderflyId
            };
            this.dropdownList.push(checkBoxElement);
        }
    }

    checkPreviousBC() {
        this.billingRequestModel = false;
        this.sitesModel = false;
    }

    checkBillingRequest() {
        this.billingCyclesModel = false;
        this.sitesModel = false;
    }

    checkSite() {
        this.billingCyclesModel = false;
        this.billingRequestModel = false;
    }
}

@Component({
    selector: 'jhi-add-sites-popup',
    template: ''
})
export class AddSitesPopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private billingCyclePopupService: BillingCyclePopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.billingCyclePopupService.open(AddSitesDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
