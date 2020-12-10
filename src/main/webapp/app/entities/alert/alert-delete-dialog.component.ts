import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Alert } from './alert.model';
import { AlertPopupService } from './alert-popup.service';
import { AlertService } from './alert.service';

@Component({
    selector: 'jhi-alert-delete-dialog',
    templateUrl: './alert-delete-dialog.component.html'
})
export class AlertDeleteDialogComponent {
    alert: Alert;

    constructor(private alertService: AlertService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.alertService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'alertListModification',
                content: 'Deleted an alert'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-alert-delete-popup',
    template: ''
})
export class AlertDeletePopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private alertPopupService: AlertPopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.alertPopupService.open(AlertDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
