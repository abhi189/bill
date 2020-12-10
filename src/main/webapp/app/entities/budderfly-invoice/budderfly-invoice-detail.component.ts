import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiAlertService, JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BudderflyInvoice, BudderflyInvoiceStatus } from './budderfly-invoice.model';
import { BudderflyInvoiceService } from './budderfly-invoice.service';
import { BillingCycleInvoiceActivity } from '../billing-cycle-invoice-activity/billing-cycle-invoice-activity.model';
import { BillingCycleInvoiceActivityService } from '../billing-cycle-invoice-activity/billing-cycle-invoice-activity.service';
import { ITEMS_PER_PAGE, Principal } from '../../shared';
import { BudderflyCharge, BudderflyChargeService, InvoiceSection } from '../budderfly-charge';
import { Observable } from 'rxjs';
import { Solution } from '../solution/solution.model';
import { SolutionService } from '../solution/solution.service';
import { Adjustment } from '../adjustment/adjustment.model';
import { AccountsReceivable } from '../accounts-receivable/accounts-receivable.model';
import { AccountsReceivableService } from '../accounts-receivable/accounts-receivable.service';
import { BudderflyInvoiceDiscount } from '../budderfly-invoice-discount/budderfly-invoice-discount.model';
import { BudderflyInvoiceDiscountService } from '../budderfly-invoice-discount/budderfly-invoice-discount.service';
import { PerformanceService } from '../performance/performance.service';
import { Performance } from '../performance/performance.model';
import { AdjustmentService } from '../adjustment/adjustment.service';
import { BudderflyInvoiceConfirmationMessagePopupComponent } from './budderfly-invoice-confirmation-message-popup.component';
import { InvoiceGenerationService } from './invoice-generation.service';

@Component({
    selector: 'jhi-budderfly-invoice-detail',
    templateUrl: './budderfly-invoice-detail.component.html',
    styles: [
        `
            .submissionfield {
                width: 350px;
                height: 40px;
                border: 1px solid #999999;
                padding: 5px;
            }

            .discountInput {
                width: 45px;
                display: inline-block;
            }

            .input-datepicker {
                display: initial;
                width: calc(100% - 46px);
            }
        `
    ]
})
export class BudderflyInvoiceDetailComponent implements OnInit, OnDestroy {
    budderflyInvoice: BudderflyInvoice;
    charges: BudderflyCharge[];
    budderflyInvoiceDiscount: BudderflyInvoiceDiscount;
    private subscription: Subscription;
    private eventSubscriber: Subscription;
    private eventSubscriberSolution: Subscription;
    private originalSolutionsSet: Solution[];
    private newSolutions: Solution[];
    editingSolutions: boolean;
    creatingSolutions: boolean;
    currentAccount: any;
    billingCycleInvoiceActivities: BillingCycleInvoiceActivity[];
    solutions: Solution[];
    error: any;
    success: any;
    billingCycleId: number;
    budderflyInvoiceId: number;
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
    chargesLoaded = false;
    editingCharge = false;
    creatingCharge = false;
    editedCharges: Array<BudderflyCharge> = [];
    editableCharges: Array<BudderflyCharge> = [];
    newCharges: Array<BudderflyCharge> = [];
    removedCharges: Array<BudderflyCharge> = [];
    performances: Array<Performance> = [];
    originalPerformances: Array<Performance> = [];
    accountsReceivable: AccountsReceivable;
    adjustments: Array<Adjustment> = [];
    editingAccounts = false;
    invoiceEditable = true;
    editingPerformances: boolean;
    newPerformances: Performance[];
    originalAdjustments: Adjustment[];
    creatingPerformances: boolean;
    buttonUpdateInvoiceClicked: boolean;
    buttonGenerateInvoiceClicked: boolean;
    originalAccountsReceivable: AccountsReceivable;
    InvoiceSectionEnum = InvoiceSection;
    invoiceSectionsMap = Object.keys(InvoiceSection).map(k => ({ key: k, value: InvoiceSection[k as any] }));
    arrayDates = new Array();
    chargesLastModifiedDate: string;
    solutionsLastModifiedDate: string;
    accountsReceivablesLastModifiedDate: string;
    performancesLastModifiedDate: string;

