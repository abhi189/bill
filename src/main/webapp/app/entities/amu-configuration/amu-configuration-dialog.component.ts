import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { AmuConfiguration } from './amu-configuration.model';
import { AmuConfigurationPopupService } from './amu-configuration-popup.service';
import { AmuConfigurationService } from './amu-configuration.service';

@Component({
    selector: 'jhi-amu-configuration-dialog',
    templateUrl: './amu-configuration-dialog.component.html'
})
export class AmuConfigurationDialogComponent implements OnInit {
    amuConfiguration: AmuConfiguration;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private amuConfigurationService: AmuConfigurationService,
        private eventManager: JhiEventManager
    ) {}

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.amuConfiguration.id !== undefined) {
            this.subscribeToSaveResponse(this.amuConfigurationService.update(this.amuConfiguration));
        } else {
            this.subscribeToSaveResponse(this.amuConfigurationService.create(this.amuConfiguration));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<AmuConfiguration>>) {
        result.subscribe(
            (res: HttpResponse<AmuConfiguration>) => this.onSaveSuccess(res.body),
            (res: HttpErrorResponse) => this.onSaveError()
        );
    }

    private onSaveSuccess(result: AmuConfiguration) {
        this.eventManager.broadcast({ name: 'amuConfigurationListModification', content: 'OK' });
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-amu-configuration-popup',
    template: ''
})
export class AmuConfigurationPopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private amuConfigurationPopupService: AmuConfigurationPopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if (params['id']) {
                this.amuConfigurationPopupService.open(AmuConfigurationDialogComponent as Component, params['id']);
            } else {
                this.amuConfigurationPopupService.open(AmuConfigurationDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
