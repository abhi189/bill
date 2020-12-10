import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { InvoiceSectionEnum, Rate, Tariff, TariffYear } from '../tariff.model';
import { SiteAccountComboSelectorPopupComponent } from '../../site-account';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TariffRatesMonthsPopupComponent } from './tariff-rates-months-popup.component';
import { TariffYearService } from '../tariff-year.service';
import { NewYearRatesPopupComponent } from './new-year-rates-popup.component';
import { NewYearRatesMessagePopupComponent } from './new-year-rates-message-popup.component';
import { RateImportService } from '../rate-import-job/rate-import.service';
import { JhiAlertService } from 'ng-jhipster';

const RATE_TYPE_PERCENTAGE = 'PERCENTAGE';
const RATE_TYPE_TIER = 'TIER';

@Component({
    selector: 'jhi-tariff-rates-table',
    templateUrl: './tariff-rates-table.component.html',
    styles: [
        `
            .row-rates {
                padding-top: 20px;
                overflow: scroll;
            }

            .container-buttons {
                display: flex;
                justify-content: flex-end;
            }

            .form-control {
                font-size: small;
                width: 100px;
                padding: 0.35rem 0.35rem;
            }

            .select-rates {
                width: auto;
            }

            .max-width-rate-type {
                max-width: 59px;
            }
        `
    ]
})
export class TariffRatesTableComponent implements OnInit, OnChanges {
    @Output() valueToAllMonth = new EventEmitter<Object>();
    @Output() toParent = new EventEmitter<number>();
    @Input() tariffYears: Array<TariffYear> = [];

    tariffId: number;
    private _tariff: Tariff;
    @Input() set tariff(tariff: Tariff) {
        this.tariffId = tariff.id;
        this._tariff = tariff;
    }

    get tariff(): Tariff {
        return this._tariff;
    }

    // @Input() tariffId: number;
    @Input() manualProvider: boolean;
    updateRatesRunning: boolean;
    monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    sortRateTableDirection = 'desc';
    selectedTariffYear: TariffYear = {};
    originalTariffYear: TariffYear = {};
    newRates: Array<Rate> = [];
    ratesUsageUnits = ['KW', 'KWH', 'CCF', 'FLAT', 'DAY', 'CHARGE'];
    editingRate = false;
    creatingRate = false;
    selectedItems = [];
    selectedMonth: string;
    dropdown = [];
    monthValue: number;
    ratesToRemove: Array<Rate> = [];
    InvoiceSectionEnum = InvoiceSectionEnum;
    invoiceSectionsMap = Object.keys(InvoiceSectionEnum).map(k => ({ key: k, value: InvoiceSectionEnum[k as any] }));

    constructor(
        private modalService: NgbModal,
        private tariffYearService: TariffYearService,
        private rateImportService: RateImportService,
        private jhiAlertService: JhiAlertService
    ) {}

    ngOnInit() {
        this.checkEmptyTariffYears(this.tariffYears);
    }

    ngOnChanges(changes: SimpleChanges) {
        this.checkEmptyTariffYears(changes.tariffYears.currentValue);
    }

    checkEmptyTariffYears(tariffYears: Array<TariffYear>): void {
        if (tariffYears === undefined || tariffYears.length === 0) {
            this.tariffYears[0] = new TariffYear(null, new Date().getFullYear(), this.tariffId, []);
        } else {
            this.tariffYears = tariffYears;
        }
        this.selectedTariffYear = this.tariffYears[0];
        this.selectedTariffYear.rates.forEach(rate => {
            if (rate.rateType != null && rate.rateType.indexOf(RATE_TYPE_TIER) !== -1) {
                const tierStr = rate.rateType.split('_');
                rate.rateTypeParsed = tierStr[0];
                rate.tierNumber = parseInt(tierStr[1], 10);
            } else {
                rate.rateTypeParsed = rate.rateType;
            }
        });

        this.selectedTariffYear.tariffId = this.tariffId;
    }

    editRates() {
        if (this.selectedTariffYear == null) {
            this.selectedTariffYear = new TariffYear();
            this.selectedTariffYear.tariffId = this.tariffId;
            this.selectedTariffYear.year = new Date().getFullYear();
            this.selectedTariffYear.rates = new Array<Rate>();
        }
        this.originalTariffYear = JSON.parse(JSON.stringify(this.selectedTariffYear));
        this.editingRate = true;
        this.newRates = new Array<Rate>();
    }

