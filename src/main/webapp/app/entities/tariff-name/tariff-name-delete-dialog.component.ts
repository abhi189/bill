import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TariffName } from './tariff-name.model';
import { TariffNamePopupService } from './tariff-name-popup.service';
import { TariffNameService } from './tariff-name.service';

@Component({
    selector: 'jhi-tariff-name-delete-dialog',
    templateUrl: './tariff-name-delete-dialog.component.html'
})
export class TariffNameDeleteDialogComponent {
    tariffName: TariffName;

    constructor(private tariffNameService: TariffNameService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.tariffNameService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'tariffNameListModification',
                content: 'Deleted an tariffName'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-tariff-name-delete-popup',
    template: ''
})
export class TariffNameDeletePopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private tariffNamePopupService: TariffNamePopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.tariffNamePopupService.open(TariffNameDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
