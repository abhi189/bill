import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Equipment } from './equipment.model';
import { EquipmentPopupService } from './equipment-popup.service';
import { EquipmentService } from './equipment.service';

@Component({
    selector: 'jhi-equipment-delete-dialog',
    templateUrl: './equipment-delete-dialog.component.html'
})
export class EquipmentDeleteDialogComponent {
    equipment: Equipment;

    constructor(private equipmentService: EquipmentService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.equipmentService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'equipmentListModification',
                content: 'Deleted an equipment'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-equipment-delete-popup',
    template: ''
})
export class EquipmentDeletePopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private equipmentPopupService: EquipmentPopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.equipmentPopupService.open(EquipmentDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
