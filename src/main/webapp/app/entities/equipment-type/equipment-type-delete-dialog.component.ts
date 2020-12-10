import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbTypeahead, NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';
import { JhiAlertService, JhiEventManager } from 'ng-jhipster';

import { EquipmentType } from './equipment-type.model';
import { EquipmentTypePopupService } from './equipment-type-popup.service';
import { EquipmentTypeService } from './equipment-type.service';

import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { merge } from 'rxjs/observable/merge';
@Component({
    selector: 'jhi-equipment-type-delete-dialog',
    templateUrl: './equipment-type-delete-dialog.component.html'
})
export class EquipmentTypeDeleteDialogComponent implements OnInit {
    @ViewChild('ngbTypeAheadInstance') ngbTypeAheadInstance: NgbTypeahead;

    newEquipmentType;

    focus$ = new Subject<string>();
    click$ = new Subject<string>();
    equipmentTypes: Array<EquipmentType>;

    equipmentType: EquipmentType;
    hasAssociatedEquipments: boolean;

    constructor(
        private equipmentTypeService: EquipmentTypeService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager,
        private jhiAlertService: JhiAlertService
    ) {}

    ngOnInit() {
        if (this.equipmentType != null) {
            this.hasAssociatedEquipments = this.equipmentType.equipmentCount > 0;
            if (this.hasAssociatedEquipments) {
                this.equipmentTypeService.getAll().subscribe(res => {
                    this.equipmentTypes = res.body;
                    // All records must be assigned to a different EquipmentType. The one being deleted can not appear on the list.
                    this.equipmentTypes = this.equipmentTypes.filter(e => e.id !== this.equipmentType.id);
                });
            }
        }
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.jhiAlertService.addAlert(
            { id: 0, type: 'info', msg: 'billingWebApp.inventoryEquipmentType.delete.processing', params: { param: id } },
            []
        );
        if (this.hasAssociatedEquipments && this.newEquipmentType != null) {
            this.equipmentTypeService.deleteReassigningEquipments(id, this.newEquipmentType.id).subscribe(res => this.closeModal());
        } else {
            this.equipmentTypeService.delete(id).subscribe(response => this.closeModal());
        }
    }

    closeModal() {
        this.eventManager.broadcast({
            name: 'equipmentTypeListModification',
            content: 'Deleted an equipmentType'
        });
        this.jhiAlertService.closeAlert(0);
        this.activeModal.dismiss(true);
    }

    searchEquipmentType = (text$: Observable<string>) => {
        const debouncedText$ = text$.pipe(
            debounceTime(200),
            distinctUntilChanged()
        );
        const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.ngbTypeAheadInstance.isPopupOpen()));
        const inputFocus$ = this.focus$;

        return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
            map(term =>
                (term === '' ? this.equipmentTypes : this.equipmentTypes.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1))
                    .map(value => value)
                    .slice(0, 10)
            )
        );
    };

    selectedNewEquipmentType($event: NgbTypeaheadSelectItemEvent) {
        this.newEquipmentType = $event.item;
    }

    formatterNewEquipmentType(equipmentType) {
        return equipmentType.name;
    }
}

@Component({
    selector: 'jhi-equipment-type-delete-popup',
    template: ''
})
export class EquipmentTypeDeletePopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private equipmentTypePopupService: EquipmentTypePopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.equipmentTypePopupService.open(EquipmentTypeDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
