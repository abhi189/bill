import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { BillingCycle } from './billing-cycle.model';
import { ActivatedRoute, Router } from '@angular/router';
import { BillingCycleService } from './billing-cycle.service';
import { BudderflyInvoice, BudderflyInvoiceStatus } from '../budderfly-invoice/budderfly-invoice.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';
import { BudderflyInvoiceService } from '../budderfly-invoice/budderfly-invoice.service';
import { ITEMS_PER_PAGE, Principal } from '../../shared';
import { SiteService } from '../site/site.service';
import { BillingCycleBudderflyInvoiceRejectionNotesPopUpComponent } from './billing-cycle-budderfly-invoice-rejection-notes-pop-up.component';
import { RouterExtService } from '../../shared/service/router-ext.service';

import { BudderflyInvoiceEmailDialogComponent } from '../budderfly-invoice/budderfly-invoice-email-dialog.component';

@Component({
    selector: 'jhi-billing-cycle-detail',
    templateUrl: './billing-cycle-detail.component.html'
})
export class BillingCycleDetailComponent implements OnInit, OnDestroy {
    billingCycle: BillingCycle;
    private subscription: Subscription;
    private eventSubscriber: Subscription;
    private eventSubscriberBudderflyList: Subscription;
    private eventSubscriberAddSites: Subscription;
    budderflyInvoices: BudderflyInvoice[];
    id: number;
    error: any;
    success: any;
    currentSearch: string;
    routeData: any;
    links: any;
    totalItems: any;
    queryCount: any;
    itemsPerPage: any;
    page: any;
    predicate: any;
    previousPage: any;
    reverse: any;
    selectedState: any;
    queryParams: any;
    activeIdString: String;

    constructor(
        private eventManager: JhiEventManager,
        private billingCycleService: BillingCycleService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private budderflyInvoiceService: BudderflyInvoiceService,
        private activatedRoute: ActivatedRoute,
        private modalService: NgbModal,
        private router: Router,
        private siteService: SiteService,
        private routerExtService: RouterExtService
    ) {
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.routeData = this.activatedRoute.data.subscribe(data => {
            this.page = data.pagingParams.page;
            this.previousPage = data.pagingParams.page;
            this.reverse = data.pagingParams.ascending;
            this.predicate = data.pagingParams.predicate;
        });
        this.currentSearch =
            this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['search']
                ? this.activatedRoute.snapshot.params['search']
                : '';
        this.selectedState = '';
    }

    ngOnInit() {
        const previous = this.routerExtService.getPreviousUrl();
        if (previous.includes('budderfly-invoice')) {
            this.activeIdString = 'tabInvoices';
        } else {
            this.activeIdString = 'tabGeneral';
        }
        this.subscription = this.activatedRoute.params.subscribe(params => {
            this.load(params['id']);
        });
        this.registerChangeInBillingCycles();
        this.registerChangeInInvoiceList();
        this.registerChangeInBudderflyInvoices();
    }

