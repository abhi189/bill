import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { AmuService } from './amu.service';
import { Amu } from '../../../shared/model/ame.model';
import { Observable } from 'rxjs';

@Component({
    selector: 'jhi-site-account-ame-amu',
    templateUrl: './site-account-ame-amu.component.html',
    styles: []
})
export class SiteAccountAmeAmuComponent implements OnInit, OnDestroy {
    @Output() recalculateAmeMonthlyValues = new EventEmitter<any>();

    _ameId: number;
    get ameId(): number {
        return this._ameId;
    }

    @Input('ameId')
    set ameId(value: number) {
        this._ameId = value;
        this.getAmus();
    }

    amus: Amu[] = [];
    editingAmu = false;
    creatingAmu = false;
    originalAmus: Amu[] = [];
    newAmus: Amu[] = [];
    toBeDeletedAmus: Amu[];
    amuFilterOptions = [];
    amuSelectedFilters = [];
    amuFilterConf = {};
    filteredAmus = [];

    shortMonths = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    usageUnits = ['KW', 'KWH', 'USD', 'CAD', 'CCF', 'GAL', 'LBS'];

    constructor(private amuService: AmuService) {}

    ngOnInit() {}

    getAmus() {
        this.amuService.getAmus(this.ameId).subscribe(
            result => {
                this.amus = result.body;
                this.initFilterOptions();
            },
            error => console.log('Error while getting Amus', error)
        );
    }

    initFilterOptions() {
        const amuOptions = [];
        this.amuFilterOptions = [{ id: 1, itemName: 'Non Filter', filterOpt: 'all' }];
        this.amuSelectedFilters = [{ id: 1, itemName: 'Non Filter', filterOpt: 'all' }];
        this.amus.forEach(amu => {
            if (!amuOptions.includes(amu.rateComponent)) {
                amuOptions.push(amu.rateComponent);
            }
        });
        amuOptions.forEach(opt => {
            this.amuFilterOptions.push({
                id: this.amuFilterOptions.length + 1,
                itemName: opt,
                filterOpt: 'rateComponent'
            });
        });

        this.usageUnits.forEach(unit => {
            this.amuFilterOptions.push({
                id: this.amuFilterOptions.length + 1,
                itemName: unit,
                filterOpt: 'usageType'
            });
        });

        this.filteredAmus = this.amus;
        this.amuSelectedFilters = [];
        this.amuSelectedFilters.push({ id: 1, itemName: 'Non Filter', filterOpt: 'all' });
        this.amuFilterConf = {
            singleSelection: false,
            text: 'Select Filter',
            selectAllText: 'Select All',
            enableCheckAll: false,
            unSelectAllText: 'UnSelect All',
            enableSearchFilter: false,
            disabled: this.editingAmu
        };
    }

    editAmus() {
        this.originalAmus = JSON.parse(JSON.stringify(this.amus));
        this.editingAmu = true;
        this.toBeDeletedAmus = new Array<Amu>();
        this.amuFilterConf = {
            singleSelection: false,
            text: 'Select Filter',
            selectAllText: 'Select All',
            enableCheckAll: false,
            unSelectAllText: 'UnSelect All',
            enableSearchFilter: false,
            disabled: true
        };
    }

    cancelEditAmus() {
        this.newAmus = new Array<Amu>();
        const amusHaveBeenEdited = this.originalAmus.length > 0;
        if (amusHaveBeenEdited) {
            this.amus = this.originalAmus.slice();
        }
        this.creatingAmu = false;
        this.editingAmu = false;
        this.amuFilterConf = {
            singleSelection: false,
            text: 'Select Filter',
            selectAllText: 'Select All',
            enableCheckAll: false,
            unSelectAllText: 'UnSelect All',
            enableSearchFilter: false,
            disabled: false
        };
    }

    async confirmEditAmus() {
        this.editingAmu = false;
        this.creatingAmu = false;
        const createResult = await this.createAmus(this.newAmus);
        if (createResult && createResult.length > 0) {
            const createdAmus = createResult.map(({ body }) => body);
            this.amus.push(...createdAmus);
            this.applyAmuFilter();
        }
        await this.removeAmus(this.toBeDeletedAmus);
        await this.updateAmus(this.getEditedAmus());
        this.recalculateAmeMonthlyValues.emit(this.ameId);

        this.newAmus = new Array<Amu>();
        this.amuFilterConf = {
            singleSelection: false,
            text: 'Select Filter',
            selectAllText: 'Select All',
            enableCheckAll: false,
            unSelectAllText: 'UnSelect All',
            enableSearchFilter: false,
            disabled: false
        };
    }

