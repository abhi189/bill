import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Performance } from './performance.model';
import { PerformancePopupService } from './performance-popup.service';
import { PerformanceService } from './performance.service';

@Component({
    selector: 'jhi-performance-delete-dialog',
    templateUrl: './performance-delete-dialog.component.html'
})
export class PerformanceDeleteDialogComponent {
    performance: Performance;

    constructor(
        private performanceService: PerformanceService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.performanceService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'performanceListModification',
                content: 'Deleted an performance'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-performance-delete-popup',
    template: ''
})
export class PerformanceDeletePopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private performancePopupService: PerformancePopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.performancePopupService.open(PerformanceDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
