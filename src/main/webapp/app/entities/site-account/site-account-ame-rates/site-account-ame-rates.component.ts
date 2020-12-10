import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AmeRatesService } from './ame-rates.service';
import { AmerSet, Amer, AmerApplyPercentages } from '../../../shared/model/ame.model';
import { SiteAccountComboSelectorPopupComponent } from '../site-account-combo-selector-popup.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AmeInvoicesService } from '../site-account-ame-invoices/ame-invoices.service';

const RATE_TYPE_PERCENTAGE = 'PERCENTAGE';
const RATE_TYPE_TIER = 'TIER';

@Component({
    selector: 'jhi-site-account-ame-rates',
    templateUrl: './site-account-ame-rates.component.html',
    styles: [
        `
            .most-current-rate {
                color: #fff !important;
                background-color: #28a745 !important;
            }

            .select-amer-set {
                -webkit-appearance: none !important;
                -moz-appearance: none !important;
                appearance: none !important;
            }

            .max-width-rate-type {
                max-width: 59px;
            }
        `
    ]
})
export class SiteAccountAmeRatesComponent implements OnInit {
    _ameId: number;
    get ameId(): number {
        return this._ameId;
    }

    @Input('ameId')
    set ameId(value: number) {
        this._ameId = value;
        this.getAmers();
    }

    @Input() automaticUpdate;
    @Input() useRateRepository;
    @Input() addChargesToTariffRates;

    @Output() recalculateAmeMonthlyValues = new EventEmitter<any>();
    @Output() automaticUpdateEvent = new EventEmitter<any>();
    @Output() addChargeToTariffEvent = new EventEmitter<any>();

    ameInvoices = [];
    amers = [];
    amerSets = [];
    selectedAmerSet: AmerSet = new AmerSet();
    lastRates: Array<Amer> = [];
    newAmers: Array<Amer> = [];
    originalAmerSet: AmerSet;
    selectedItems = [];
    dropdown = [];
    currentTariff: string;
    selectedMonth: string;
    ratesUsageUnits = ['KW', 'KWH', 'CCF', 'FLAT', 'DAY', 'CHARGE', 'GAL', 'LBS'];
    editingRate = false;
    creatingRate = false;
    sortRateTableDirection = 'desc';

    constructor(private ameRatesService: AmeRatesService, private ameInvoicesService: AmeInvoicesService, private modalService: NgbModal) {}

    ngOnInit() {}

    getAmers() {
        this.ameRatesService.getAmers(this.ameId).subscribe(
            result => {
                this.amers = result.body;
                this.processAmerSets(this.amers);
            },
            error => console.log('Error while getting AmerSets', error)
        );
    }

    onSelectedAmerSet(amerSet) {
        this.selectedAmerSet = amerSet;
        this.getInvoices();
    }

    getInvoices() {
        if (this.ameId == null) {
            return;
        }
        this.ameInvoicesService.getAllInvoicesByAme(this.ameId).subscribe(
            result => {
                this.ameInvoices = result.body;
                this.getTariffName(this.selectedAmerSet);
            },
            error => console.log('Error while getting invoices', error)
        );
    }

    getTariffName(amerSet) {
        if (this.ameInvoices && this.ameInvoices.length > 0 && amerSet != null && amerSet.amers != null) {
            let newerInvoiceId = 0;
            let date;

            // get the newer Invoice id from the set
            for (let i = 0; i < amerSet.amers.length; i++) {
                if (newerInvoiceId === 0) {
                    newerInvoiceId = amerSet.amers[i].invoiceId;
                    date = new Date(amerSet.amers[i].effectiveDate);
                } else {
                    const tempDate = new Date(amerSet.amers[i].effectiveDate);
                    if (tempDate > date) {
                        if (typeof amerSet.amers[i].invoiceId !== 'undefined' && amerSet.amers[i].invoiceId != null) {
                            newerInvoiceId = amerSet.amers[i].invoiceId;
                            date = new Date(amerSet.amers[i].effectiveDate);
                        }
                    }
                }
            }

            this.ameInvoices.forEach(invoice => {
                if (invoice.id === newerInvoiceId) {
                    this.currentTariff = invoice.meters[0].tariff;
                }
            });
        }
    }