    createAmus(amus: Amu[]) {
        const observablesCreateAmu = [];
        amus.forEach(amu => {
            if (this.isNewAmuFilled(amu)) {
                amu.id = null;
                amu.ameId = this.ameId;
                amu.usage = 0;
                observablesCreateAmu.push(this.amuService.createAmu(amu));
            }
        });
        return Observable.forkJoin(observablesCreateAmu).toPromise();
    }

    getEditedAmus() {
        const editedAmus = new Array<Amu>();
        this.filteredAmus.forEach(amu => {
            const originalAmu = this.originalAmus.find(oAmu => oAmu.id === amu.id);
            if (originalAmu && (originalAmu.approvedUsage !== amu.approvedUsage || originalAmu.rateComponent !== amu.rateComponent)) {
                amu.ameId = this.ameId;
                editedAmus.push(amu);
            }
        });
        return editedAmus;
    }

    updateAmus(amus: Amu[]) {
        const observablesUpdateAmu = [];
        amus.forEach(amu => {
            observablesUpdateAmu.push(this.amuService.updateAmu(amu));
        });
        return Observable.forkJoin(observablesUpdateAmu).toPromise();
    }

    removeAmus(amus: Amu[]) {
        const observablesDeleteAmu = [];
        amus.forEach(amu => {
            observablesDeleteAmu.push(this.amuService.deleteAmu(amu.id));
        });
        return Observable.forkJoin(observablesDeleteAmu).toPromise();
    }

    addNewAmu() {
        this.creatingAmu = true;
        const newAmu = new Amu();
        newAmu.id = Date.now();
        this.newAmus.push(newAmu);
    }

    removeAmu(amu: Amu, index) {
        this.filteredAmus.splice(index, 1);
        // we need to delete the amu from the original list.
        for (let i = 0; i < this.amus.length; i++) {
            if (this.amus[i].id === amu.id) {
                this.amus.splice(i, 1);
            }
        }

        this.toBeDeletedAmus.push(amu);
    }

    /**
     * Checks if values are filled.
     * Validation is done in the backend.
     */
    isNewAmuFilled(amu: Amu): boolean {
        return amu && amu.rateComponent && amu.usageType && amu.approvedUsage > 0;
    }

    amuFilterSelect(item: any) {
        // if the user select all, then clean all the selected options and leave all
        if (item.id === 1) {
            this.amuSelectedFilters = [];
            this.amuSelectedFilters.push({ id: 1, itemName: 'Non Filter', filterOpt: 'all' });
        } else {
            // remove main filter NON_FILTER
            const index = this.amuSelectedFilters
                .map(function(e) {
                    return e.id;
                })
                .indexOf(1);
            if (index !== -1) {
                this.amuSelectedFilters.splice(index, 1);
            }
            for (let i = 0; i < this.amuSelectedFilters.length; i++) {
                // we need to review that we have only one filter of each kind (filterOpt)
                if (this.amuSelectedFilters[i].filterOpt === item.filterOpt) {
                    if (this.amuSelectedFilters[i].id !== item.id) {
                        this.amuSelectedFilters.splice(i, 1);
                    }
                }
            }
        }
        this.applyAmuFilter();
    }

    amuFilterDeSelect(item: any) {
        // if we dont have filters then we automatically put all
        if (this.amuSelectedFilters.length === 0) {
            this.amuSelectedFilters.push({ id: 1, itemName: 'Non Filter', filterOpt: 'all' });
        }
        this.applyAmuFilter();
    }

    private applyAmuFilter() {
        this.filteredAmus = [];

        if (this.amuSelectedFilters.length === 1 && this.amuSelectedFilters[0].id === 1) {
            // non filter case
            this.filteredAmus = this.amus;
        } else {
            switch (this.amuSelectedFilters.length) {
                case 1:
                    this.amus.forEach(amu => {
                        if (amu[this.amuSelectedFilters[0].filterOpt] === this.amuSelectedFilters[0].itemName) {
                            this.filteredAmus.push(amu);
                        }
                    });
                    break;
                case 2:
                    this.amus.forEach(amu => {
                        if (
                            amu[this.amuSelectedFilters[0].filterOpt] === this.amuSelectedFilters[0].itemName &&
                            amu[this.amuSelectedFilters[1].filterOpt] === this.amuSelectedFilters[1].itemName
                        ) {
                            this.filteredAmus.push(amu);
                        }
                    });
                    break;
            }
        }
        this.filteredAmus = this.sortAmusByDate();
    }

    sortAmusByDate(): Amu[] {
        this.filteredAmus.forEach(amu => (amu.date = this.shortMonths.indexOf(amu.month.toString())));
        return this.filteredAmus.sort((a, b) => {
            if (a.date > b.date) {
                return 1;
            } else if (a.date < b.date) {
                return -1;
            }
            return 0;
        });
    }

    ngOnDestroy(): void {
        this.cancelEditAmus();
    }
}
