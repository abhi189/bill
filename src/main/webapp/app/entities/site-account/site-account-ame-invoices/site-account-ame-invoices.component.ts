import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AmeInvoicesService } from './ame-invoices.service';
import { Invoice } from '../../invoice/invoice.model';

@Component({
    selector: 'jhi-site-account-ame-invoices',
    templateUrl: './site-account-ame-invoices.component.html',
    styles: []
})
export class SiteAccountAmeInvoicesComponent implements OnInit {
    _ameId: number;
    get ameId(): number {
        return this._ameId;
    }

    @Input('ameId')
    set ameId(value: number) {
        this._ameId = value;
        this.getInvoices();
    }

    filteredInvoices = [];
    invoicesPerMonth = [];
    itemsPerPage = 10;
    page: any;
    previousPage: any;
    totalItems;
    defaultSorting = ['intervalStart,desc'];

    filterOptions = [];
    selectedFilters = [];
    filterConf = {};

    constructor(private ameInvoicesService: AmeInvoicesService) {}

    ngOnInit() {
        this.page = 1;
        this.previousPage = 0;
    }

    getInvoices() {
        if (this.ameId == null) {
            return;
        }
        this.ameInvoicesService
            .findInvoices({ page: this.page - 1, size: this.itemsPerPage, sort: this.defaultSorting, 'ameId.equals': this.ameId })
            .subscribe(
                result => {
                    this.filteredInvoices = result.body;
                    this.totalItems = result.headers.get('X-Total-Count');
                    this.initFilterOptions();
                    this.setInvoicePerMonthValues();
                },
                error => console.log('Error while getting invoices', error)
            );
    }

    private setInvoicePerMonthValues() {
        this.invoicesPerMonth = [];
        this.filteredInvoices.forEach(invoice => {
            let daysIntervals = [];
            daysIntervals = this.calculateDaysIntervals(invoice.intervalEnd, invoice.intervalStart);

            const invoiceEnd = new Date(invoice.intervalEnd);
            const invoiceStart = new Date(invoice.intervalStart);

            daysIntervals.forEach(days => {
                this.invoicesPerMonth.push({
                    month: days.date,
                    year: days.date,
                    intervalStart: invoiceStart,
                    intervalEnd: invoiceEnd,
                    daysInMonth: days.days,
                    totalKWH: invoice.totalKWH,
                    peakKW: invoice.peakKW
                });
            });
        });
    }

    /**
     * Returns an array with the days for each month between the dates.
     *
     * If between the dates we have 2 months, the function will return an array size 2.
     * Each value of the array is the days that we have in those months.
     *
     */
    private calculateDaysIntervals(intervalEnd, intervalStart): Array<any> {
        const MS_PER_DAY = 1000 * 60 * 60 * 24;
        const invoiceEnd = new Date(Date.parse(intervalEnd));
        const invoiceStart = new Date(Date.parse(intervalStart));

        let monthsIntervals = 0;
        if (invoiceEnd.getFullYear() === invoiceStart.getFullYear()) {
            monthsIntervals = invoiceEnd.getMonth() - invoiceStart.getMonth() + 1;
        } else {
            // change of year
            monthsIntervals = invoiceEnd.getMonth() + 12 - invoiceStart.getMonth() + 1;
        }

        const daysIntervals = [];
        let startDate: Date;

        if (monthsIntervals === 1) {
            daysIntervals.push({
                date: invoiceStart,
                days: Math.round(Math.abs((invoiceStart.getTime() - invoiceEnd.getTime()) / MS_PER_DAY))
            });
        } else {
            for (let e = 0; e < monthsIntervals; e++) {
                if (e === 0) {
                    startDate = invoiceStart;
                }
                if (invoiceEnd.getMonth() === startDate.getMonth()) {
                    // we are in the last month
                    daysIntervals.push({
                        date: startDate,
                        days: Math.round(Math.abs((startDate.getTime() - invoiceEnd.getTime()) / MS_PER_DAY))
                    });
                } else {
                    // we need to calculate the last day of the month, since we are not in the last interval
                    const lastDayOfMonth = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);
                    lastDayOfMonth.setHours(23, 59, 59, 999);
                    daysIntervals.push({
                        date: startDate,
                        days: Math.round(Math.abs((startDate.getTime() - lastDayOfMonth.getTime()) / MS_PER_DAY))
                    });
                }
                // the start date now is the last day of the next month.
                startDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 1);
            }
        }
        return daysIntervals;
    }

    loadPage(page) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.page = page;
            this.applyFilter();
        }
    }

    initFilterOptions() {
        this.filterOptions = [{ id: 1, itemName: 'Non Filter', filterOpt: 'all' }];
        this.selectedFilters = [{ id: 1, itemName: 'Non Filter', filterOpt: 'all' }];
        this.ameInvoicesService.getFilterOptions(this.ameId).subscribe(
            filterOptions => {
                for (const filterOption of Object.keys(filterOptions)) {
                    filterOptions[filterOption].forEach(option => {
                        this.filterOptions.push({
                            id: this.filterOptions.length + 1,
                            itemName: option,
                            filterOpt: filterOption
                        });
                    });
                }
            },
            err => console.log('Error getting Invoice filterOptions.', err)
        );
        this.filterConf = {
            singleSelection: false,
            text: 'Select Filter',
            selectAllText: 'Select All',
            enableCheckAll: false,
            unSelectAllText: 'UnSelect All',
            enableSearchFilter: false
        };
    }

    filterSelect(item: any) {
        // if the user select all, then clean all the selected options and leave all
        if (item.id === 1) {
            this.selectedFilters = [];
            this.selectedFilters.push({ id: 1, itemName: 'Non Filter', filterOpt: 'all' });
        } else {
            // remove main filter NON_FILTER
            const index = this.selectedFilters
                .map(function(e) {
                    return e.id;
                })
                .indexOf(1);
            if (index !== -1) {
                this.selectedFilters.splice(index, 1);
            }
            for (let i = 0; i < this.selectedFilters.length; i++) {
                // we need to review that we have only one filter of each kind (filterOpt)
                if (this.selectedFilters[i].filterOpt === item.filterOpt && this.selectedFilters[i].id !== item.id) {
                    this.selectedFilters.splice(i, 1);
                }
            }
        }
        this.applyFilter();
    }

    filterDeSelect(item: any) {
        // if we dont have filters then we automatically put all
        if (this.selectedFilters.length === 0) {
            this.selectedFilters.push({ id: 1, itemName: 'Non Filter', filterOpt: 'all' });
        }
        this.applyFilter();
    }

    private applyFilter() {
        this.filteredInvoices = [];
        if (this.selectedFilters.length === 1 && this.selectedFilters[0].id === 1) {
            // non filter case
            this.getInvoices();
        } else {
            const filters = {};
            this.selectedFilters.forEach(filterObj => {
                filters[filterObj.filterOpt + '.equals'] = filterObj.itemName;
            });
            filters['ameId.equals'] = this.ameId;
            filters['page'] = this.page - 1;
            filters['size'] = this.itemsPerPage;
            filters['sort'] = this.defaultSorting;
            this.ameInvoicesService.findInvoices(filters).subscribe(
                result => {
                    this.filteredInvoices = result.body;
                    this.totalItems = result.headers.get('X-Total-Count');
                    this.setInvoicePerMonthValues();
                },
                error => console.log('Error while getting Invoices', error)
            );
        }
    }
}
