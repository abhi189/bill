import {
    Component,
    OnInit,
    Input,
    OnChanges,
    SimpleChanges,
    ViewEncapsulation,
    Output,
    EventEmitter,
    OnDestroy,
    ElementRef,
    ViewChild
} from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { JhiAlertService, JhiEventManager } from 'ng-jhipster';

import { DatePipe } from '@angular/common';
import { SiteAccount } from './site-account.model';
import { SiteAccountService } from './site-account.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Ame, AMEStatus, AmeAlgorithm, AmeActivity } from '../../shared/model/ame.model';
import { SiteAccountAmeCalculationPopupComponent } from './site-account-ame-calculation-popup.component';
import { SiteAccountAmeDeletePopupComponent } from './site-account-ame-delete-popup.component';
import { SiteAccountApproveAmePopupComponent } from './site-account-approve-ame-popup.component';
import { SiteAccountRejectAmePopupComponent } from './site-account-reject-ame-popup.component';
import { SiteAccountAmeDeleteStatusCanceledComponent } from './site-account-ame-delete-status-canceled.component';
import { AmeService, EntityResponseType } from '../ame/ame.service';
import { SeteAccountAmeNotRejectedComponent } from './site-account-ame-not-rejected.component';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs';
import { AmeInvoicesService } from './site-account-ame-invoices/ame-invoices.service';

@Component({
    selector: 'jhi-site-account-billing-table',
    templateUrl: './site-account-billing-table.component.html',
    styles: [
        `
            .nav-tabs .nav-link {
                height: 100%;
            }
            .select-ame,
            .select-month {
                -webkit-appearance: none !important;
                -moz-appearance: none !important;
                appearance: none !important;
            }
            .container-buttons {
                display: flex;
                justify-content: flex-end;
            }
            .ng-untouched[required],
            .ng-untouched.required {
                border-left: 5px solid #ced4da;
            }
            .fa-sort {
                cursor: pointer;
            }
            .icon-edit-algorithm {
                height: 19px;
                line-height: 19px;
                cursor: pointer;
            }
            .controls-disabled {
                opacity: 0.65;
            }
        `
    ],
    encapsulation: ViewEncapsulation.None
})
export class SiteAccountBillingTableComponent implements OnInit, OnChanges {
    @Output() ameUpdated = new EventEmitter<Ame>();
    siteAccount: SiteAccount;
    private eventSubscriber: Subscription;
    private subscription: Subscription;

    siteAccountId: any;
    shortMonths = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

    @Input() ames: Array<Ame> = [];

    selectedAme: Ame;
    monthlyValues = [];
    editingAmeAlgorithm = false;
    disableControls = false;

    @ViewChild('selectAmeAlgorithm') selectAmeAlgorithm: ElementRef;

    constructor(
        private siteAccountService: SiteAccountService,
        private jhiAlertService: JhiAlertService,
        private ameService: AmeService,
        private route: ActivatedRoute,
        private modalService: NgbModal,
        private eventManager: JhiEventManager,
        private datePipe: DatePipe,
        private ameInvoicesService: AmeInvoicesService
    ) {
        this.route.params.subscribe(params => {
            this.siteAccountId = params['id'];
        });

        this.selectedAme = new Ame();
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(this.siteAccountId);
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        const hasReceivedAmes = changes.ames.currentValue.length > 0;
        if (hasReceivedAmes) {
            this.ames = changes.ames.currentValue;
            this.getActiveAme();
        }
    }

    load(id) {
        this.siteAccountService.find(id).subscribe((siteAccountResponse: HttpResponse<SiteAccount>) => {
            this.siteAccount = siteAccountResponse.body;
        });
    }

    onSelectedAmeChange(selectedAme) {
        this.loadAllAmeFields(selectedAme.id);
    }