    cancelEditRates() {
        this.selectedTariffYear.rates = JSON.parse(JSON.stringify(this.originalTariffYear.rates));
        this.selectedTariffYear.ratesToRemove = JSON.parse(
            JSON.stringify(this.originalTariffYear.ratesToRemove ? this.originalTariffYear.ratesToRemove : [])
        );
        this.resetValuesToDefault();
    }

    confirmEditRates() {
        this.compareRates();
        this.selectedTariffYear.rates.push(...this.getNewRates());
        this.selectedTariffYear.rates.forEach(rate => {
            if (rate.rateTypeParsed != null && rate.rateTypeParsed === RATE_TYPE_TIER) {
                rate.rateType = rate.rateTypeParsed.concat('_' + rate.tierNumber);
            } else {
                rate.rateType = rate.rateTypeParsed;
            }
        });

        this.checkRateApplyPercentage();
        this.selectedTariffYear.ratesToRemove = this.ratesToRemove;
        this.resetValuesToDefault();
        if (this.selectedTariffYear.id == null) {
            this.createTariffYear(this.selectedTariffYear);
        } else {
            this.updateTariffYear(this.selectedTariffYear);
        }
    }

    private compareRates() {
        for (let i = 0; i < this.selectedTariffYear.rates.length; i++) {
            if (JSON.stringify(this.originalTariffYear.rates[i]) !== JSON.stringify(this.selectedTariffYear.rates[i])) {
                this.selectedTariffYear.rates[i].updateDate = new Date();
            }
        }
    }

    checkRateApplyPercentage() {
        this.selectedTariffYear.rates.forEach(rate => {
            if (rate.rateType !== RATE_TYPE_PERCENTAGE) {
                rate.rateApplyPercentages = [];
            }
        });
    }

    resetValuesToDefault() {
        this.editingRate = false;
        this.creatingRate = false;
        this.newRates = new Array<Rate>();
        this.ratesToRemove = new Array<Rate>();
    }

    createTariffYear(tariffYear: TariffYear) {
        this.tariffYearService
            .create(tariffYear)
            .finally(() => {
                this.ratesToRemove = new Array<Rate>();
                this.toParent.emit(this.tariffId);
            })
            .subscribe(
                result => {
                    console.log('TariffYears successfully created.', result);
                },
                error => console.log('Error while creating tariffYear', error)
            );
    }

    updateTariffYear(tariffYear: TariffYear) {
        this.tariffYearService
            .update(tariffYear)
            .finally(() => {
                this.ratesToRemove = new Array<Rate>();
                this.toParent.emit(this.tariffId);
            })
            .subscribe(
                result => {
                    console.log('TariffYears successfully updated.', result);
                },
                error => console.log('Error while updating tariffYear', error)
            );
    }

    getNewRates() {
        const filledNewRates = new Array<Rate>();

        this.newRates.forEach(newRate => {
            if (newRate.chargeId && newRate.chargeDescription && newRate.usageUnit) {
                newRate.id = null;
                filledNewRates.push(newRate);
            }
        });
        return filledNewRates;
    }

    addNewRate() {
        this.creatingRate = true;
        const rate = new Rate();
        rate.updateDate = new Date();
        rate.id = Date.now();
        rate.tariffId = this.tariffId;
        rate.year = this.selectedTariffYear.year;
        this.newRates.push(rate);
    }

    trackId(index: number, item: Rate) {
        return item.id;
    }

    removeNewRate(index: number, rate) {
        this.newRates.splice(index, 1);
    }

    removeRate(index: number, rate) {
        this.ratesToRemove.push(rate); // check if we need to update the array of applyPercentage records
        for (let i = 0; i < this.selectedTariffYear.rates.length; i++) {
            if (typeof this.selectedTariffYear.rates[i].rateApplyPercentages !== 'undefined') {
                for (let e = 0; e < this.selectedTariffYear.rates[i].rateApplyPercentages.length; e++) {
                    if (
                        this.selectedTariffYear.rates[i].rateApplyPercentages[e].chargeDescription === rate.chargeDescription &&
                        this.selectedTariffYear.rates[i].rateApplyPercentages[e].chargeId === rate.chargeId
                    ) {
                        this.selectedTariffYear.rates[i].rateApplyPercentages.splice(e, 1);
                    }
                }
            }
        }
        this.selectedTariffYear.rates.splice(index, 1);
    }

    sortRateTable(property) {
        this.sortRateTableDirection = this.sortRateTableDirection === 'asc' ? 'desc' : 'asc';
        this.selectedTariffYear.rates.sort((a, b) => {
            if (a[property] > b[property]) {
                return this.sortRateTableDirection === 'asc' ? 1 : -1;
            } else if (a[property] < b[property]) {
                return this.sortRateTableDirection === 'asc' ? -1 : 1;
            } else {
                return 0;
            }
        });
    }

