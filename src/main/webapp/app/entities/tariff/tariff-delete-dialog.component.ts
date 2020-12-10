import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Tariff } from './tariff.model';
import { TariffPopupService } from './tariff-popup.service';
import { TariffService } from './tariff.service';

@Component({
    selector: 'jhi-tariff-delete-dialog',
    templateUrl: './tariff-delete-dialog.component.html'
})
export class TariffDeleteDialogComponent {
    tariff: Tariff;

    constructor(private tariffService: TariffService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.tariffService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'tariffListModification',
                content: 'Deleted an tariff'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-tariff-delete-popup',
    template: ''
})
export class TariffDeletePopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private tariffPopupService: TariffPopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.tariffPopupService.open(TariffDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
