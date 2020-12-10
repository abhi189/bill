import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { AlertNote } from './alert-note.model';
import { AlertNotePopupService } from './alert-note-popup.service';
import { AlertNoteService } from './alert-note.service';

@Component({
    selector: 'jhi-alert-note-delete-dialog',
    templateUrl: './alert-note-delete-dialog.component.html'
})
export class AlertNoteDeleteDialogComponent {
    alertNote: AlertNote;

    constructor(private alertNoteService: AlertNoteService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.alertNoteService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'alertNoteListModification',
                content: 'Deleted an alertNote'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-alert-note-delete-popup',
    template: ''
})
export class AlertNoteDeletePopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private alertNotePopupService: AlertNotePopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.alertNotePopupService.open(AlertNoteDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
