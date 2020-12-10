import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Equipment } from './equipment.model';
import { EquipmentPopupService } from './equipment-popup.service';
import { EquipmentService } from './equipment.service';

@Component({
    selector: 'jhi-equipment-dialog',
    templateUrl: './equipment-dialog.component.html'
})
export class EquipmentDialogComponent implements OnInit {
    equipment: Equipment;
    isSaving: boolean;

    constructor(public activeModal: NgbActiveModal, private equipmentService: EquipmentService, private eventManager: JhiEventManager) {}

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.equipment.id !== undefined) {
            this.subscribeToSaveResponse(this.equipmentService.update(this.equipment));
        } else {
            this.subscribeToSaveResponse(this.equipmentService.create(this.equipment));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Equipment>>) {
        result.subscribe((res: HttpResponse<Equipment>) => this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Equipment) {
        this.eventManager.broadcast({ name: 'equipmentListModification', content: 'OK' });
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-equipment-popup',
    template: ''
})
export class EquipmentPopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private equipmentPopupService: EquipmentPopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if (params['id']) {
                this.equipmentPopupService.open(EquipmentDialogComponent as Component, params['id']);
            } else {
                this.equipmentPopupService.open(EquipmentDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
