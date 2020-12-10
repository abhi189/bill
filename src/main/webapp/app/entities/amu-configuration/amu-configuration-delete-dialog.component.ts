import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { AmuConfiguration } from './amu-configuration.model';
import { AmuConfigurationPopupService } from './amu-configuration-popup.service';
import { AmuConfigurationService } from './amu-configuration.service';

@Component({
    selector: 'jhi-amu-configuration-delete-dialog',
    templateUrl: './amu-configuration-delete-dialog.component.html'
})
export class AmuConfigurationDeleteDialogComponent {
    amuConfiguration: AmuConfiguration;

    constructor(
        private amuConfigurationService: AmuConfigurationService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.amuConfigurationService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'amuConfigurationListModification',
                content: 'Deleted an amuConfiguration'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-amu-configuration-delete-popup',
    template: ''
})
export class AmuConfigurationDeletePopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private amuConfigurationPopupService: AmuConfigurationPopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.amuConfigurationPopupService.open(AmuConfigurationDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
