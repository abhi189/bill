import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Provider } from './provider.model';
import { ProviderPopupService } from './provider-popup.service';
import { ProviderService } from './provider.service';

@Component({
    selector: 'jhi-provider-delete-dialog',
    templateUrl: './provider-delete-dialog.component.html'
})
export class ProviderDeleteDialogComponent {
    provider: Provider;

    constructor(private providerService: ProviderService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.providerService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'providerListModification',
                content: 'Deleted an provider'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-provider-delete-popup',
    template: ''
})
export class ProviderDeletePopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private providerPopupService: ProviderPopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.providerPopupService.open(ProviderDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
