import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { EquipmentTypeLocation } from './equipment-type-location.model';
import { EquipmentTypeLocationPopupService } from './equipment-type-location-popup.service';
import { EquipmentTypeLocationService } from './equipment-type-location.service';

@Component({
    selector: 'jhi-equipment-type-location-dialog',
    templateUrl: './equipment-type-location-dialog.component.html'
})
export class EquipmentTypeLocationDialogComponent implements OnInit {
    equipmentTypeLocation: EquipmentTypeLocation;
    equipmentTypeId: number;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private equipmentTypeLocationService: EquipmentTypeLocationService,
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
        this.equipmentTypeLocation.equipmentTypeId = this.equipmentTypeLocation.equipmentTypeId || this.equipmentTypeId;
        if (this.equipmentTypeLocation.id !== undefined) {
            this.subscribeToSaveResponse(this.equipmentTypeLocationService.update(this.equipmentTypeLocation));
        } else {
            this.subscribeToSaveResponse(this.equipmentTypeLocationService.create(this.equipmentTypeLocation));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<EquipmentTypeLocation>>) {
        result.subscribe(
            (res: HttpResponse<EquipmentTypeLocation>) => this.onSaveSuccess(res.body),
            (res: HttpErrorResponse) => this.onSaveError()
        );
    }

    private onSaveSuccess(result: EquipmentTypeLocation) {
        this.eventManager.broadcast({ name: 'equipmentTypeLocationListModification', content: 'OK' });
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
export class EquipmentTypeLocationPopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private equipmentTypeLocationPopupService: EquipmentTypeLocationPopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if (params['id']) {
                this.equipmentTypeLocationPopupService.open(EquipmentTypeLocationDialogComponent as Component, params['id']);
            } else if (params['equipmentTypeId']) {
                this.equipmentTypeLocationPopupService.open(
                    EquipmentTypeLocationDialogComponent as Component,
                    null,
                    params['equipmentTypeId']
                );
            } else {
                this.equipmentTypeLocationPopupService.open(EquipmentTypeLocationDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
