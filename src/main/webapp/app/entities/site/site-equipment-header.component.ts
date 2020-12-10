import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Equipment, EquipmentService, EquipmentTypeCode, EquipmentTypeLocation } from '../equipment';
import { NgbTypeahead, NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { merge } from 'rxjs/observable/merge';
import { EquipmentType, EquipmentTypeService } from '../equipment-type';
import { EquipmentTypeLocationService } from '../equipment-type/equipment-type-location';
import { JhiEventManager } from 'ng-jhipster';

@Component({
    selector: 'jhi-site-equipment-header',
    templateUrl: './site-equipment-header.component.html',
    styles: [
        `
            .ng-select-disabled ::ng-deep .ng-select-container {
                background-color: #e9ecef;
                opacity: 1;
            }
        `
    ]
})
export class SiteEquipmentHeaderComponent implements OnInit {
    private _equipment: Equipment;
    @Input()
    set equipment(equipment: Equipment) {
        this._equipment = equipment;
        this.editedEquipment = JSON.parse(JSON.stringify(this.equipment));
        this.finishedLoading = false;
        this.loadEquipmentTypes();
    }
    get equipment(): Equipment {
        return this._equipment;
    }

    editedEquipment: Equipment;
    inputsDisabled = true;

    equipmentTypes: Array<EquipmentType>;
    equipmentTypeLocations: Array<EquipmentTypeLocation>;

    @ViewChild('ngbTypeAheadInstanceMeterNumber') ngbTypeAheadInstanceMeterNumber: NgbTypeahead;
    focusMeterNumber$ = new Subject<string>();
    clickMeterNumber$ = new Subject<string>();

    isEquipmentMain = false;
    isCollapsed = true;
    finishedLoading = false;
    meterNumbers: Array<string>;
    invoiceMeter;

    constructor(
        private equipmentTypeService: EquipmentTypeService,
        private equipmentService: EquipmentService,
        private equipmentTypeLocationService: EquipmentTypeLocationService,
        private eventManager: JhiEventManager
    ) {}

    ngOnInit() {}

    loadEquipmentTypes() {
        this.equipmentTypeService.getAll().subscribe(res => {
            this.equipmentTypes = res.body;
            this.editedEquipment.equipmentType = this.equipmentTypes.find(e => e.id === this.equipment.equipmentTypeId);
            if (this.editedEquipment.equipmentType) {
                this.loadAdditionalInfo();
            }
        });
    }

    // Loads Meter Numbers for Main or Locations for anything else
    loadAdditionalInfo() {
        this.isEquipmentMain = this.editedEquipment.equipmentType.code === EquipmentTypeCode.MAIN;
        if (this.isEquipmentMain) {
            this.editedEquipment.equipmentTypeLocation = null;
            this.meterNumbers = [];
            if (this.editedEquipment.utilityMeterNumber != null) {
                this.meterNumbers.push(this.editedEquipment.utilityMeterNumber);
            }
            this.loadMeterNumbers(this.editedEquipment.budderflyId);
        } else {
            this.editedEquipment.utilityMeterNumber = null;
            this.loadEquipmentLocations(this.editedEquipment.equipmentType.id);
        }
    }

    loadMeterNumbers(budderflyId: string) {
        this.equipmentTypeService.getUtilityMeterNumberByBudderflyId(budderflyId).subscribe(res => {
            this.invoiceMeter = res.body;
            if (this.invoiceMeter != null) {
                this.meterNumbers.push(this.invoiceMeter.meterNumber);
            }
            this.finishedLoading = true;
        });
    }

    loadEquipmentLocations(equipmentTypeId: number) {
        this.equipmentTypeLocationService.findByEquipmentTypeId(equipmentTypeId).subscribe(res => {
            this.equipmentTypeLocations = res.body;
            this.editedEquipment.equipmentTypeLocation = this.equipmentTypeLocations.find(
                e => e.id === this.equipment.equipmentTypeLocationId
            );
            this.finishedLoading = true;
        });
    }

    editEquipment() {
        this.inputsDisabled = false;
    }

    cancelEditEquipment() {
        this.inputsDisabled = true;
        this.editedEquipment = JSON.parse(JSON.stringify(this.equipment));
        this.editedEquipment.equipmentType = this.equipmentTypes.find(e => e.id === this.equipment.equipmentTypeId);
        this.loadAdditionalInfo();
    }

    confirmEditEquipment() {
        this.inputsDisabled = true;
        this.editedEquipment.equipmentTypeId = this.editedEquipment.equipmentType.id;
        this.editedEquipment.equipmentTypeLocationId = this.editedEquipment.equipmentTypeLocation
            ? this.editedEquipment.equipmentTypeLocation.id
            : null;
        this.equipmentService.update(this.editedEquipment).subscribe(res => {
            this.equipment = res.body;
            this.eventManager.broadcast({
                name: 'equipmentListModification',
                content: 'Updated an Equipment'
            });
        });
    }

    onEquipmentTypeChange() {
        this.loadAdditionalInfo();
    }

    searchMeterNumber = (text$: Observable<string>) => {
        const debouncedText$ = text$.pipe(
            debounceTime(200),
            distinctUntilChanged()
        );
        const clicksWithClosedPopup$ = this.clickMeterNumber$.pipe(filter(() => !this.ngbTypeAheadInstanceMeterNumber.isPopupOpen()));
        const inputfocusMeterNumber$ = this.focusMeterNumber$;

        return merge(debouncedText$, inputfocusMeterNumber$, clicksWithClosedPopup$).pipe(
            map(term =>
                (term === '' ? this.meterNumbers : this.meterNumbers.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1))
                    .map(value => value)
                    .slice(0, 10)
            )
        );
    };

    selectedMeterNumber($event: NgbTypeaheadSelectItemEvent) {
        this.editedEquipment.utilityMeterNumber = $event.item;
    }

    toggleCollapseCard() {
        this.isCollapsed = !this.isCollapsed;
        if (this.isCollapsed) {
            this.cancelEditEquipment();
        }
    }

    getCollapseClass() {
        return this.isCollapsed ? 'fa-sort-desc' : 'fa-sort-asc';
    }
}