    private openComboSelector(isMonthSelector, disableCombo, isNewRate, data) {
        this.dropdown = [];
        this.selectedItems = [];
        for (let i = 0; i < this.selectedTariffYear.rates.length; i++) {
            if (
                this.selectedTariffYear.rates[i].chargeId !== data.chargeId &&
                this.selectedTariffYear.rates[i].chargeDescription !== data.chargeDescription
            ) {
                // itemName is used by the comboSelector library
                const item = {
                    id: this.selectedTariffYear.rates[i].id,
                    itemName: this.selectedTariffYear.rates[i].chargeId,
                    chargeActualName: this.selectedTariffYear.rates[i].chargeDescription,
                    rate: this.selectedTariffYear.rates[i]
                };

                this.dropdown.push(item);

                if (data.rateApplyPercentages != null) {
                    for (let e = 0; e < data.rateApplyPercentages.length; e++) {
                        if (
                            data.rateApplyPercentages[e].chargeId === this.selectedTariffYear.rates[i].chargeId &&
                            data.rateApplyPercentages[e].chargeDescription === this.selectedTariffYear.rates[i].chargeDescription &&
                            data.rateApplyPercentages[e].billingMonthJan === this.selectedTariffYear.rates[i].billingMonthJan &&
                            data.rateApplyPercentages[e].billingMonthFeb === this.selectedTariffYear.rates[i].billingMonthFeb &&
                            data.rateApplyPercentages[e].billingMonthMar === this.selectedTariffYear.rates[i].billingMonthMar &&
                            data.rateApplyPercentages[e].billingMonthApr === this.selectedTariffYear.rates[i].billingMonthApr &&
                            data.rateApplyPercentages[e].billingMonthMay === this.selectedTariffYear.rates[i].billingMonthMay &&
                            data.rateApplyPercentages[e].billingMonthJun === this.selectedTariffYear.rates[i].billingMonthJun &&
                            data.rateApplyPercentages[e].billingMonthJul === this.selectedTariffYear.rates[i].billingMonthJul &&
                            data.rateApplyPercentages[e].billingMonthAug === this.selectedTariffYear.rates[i].billingMonthAug &&
                            data.rateApplyPercentages[e].billingMonthSep === this.selectedTariffYear.rates[i].billingMonthSep &&
                            data.rateApplyPercentages[e].billingMonthOct === this.selectedTariffYear.rates[i].billingMonthOct &&
                            data.rateApplyPercentages[e].billingMonthNov === this.selectedTariffYear.rates[i].billingMonthNov &&
                            data.rateApplyPercentages[e].billingMonthDec === this.selectedTariffYear.rates[i].billingMonthDec
                        ) {
                            this.selectedItems.push(item);
                        }
                    }
                }
            }
        }

        const modalRef = this.modalService.open(SiteAccountComboSelectorPopupComponent);
        modalRef.componentInstance.isMonthSelector = isMonthSelector;
        modalRef.componentInstance.dropDown = this.dropdown;
        modalRef.componentInstance.items = this.selectedItems;
        modalRef.componentInstance.comboDisabled = disableCombo;
        modalRef.componentInstance.comboSelection.subscribe(selection => {
            const rateAP = [];
            for (let e = 0; e < selection.selectedItems.length; e++) {
                if (selection.selectedItems[e].rate != null) {
                    rateAP.push(selection.selectedItems[e].rate);
                }
            }
            if (isNewRate) {
                for (let x = 0; x < this.newRates.length; x++) {
                    if (this.newRates[x].id === data.id) {
                        this.newRates[x].rateApplyPercentages = rateAP;
                    }
                }
            } else {
                for (let i = 0; i < this.selectedTariffYear.rates.length; i++) {
                    if (this.selectedTariffYear.rates[i].id === data.id) {
                        this.selectedTariffYear.rates[i].rateApplyPercentages = rateAP;
                    }
                }
            }
        });
    }

    private openMonthPopup(rate: Rate) {
        const modalRef = this.modalService.open(TariffRatesMonthsPopupComponent);
        modalRef.componentInstance.values = this.monthValue;
        modalRef.componentInstance.valueToAllMonth.subscribe(inputValue => {
            rate = this.copyBillingMonth(rate, inputValue.monthValue);
        });
    }

    onSelectedTariffYear(tariffYear) {
        if (tariffYear) {
            this.selectedTariffYear = tariffYear;
        }
    }

    private enableApplyPercentageButton(rateType) {
        return rateType !== RATE_TYPE_PERCENTAGE;
    }

