import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { UtilityChargeConfiguration } from './utility-charge-configuration.model';
import { UtilityChargeConfigurationPopupService } from './utility-charge-configuration-popup.service';
import { UtilityChargeConfigurationService } from './utility-charge-configuration.service';

@Component({
    selector: 'jhi-utility-charge-configuration-delete-dialog',
    templateUrl: './utility-charge-configuration-delete-dialog.component.html'
})
export class UtilityChargeConfigurationDeleteDialogComponent {
    utilityChargeConfiguration: UtilityChargeConfiguration;

    constructor(
        private utilityChargeConfigurationService: UtilityChargeConfigurationService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.utilityChargeConfigurationService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'utilityChargeConfigurationListModification',
                content: 'Deleted an utilityChargeConfiguration'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-utility-charge-configuration-delete-popup',
    template: ''
})
export class UtilityChargeConfigurationDeletePopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private utilityChargeConfigurationPopupService: UtilityChargeConfigurationPopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.utilityChargeConfigurationPopupService.open(UtilityChargeConfigurationDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
