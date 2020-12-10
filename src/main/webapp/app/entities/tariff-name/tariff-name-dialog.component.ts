import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TariffName } from './tariff-name.model';
import { TariffNamePopupService } from './tariff-name-popup.service';
import { TariffNameService } from './tariff-name.service';

@Component({
    selector: 'jhi-tariff-name-dialog',
    templateUrl: './tariff-name-dialog.component.html'
})
export class TariffNameDialogComponent implements OnInit {
    tariffName: TariffName;
    isSaving: boolean;

    constructor(public activeModal: NgbActiveModal, private tariffNameService: TariffNameService, private eventManager: JhiEventManager) {}

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.tariffName.id !== undefined) {
            this.subscribeToSaveResponse(this.tariffNameService.update(this.tariffName));
        } else {
            this.subscribeToSaveResponse(this.tariffNameService.create(this.tariffName));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<TariffName>>) {
        result.subscribe((res: HttpResponse<TariffName>) => this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: TariffName) {
        this.eventManager.broadcast({ name: 'tariffNameListModification', content: 'OK' });
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-tariff-name-popup',
    template: ''
})
export class TariffNamePopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private tariffNamePopupService: TariffNamePopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if (params['id']) {
                this.tariffNamePopupService.open(TariffNameDialogComponent as Component, params['id']);
            } else {
                this.tariffNamePopupService.open(TariffNameDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