    private enableTierNumber(rateType) {
        return rateType !== RATE_TYPE_TIER;
    }

    private labelForAP(rate) {
        if (typeof rate.rateApplyPercentages !== 'undefined') {
            if (rate.rateApplyPercentages.length === 1) {
                return rate.rateApplyPercentages[0].chargeId;
            } else if (rate.rateApplyPercentages.length > 1) {
                return 'Multiple';
            }
        }
        return '';
    }

    checkIfAtLeastOneMonth(rate: Rate) {
        if (
            this.isValidMonthValue(rate.billingMonthJan) ||
            this.isValidMonthValue(rate.billingMonthFeb) ||
            this.isValidMonthValue(rate.billingMonthMar) ||
            this.isValidMonthValue(rate.billingMonthApr) ||
            this.isValidMonthValue(rate.billingMonthMay) ||
            this.isValidMonthValue(rate.billingMonthJun) ||
            this.isValidMonthValue(rate.billingMonthJul) ||
            this.isValidMonthValue(rate.billingMonthAug) ||
            this.isValidMonthValue(rate.billingMonthSep) ||
            this.isValidMonthValue(rate.billingMonthOct) ||
            this.isValidMonthValue(rate.billingMonthNov) ||
            this.isValidMonthValue(rate.billingMonthDec)
        ) {
            return true;
        }
        return false;
    }

    isValidMonthValue(monthValue: number) {
        return monthValue !== undefined && monthValue !== null;
    }

    validateMonths() {
        let isValid = true;
        this.newRates.forEach(newRate => {
            if (!this.checkIfAtLeastOneMonth(newRate)) {
                isValid = false;
            }
        });
        this.selectedTariffYear.rates.forEach(rate => {
            if (!this.checkIfAtLeastOneMonth(rate)) {
                isValid = false;
            }
        });
        return isValid;
    }

    copyToNextYear() {
        const nextYear = this.selectedTariffYear.year + 1;
        if (this.tariffYears.find(value => value.year === nextYear)) {
            this.modalService.open(NewYearRatesMessagePopupComponent);
            return;
        }

        const modalRef = this.modalService.open(NewYearRatesPopupComponent);
        modalRef.componentInstance.actualYear = this.selectedTariffYear.year;
        modalRef.componentInstance.result.subscribe(options => {
            if (options.confirm) {
                const nextTariffYear: TariffYear = {};
                nextTariffYear.year = nextYear;
                nextTariffYear.tariffId = this.selectedTariffYear.tariffId;
                nextTariffYear.id = null;
                const copiedRatesNextYear: Array<Rate> = [];
                this.selectedTariffYear.rates.forEach(rate => {
                    let newRate: Rate = Object.assign({}, rate);
                    newRate.id = null;
                    newRate.year = nextYear;
                    if (options.takeDecember) {
                        newRate = this.copyBillingMonth(newRate, rate.billingMonthDec);
                    }
                    newRate.updateDate = new Date();
                    copiedRatesNextYear.push(newRate);
                });
                nextTariffYear.rates = copiedRatesNextYear;
                this.tariffYearService
                    .clone(nextTariffYear)
                    .finally(() => {
                        this.ratesToRemove = new Array<Rate>();
                        this.toParent.emit(this.tariffId);
                    })
                    .subscribe(
                        result => {
                            console.log('TariffYears successfully cloned.', result);
                        },
                        error => console.log('Error while cloning tariffYear', error)
                    );
            }
        });
    }

    copyBillingMonth(rate: Rate, value: number) {
        rate.billingMonthJan = value;
        rate.billingMonthFeb = value;
        rate.billingMonthMar = value;
        rate.billingMonthApr = value;
        rate.billingMonthMay = value;
        rate.billingMonthJun = value;
        rate.billingMonthJul = value;
        rate.billingMonthAug = value;
        rate.billingMonthSep = value;
        rate.billingMonthOct = value;
        rate.billingMonthNov = value;
        rate.billingMonthDec = value;
        return rate;
    }

    updateRates() {
        const requestParams = {
            id: this.tariffId,
            externalId: this.tariff.externalId,
            providerId: this.tariff.providerId
        };
        this.updateRatesRunning = true;
        this.rateImportService.updateRates(requestParams).subscribe(
            res => {
                this.jhiAlertService.addAlert(
                    { type: 'success', msg: 'billingWebApp.tariff.rateImportJob.updateRates', timeout: 5000 },
                    []
                );
                this.updateRatesRunning = false;
            },
            error => {
                this.updateRatesRunning = false;
            }
        );
    }
}