    constructor(
        private budderflyInvoiceService: BudderflyInvoiceService,
        private billingCycleInvoiceActivityService: BillingCycleInvoiceActivityService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private principal: Principal,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private solutionService: SolutionService,
        private eventManager: JhiEventManager,
        private budderflyChargeService: BudderflyChargeService,
        private accountsReceivableService: AccountsReceivableService,
        private budderflyInvoiceDiscountService: BudderflyInvoiceDiscountService,
        private performanceService: PerformanceService,
        private adjustmentService: AdjustmentService,
        private modalService: NgbModal,
        private invoiceGenerationService: InvoiceGenerationService,
        private translateService: TranslateService
    ) {
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.routeData = this.activatedRoute.data.subscribe(data => {
            this.page = data.pagingParams.page;
            this.previousPage = data.pagingParams.page;
            this.reverse = false;
            this.predicate = 'activityDate';
        });
        this.currentSearch =
            this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['search']
                ? this.activatedRoute.snapshot.params['search']
                : '';
    }

    getLastModifiedDateFromDates(tab: string, data: any) {
        if (data.length > 0) {
            const tmp_dates = new Array();
            tmp_dates.sort(function(a, b) {
                return a - b;
            });
            data.forEach((item, index) => {
                tmp_dates.push(item.lastModifiedDate);
            });
            this.arrayDates = tmp_dates.sort();
            switch (tab) {
                case 'charge':
                    this.chargesLastModifiedDate = this.arrayDates[this.arrayDates.length - 1];
                    break;
                case 'solution':
                    this.solutionsLastModifiedDate = this.arrayDates[this.arrayDates.length - 1];
                    break;
                case 'account-receivable':
                    this.accountsReceivablesLastModifiedDate = this.arrayDates[this.arrayDates.length - 1];
                    break;
                case 'performance':
                    this.performancesLastModifiedDate = this.arrayDates[this.arrayDates.length - 1];
                    break;
            }
        }
    }

    ngOnInit() {
        this.buttonUpdateInvoiceClicked = false;
        this.buttonGenerateInvoiceClicked = false;
        this.subscription = this.activatedRoute.params.subscribe(params => {
            this.budderflyInvoiceId = params['budderflyInvoiceId'];
            this.billingCycleId = params['id'];
            this.load(params['budderflyInvoiceId']);
            if (this.solutions && this.solutions.length > 0) {
                this.originalSolutionsSet = JSON.parse(JSON.stringify(this.solutions));
            }
            if (this.performances && this.performances.length > 0) {
                this.originalPerformances = JSON.parse(JSON.stringify(this.performances));
            }
            if (this.adjustments && this.adjustments.length > 0) {
                this.originalAdjustments = JSON.parse(JSON.stringify(this.adjustments));
            }
            if (this.accountsReceivable) {
                this.originalAccountsReceivable = JSON.parse(JSON.stringify(this.accountsReceivable));
            }
        });
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInBudderflyInvoices();
    }