    load(id) {
        if (this.currentSearch) {
            this.billingCycleService.find(id).subscribe((billingCycleResponse: HttpResponse<BillingCycle>) => {
                this.id = id;
                this.billingCycle = billingCycleResponse.body;
            });
            this.budderflyInvoiceService
                .search({
                    page: this.page - 1,
                    query: `billingCycle.id:${id} AND ${this.currentSearch}`,
                    size: this.itemsPerPage,
                    sort: this.sort()
                })
                .subscribe(
                    (res: HttpResponse<BudderflyInvoice[]>) => this.onSuccess(res.body, res.headers),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.id = id;
        this.billingCycleService.find(id).subscribe((billingCycleResponse: HttpResponse<BillingCycle>) => {
            this.billingCycle = billingCycleResponse.body;
        });
        this.budderflyInvoiceService
            .getInvoicesByBillingCycle(id, {
                page: this.page - 1,
                query: this.currentSearch,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(
                (res: HttpResponse<BudderflyInvoice[]>) => this.onSuccess(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    loadOnlyBudderflyInvoices(id) {
        this.budderflyInvoices = null;
        this.budderflyInvoiceService
            .getInvoicesByBillingCycle(id, {
                page: this.page - 1,
                query: this.currentSearch,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(
                (res: HttpResponse<BudderflyInvoice[]>) => this.onSuccess(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    loadPage(page: number) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.transition();
        }
    }

    transition() {
        this.router.navigate(['/billing-cycle/' + this.billingCycle.id], {
            queryParams: {
                page: this.page,
                size: this.itemsPerPage,
                search: this.currentSearch,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        });
        this.load(this.id);
    }

    emailInvoices() {
        const modalRef = this.modalService.open(BudderflyInvoiceEmailDialogComponent);
        modalRef.componentInstance.id = this.id;
    }

    onSelectChange(event) {
        this.selectedState = event.srcElement.value;
        this.router.navigate(['/billing-cycle'], {
            queryParams: {
                'state.equals': this.selectedState,
                page: this.page,
                size: this.itemsPerPage,
                search: this.currentSearch,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        });
        this.load(this.id);
    }

    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
        this.eventManager.destroy(this.eventSubscriberBudderflyList);
        this.eventManager.destroy(this.eventSubscriberAddSites);
    }

    registerChangeInBillingCycles() {
        this.eventSubscriber = this.eventManager.subscribe('billingCycleListModification', response => this.load(this.billingCycle.id));
    }

    registerChangeInBudderflyInvoices() {
        this.eventSubscriberBudderflyList = this.eventManager.subscribe('budderflyInvoiceListModification', response =>
            this.load(this.billingCycle.id)
        );
    }

    registerChangeInInvoiceList() {
        this.eventSubscriberAddSites = this.eventManager.subscribe('addSitesList', response =>
            this.loadOnlyBudderflyInvoices(this.billingCycle.id)
        );
    }

    search(query) {
        if (!query) {
            return this.clear();
        }
        this.page = 0;
        this.currentSearch = query;
        this.router.navigate([
            '/billing-cycle/' + this.billingCycle.id,
            {
                search: this.currentSearch,
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        ]);
        this.load(this.id);
    }

    clear() {
        this.page = 0;
        this.currentSearch = '';
        this.router.navigate([
            '/billing-cycle/' + this.billingCycle.id,
            {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        ]);
        this.load(this.id);
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    private onSuccess(data, headers) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        this.queryCount = this.totalItems;
        this.budderflyInvoices = data;
    }

    private approveInvoice(budderflyInvoice: BudderflyInvoice) {
        this.budderflyInvoiceService
            .approveBudderflyInvoice(budderflyInvoice)
            .subscribe(
                (res: HttpResponse<BudderflyInvoice>) => this.updateElementOnlist(res.body),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    private rejectInvoice(budderflyInvoice: BudderflyInvoice) {
        const modalRef = this.modalService.open(BillingCycleBudderflyInvoiceRejectionNotesPopUpComponent);
        modalRef.componentInstance.notes = budderflyInvoice.rejectionNotes;
        modalRef.componentInstance.rejectionNotes.subscribe(notes => {
            this.budderflyInvoiceService
                .rejectBudderflyInvoice(budderflyInvoice, notes)
                .subscribe(
                    (res: HttpResponse<BudderflyInvoice>) => this.updateElementOnlist(res.body),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
        });
    }

    private updateElementOnlist(budderflyInvoice: BudderflyInvoice) {
        const updateItem = this.budderflyInvoices.find(this.findIndexToUpdate, budderflyInvoice.id);
        const index = this.budderflyInvoices.indexOf(updateItem);
        this.budderflyInvoices[index] = budderflyInvoice;
    }

    findIndexToUpdate(newItem) {
        return newItem.id === this;
    }

    private onSuccessSiteAccountId(element, data) {
        element.siteAccountId = data;
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

    refreshInvoices() {
        this.loadOnlyBudderflyInvoices(this.billingCycle.id);
    }

    generateInvoices() {
        this.budderflyInvoiceService.generateInvoicesDetailForBillingCycle(this.billingCycle.id).subscribe(
            (response: any) => {
                this.jhiAlertService.info('global.messages.info.generateInvoicesFromCycle', { cycleId: this.billingCycle.id });
            },
            (res: HttpErrorResponse) => {
                this.onError(res.message);
            }
        );
    }
}
