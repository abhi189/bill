import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { EquipmentTypeLocation } from './equipment-type-location.model';
import { EquipmentTypeLocationService } from './equipment-type-location.service';
import { HttpResponse } from '@angular/common/http';
import { JhiEventManager } from 'ng-jhipster';
import { Subscription } from 'rxjs';

@Component({
    selector: 'jhi-equipment-type-location',
    templateUrl: './equipment-type-location.component.html',
    styles: []
})
export class EquipmentTypeLocationComponent implements OnInit, OnDestroy {
    @Input() equipmentTypeId;
    equipmentTypeLocations: EquipmentTypeLocation[];
    private eventSubscriber: Subscription;

    constructor(private equipmentTypeLocationService: EquipmentTypeLocationService, private eventManager: JhiEventManager) {}

    ngOnInit() {
        this.loadAll();
        this.registerChangeInEquipmentTypeLocations();
    }

    loadAll() {
        this.equipmentTypeLocationService
            .findByEquipmentTypeId(this.equipmentTypeId)
            .subscribe((res: HttpResponse<EquipmentTypeLocation[]>) => (this.equipmentTypeLocations = res.body));
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInEquipmentTypeLocations() {
        this.eventSubscriber = this.eventManager.subscribe('equipmentTypeLocationListModification', response => this.loadAll());
    }
}
