import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { SiteAccount } from './site-account.model';
import { SiteAccountService } from './site-account.service';
import { ITEMS_PER_PAGE, Principal } from '../../shared';
import { SiteService } from '../site/site.service';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MissingBfidComponent } from './missing-bfid/missing-bfid.component';

@Component({
    selector: 'jhi-site-account',
    templateUrl: './site-account.component.html'
})
export class SiteAccountComponent implements OnInit, OnDestroy {
    currentAccount: any;
    siteAccounts: SiteAccount[];
    error: any;
    success: any;
    eventSubscriber: Subscription;
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

    siteAccountsWithNoBfID: SiteAccount[];

    constructor(
        private siteAccountService: SiteAccountService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private principal: Principal,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private eventManager: JhiEventManager,
        private modalService: NgbModal,
        private siteService: SiteService
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

    loadAll() {
        if (this.currentSearch) {
            this.siteAccountService
                .search({
                    'state.equals': this.selectedState,
                    page: this.page - 1,
                    query: this.currentSearch,
                    size: this.itemsPerPage,
                    sort: this.sort()
                })
                .subscribe(
                    (res: HttpResponse<SiteAccount[]>) => this.onSuccess(res.body, res.headers),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.siteAccountService
            .query({
                'state.equals': this.selectedState,
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(
                (res: HttpResponse<SiteAccount[]>) => this.onSuccess(res.body, res.headers),
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
        this.router.navigate(['/site-account'], {
            queryParams: {
                page: this.page,
                size: this.itemsPerPage,
                search: this.currentSearch,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        });
        this.loadAll();
    }

    clear() {
        this.page = 0;
        this.currentSearch = '';
        this.router.navigate([
            '/site-account',
            {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        ]);
        this.loadAll();
    }
    search(query) {
        if (!query) {
            return this.clear();
        }
        this.page = 0;
        this.currentSearch = query;
        this.router.navigate([
            '/site-account',
            {
                search: this.currentSearch,
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        ]);
        this.loadAll();
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInSiteAccounts();
        this.loadSiteAccountWithNoBfId();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: SiteAccount) {
        return item.id;
    }
    registerChangeInSiteAccounts() {
        this.eventSubscriber = this.eventManager.subscribe('siteAccountListModification', response => this.loadAll());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    onSelectChange(event) {
        this.selectedState = event.srcElement.value;
        this.router.navigate(['/site-account'], {
            queryParams: {
                'state.equals': this.selectedState,
                page: this.page,
                size: this.itemsPerPage,
                search: this.currentSearch,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        });
        this.loadAll();
    }

    private onSuccess(data, headers) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        this.queryCount = this.totalItems;
        // this.page = pagingParams.page;
        this.siteAccounts = data;
        this.getSummaryInvoices(this.siteAccounts);
        this.getSiteIds(this.siteAccounts);
    }

    getSummaryInvoices(siteAccounts: SiteAccount[]) {
        const siteAccountIds = siteAccounts.map(siteAccount => siteAccount.id);
        this.siteAccountService.getSummaryInvoices(siteAccountIds).subscribe(res => {
            const summaryInvoices = res.body;
            summaryInvoices.forEach(summaryInvoice => {
                const indexSiteAccountToUpdate = this.siteAccounts.findIndex(
                    siteAccount => siteAccount.id === summaryInvoice.siteAccountId
                );
                if (indexSiteAccountToUpdate > -1) {
                    this.siteAccounts[indexSiteAccountToUpdate].invoicesSize = summaryInvoice.invoicesSize;
                    this.siteAccounts[indexSiteAccountToUpdate].summaryInvoices = summaryInvoice;
                }
            });
        });
    }

    getSiteIds(siteAccounts: SiteAccount[]) {
        const siteAccountBudderfly = siteAccounts.map(siteAccount => siteAccount.budderflyId);
        this.siteAccountService.getSitesIds(siteAccountBudderfly).subscribe(res => {
            const siteIds = res.body;
            siteIds.forEach(siteId => {
                const indexSiteAccountToUpdate = this.siteAccounts.findIndex(siteAccount => siteAccount.budderflyId === siteId.budderflyId);
                if (indexSiteAccountToUpdate > -1) {
                    this.siteAccounts[indexSiteAccountToUpdate].siteId = siteId.id;
                }
            });
        });
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

    loadSiteAccountWithNoBfId() {
        this.siteAccountService.getByBudderflyIdIsNull().subscribe(
            (res: HttpResponse<SiteAccount[]>) => {
                this.siteAccountsWithNoBfID = res.body;
                if (this.siteAccountsWithNoBfID.length > 0) {
                    this.jhiAlertService.info('warning.needtoCheckBfId', null, null);
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    openMissingBFIdPopup() {
        const modalRef = this.modalService.open(MissingBfidComponent, { size: 'lg' });
        modalRef.componentInstance.accounts = this.siteAccountsWithNoBfID;
        modalRef.componentInstance.updatedSiteAccounts.subscribe(accounts => {
            this.siteAccountsWithNoBfID = [];
            this.loadSiteAccountWithNoBfId();
        });
    }
}