    getActiveAme() {
        if (this.ames.length > 0) {
            const ameActive = this.ames.find(ame => {
                return ame.active;
            });
            if (ameActive) {
                this.selectedAme = ameActive;
            } else {
                this.selectedAme = this.ames[0];
            }
            this.processSelectedAmeChange(this.selectedAme);
        }
    }

    processSelectedAmeChange(selectedAme: Ame) {
        this.setMonthlyValues(selectedAme);
        this.setStartDate(selectedAme);
    }

    registerChangeInSiteAccounts() {
        this.eventSubscriber = this.eventManager.subscribe('siteAccountListModification', response => this.load(this.siteAccount.id));
    }

    setMonthlyValues(activeAme: Ame) {
        const total = this.calculateTotal(activeAme);
        this.monthlyValues = [
            { month: 'January', value: activeAme.ameJan },
            { month: 'February', value: activeAme.ameFeb },
            { month: 'March', value: activeAme.ameMar },
            { month: 'April', value: activeAme.ameApr },
            { month: 'May', value: activeAme.ameMay },
            { month: 'June', value: activeAme.ameJun },
            { month: 'July', value: activeAme.ameJul },
            { month: 'August', value: activeAme.ameAug },
            { month: 'September', value: activeAme.ameSep },
            { month: 'October', value: activeAme.ameOct },
            { month: 'November', value: activeAme.ameNov },
            { month: 'December', value: activeAme.ameDec },
            { month: 'Total', value: total }
        ];
    }

    calculateTotal(activeAme: Ame) {
        return (
            activeAme.ameJan +
            activeAme.ameFeb +
            activeAme.ameMar +
            activeAme.ameApr +
            activeAme.ameMay +
            activeAme.ameJun +
            activeAme.ameJul +
            activeAme.ameAug +
            activeAme.ameSep +
            activeAme.ameOct +
            activeAme.ameNov +
            activeAme.ameDec
        );
    }

    setStartDate(ame: Ame) {
        const month = this.shortMonths.indexOf(ame.startMonth.toString());
        ame.startDate = this.datePipe.transform(new Date(ame.startYear, month), 'MMMM yyyy');
    }

    openAmeCalculationPopup() {
        const modalRef = this.modalService.open(SiteAccountAmeCalculationPopupComponent);
        modalRef.componentInstance.yearOptions = this.getYearOptionsToCalculateAme();
        modalRef.componentInstance.monthOptions = this.getMonthOptionsToCalculateAme();
        modalRef.componentInstance.algorithmOptions = this.getAlgorithmOptionsToCalculateAme();
        modalRef.componentInstance.selectedYear = this.getDefaultValuesToCalculateAme().defaultYear;
        modalRef.componentInstance.selectedMonth = this.getDefaultValuesToCalculateAme().defaultMonth;
        modalRef.componentInstance.selectedAlgorithm = this.getDefaultValuesToCalculateAme().defaultAlgorithm;
        modalRef.componentInstance.ameCalculationOptions.subscribe(options => {
            this.calculateAme(options);
        });
    }