    processAmerSets(amers) {
        this.amerSets = [];
        const amerSetsDict = {};
        amers.forEach(amer => {
            if (amer.rateType != null && amer.rateType.indexOf(RATE_TYPE_TIER) !== -1) {
                const tierStr = amer.rateType.split('_');
                amer.rateTypeParsed = tierStr[0];
                amer.tierNumber = parseInt(tierStr[1], 10);
            } else {
                amer.rateTypeParsed = amer.rateType;
            }

            amer.amerSets.forEach(amerSet => {
                if (!(amerSet.id in amerSetsDict)) {
                    amerSetsDict[amerSet.id] = {
                        effectiveDate: amerSet.effectiveDate,
                        amers: [],
                        id: amerSet.id
                    };
                }

                amerSetsDict[amerSet.id].amers.push(amer);
            });
        });

        // Object.keys is used because of this https://stackoverflow.com/questions/40770425/tslint-codelyzer-ng-lint-error-for-in-statements-must-be-filtere
        for (const key of Object.keys(amerSetsDict)) {
            this.amerSets.push(amerSetsDict[key]);
        }
        const latestRateSet = this.getLatestRateSet(this.amerSets);
        this.onSelectedAmerSet(latestRateSet);
    }

    editRates() {
        // Creates new amerSet if none exists
        if (this.selectedAmerSet == null || this.selectedAmerSet.id == null) {
            this.selectedAmerSet = new AmerSet();
            this.selectedAmerSet.amers = new Array<Amer>();
            this.selectedAmerSet.ameId = this.ameId;
        }
        this.originalAmerSet = JSON.parse(JSON.stringify(this.selectedAmerSet));
        this.editingRate = true;
        this.newAmers = new Array<Amer>();
    }

    cancelEditRates() {
        this.creatingRate = false;
        this.newAmers = new Array<Amer>();
        this.editingRate = false;
        this.selectedAmerSet.amers = this.originalAmerSet.amers;
    }

    async confirmEditRates() {
        this.editingRate = false;
        this.creatingRate = false;
        this.selectedAmerSet.amers.push(...this.getNewAmers());
        this.selectedAmerSet.amers.forEach(amer => {
            if (amer.rateTypeParsed != null && amer.rateTypeParsed === RATE_TYPE_TIER) {
                amer.rateType = amer.rateTypeParsed.concat('_' + amer.tierNumber);
            } else {
                amer.rateType = amer.rateTypeParsed;
            }
        });

        this.newAmers = new Array<Amer>();
        if (this.checkIfRateSetHasBeenEdited()) {
            const newAmerSet: AmerSet = Object.assign({}, this.selectedAmerSet);
            newAmerSet.id = null;
            newAmerSet.effectiveDate = new Date();
            newAmerSet.ameId = this.ameId;
            await this.createNewAmerSet(newAmerSet);
            this.recalculateAmeMonthlyValues.emit(this.ameId);
            this.getAmers();
        }
    }

    addNewRate() {
        this.creatingRate = true;
        const newAmer = new Amer();
        newAmer.effectiveDate = new Date();
        // save a temporary id for ui procedures, when sending this to the backend should be reset it
        newAmer.id = Date.now();
        this.newAmers.push(newAmer);
    }

    /**
     * Checks if values are filled.
     * Validation is done in the backend.
     */
    getNewAmers() {
        const filledNewAmers = new Array<Amer>();
        this.newAmers.forEach(newAmer => {
            if (newAmer.chargeId && newAmer.chargeActualName && newAmer.usageType && newAmer.rate > 0) {
                // we need to reset the id of the new Amers to null
                newAmer.id = null;
                filledNewAmers.push(newAmer);
            }
        });
        return filledNewAmers;
    }

    checkIfRateSetHasBeenEdited() {
        let rateSetEdited = false;
        let amerAddedOrRemoved = false;
        let originalAmerEdited = false;
        if (this.selectedAmerSet.amers.length !== this.originalAmerSet.amers.length) {
            amerAddedOrRemoved = true;
        }
        this.selectedAmerSet.amers.forEach(amer => {
            const originalAmer = this.originalAmerSet.amers.find(oAmer => oAmer.id === amer.id);
            if (originalAmer != null) {
                if (
                    originalAmer.rateComponent !== amer.rateComponent ||
                    originalAmer.rate !== amer.rate ||
                    originalAmer.invoiceId !== amer.invoiceId ||
                    originalAmer.chargeActualName !== amer.chargeActualName ||
                    originalAmer.usageAmount !== amer.usageAmount ||
                    originalAmer.billingMonth !== amer.billingMonth ||
                    (typeof originalAmer.amerApplyPercentages !== 'undefined' &&
                        originalAmer.amerApplyPercentages.length !== amer.amerApplyPercentages.length)
                ) {
                    amer.id = null;
                    originalAmerEdited = true;
                }
            } else {
                amerAddedOrRemoved = true;
            }
        });
        rateSetEdited = amerAddedOrRemoved || originalAmerEdited;
        return rateSetEdited;
    }

