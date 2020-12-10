import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { EquipmentTypeLocation } from './equipment-type-location.model';
import { EquipmentTypeLocationPopupService } from './equipment-type-location-popup.service';
import { EquipmentTypeLocationService } from './equipment-type-location.service';

@Component({
    selector: 'jhi-equipment-type-location-delete-dialog',
    templateUrl: './equipment-type-location-delete-dialog.component.html'
})
export class EquipmentTypeLocationDeleteDialogComponent {
    equipmentTypeLocation: EquipmentTypeLocation;

    constructor(
        private equipmentTypeLocationService: EquipmentTypeLocationService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.equipmentTypeLocationService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'equipmentTypeLocationListModification',
                content: 'Deleted an equipmentTypeLocation'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-equipment-type-location-delete-popup',
    template: ''
})
export class EquipmentTypeLocationDeletePopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private equipmentTypeLocationPopupService: EquipmentTypeLocationPopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.equipmentTypeLocationPopupService.open(EquipmentTypeLocationDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
