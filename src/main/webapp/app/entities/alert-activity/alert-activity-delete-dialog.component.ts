import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { AlertActivity } from './alert-activity.model';
import { AlertActivityPopupService } from './alert-activity-popup.service';
import { AlertActivityService } from './alert-activity.service';

@Component({
    selector: 'jhi-alert-activity-delete-dialog',
    templateUrl: './alert-activity-delete-dialog.component.html'
})
export class AlertActivityDeleteDialogComponent {
    alertActivity: AlertActivity;

    constructor(
        private alertActivityService: AlertActivityService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.alertActivityService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'alertActivityListModification',
                content: 'Deleted an alertActivity'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-alert-activity-delete-popup',
    template: ''
})
export class AlertActivityDeletePopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private alertActivityPopupService: AlertActivityPopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.alertActivityPopupService.open(AlertActivityDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