    createNewAmerSet(amerSet: AmerSet) {
        const amers = new Array<Amer>();
        amerSet.amers.forEach(amer => {
            amer.ameId = amerSet.ameId;

            if (typeof amer.billingMonth === 'undefined' || amer.billingMonth === '') {
                amer.billingMonth = 'ALL';
            }

            amers.push(amer);
        });
        return this.ameRatesService.manualCreateAmerSet(amers).toPromise();
    }

    removeRate(index: number, rate) {
        // check if we need to update the array of applyPercentage records
        for (let i = 0; i < this.selectedAmerSet.amers.length; i++) {
            if (typeof this.selectedAmerSet.amers[i].amerApplyPercentages !== 'undefined') {
                for (let e = 0; e < this.selectedAmerSet.amers[i].amerApplyPercentages.length; e++) {
                    if (
                        this.selectedAmerSet.amers[i].amerApplyPercentages[e].chargeActualName === rate.chargeActualName &&
                        this.selectedAmerSet.amers[i].amerApplyPercentages[e].chargeId === rate.chargeId
                    ) {
                        this.selectedAmerSet.amers[i].amerApplyPercentages.splice(e, 1);
                    }
                }
            }
        }

        if (typeof this.newAmers !== 'undefined') {
            // in case the user is adding and then deleted one of the optiosn
            for (let b = 0; b < this.newAmers.length; b++) {
                if (typeof this.newAmers[b].amerApplyPercentages !== 'undefined') {
                    for (let c = 0; c < this.newAmers[b].amerApplyPercentages.length; c++) {
                        if (
                            this.newAmers[b].amerApplyPercentages[c].chargeActualName === rate.chargeActualName &&
                            this.newAmers[b].amerApplyPercentages[c].chargeId === rate.chargeId
                        ) {
                            this.newAmers[b].amerApplyPercentages.splice(c, 1);
                        }
                    }
                }
            }
        }

        this.selectedAmerSet.amers.splice(index, 1);
    }

    sortRateTable(property) {
        this.sortRateTableDirection = this.sortRateTableDirection === 'asc' ? 'desc' : 'asc';
        this.selectedAmerSet.amers.sort((a, b) => {
            if (a[property] > b[property]) {
                return this.sortRateTableDirection === 'asc' ? 1 : -1;
            } else if (a[property] < b[property]) {
                return this.sortRateTableDirection === 'asc' ? -1 : 1;
            } else {
                return 0;
            }
        });
    }

    onAutomaticUpdateChange() {
        this.automaticUpdateEvent.emit(this.automaticUpdate);
    }

    onAddChargesToTariffRatesChange() {
        this.addChargeToTariffEvent.emit(this.addChargesToTariffRates);
    }

    private getLatestRateSet(amerSets: AmerSet[]) {
        amerSets.sort((a, b) => {
            if (a.effectiveDate > b.effectiveDate) {
                return 1;
            } else if (a.effectiveDate < b.effectiveDate) {
                return -1;
            }
            return 0;
        });
        const latestRateSet = amerSets[this.amerSets.length - 1];
        return latestRateSet;
    }

