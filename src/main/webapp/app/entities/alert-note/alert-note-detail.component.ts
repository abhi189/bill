import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { AlertNote } from './alert-note.model';
import { AlertNoteService } from './alert-note.service';

@Component({
    selector: 'jhi-alert-note-detail',
    templateUrl: './alert-note-detail.component.html'
})
export class AlertNoteDetailComponent implements OnInit, OnDestroy {
    alertNote: AlertNote;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dataUtils: JhiDataUtils,
        private alertNoteService: AlertNoteService,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
        this.registerChangeInAlertNotes();
    }

    load(id) {
        this.alertNoteService.find(id).subscribe((alertNoteResponse: HttpResponse<AlertNote>) => {
            this.alertNote = alertNoteResponse.body;
        });
    }
    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInAlertNotes() {
        this.eventSubscriber = this.eventManager.subscribe('alertNoteListModification', response => this.load(this.alertNote.id));
    }
}
