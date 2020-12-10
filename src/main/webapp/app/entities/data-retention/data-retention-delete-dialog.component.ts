import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { DataRetention } from './data-retention.model';
import { DataRetentionPopupService } from './data-retention-popup.service';
import { DataRetentionService } from './data-retention.service';

@Component({
    selector: 'jhi-data-retention-delete-dialog',
    templateUrl: './data-retention-delete-dialog.component.html'
})
export class DataRetentionDeleteDialogComponent {
    dataRetention: DataRetention;

    constructor(
        private dataRetentionService: DataRetentionService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.dataRetentionService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'dataRetentionListModification',
                content: 'Deleted an dataRetention'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-data-retention-delete-popup',
    template: ''
})
export class DataRetentionDeletePopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private dataRetentionPopupService: DataRetentionPopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.dataRetentionPopupService.open(DataRetentionDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
