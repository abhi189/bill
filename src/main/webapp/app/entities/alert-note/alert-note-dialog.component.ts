import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { AlertNote } from './alert-note.model';
import { AlertNotePopupService } from './alert-note-popup.service';
import { AlertNoteService } from './alert-note.service';

@Component({
    selector: 'jhi-alert-note-dialog',
    templateUrl: './alert-note-dialog.component.html'
})
export class AlertNoteDialogComponent implements OnInit {
    alertNote: AlertNote;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private alertNoteService: AlertNoteService,
        private eventManager: JhiEventManager
    ) {}

    ngOnInit() {
        this.isSaving = false;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.alertNote.id !== undefined) {
            this.subscribeToSaveResponse(this.alertNoteService.update(this.alertNote));
        } else {
            this.subscribeToSaveResponse(this.alertNoteService.create(this.alertNote));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<AlertNote>>) {
        result.subscribe((res: HttpResponse<AlertNote>) => this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: AlertNote) {
        this.eventManager.broadcast({ name: 'alertNoteListModification', content: 'OK' });
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-alert-note-popup',
    template: ''
})
export class AlertNotePopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private alertNotePopupService: AlertNotePopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if (params['id']) {
                this.alertNotePopupService.open(AlertNoteDialogComponent as Component, params['id']);
            } else {
                this.alertNotePopupService.open(AlertNoteDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
