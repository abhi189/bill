import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { SiteAccount, SiteAccountComboSelectorPopupComponent } from '../../site-account';
import { NgbModal, NgbTypeahead, NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';
import { InvoiceSectionEnum, Rate, Tariff, TariffService, TariffYear, UtilityTariff } from '../../tariff';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';
import { Utility } from '../../utility';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { merge } from 'rxjs/observable/merge';
import { SiteAccountTariff } from './site-account-tariff.model';
import { SiteAccountTariffService } from './site-account-tariff.service';
import { RateService } from '../../tariff/rates.service';
import { Ame } from '../../../shared/model/ame.model';
import { AmeService } from '../../ame/ame.service';

const ACTIVE = 'ACTIVE';

@Component({
    selector: 'jhi-site-account-tariff-rates',
    templateUrl: './site-account-tariff-rates.component.html',
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

            .header-content {
                padding: 0.5rem 1rem;
            }

            .header-link {
                color: #3e8acc;
                text-decoration: underline;
            }

            ::ng-deep [id^='ngb-typeahead-'] {
                max-height: 300px !important;
                overflow: scroll;
            }
        `
    ]
})
export class SiteAccountTariffRatesComponent implements OnInit {
    @ViewChild('instance') instance: NgbTypeahead;
    @ViewChild('instanceTariff') instanceTariff: NgbTypeahead;
    focus$ = new Subject<string>();
    click$ = new Subject<string>();
    @Output() valueToAllMonth = new EventEmitter<Object>();
    @Output() toParent = new EventEmitter<number>();
    @Output() siteAccountTariffChanged = new EventEmitter<Object>();
    @Input() tariffYears: Array<TariffYear> = [];
    @Input() siteAccount: SiteAccount;
    @Input() selectedAme: Ame;
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
    tariff: Tariff;
    tariffs: Tariff[];
    currentTariff: any;
    currentUtilityProvider: any;
    siteAccountTariff: SiteAccountTariff = {};
    utilityTariffs: Array<UtilityTariff> = [];
    disableControls = false;
    invoiceSectionsMap = InvoiceSectionEnum;

    constructor(
        private modalService: NgbModal,
        private tariffService: TariffService,
        private rateService: RateService,
        private jhiAlertService: JhiAlertService,
        private siteAccountTariffService: SiteAccountTariffService,
        private ameService: AmeService
    ) {}

    ngOnInit() {
        this.siteAccountTariff.budderflyId = this.siteAccount.budderflyId;
        this.siteAccountTariff.accountNumber = this.siteAccount.accountNumber;
        this.tariffService
            .all({
                'status.equals': ACTIVE
            })
            .subscribe(
                (res: HttpResponse<[Utility]>) => {
                    this.tariffs = res.body;
                    this.orderingTariffsByUtility(this.tariffs);
                    this.loadData();
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    loadData() {
        this.siteAccountTariffService
            .query({
                'budderflyId.equals': this.siteAccount.budderflyId,
                'accountNumber.equals': this.siteAccount.accountNumber
            })
            .subscribe(
                (res: HttpResponse<SiteAccountTariff[]>) => {
                    console.log(res.body);
                    if (res.body.length > 0) {
                        const siteAccountTariffArray = res.body as SiteAccountTariff[];
                        const siteAccountTariff = siteAccountTariffArray.length > 0 ? siteAccountTariffArray[0] : null;
                        if (siteAccountTariff !== null) {
                            this.siteAccountTariff.id = siteAccountTariff.id;
                            this.getRatesByTariffId(siteAccountTariff.tariffId, siteAccountTariff);
                        }
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    orderingTariffsByUtility(tariffsList: Array<Tariff>) {
        const utilities = tariffsList.reduce(function(obj, item) {
            obj[item.utilityProviderKey] = obj[item.utilityProviderKey] || [];
            obj[item.utilityProviderKey].push(item);
            return obj;
        }, {});
        this.utilityTariffs = Object.keys(utilities).map(function(key) {
            return { utilityProviderKey: key, tariffs: utilities[key] };
        });
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

    onSelectedTariffYear(tariffYear) {
        if (tariffYear) {
            this.selectedTariffYear = tariffYear;
        }
    }

    search = (text$: Observable<string>) => {
        const debouncedText$ = text$.pipe(
            debounceTime(200),
            distinctUntilChanged()
        );
        const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
        const inputFocus$ = this.focus$;

        return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
            map(term =>
                (term === ''
                    ? this.utilityTariffs
                    : this.utilityTariffs.filter(v => v.utilityProviderKey.toLowerCase().indexOf(term.toLowerCase()) > -1)
                ).map(value => value.utilityProviderKey)
            )
        );
    };

    searchTariff = (text$: Observable<string>) => {
        const debouncedText$ = text$.pipe(
            debounceTime(200),
            distinctUntilChanged()
        );
        const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instanceTariff.isPopupOpen()));
        const inputFocus$ = this.focus$;

        return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
            map(term => {
                const tar = this.utilityTariffs.find(tariff => tariff.utilityProviderKey === this.currentUtilityProvider);
                if (tar) {
                    if (term === '') {
                        return tar.tariffs;
                    } else {
                        return tar.tariffs.filter(v => v.tariffName.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 30);
                    }
                } else {
                    return [];
                }
            })
        );
    };

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

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    selectedUtilityProviderItem($event: NgbTypeaheadSelectItemEvent) {
        this.resetToDefault($event);
        this.currentUtilityProvider = $event.item;
        this.tariff = this.tariffs.find(tariff => tariff.utilityProviderKey === this.currentUtilityProvider);
    }

    selectedTariffItem($event: NgbTypeaheadSelectItemEvent) {
        this.resetToDefault($event);
        this.currentTariff = $event.item;
        this.getRatesByTariffId($event.item.id, null);
    }

    private getRatesByTariffId(tariffId: number, siteAccountTariff: SiteAccountTariff) {
        this.tariff = this.tariffs.find(tariff => tariff.id === tariffId);
        this.rateService.findByTariffId(tariffId).subscribe((ratesResponse: HttpResponse<Rate[]>) => {
            this.tariff.rates = ratesResponse.body;
            if (siteAccountTariff) {
                this.tariff.rates.map(rate => {
                    const result = siteAccountTariff.rates.find(rateSiteAccount => rate.id === rateSiteAccount.id);
                    rate.confirmed = !!result;
                });
                this.currentUtilityProvider = this.tariff.utilityProviderKey;
                this.currentTariff = this.tariff;
            }
            this.orderingRatesByYears(this.tariff.rates);
            if (siteAccountTariff && siteAccountTariff.currentYear && siteAccountTariff.currentYear !== 0) {
                this.selectedTariffYear = this.tariffYears.find(value => value.year === siteAccountTariff.currentYear);
            } else {
                this.selectedTariffYear = this.tariffYears[0];
            }
        });
    }

    resetToDefault($event: NgbTypeaheadSelectItemEvent) {
        this.currentTariff = '';
        this.tariff = new Tariff();
        this.selectedTariffYear = new TariffYear();
        this.tariffYears = [];
    }

    orderingRatesByYears(rates: Array<Rate>) {
        const groups = rates.reduce(function(obj, item) {
            obj[item.year] = obj[item.year] || [];
            obj[item.year].push(item);
            return obj;
        }, {});
        this.tariffYears = Object.keys(groups)
            .map(function(key) {
                return { year: parseInt(key, 10), rates: groups[key] };
            })
            .sort(function(a, b) {
                if (a.year < b.year) {
                    return 1;
                }
                if (a.year > b.year) {
                    return -1;
                }
                // a must be equal to b
                return 0;
            });
    }

    formatter = (x: { tariffName: string }) => x.tariffName;

    saveApproveRates() {
        this.siteAccountTariff.tariffId = this.tariff.id;
        const rates = [];
        this.tariffYears.forEach(tariffYear => {
            tariffYear.rates.filter(rate => {
                if (rate.confirmed === true) {
                    rates.push(rate);
                }
            });
        });
        this.siteAccountTariff.rates = rates;
        this.siteAccountTariff.currentYear = this.selectedTariffYear.year;
        if (this.siteAccountTariff.id == null) {
            this.createSiteAccountTariff();
        } else {
            this.updateSiteAccountTariff();
        }
    }

    cancelEditRates() {
        this.editingRate = false;
    }

    editRates() {
        this.editingRate = true;
    }

    private createSiteAccountTariff() {
        this.siteAccountTariffService
            .create(this.siteAccountTariff)
            .finally(() => {
                this.editingRate = false;
            })
            .subscribe(
                result => {
                    this.siteAccountTariffChanged.emit();
                    console.log('SiteAccountTariff successfully created.', result);
                },
                error => console.log('Error while creating SiteAccountTariff', error)
            );
    }

    private updateSiteAccountTariff() {
        this.siteAccountTariffService
            .update(this.siteAccountTariff)
            .finally(() => {
                this.editingRate = false;
            })
            .subscribe(
                result => {
                    this.siteAccountTariffChanged.emit();
                    console.log('SiteAccountTariff successfully created.', result);
                },
                error => console.log('Error while creating SiteAccountTariff', error)
            );
    }

    onUseRepositoryChange() {
        if (!this.selectedAme.useRateRepository) {
            this.selectedAme.addChargesToTariffRates = false;
        }
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
                rateAP.push(selection.selectedItems[e]);
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
}
