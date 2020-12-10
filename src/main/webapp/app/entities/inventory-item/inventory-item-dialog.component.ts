import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { InventoryItem } from './inventory-item.model';
import { InventoryItemPopupService } from './inventory-item-popup.service';
import { InventoryItemService } from './inventory-item.service';
import { InventoryItemTypeService } from '../inventory-item-type/inventory-item-type.service';
import { InventoryItemType } from '../inventory-item-type/inventory-item-type.model';
import { SiteService } from '../site/site.service';

@Component({
    selector: 'jhi-inventory-item-dialog',
    templateUrl: './inventory-item-dialog.component.html'
})
export class InventoryItemDialogComponent implements OnInit {
    inventoryItem: InventoryItem;
    isSaving: boolean;
    installDateDp: any;
    bfid: string;
    inventoryItemTypes: InventoryItemType[];

    constructor(
        public activeModal: NgbActiveModal,
        private inventoryItemService: InventoryItemService,
        private inventoryItemTypeService: InventoryItemTypeService,
        private siteService: SiteService,
        private eventManager: JhiEventManager
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.bfid = this.siteService.budderflyId;
        this.inventoryItemTypeService
            .getAllInventoryItemTypes()
            .subscribe((inventoryItemTypeResponse: HttpResponse<InventoryItemType[]>) => {
                this.inventoryItemTypes = inventoryItemTypeResponse.body;
            });
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        if (this.inventoryItem.budderflyId === undefined) {
            this.inventoryItem.budderflyId = this.bfid;
        }
        this.isSaving = true;
        if (this.inventoryItem.id !== undefined) {
            this.subscribeToSaveResponse(this.inventoryItemService.update(this.inventoryItem));
        } else {
            this.subscribeToSaveResponse(this.inventoryItemService.create(this.inventoryItem));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<InventoryItem>>) {
        result.subscribe(
            (res: HttpResponse<InventoryItem>) => this.onSaveSuccess(res.body),
            (res: HttpErrorResponse) => this.onSaveError()
        );
    }

    private onSaveSuccess(result: InventoryItem) {
        this.eventManager.broadcast({ name: 'inventoryItemListModification', content: 'OK' });
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-inventory-item-popup',
    template: ''
})
export class InventoryItemPopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private inventoryItemPopupService: InventoryItemPopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if (params['id']) {
                this.inventoryItemPopupService.open(InventoryItemDialogComponent as Component, params['id']);
            } else {
                this.inventoryItemPopupService.open(InventoryItemDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
