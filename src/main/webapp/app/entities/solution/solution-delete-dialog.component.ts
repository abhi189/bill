import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Solution } from './solution.model';
import { SolutionPopupService } from './solution-popup.service';
import { SolutionService } from './solution.service';

@Component({
    selector: 'jhi-solution-delete-dialog',
    templateUrl: './solution-delete-dialog.component.html'
})
export class SolutionDeleteDialogComponent {
    solution: Solution;

    constructor(private solutionService: SolutionService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.solutionService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'solutionListModification',
                content: 'Deleted an solution'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-solution-delete-popup',
    template: ''
})
export class SolutionDeletePopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private solutionPopupService: SolutionPopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.solutionPopupService.open(SolutionDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
