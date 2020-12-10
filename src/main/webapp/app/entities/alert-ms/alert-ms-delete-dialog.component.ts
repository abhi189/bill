import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { AlertMs } from './alert-ms.model';
import { AlertMsPopupService } from './alert-ms-popup.service';
import { AlertMsService } from './alert-ms.service';

@Component({
    selector: 'jhi-alert-ms-delete-dialog',
    templateUrl: './alert-ms-delete-dialog.component.html'
})
export class AlertMsDeleteDialogComponent {
    alertMs: AlertMs;

    constructor(private alertMsService: AlertMsService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.alertMsService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'alertMsListModification',
                content: 'Deleted an alertMs'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-alert-ms-delete-popup',
    template: ''
})
export class AlertMsDeletePopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private alertMsPopupService: AlertMsPopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.alertMsPopupService.open(AlertMsDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
