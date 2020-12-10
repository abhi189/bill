import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IotPopupService } from './iot-popup.service';
import { ActivatedRoute } from '@angular/router';
import { KittedItem } from './kitted-item.model';
import { IotService } from './iot.service';
import { JhiEventManager } from 'ng-jhipster';

@Component({
    selector: 'jhi-iot-delete-dialog',
    templateUrl: './iot-delete-dialog.component.html'
})
export class IotDeleteDialogComponent {
    kittedItem: KittedItem;

    constructor(private eventManager: JhiEventManager, private iotService: IotService, public activeModal: NgbActiveModal) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.iotService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'iotItemModification',
                content: 'Deleted an IoT Item'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-iot-delete-popup',
    template: ''
})
export class IotDeletePopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private iotPopupService: IotPopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.iotPopupService.open(IotDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
