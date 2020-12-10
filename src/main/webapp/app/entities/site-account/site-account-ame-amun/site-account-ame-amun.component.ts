import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Amun } from '../../../shared/model/ame.model';
import { AmunService } from './amun.service';
import { ITEMS_PER_PAGE } from '../../../shared';
import { Observable } from 'rxjs';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'jhi-site-account-ame-amun',
    templateUrl: './site-account-ame-amun.component.html',
    styles: []
})
export class SiteAccountAmeAmunComponent implements OnInit {
    @Output() recalculateAmunEvent = new EventEmitter<any>();
    @Output() recalculateDollarsEvent = new EventEmitter<any>();

    itemsPerPage = ITEMS_PER_PAGE;
    page: any;
    previousPage: any;
    totalItems;
    editingAmun = false;
    creatingAmun = false;
    originalAmuns: Amun[] = [];
    newAmun = new Amun();
    toBeDeletedAmuns: Amun[];

    _ameId: number;
    get ameId(): number {
        return this._ameId;
    }

    @Input('ameId')
    set ameId(value: number) {
        this._ameId = value;
        this.getAmuns();
    }

    amuns: Amun[];
    filteredAmuns: Amun[];
    amunFilterOptions = [];
    amunSelectedFilters = [];
    amunFilterConf = {};

    months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    shortMonths = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    usageUnits = ['KW', 'KWH', 'USD', 'CAD', 'CCF', 'GAL', 'LBS'];
    amunUsageUnits = ['KW', 'KWH', 'USD', 'CAD', 'CCF'];
    ratesUsageUnits = ['KW', 'KWH', 'CCF', 'FLAT', 'DAY', 'CHARGE', 'GAL', 'LBS'];
    defaultSorting = ['date,desc'];

    constructor(private amunService: AmunService, private datePipe: DatePipe) {}

    ngOnInit() {
        this.page = 1;
        this.previousPage = 0;
    }

    getAmuns() {
        this.amunService
            .findAmuns({ page: this.page - 1, size: this.itemsPerPage, sort: this.defaultSorting, 'ameId.equals': this.ameId })
            .subscribe(
                result => {
                    this.filteredAmuns = result.body;
                    this.totalItems = result.headers.get('X-Total-Count');
                    this.initFilterOptions();
                },
                error => console.log('Error while getting Amuns', error)
            );
    }

