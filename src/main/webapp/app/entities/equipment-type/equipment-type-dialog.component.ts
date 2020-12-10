import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { EquipmentType } from './equipment-type.model';
import { EquipmentTypePopupService } from './equipment-type-popup.service';
import { EquipmentTypeService } from './equipment-type.service';

@Component({
    selector: 'jhi-equipment-type-dialog',
    templateUrl: './equipment-type-dialog.component.html'
})
export class EquipmentTypeDialogComponent implements OnInit {
    equipmentType: EquipmentType;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private equipmentTypeService: EquipmentTypeService,
        private eventManager: JhiEventManager
    ) {}

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.equipmentType.id !== undefined) {
            this.subscribeToSaveResponse(this.equipmentTypeService.update(this.equipmentType));
        } else {
            this.subscribeToSaveResponse(this.equipmentTypeService.create(this.equipmentType));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<EquipmentType>>) {
        result.subscribe(
            (res: HttpResponse<EquipmentType>) => this.onSaveSuccess(res.body),
            (res: HttpErrorResponse) => this.onSaveError()
        );
    }

    private onSaveSuccess(result: EquipmentType) {
        this.eventManager.broadcast({ name: 'equipmentTypeListModification', content: 'OK' });
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-equipment-type-popup',
    template: ''
})
export class EquipmentTypePopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private equipmentTypePopupService: EquipmentTypePopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if (params['id']) {
                this.equipmentTypePopupService.open(EquipmentTypeDialogComponent as Component, params['id']);
            } else {
                this.equipmentTypePopupService.open(EquipmentTypeDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
