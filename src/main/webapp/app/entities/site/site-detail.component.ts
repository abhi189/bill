import { JobExecutionAuditLogDialogComponent } from './../job-execution-audit-log/job-execution-audit-log-dialog.component';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';
import { NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';

import { Site, SiteDiscount, PaymentType } from './site.model';
import { SiteService } from './site.service';
import { SiteAccount } from '../site-account/site-account.model';
import { SiteAccountService } from '../site-account/site-account.service';
import { RouterExtService } from '../../shared/service/router-ext.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { SiteACHDeleteDialogComponent } from './site-ACH-delete-dialog.component';

@Component({
    selector: 'jhi-site-detail',
    templateUrl: './site-detail.component.html',
    styles: [
        `
            dl.single-column {
                columns: 1;
            }
        `
    ]
})
export class SiteDetailComponent implements OnInit, OnDestroy {
    site: Site;
    utilityAccounts: SiteAccount[];
    utilitiesLoaded = false;
    activeIdString: string;
    siteId: number;
    siteDiscount: SiteDiscount;
    siteDiscountLoaded = false;

    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private siteService: SiteService,
        private route: ActivatedRoute,
        private router: Router,
        private siteAccountService: SiteAccountService,
        private routerExtService: RouterExtService,
        private jhiAlertService: JhiAlertService,
        private modalService: NgbModal
    ) {}

    ngOnInit() {
        const previous = this.routerExtService.getPreviousUrl();
        if (previous.includes('inventory')) {
            this.activeIdString = 'tabInventory';
        } else if (previous.includes('work-order')) {
            this.activeIdString = 'tabWorkOrders';
        }
        this.subscription = this.route.params.subscribe(params => {
            this.siteId = params['id'];
            if (isNaN(params['id'])) {
                this.siteService.getSiteId(params['id']).subscribe(
                    (res: HttpResponse<SiteAccount[]>) => {
                        this.load(res.body, params['inventoryItemId']);
                    },
                    (res: HttpErrorResponse) => {
                        this.onError(res.message);
                    }
                );
            } else {
                this.load(params['id'], params['inventoryItemId']);
            }
        });
        this.route.fragment.subscribe(fragment => {
            if (fragment) {
                this.activeIdString = fragment;
            }
        });
        this.registerChangeInSites();
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    load(id, inventoryItemId?: string) {
        this.siteService.find(id).subscribe((siteResponse: HttpResponse<Site>) => {
            this.site = siteResponse.body;
            this.siteService.budderflyId = this.site.budderflyId;
            if (inventoryItemId) {
                this.loadInventoryDetails(inventoryItemId);
            }
        });
    }

    loadInventoryDetails(id) {
        this.activeIdString = 'tabInventory';
    }

    loadUtilities(budderflyId) {
        this.siteAccountService.getByBudderflyId(budderflyId).subscribe(
            (res: HttpResponse<SiteAccount[]>) => {
                this.utilityAccounts = res.body;
                this.utilitiesLoaded = true;
            },
            (res: HttpErrorResponse) => {
                this.onError(res.message);
                this.utilitiesLoaded = false;
            }
        );
    }

    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInSites() {
        this.eventSubscriber = this.eventManager.subscribe('siteListModification', response => this.load(this.site.id));
    }

    registerChangeInSiteDiscount() {
        this.eventSubscriber = this.eventManager.subscribe('siteDiscountModification', response =>
            this.getSiteDiscount(this.site.budderflyId)
        );
    }

    beforeTabChange($event: NgbTabChangeEvent) {
        if ($event.nextId === 'tabUtilityAccount' && this.utilitiesLoaded === false) {
            this.loadUtilities(this.site.budderflyId);
        }
        if ($event.nextId === 'tabSiteDiscount' && this.siteDiscountLoaded === false) {
            this.getSiteDiscount(this.site.budderflyId);
            this.registerChangeInSiteDiscount();
        }
        if ($event.nextId !== 'tabInventory') {
            this.activeIdString = $event.nextId;
            this.router.navigate([`/site/${this.siteId}`]);
        }
    }

    getSiteDiscount(bfid: String) {
        this.siteService.getSiteDiscountByBfid(bfid).subscribe(
            (res: HttpResponse<SiteDiscount>) => {
                this.siteDiscount = res.body;
                this.siteDiscountLoaded = true;
            },
            error => {
                console.log('Error getting SiteDiscount.', error);
                this.siteDiscount = null;
                this.siteDiscountLoaded = true;
            }
        );
    }

    deleteACH() {
        const modalRef = this.modalService.open(SiteACHDeleteDialogComponent);
        modalRef.componentInstance.shop = this.site.budderflyId;
    }
}