    load(id) {
        if (this.currentSearch) {
            this.billingCycleInvoiceActivityService
                .search({
                    page: this.page - 1,
                    query: `budderflyInvoiceId:${id} AND ${this.currentSearch}`,
                    size: this.itemsPerPage,
                    sort: this.sort()
                })
                .subscribe(
                    (res: HttpResponse<BillingCycleInvoiceActivity[]>) => this.onSuccess(res.body, res.headers),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.budderflyInvoiceService.find(id).subscribe((budderflyInvoiceResponse: HttpResponse<BudderflyInvoice>) => {
            this.budderflyInvoice = budderflyInvoiceResponse.body;
            this.invoiceEditable = this.isEditableStatus();
        });
    }

    loadAccountReceivable(id: number) {
        this.accountsReceivableService
            .findByInvoiceId(id)
            .subscribe(
                (res: HttpResponse<AccountsReceivable>) => (
                    this.loadAccountsReceivable(res.body), this.getLastModifiedDateFromDates('account-receivable', res.body)
                ),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    loadAdjustmentByInvoiceId(id: number) {
        this.adjustmentService
            .findByInvoiceId(id)
            .subscribe(
                (res: HttpResponse<Adjustment[]>) => this.loadAdjustments(res.body),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    loadSolutionsByInvoiceId(id: number) {
        this.solutionService
            .findByInvoiceId(id)
            .subscribe(
                (res: HttpResponse<Solution[]>) => (
                    this.updateSolutionsArray(res.body), this.getLastModifiedDateFromDates('solution', res.body)
                ),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    loadPerformancesByInvoiceId(id: number) {
        this.performanceService
            .findByInvoiceId(id)
            .subscribe(
                (res: HttpResponse<Performance[]>) => (
                    this.updatePerformancesArray(res.body), this.getLastModifiedDateFromDates('performance', res.body)
                ),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    refreshPerformances() {
        this.loadPerformancesByInvoiceId(this.budderflyInvoiceId);
    }

    generatePerformances() {
        if (confirm(this.translateService.instant('billingWebApp.performance.refreshPerformances'))) {
            this.invoiceGenerationService.refreshPerformances(this.budderflyInvoice.invoiceNumber).subscribe(
                (response: any) => {
                    console.log('Performances Created');
                },
                (res: HttpErrorResponse) => {
                    this.onError(res.message);
                }
            );
        }
    }

    refreshCharges() {
        this.loadCharges(this.budderflyInvoiceId);
    }

    generateCharges() {
        if (confirm(this.translateService.instant('billingWebApp.budderflyCharge.refreshCharges'))) {
            this.invoiceGenerationService.refreshCharges(this.budderflyInvoice.invoiceNumber).subscribe(
                (response: any) => {
                    console.log('Charges Created');
                },
                (res: HttpErrorResponse) => {
                    this.onError(res.message);
                }
            );
        }
    }

    refreshAccountsReceivables() {
        this.loadAccountReceivable(this.budderflyInvoiceId);
        this.loadAdjustmentByInvoiceId(this.budderflyInvoiceId);
    }

    generateAccountsReceivables() {
        if (confirm('Are you sure you want to refresh Accounts Receivables?')) {
            this.accountsReceivableService.refreshAccountsReceivables(this.budderflyInvoice.invoiceNumber).subscribe(
                (response: any) => {
                    console.log('Accounts Receivables Created');
                },
                (res: HttpErrorResponse) => {
                    this.onError(res.message);
                }
            );
        }
    }

    updateSolutionsArray(solutionsArray: Solution[]) {
        this.solutions = JSON.parse(JSON.stringify(solutionsArray));
        this.originalSolutionsSet = JSON.parse(JSON.stringify(solutionsArray));
    }

    loadAccountsReceivable(account: AccountsReceivable) {
        if (account) {
            this.accountsReceivable = JSON.parse(JSON.stringify(account));
            this.originalAccountsReceivable = JSON.parse(JSON.stringify(account));
        } else {
            this.accountsReceivable = new AccountsReceivable();
        }
    }

    loadAdjustments(adjustments: Adjustment[]) {
        if (adjustments) {
            this.adjustments = JSON.parse(JSON.stringify(adjustments));
            this.originalAdjustments = JSON.parse(JSON.stringify(adjustments));
        } else {
            this.adjustments = new Array<Adjustment>();
        }
    }

    loadPage(page: number) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.transition();
        }
    }

    transition() {
        if (this.currentSearch) {
            this.billingCycleInvoiceActivityService
                .search({
                    page: this.page - 1,
                    query: `budderflyInvoiceId:${this.budderflyInvoiceId} AND ${this.currentSearch}`,
                    size: this.itemsPerPage,
                    sort: this.sort()
                })
                .subscribe(
                    (res: HttpResponse<BillingCycleInvoiceActivity[]>) => this.onSuccess(res.body, res.headers),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.billingCycleInvoiceActivityService
            .findByBudderflyInvoice(this.budderflyInvoiceId, {
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(
                (res: HttpResponse<BillingCycleInvoiceActivity[]>) => this.onSuccess(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    clear() {
        this.page = 0;
        this.currentSearch = '';
        this.loadActivities();
    }

    search(query) {
        if (!query) {
            return this.clear();
        }
        this.page = 0;
        this.currentSearch = query;
        this.router.navigate([
            'billing-cycle/' + this.billingCycleId + '/budderfly-invoice/' + this.budderflyInvoiceId,
            {
                search: this.currentSearch,
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        ]);
        this.load(this.budderflyInvoiceId);
    }

    trackId(index: number, item: BillingCycleInvoiceActivity) {
        return item.id;
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'activityDate') {
            result.push('activityDate');
        }
        return result;
    }

    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
        this.eventManager.destroy(this.eventSubscriberSolution);
    }

    registerChangeInBudderflyInvoices() {
        this.eventSubscriber = this.eventManager.subscribe('budderflyInvoiceListModification', response => this.previousState());
        this.eventSubscriberSolution = this.eventManager.subscribe('solutionListModification', response =>
            this.load(this.budderflyInvoiceId)
        );
    }

    loadActivities() {
        this.billingCycleInvoiceActivityService
            .findByBudderflyInvoice(this.budderflyInvoiceId, {
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(
                (res: HttpResponse<BillingCycleInvoiceActivity[]>) => this.onSuccess(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    /** START CHARGES CODE **/
    loadCharges(budderflyInvoiceId) {
        this.budderflyChargeService.getByBudderflyInvoiceId(budderflyInvoiceId).subscribe(
            (res: HttpResponse<BudderflyCharge[]>) => {
                this.charges = res.body;
                this.editableCharges = JSON.parse(JSON.stringify(res.body));
                this.chargesLoaded = true;
                this.getLastModifiedDateFromDates('charge', this.charges);
            },
            (res: HttpErrorResponse) => {
                this.onError(res.message);
                this.chargesLoaded = false;
            }
        );
        this.budderflyInvoiceDiscountService.getByBudderflyInvoiceId(budderflyInvoiceId).subscribe(
            (res: HttpResponse<BudderflyInvoiceDiscount>) => {
                this.budderflyInvoiceDiscount = res.body;
                this.chargesLoaded = true;
            },
            (res: HttpErrorResponse) => {
                this.budderflyInvoiceDiscount = new BudderflyInvoiceDiscount();
                this.budderflyInvoiceDiscount.id = null;
                this.budderflyInvoiceDiscount.relatedBudderflyInvoiceId = budderflyInvoiceId;
                this.budderflyInvoiceDiscount.discountPct = 0;
                this.budderflyInvoiceDiscount.discountSaving = 0;
            }
        );
        this.removedCharges = new Array<BudderflyCharge>();
    }

    editCharge() {
        this.editingCharge = true;
        this.newCharges = new Array<BudderflyCharge>();
    }

    addNewCharge() {
        this.creatingCharge = true;
        const newCharge = new BudderflyCharge();
        this.newCharges.push(newCharge);
    }

    removeCharge(chargeToRemove) {
        this.charges.forEach((item, index) => {
            if (item === chargeToRemove) {
                this.charges.splice(index, 1);
            }
        });
        this.editedCharges.forEach((item, index) => {
            if (item === chargeToRemove) {
                this.editedCharges.splice(index, 1);
            }
        });
        this.editableCharges.forEach((item, index) => {
            if (item === chargeToRemove) {
                this.editableCharges.splice(index, 1);
            }
        });
        this.removedCharges.push(chargeToRemove);
    }

    confirmEditCharges() {
        this.editingCharge = false;
        this.creatingCharge = false;
        const observablesUpdateCharges = [];

        if (this.removedCharges.length > 0) {
            this.removedCharges.forEach(charge => {
                observablesUpdateCharges.push(this.budderflyChargeService.delete(charge.id));
            });
        }

        if (this.checkIfChargesHasBeenEdited()) {
            this.editedCharges.forEach(charge => {
                observablesUpdateCharges.push(this.budderflyChargeService.update(charge));
            });
        }
        if (this.newCharges !== null && this.newCharges.length > 0) {
            this.newCharges.forEach(charge => {
                charge.budderflyInvoiceId = this.budderflyInvoiceId;
                observablesUpdateCharges.push(this.budderflyChargeService.create(charge));
            });
        }

        if (this.budderflyInvoiceDiscount.id === null) {
            observablesUpdateCharges.push(this.budderflyInvoiceDiscountService.create(this.budderflyInvoiceDiscount));
        } else {
            observablesUpdateCharges.push(this.budderflyInvoiceDiscountService.update(this.budderflyInvoiceDiscount));
        }

        Observable.forkJoin(observablesUpdateCharges).subscribe(
            result => {
                this.loadCharges(this.budderflyInvoiceId);

                console.log('Budderfly Charges successfully updated.', result);
            },
            error => console.log('Error while updating Budderfly Charges.', error)
        );
    }

    checkIfChargesHasBeenEdited() {
        let chargesEdited = false;
        this.editedCharges = [];
        this.editableCharges.forEach((charge: BudderflyCharge) => {
            const originalCharge = this.charges.find(oCharge => oCharge.id === charge.id);
            if (originalCharge != null) {
                if (
                    originalCharge.name !== charge.name ||
                    originalCharge.tier !== charge.tier ||
                    originalCharge.usageAmount !== charge.usageAmount ||
                    originalCharge.usageType !== charge.usageType ||
                    originalCharge.rate !== charge.rate ||
                    originalCharge.discountAmount !== charge.discountAmount ||
                    originalCharge.fullAmount !== charge.fullAmount ||
                    originalCharge.total !== charge.total ||
                    originalCharge.invoiceSection !== charge.invoiceSection ||
                    originalCharge.chargeId !== charge.chargeId ||
                    originalCharge.chargeActualName !== charge.chargeActualName ||
                    originalCharge.usage !== charge.usage ||
                    originalCharge.month !== charge.month ||
                    originalCharge.rateComponent !== charge.rateComponent ||
                    originalCharge.intervalStart !== charge.intervalStart ||
                    originalCharge.intervalEnd !== charge.intervalEnd
                ) {
                    this.editedCharges.push(charge);
                    chargesEdited = true;
                }
            }
        });
        return chargesEdited;
    }

    cancelEditCharges() {
        this.creatingCharge = false;
        this.newCharges = new Array<BudderflyCharge>();
        this.removedCharges = new Array<BudderflyCharge>();
        this.editableCharges = JSON.parse(JSON.stringify(this.charges));
        this.editingCharge = false;
    }

    /** END CHARGES CODE **/

    private onSuccess(data, headers) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        this.queryCount = this.totalItems;
        // this.page = pagingParams.page;
        this.billingCycleInvoiceActivities = data;
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

    refreshSolutions() {
        this.loadSolutionsByInvoiceId(this.budderflyInvoiceId);
    }

    generateSolutions() {
        this.solutions = new Array<Solution>();
        if (confirm('Are you sure you want to refresh solutions?')) {
            this.solutionService.refreshSolutions(this.budderflyInvoice.invoiceNumber).subscribe(
                (response: any) => {
                    console.log('Solutions Created');
                },
                (res: HttpErrorResponse) => {
                    this.onError(res.message);
                }
            );
        }
    }

    editSolutions() {
        this.editingSolutions = true;
        this.newSolutions = new Array<Solution>();
    }

    cancelEditSolutions() {
        this.creatingSolutions = false;
        this.newSolutions = new Array<Solution>();
        this.editingSolutions = false;
    }

    confirmEditSolutions() {
        const observableSolutions = [];
        this.editingSolutions = false;
        this.creatingSolutions = false;
        this.solutions.forEach((solution: Solution) => {
            const originalSolution: Solution = this.originalSolutionsSet.find(element => element.id === solution.id);
            if (!originalSolution) {
                solution.budderflyInvoiceId = this.budderflyInvoiceId;
                observableSolutions.push(this.solutionService.create(solution));
            } else if (originalSolution.name !== solution.name) {
                observableSolutions.push(this.solutionService.update(solution));
            }
        });
        Observable.forkJoin(observableSolutions).subscribe(
            result => {
                this.loadSolutionsByInvoiceId(this.budderflyInvoiceId);
                console.log('Budderfly solutions successfully updated.', result);
            },
            error => console.log('Error while updating Budderfly solution.', error)
        );
    }

    addNewSolutions() {
        const newSolution = new Solution();
        this.solutions.push(newSolution);
    }

    removeSolution(solution: Solution) {
        if (!solution.id) {
            this.removeElement(solution);
        } else {
            this.solutionService
                .delete(solution.id)
                .subscribe(
                    (res: HttpResponse<Solution>) => this.removeElement(solution),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
        }
    }

    removeElement(solution: Solution) {
        const index: number = this.solutions.indexOf(solution);
        if (index !== -1) {
            this.solutions.splice(index, 1);
            this.originalSolutionsSet = JSON.parse(JSON.stringify(this.solutions));
            this.editingSolutions = false;
        }
    }

    beforeTabChange($event: NgbTabChangeEvent) {
        if ($event.nextId === 'tabCharges' && this.chargesLoaded === false) {
            this.loadCharges(this.budderflyInvoiceId);
        } else if ($event.nextId === 'tabInvoiceActivity') {
            this.loadActivities();
        } else if ($event.nextId === 'tabSolutions') {
            this.loadSolutionsByInvoiceId(this.budderflyInvoiceId);
        } else if ($event.nextId === 'tabAccountsReceivable') {
            this.loadAccountReceivable(this.budderflyInvoiceId);
            this.loadAdjustmentByInvoiceId(this.budderflyInvoiceId);
        } else if ($event.nextId === 'tabPerformance') {
            this.loadPerformancesByInvoiceId(this.budderflyInvoiceId);
        }
    }

    addNewAdjustement() {
        const newAdjustment = new Adjustment();
        this.adjustments.push(newAdjustment);
    }

    removeAdjustment(adjustment: Adjustment) {
        if (!adjustment.id) {
            this.removeElementAdjustment(adjustment);
        } else {
            this.adjustmentService
                .delete(adjustment.id)
                .subscribe(
                    (res: HttpResponse<Solution>) => this.removeElementAdjustment(adjustment),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
        }
    }

    removeElementAdjustment(adjustment: Adjustment) {
        const index: number = this.adjustments.indexOf(adjustment);
        if (index !== -1) {
            this.adjustments.splice(index, 1);
            this.editingAccounts = false;
        }
        this.confirmEditAccounts();
    }

    editAccounts() {
        this.editingAccounts = true;
    }

    cancelEditAccounts() {
        this.editingAccounts = false;
    }

    confirmEditAccounts() {
        this.editingAccounts = false;
        this.saveAccounts(this.accountsReceivable);
        this.saveAdjustments();
    }

    saveAccounts(account: AccountsReceivable) {
        if (!account.id) {
            account.budderflyInvoiceId = this.budderflyInvoiceId;
            this.accountsReceivableService
                .create(account)
                .subscribe(
                    (res: HttpResponse<AccountsReceivable>) => this.updateAccounts(res.body),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
        } else if (
            account.outstandingBalance !== this.originalAccountsReceivable.outstandingBalance ||
            account.paymentsReceived !== this.originalAccountsReceivable.paymentsReceived ||
            account.previousBalance !== this.originalAccountsReceivable.previousBalance
        ) {
            this.accountsReceivableService
                .update(account)
                .subscribe(
                    (res: HttpResponse<AccountsReceivable>) => console.log('AccountsReceibable successfully updated'),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
        }
    }

    saveAdjustments() {
        const observableAdjustments = [];
        this.adjustments.forEach((adjustment: Adjustment) => {
            const originalAdjustment: Adjustment = this.originalAdjustments.find(element => element.id === adjustment.id);
            if (!originalAdjustment) {
                adjustment.budderflyInvoiceId = this.budderflyInvoiceId;
                observableAdjustments.push(this.adjustmentService.create(adjustment));
            } else if (originalAdjustment.name !== adjustment.name || originalAdjustment.total !== adjustment.total) {
                adjustment.budderflyInvoiceId = this.budderflyInvoiceId;
                observableAdjustments.push(this.adjustmentService.update(adjustment));
            }
        });
        Observable.forkJoin(observableAdjustments).subscribe(
            result => {
                this.load(this.budderflyInvoiceId);
                console.log('Budderfly Adjustments successfully updated.', result);
            },
            error => console.log('Error while updating Budderfly Adjustments.', error)
        );
    }

    updateAccounts(account: AccountsReceivable) {
        this.accountsReceivable = account;
    }

    editPerformances() {
        this.editingPerformances = true;
        this.newPerformances = new Array<Performance>();
    }

    cancelEditPerformances() {
        this.creatingPerformances = false;
        this.newPerformances = new Array<Performance>();
        this.editingPerformances = false;
    }

    confirmEditPerformances() {
        const observablePerformances = [];
        this.editingPerformances = false;
        this.creatingPerformances = false;
        this.performances.forEach((performance: Performance) => {
            const originalPerformance: Performance = this.originalPerformances.find(element => element.id === performance.id);
            if (!originalPerformance) {
                performance.budderflyInvoiceId = this.budderflyInvoiceId;
                observablePerformances.push(this.performanceService.create(performance));
            } else if (
                originalPerformance.actual !== performance.actual ||
                originalPerformance.usage !== performance.usage ||
                originalPerformance.month !== performance.month ||
                originalPerformance.usageType !== performance.usageType ||
                originalPerformance.installDate !== performance.installDate ||
                originalPerformance.lastInvoice !== performance.lastInvoice
            ) {
                observablePerformances.push(this.performanceService.update(performance));
            }
        });
        Observable.forkJoin(observablePerformances).subscribe(
            result => {
                this.load(this.budderflyInvoiceId);
                console.log('Budderfly Performance successfully updated.', result);
            },
            error => console.log('Error while updating Budderfly Performance.', error)
        );
    }

    addNewPerformances() {
        const newPerformance = new Performance();
        this.performances.push(newPerformance);
    }

    removePerformance(performance: Performance) {
        if (!performance.id) {
            this.removeElementPerformances(performance);
        } else {
            this.performanceService
                .delete(performance.id)
                .subscribe(
                    (res: HttpResponse<Performance>) => this.removeElementPerformances(performance),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
        }
    }

    removeElementPerformances(performance: Performance) {
        const index: number = this.performances.indexOf(performance);
        if (index !== -1) {
            this.performances.splice(index, 1);
            this.originalPerformances = JSON.parse(JSON.stringify(this.performances));
            this.editingPerformances = false;
        }
    }

    updatePerformancesArray(performancesArray: Performance[]) {
        this.performances = JSON.parse(JSON.stringify(performancesArray));
        this.originalPerformances = JSON.parse(JSON.stringify(performancesArray));
    }

    updateInvoice() {
        this.budderflyInvoiceService.updateInvoiceFromDetail(this.budderflyInvoice.invoiceNumber).subscribe(
            (response: any) => {
                this.buttonUpdateInvoiceClicked = true;
                const modalRef = this.modalService.open(BudderflyInvoiceConfirmationMessagePopupComponent);
                modalRef.componentInstance.isGenerateInvoice = false;
            },
            (res: HttpErrorResponse) => {
                this.onError(res.message);
            }
        );
    }

    generateInvoice() {
        this.budderflyInvoiceService.generateInvoiceFromDetail(this.budderflyInvoice.invoiceNumber).subscribe(
            (response: any) => {
                this.buttonGenerateInvoiceClicked = true;
                const modalRef = this.modalService.open(BudderflyInvoiceConfirmationMessagePopupComponent);
                modalRef.componentInstance.isGenerateInvoice = true;
            },
            (res: HttpErrorResponse) => {
                this.onError(res.message);
            }
        );
    }

    refreshInvoice() {
        this.budderflyInvoiceService.find(this.budderflyInvoiceId).subscribe((budderflyInvoiceResponse: HttpResponse<BudderflyInvoice>) => {
            this.budderflyInvoice = budderflyInvoiceResponse.body;
            this.invoiceEditable = this.isEditableStatus();
        });
    }

    isEditableStatus() {
        return (
            this.budderflyInvoice.budderflyInvoiceStatus === BudderflyInvoiceStatus.IN_PROGRESS ||
            this.budderflyInvoice.budderflyInvoiceStatus === BudderflyInvoiceStatus.REJECTED ||
            this.budderflyInvoice.budderflyInvoiceStatus === BudderflyInvoiceStatus.FAILED ||
            this.budderflyInvoice.budderflyInvoiceStatus === BudderflyInvoiceStatus.VALIDATION_FAILED ||
            this.budderflyInvoice.budderflyInvoiceStatus === BudderflyInvoiceStatus.WAITING
        );
    }
}