    private getDefaultValuesToCalculateAme() {
        return {
            defaultYear: new Date().getFullYear() - 2,
            defaultMonth: new Date().getMonth(),
            defaultAlgorithm: AmeAlgorithm.LATEST_RATES_V3
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
        return [
            AmeAlgorithm.LATEST_RATES,
            AmeAlgorithm.LATEST_RATES_V2,
            AmeAlgorithm.LATEST_RATES_V3,
            AmeAlgorithm.LOWEST_PERIOD,
            AmeAlgorithm.STANDARD
        ];
    }

    private getAmeStartDate(year: number, month: number, format: string) {
        return this.datePipe.transform(new Date(year, month, 1), format);
    }

    calculateAme(ameOptions) {
        const startDate = this.getAmeStartDate(ameOptions.selectedYear, ameOptions.selectedMonth, 'yyyy-MM-dd');
        this.siteAccountService
            .calculateAME(this.siteAccount.id, startDate, ameOptions.selectedAlgorithm)
            .subscribe((ameResponse: EntityResponseType) => {
                this.ameUpdated.emit(ameResponse.body);
            });
    }

    openDeleteAmePopup() {
        const modalRef = this.modalService.open(SiteAccountAmeDeletePopupComponent);
        modalRef.componentInstance.ameId = this.selectedAme.id;
        modalRef.componentInstance.ameCreatedDate = this.selectedAme.createdDate;
        modalRef.componentInstance.ameDeleted.subscribe(id => {
            this.deleteAme(id);
        });
    }

    openApproveAmePopUp() {
        const modalRef = this.modalService.open(SiteAccountApproveAmePopupComponent);
        modalRef.componentInstance.ameId = this.selectedAme.id;
        modalRef.componentInstance.ameCreatedDate = this.selectedAme.createdDate;
        modalRef.componentInstance.ameApproved.subscribe(id => {
            this.approveAme(id);
        });
    }

    openRejectAmePopUp() {
        const modalRef = this.modalService.open(SiteAccountRejectAmePopupComponent);
        modalRef.componentInstance.ameId = this.selectedAme.id;
        modalRef.componentInstance.ameCreatedDate = this.selectedAme.createdDate;
        modalRef.componentInstance.ameRejected.subscribe(id => {
            this.rejectAme(id);
        });
    }

    checkAmeStatus() {
        if (this.selectedAme.active) {
            const modalRef = this.modalService.open(SiteAccountAmeDeleteStatusCanceledComponent);
            modalRef.componentInstance.ameStatus = 'Active';
        } else if (this.selectedAme.status === AMEStatus.APPROVED) {
            const modalRef = this.modalService.open(SiteAccountAmeDeleteStatusCanceledComponent);
            modalRef.componentInstance.ameStatus = 'Approved';
        } else {
            this.openDeleteAmePopup();
        }
    }

    deleteAme(id: number) {
        this.ameService.delete(id).subscribe(response => {});
        location.reload();
    }

    approveAme(id: number) {
        this.ameService.approve(this.selectedAme).subscribe((response: HttpResponse<Ame>) => {
            this.selectedAme.active = response.body.active;
            this.selectedAme.status = response.body.status;
            this.selectedAme.approvedDate = response.body.approvedDate;
            this.selectedAme.approvedBy = response.body.approvedBy;
        });
    }

    checkAmeRejectStatus() {
        if (this.selectedAme.status === AMEStatus.APPROVED) {
            const modalRef = this.modalService.open(SeteAccountAmeNotRejectedComponent);
            modalRef.componentInstance.ameStatus = 'Approved';
        } else {
            this.rejectAme(this.selectedAme.id);
        }
    }

    rejectAme(id: number) {
        this.ameService.reject(this.selectedAme).subscribe(response => {
            this.selectedAme.active = response.body.active;
            this.selectedAme.status = response.body.status;
            this.selectedAme.approvedDate = response.body.approvedDate;
            this.selectedAme.approvedBy = response.body.approvedBy;
        });
    }

    editAlgorithm() {
        this.editingAmeAlgorithm = true;
        // Inside a timeout to run after the view has detected changes
        // Otherwise, the element wouldn't have been created yet
        setTimeout(() => {
            this.selectAmeAlgorithm.nativeElement.focus();
        });
    }

    blurSelectAmeAlgorithm() {
        this.editingAmeAlgorithm = false;
    }

    onSelectAmeAlgorithm(algorithm: AmeAlgorithm) {
        const previousAlgorithm = this.selectedAme.algorithm;
        const newAlgorithm = algorithm;
        this.createNewAmeActivity(previousAlgorithm, newAlgorithm);
        this.selectAmeAlgorithm.nativeElement.blur();
    }

    createNewAmeActivity(previousAlgorithm, newAlgorithm) {
        const newAmeActivity = new AmeActivity();
        newAmeActivity.ameId = this.selectedAme.id;
        newAmeActivity.description = `Algorithm changed from ${previousAlgorithm} to ${newAlgorithm}.`;
        this.disableControls = true;
        this.siteAccountService.createAmeActivity(newAmeActivity).subscribe(
            (result: HttpResponse<AmeActivity>) => {
                this.selectedAme.ameActivities.push(result.body);
                this.selectedAme.algorithm = newAlgorithm;
                this.disableControls = false;
                console.log('AmeActivity successfully created.', result);
            },
            error => {
                this.disableControls = false;
                console.log('Error while creating AmeActivity.', error);
            }
        );
    }

    onAutomaticUpdateChange(automaticUpdate: boolean) {
        this.selectedAme.automaticUpdate = automaticUpdate;
        this.updateAmeWithoutRecalculating();
    }

    updateAmeWithoutRecalculating() {
        this.disableControls = true;
        this.ameService.update(this.selectedAme).subscribe(
            result => console.log('Ame updated', result),
            error => {
                console.log('Error updating AME', error);
                this.disableControls = false;
            },
            () => (this.disableControls = false)
        );
    }

    recalculateAmeMonthlyValues(ameId: number) {
        this.ameService.recalculateAmeMonthlyValues(ameId).subscribe(
            (res: HttpResponse<any>) => {
                console.log('Request to recalculate AME Monthly Values succesfully sent', res);
                // this.setNullMonthlyValues();
            },
            (err: HttpErrorResponse) => console.log('Error recalculating AME Monthly Values', err)
        );
    }

    /**
     * Visual indicator showing that monthly values need to be refreshed.
     * Will be better if there is an open connection (like WebSocket)
     * that refreshes automatically once the calculation is done.
     */
    setNullMonthlyValues() {
        this.monthlyValues.forEach(mv => {
            mv.value = null;
        });
    }

    refreshAMEMonthlyValues(ameId: number) {
        this.disableControls = true;
        this.ameService.find(ameId).subscribe(
            (result: HttpResponse<Ame>) => this.ameUpdated.emit(result.body),
            error => {
                console.log('Error refreshing AME Monthly Values', error);
                this.disableControls = false;
            },
            () => (this.disableControls = false)
        );
    }

    onRecalculateAmun() {
        this.ameService.recalculateAmun(this.selectedAme).subscribe(
            (result: HttpResponse<Ame>) => {
                this.recalculateAmeMonthlyValues(this.selectedAme.id);
            },
            error => console.log('Error while recalculating AMUNs.', error)
        );
    }

    onRecalculateDollars() {
        this.ameService.recalculateDollars(this.selectedAme).subscribe(
            (result: HttpResponse<Ame>) => {
                this.loadAllAmeFields(this.selectedAme.id);
            },
            error => console.log('Error while recalculating Dollars.', error)
        );
    }

    onRecalculateAmeMonthlyValues(ameId: number) {
        this.recalculateAmeMonthlyValues(ameId);
    }

    private loadAllAmeFields(ameId: number) {
        this.ameService.find(ameId).subscribe((ameResponse: HttpResponse<Ame>) => {
            this.processSelectedAmeChange(ameResponse.body);
        });
    }

    onSiteAccountTariffChanged() {
        this.recalculateAmeMonthlyValues(this.selectedAme.id);
    }

    onAddChargesToTariffRatesChange(addChargesToTariffRates: boolean) {
        if (this.selectedAme.useRateRepository) {
            this.selectedAme.addChargesToTariffRates = addChargesToTariffRates;
            this.disableControls = true;
            this.ameService.update(this.selectedAme).subscribe(
                result => console.log('Ame updated', result),
                error => {
                    console.log('Error updating AME', error);
                    this.disableControls = false;
                },
                () => (this.disableControls = false)
            );
        }
    }

    isTabDisabled() {
        return this.selectedAme.id == null;
    }
}
