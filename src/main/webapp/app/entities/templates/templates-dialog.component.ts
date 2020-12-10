import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Templates } from './templates.model';
import { TemplatesPopupService } from './templates-popup.service';
import { TemplatesService } from './templates.service';

@Component({
    selector: 'jhi-templates-dialog',
    templateUrl: './templates-dialog.component.html'
})
export class TemplatesDialogComponent implements OnInit {
    templates: Templates;
    isSaving: boolean;

    constructor(public activeModal: NgbActiveModal, private templatesService: TemplatesService, private eventManager: JhiEventManager) {}

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.templates.id !== undefined) {
            this.subscribeToSaveResponse(this.templatesService.update(this.templates));
        } else {
            this.subscribeToSaveResponse(this.templatesService.create(this.templates));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Templates>>) {
        result.subscribe((res: HttpResponse<Templates>) => this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Templates) {
        this.eventManager.broadcast({ name: 'templatesListModification', content: 'OK' });
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-templates-popup',
    template: ''
})
export class TemplatesPopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private templatesPopupService: TemplatesPopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if (params['id']) {
                this.templatesPopupService.open(TemplatesDialogComponent as Component, params['id']);
            } else {
                this.templatesPopupService.open(TemplatesDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
