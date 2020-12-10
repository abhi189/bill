import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Equipment } from './equipment.model';
import { EquipmentService } from './equipment.service';

@Component({
    selector: 'jhi-equipment-detail',
    templateUrl: './equipment-detail.component.html'
})
export class EquipmentDetailComponent implements OnInit, OnDestroy {
    equipment: Equipment;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(private eventManager: JhiEventManager, private equipmentService: EquipmentService, private route: ActivatedRoute) {}

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
        this.registerChangeInEquipment();
    }

    load(id) {
        this.equipmentService.find(id).subscribe((equipmentResponse: HttpResponse<Equipment>) => {
            this.equipment = equipmentResponse.body;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInEquipment() {
        this.eventSubscriber = this.eventManager.subscribe('equipmentListModification', response => this.load(this.equipment.id));
    }
}
