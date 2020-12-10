import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ExpectedSavings } from './expected-savings.model';
import { ExpectedSavingsPopupService } from './expected-savings-popup.service';
import { ExpectedSavingsService } from './expected-savings.service';

@Component({
    selector: 'jhi-expected-savings-delete-dialog',
    templateUrl: './expected-savings-delete-dialog.component.html'
})
export class ExpectedSavingsDeleteDialogComponent {
    expectedSavings: ExpectedSavings;

    constructor(
        private expectedSavingsService: ExpectedSavingsService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.expectedSavingsService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'expectedSavingsListModification',
                content: 'Deleted an expectedSavings'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-expected-savings-delete-popup',
    template: ''
})
export class ExpectedSavingsDeletePopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private expectedSavingsPopupService: ExpectedSavingsPopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.expectedSavingsPopupService.open(ExpectedSavingsDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