    loadPage(page) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.page = page;
            this.applyAmunFilter();
        }
    }

    addNewAmun() {
        if (!this.creatingAmun) {
            this.creatingAmun = true;
            this.newAmun = new Amun();
            this.newAmun.usage = 0;
            this.newAmun.usedForAmu = false;
            this.newAmun.verified = false;
            this.newAmun.invalid = false;
            this.newAmun.createdDate = new Date();
            this.newAmun.dateNormalizationRule = '--';
            this.newAmun.version = 'manual';
        }
    }

    removeAmun(amun: Amun, index) {
        this.filteredAmuns.splice(index, 1);
        this.toBeDeletedAmuns.push(amun);
    }

    isNewAmunFilled() {
        return this.newAmun && this.newAmun.rateComponent && this.newAmun.usageType && this.newAmun.approvedUsage > 0;
    }

    editAmuns() {
        this.originalAmuns = JSON.parse(JSON.stringify(this.filteredAmuns));
        this.editingAmun = true;
        this.amunFilterConf = {
            singleSelection: false,
            text: 'Select Filter',
            selectAllText: 'Select All',
            enableCheckAll: false,
            unSelectAllText: 'UnSelect All',
            enableSearchFilter: false,
            disabled: true
        };
        this.toBeDeletedAmuns = new Array<Amun>();
    }

    cancelEditAmuns() {
        this.filteredAmuns = this.originalAmuns.slice();
        this.editingAmun = false;
        this.amunFilterConf = {
            singleSelection: false,
            text: 'Select Filter',
            selectAllText: 'Select All',
            enableCheckAll: false,
            unSelectAllText: 'UnSelect All',
            enableSearchFilter: false,
            disabled: false
        };
        this.creatingAmun = false;
    }

    confirmEditAmuns() {
        this.editingAmun = false;
        this.creatingAmun = false;
        if (this.isNewAmunFilled()) {
            this.saveNewAmun(this.newAmun);
        }
        if (this.getEditedAmuns().length > 0) {
            this.updateAmuns(this.getEditedAmuns());
        }
        if (this.toBeDeletedAmuns.length > 0) {
            this.removeAmuns(this.toBeDeletedAmuns);
        }
        this.amunFilterConf = {
            singleSelection: false,
            text: 'Select Filter',
            selectAllText: 'Select All',
            enableCheckAll: false,
            unSelectAllText: 'UnSelect All',
            enableSearchFilter: false,
            disabled: false
        };
    }

    getEditedAmuns() {
        const editedAmuns = new Array<Amun>();
        this.filteredAmuns.forEach(amun => {
            const originalAmun = this.originalAmuns.find(oAmun => oAmun.id === amun.id);
            if (
                originalAmun.verified !== amun.verified ||
                originalAmun.invalid !== amun.invalid ||
                originalAmun.approvedUsage !== amun.approvedUsage
            ) {
                amun.ameId = this.ameId;
                editedAmuns.push(amun);
            }
        });
        return editedAmuns;
    }

    recalculateAmuns() {
        this.editingAmun = false;
        this.recalculateAmunEvent.emit(this.ameId);
    }

    recalculateDollars() {
        this.editingAmun = false;
        this.recalculateDollarsEvent.emit(this.ameId);
    }

    /**
     * Wait for Observables to complete and then combine last values they emitted
     */
    updateAmuns(amuns: Amun[]) {
        const observablesUpdateAmun = [];
        amuns.forEach(amun => {
            observablesUpdateAmun.push(this.amunService.updateAmun(amun));
        });
        Observable.forkJoin(observablesUpdateAmun).subscribe(
            result => console.log('AMUNs successfully updated.', result),
            error => console.log('Error while updating AMUNs.', error)
        );
    }

    saveNewAmun(amun: Amun) {
        amun.ameId = this.ameId;
        amun.percentageOfTotal = amun.percentageOfTotal / 100;
        this.amunService.createAmun(amun).subscribe(
            (res: HttpResponse<Amun>) => {
                this.newAmun = new Amun();
                this.loadPage(this.page);
            },
            (res: HttpErrorResponse) => console.log('Error while saving Amun.', res)
        );
    }

    removeAmuns(amuns: Amun[]) {
        const ids = [];
        for (let i = 0; i < amuns.length; i++) {
            ids.push(amuns[i].id);
        }
        this.amunService.deleteAmuns(ids).subscribe(
            result => {
                this.loadPage(this.page);
                console.log('AMUNs deleted', result);
            },
            error => console.log('Error while deleting AMUNs', error)
        );
    }

    initFilterOptions() {
        this.amunFilterOptions = [{ id: 1, itemName: 'Non Filter', filterOpt: 'all' }];
        this.amunSelectedFilters = [{ id: 1, itemName: 'Non Filter', filterOpt: 'all' }];
        this.amunService.getAmunFilterOptions(this.ameId).subscribe(
            filterOptions => {
                for (const filterOption of Object.keys(filterOptions)) {
                    filterOptions[filterOption].forEach(option => {
                        this.amunFilterOptions.push({
                            id: this.amunFilterOptions.length + 1,
                            itemName: option,
                            filterOpt: filterOption
                        });
                    });
                }
            },
            err => console.log('Error getting AMUN filterOptions.', err)
        );
        this.amunFilterConf = {
            singleSelection: false,
            text: 'Select Filter',
            selectAllText: 'Select All',
            enableCheckAll: false,
            unSelectAllText: 'UnSelect All',
            enableSearchFilter: false,
            disabled: this.editingAmun
        };
    }

    amunFilterSelect(item: any) {
        // if the user select all, then clean all the selected options and leave all
        if (item.id === 1) {
            this.amunSelectedFilters = [];
            this.amunSelectedFilters.push({ id: 1, itemName: 'Non Filter', filterOpt: 'all' });
        } else {
            // remove main filter NON_FILTER
            const index = this.amunSelectedFilters
                .map(function(e) {
                    return e.id;
                })
                .indexOf(1);
            if (index !== -1) {
                this.amunSelectedFilters.splice(index, 1);
            }
            for (let i = 0; i < this.amunSelectedFilters.length; i++) {
                // we need to review that we have only one filter of each kind (filterOpt)
                if (this.amunSelectedFilters[i].filterOpt === item.filterOpt) {
                    if (this.amunSelectedFilters[i].id !== item.id) {
                        this.amunSelectedFilters.splice(i, 1);
                    }
                }
            }
        }
        this.applyAmunFilter();
    }

    amunFilterDeSelect(item: any) {
        // if we dont have filters then we automatically put all
        if (this.amunSelectedFilters.length === 0) {
            this.amunSelectedFilters.push({ id: 1, itemName: 'Non Filter', filterOpt: 'all' });
        }
        this.applyAmunFilter();
    }

    private applyAmunFilter() {
        this.filteredAmuns = [];
        if (this.amunSelectedFilters.length === 1 && this.amunSelectedFilters[0].id === 1) {
            // non filter case
            this.getAmuns();
        } else {
            const filters = {};
            this.amunSelectedFilters.forEach(filterObj => {
                filters[filterObj.filterOpt + '.equals'] = filterObj.itemName;
            });
            filters['ameId.equals'] = this.ameId;
            filters['page'] = this.page - 1;
            filters['size'] = this.itemsPerPage;
            filters['sort'] = this.defaultSorting;
            this.amunService.findAmuns(filters).subscribe(
                result => {
                    this.filteredAmuns = result.body;
                    this.totalItems = result.headers.get('X-Total-Count');
                },
                error => console.log('Error while getting Amuns', error)
            );
        }
    }
}