    private openComboSelector(isMonthSelector, disableCombo, isNewAmer, data) {
        if (isMonthSelector) {
            this.dropdown = [
                { id: 1, itemName: 'JAN' },
                { id: 2, itemName: 'FEB' },
                { id: 3, itemName: 'MAR' },
                { id: 4, itemName: 'APR' },
                { id: 5, itemName: 'MAY' },
                { id: 6, itemName: 'JUN' },
                { id: 7, itemName: 'JUL' },
                { id: 8, itemName: 'AUG' },
                { id: 9, itemName: 'SEP' },
                { id: 10, itemName: 'OCT' },
                { id: 11, itemName: 'NOV' },
                { id: 12, itemName: 'DEC' },
                { id: 13, itemName: 'ALL' }
            ];

            this.selectedMonth = data.billingMonth;

            if (this.selectedMonth == null || this.selectedMonth.length === 0) {
                this.selectedItems = [{ id: 13, itemName: 'ALL' }];
            } else {
                this.selectedItems = [];
                const items = this.selectedMonth.split(',');
                for (let a = 0; a < items.length; a++) {
                    for (let b = 0; b < this.dropdown.length; b++) {
                        // search the selected month in the array of months
                        if (this.dropdown[b].itemName === items[a]) {
                            this.selectedItems.push(this.dropdown[b]);
                        }
                    }
                }
            }
        } else {
            this.dropdown = [];
            this.selectedItems = [];
            for (let i = 0; i < this.selectedAmerSet.amers.length; i++) {
                // avoid adding to the option the original amer
                if (
                    this.selectedAmerSet.amers[i].chargeId !== data.chargeId &&
                    this.selectedAmerSet.amers[i].chargeActualName !== data.chargeActualName
                ) {
                    // itemName is used by the comboSelector library
                    const item = {
                        id: this.selectedAmerSet.amers[i].id,
                        itemName: this.selectedAmerSet.amers[i].chargeId,
                        chargeActualName: this.selectedAmerSet.amers[i].chargeActualName
                    };

                    this.dropdown.push(item);

                    if (data.amerApplyPercentages != null) {
                        for (let e = 0; e < data.amerApplyPercentages.length; e++) {
                            if (
                                data.amerApplyPercentages[e].chargeId === this.selectedAmerSet.amers[i].chargeId &&
                                data.amerApplyPercentages[e].chargeActualName === this.selectedAmerSet.amers[i].chargeActualName
                            ) {
                                // found the rate in the rate set.
                                this.selectedItems.push(item);
                            }
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
            let months = '';
            const amerAP = [];

            for (let e = 0; e < selection.selectedItems.length; e++) {
                if (isMonthSelector) {
                    if (selection.selectedItems[e].itemName === 'ALL') {
                        months = selection.selectedItems[e].itemName;
                        break;
                    }
                    if (months === '') {
                        months = selection.selectedItems[e].itemName;
                    } else {
                        months = months + ',' + selection.selectedItems[e].itemName;
                    }
                } else {
                    const newAmerAP = new AmerApplyPercentages();
                    newAmerAP.chargeId = selection.selectedItems[e].itemName;
                    newAmerAP.chargeActualName = selection.selectedItems[e].chargeActualName;
                    amerAP.push(newAmerAP);
                }
            }

            if (isNewAmer) {
                for (let x = 0; x < this.newAmers.length; x++) {
                    if (this.newAmers[x].id === data.id) {
                        if (isMonthSelector) {
                            this.newAmers[x].billingMonth = months;
                        } else {
                            this.newAmers[x].amerApplyPercentages = amerAP;
                        }
                    }
                }
            } else {
                for (let i = 0; i < this.selectedAmerSet.amers.length; i++) {
                    if (this.selectedAmerSet.amers[i].id === data.id) {
                        if (isMonthSelector) {
                            this.selectedAmerSet.amers[i].billingMonth = months;
                        } else {
                            // update the amerID
                            for (let d = 0; d < amerAP.length; d++) {
                                if (
                                    amerAP[d].chargeId === this.selectedAmerSet.amers[i].chargeId &&
                                    amerAP[d].chargeActualName === this.selectedAmerSet.amers[i].chargeActualName
                                ) {
                                    amerAP[d].amerId = this.selectedAmerSet.amers[i].id;
                                }
                            }
                            this.selectedAmerSet.amers[i].amerApplyPercentages = amerAP;
                        }
                    }
                }
            }
        });
    }

    private enableApplyPercentageButton(rateType) {
        if (rateType === RATE_TYPE_PERCENTAGE) {
            return false;
        }
        return true;
    }

    private labelForAP(rate) {
        if (typeof rate.amerApplyPercentages !== 'undefined') {
            if (rate.amerApplyPercentages.length === 1) {
                return rate.amerApplyPercentages[0].chargeId;
            } else if (rate.amerApplyPercentages.length > 1) {
                return 'Multiple';
            }
        }
        return '';
    }

    private enableTierNumber(rateType) {
        return rateType !== RATE_TYPE_TIER;
    }
}
