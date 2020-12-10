import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Templates } from './templates.model';
import { TemplatesPopupService } from './templates-popup.service';
import { TemplatesService } from './templates.service';

@Component({
    selector: 'jhi-templates-delete-dialog',
    templateUrl: './templates-delete-dialog.component.html'
})
export class TemplatesDeleteDialogComponent {
    templates: Templates;

    constructor(private templatesService: TemplatesService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.templatesService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'templatesListModification',
                content: 'Deleted an templates'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-templates-delete-popup',
    template: ''
})
export class TemplatesDeletePopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private templatesPopupService: TemplatesPopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.templatesPopupService.open(TemplatesDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
