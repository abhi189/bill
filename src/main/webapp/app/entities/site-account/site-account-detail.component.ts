import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';
import { DatePipe } from '@angular/common';

import { SiteAccount } from './site-account.model';
import { SiteAccountState } from './site-account.model';
import { SiteAccountService } from './site-account.service';
import { Ame, AmeAlgorithm } from '../../shared/model/ame.model';
import { NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { RouterExtService } from '../../shared/service/router-ext.service';
import { ExcludedPassthrough } from '../excluded-passthrough/excluded-passthrough.model';
import { Observable } from 'rxjs/Observable';
import { ExcludedPassthroughService } from '../excluded-passthrough/excluded-passthrough.service';

@Component({
    selector: 'jhi-site-account-detail',
    templateUrl: './site-account-detail.component.html',
    styles: [
        `
            .link-site {
                font-weight: inherit;
                color: inherit;
            }
        `
    ]
})
export class SiteAccountDetailComponent implements OnInit, OnDestroy {
    siteAccount: SiteAccount;
    private subscription: Subscription;
    private eventSubscriber: Subscription;
    ameLoaded = false;
    editingExcludedPassthrough = false;
    creatingExcludedPassthrough = false;
    activeIdString: string;
    excludedPassthroughs: ExcludedPassthrough[];
    newExcludedPasthroughs: ExcludedPassthrough[];
    originalExcludedPassthroughSet: ExcludedPassthrough[];
    siteId;
    disableControls = false;

    constructor(
        private eventManager: JhiEventManager,
        private siteAccountService: SiteAccountService,
        private route: ActivatedRoute,
        private datePipe: DatePipe,
        private routerExtService: RouterExtService,
        private excludedPassthroughService: ExcludedPassthroughService,
        private jhiAlertService: JhiAlertService
    ) {}

    ngOnInit() {
        const previous = this.routerExtService.getPreviousUrl();
        if (previous.includes('invoice')) {
            this.activeIdString = 'tabInvoices';
        }
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
        this.registerChangeInSiteAccounts();
        if (this.excludedPassthroughs && this.excludedPassthroughs.length > 0) {
            this.originalExcludedPassthroughSet = JSON.parse(JSON.stringify(this.excludedPassthroughs));
        }
    }

    load(id) {
        this.siteAccountService.find(id).subscribe((siteAccountResponse: HttpResponse<SiteAccount>) => {
            this.siteAccount = siteAccountResponse.body;
            this.getSiteByBudderflyId(this.siteAccount.budderflyId);
            this.siteAccount.ames = [];
        });
    }

    getSiteByBudderflyId(budderflyId: string) {
        this.siteAccountService.getSiteByBudderflyId(budderflyId).subscribe(res => {
            this.siteId = res.body.id;
        });
    }

    loadExcludedPassthrough(id) {
        this.excludedPassthroughService
            .getExcludedPassthroughBySiteAccountId(id)
            .subscribe((excludedPassthrough: HttpResponse<ExcludedPassthrough[]>) => {
                this.excludedPassthroughs = excludedPassthrough.body;
                this.originalExcludedPassthroughSet = JSON.parse(JSON.stringify(this.excludedPassthroughs));
            });
    }

    loadAmes(id) {
        this.siteAccountService.findAmes(id).subscribe((amesResponse: HttpResponse<Ame[]>) => {
            this.siteAccount.ames = amesResponse.body;
            this.ameLoaded = true;
        });
    }

    onArrearsChange(event) {
        this.disableControls = true;
        console.log(this.siteAccount);
        this.siteAccountService
            .update(this.siteAccount)
            .subscribe(
                result => console.log('Site account updated', result),
                error => (this.siteAccount.arrears = !this.siteAccount.arrears),
                () => (this.disableControls = false)
            );
    }

    onAutoImportChange(event) {
        this.disableControls = true;
        console.log(this.siteAccount);
        this.siteAccountService
            .update(this.siteAccount)
            .subscribe(
                result => console.log('Site account updated', result),
                error => (this.siteAccount.autoImport = !this.siteAccount.autoImport),
                () => (this.disableControls = false)
            );
    }

    previousState() {
        window.history.back();
    }

    onAmeUpdated(ame: Ame) {
        this.loadAmes(this.siteAccount.id);
    }

    private getDefaultValuesToCalculateAme() {
        return {
            defaultYear: new Date().getFullYear() - 2,
            defaultMonth: new Date().getMonth(),
            defaultAlgorithm: AmeAlgorithm.STANDARD
        };
    }

    private getYearOptionsToCalculateAme(): Array<number> {
        const thisYear = new Date().getFullYear();
        const MAX_YEAR_OPTIONS = 5;
        const yearOptions = [];
        for (let i = 0; i < MAX_YEAR_OPTIONS; i++) {
            yearOptions.push(thisYear - i);
        }
        return yearOptions;
    }

    private getMonthOptionsToCalculateAme(): Array<String> {
        // TODO: Get these values from somewhere shared among other files
        return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    }

    private getAlgorithmOptionsToCalculateAme(): Array<AmeAlgorithm> {
        return [AmeAlgorithm.LATEST_RATES, AmeAlgorithm.STANDARD];
    }

    private getAmeStartDate(year: number, month: number, format: string) {
        return this.datePipe.transform(new Date(year, month), format);
    }

    submitAME() {
        const copy: SiteAccount = Object.assign({}, this.siteAccount);

        copy.liveDate = this.datePipe.transform(this.siteAccount.liveDate, 'yyyy-MM-ddTHH:mm:ss');
        copy.createdDate = this.datePipe.transform(this.siteAccount.createdDate, 'yyyy-MM-ddTHH:mm:ss');
        copy.lastModified = this.datePipe.transform(this.siteAccount.lastModified, 'yyyy-MM-ddTHH:mm:ss');
        copy.requestedDate = this.datePipe.transform(this.siteAccount.requestedDate, 'yyyy-MM-ddTHH:mm:ss');

        copy.state = SiteAccountState.AMU_APPROVED;

        this.siteAccountService.update(copy).subscribe((siteAccountResponse: HttpResponse<SiteAccount>) => {
            this.siteAccount = siteAccountResponse.body;
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInSiteAccounts() {
        this.eventSubscriber = this.eventManager.subscribe('siteAccountListModification', response => this.load(this.siteAccount.id));
    }

    beforeTabChange($event: NgbTabChangeEvent) {
        if ($event.nextId === 'tabAme' && this.ameLoaded === false) {
            this.loadAmes(this.siteAccount.id);
        } else if ($event.nextId === 'tabSetup') {
            this.loadExcludedPassthrough(this.siteAccount.id);
        }
    }

    editExcludedPassthrough() {
        this.editingExcludedPassthrough = true;
        this.newExcludedPasthroughs = new Array<ExcludedPassthrough>();
    }

    cancelEditExcludedPassthrough() {
        this.creatingExcludedPassthrough = false;
        this.newExcludedPasthroughs = new Array<ExcludedPassthrough>();
        this.editingExcludedPassthrough = false;
    }

    confirmEditExcludedPassthrough() {
        const observableExcludedPassthrough = [];
        this.editingExcludedPassthrough = false;
        this.creatingExcludedPassthrough = false;
        this.excludedPassthroughs.forEach((excludedPassthrough: ExcludedPassthrough) => {
            const originalExcludedPassthrough: ExcludedPassthrough = this.originalExcludedPassthroughSet.find(
                element => element.id === excludedPassthrough.id
            );
            if (!originalExcludedPassthrough) {
                excludedPassthrough.siteAccountId = this.siteAccount.id;
                observableExcludedPassthrough.push(this.excludedPassthroughService.create(excludedPassthrough));
            } else if (originalExcludedPassthrough.serviceType !== excludedPassthrough.serviceType) {
                observableExcludedPassthrough.push(this.excludedPassthroughService.update(excludedPassthrough));
            }
        });
        Observable.forkJoin(observableExcludedPassthrough).subscribe(
            result => {
                this.loadExcludedPassthrough(this.siteAccount.id);
                console.log('Excluded Passthrough successfully updated.', result);
            },
            error => console.log('Error while updating Excluded Passthrough.', error)
        );
    }

    addNewExcludedPassthrough() {
        const newExcludedPassthrough = new ExcludedPassthrough();
        this.excludedPassthroughs.push(newExcludedPassthrough);
    }

    removeExcludedPassthrough(excludedPassthrough: ExcludedPassthrough) {
        if (!excludedPassthrough.id) {
            this.removeElement(excludedPassthrough);
        } else {
            this.excludedPassthroughService
                .delete(excludedPassthrough.id)
                .subscribe(
                    (res: HttpResponse<ExcludedPassthrough>) => this.removeElement(excludedPassthrough),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
        }
    }

    removeElement(excludedPassthrough: ExcludedPassthrough) {
        const index: number = this.excludedPassthroughs.indexOf(excludedPassthrough);
        if (index !== -1) {
            this.excludedPassthroughs.splice(index, 1);
            this.originalExcludedPassthroughSet = JSON.parse(JSON.stringify(this.excludedPassthroughs));
            this.editingExcludedPassthrough = false;
        }
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
