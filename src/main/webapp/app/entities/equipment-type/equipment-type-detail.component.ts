import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { EquipmentType } from './equipment-type.model';
import { EquipmentTypeService } from './equipment-type.service';

@Component({
    selector: 'jhi-equipment-type-detail',
    templateUrl: './equipment-type-detail.component.html'
})
export class EquipmentTypeDetailComponent implements OnInit, OnDestroy {
    equipmentType: EquipmentType;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(private eventManager: JhiEventManager, private equipmentTypeService: EquipmentTypeService, private route: ActivatedRoute) {}

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
        this.registerChangeInEquipmentTypes();
    }

    load(id) {
        this.equipmentTypeService.find(id).subscribe((equipmentTypeResponse: HttpResponse<EquipmentType>) => {
            this.equipmentType = equipmentTypeResponse.body;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInEquipmentTypes() {
        this.eventSubscriber = this.eventManager.subscribe('equipmentTypeListModification', response => this.load(this.equipmentType.id));
    }
}
