import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Utility } from './utility.model';
import { UtilityPopupService } from './utility-popup.service';
import { UtilityService } from './utility.service';

@Component({
    selector: 'jhi-utility-delete-dialog',
    templateUrl: './utility-delete-dialog.component.html'
})
export class UtilityDeleteDialogComponent {
    utility: Utility;

    constructor(private utilityService: UtilityService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.utilityService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'utilityListModification',
                content: 'Deleted an utility'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-utility-delete-popup',
    template: ''
})
export class UtilityDeletePopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private utilityPopupService: UtilityPopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.utilityPopupService.open(UtilityDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
