import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { NgbActiveModal, NgbTabChangeEvent, NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { JhiAlertService, JhiEventManager } from 'ng-jhipster';

import { Provider, Tariff, TariffStatus } from './tariff.model';
import { TariffPopupService } from './tariff-popup.service';
import { TariffService } from './tariff.service';

import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { merge } from 'rxjs/observable/merge';
import { Utility, UtilityService } from '../utility';
import { ProviderService } from './provider.service';

@Component({
    selector: 'jhi-tariff-dialog',
    templateUrl: './tariff-dialog.component.html'
})
export class TariffDialogComponent implements OnInit {
    @ViewChild('instance') instance: NgbTypeahead;
    focus$ = new Subject<string>();
    click$ = new Subject<string>();

    tariff: Tariff;
    isSaving: boolean;
    utilities: Utility[];
    providers: Provider[];
    activeIdString: any;
    tariffUpdateFinished = true;

    constructor(
        public activeModal: NgbActiveModal,
        private tariffService: TariffService,
        private eventManager: JhiEventManager,
        private utilityService: UtilityService,
        private jhiAlertService: JhiAlertService,
        private providerService: ProviderService
    ) {}

    ngOnInit() {
        this.activeIdString = 'tabManual';
        if (this.tariff.externalId && this.tariff.providerId) {
            this.activeIdString = 'tabImport';
        }
        this.isSaving = false;
        this.utilityService.query().subscribe(
            (res: HttpResponse<[Utility]>) => {
                this.utilities = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.loadProviders();
    }

    search = (text$: Observable<string>) => {
        const debouncedText$ = text$.pipe(
            debounceTime(200),
            distinctUntilChanged()
        );
        const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
        const inputFocus$ = this.focus$;

        return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
            map(term =>
                (term === '' ? this.utilities : this.utilities.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1))
                    .map(value => value.utilityProviderKey)
                    .slice(0, 30)
            )
        );
    };

    formatter = (utility: { name: string }) => utility.name;

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        this.tariffUpdateFinished = true;
        if (this.activeIdString === 'tabManual') {
            if (this.tariff.id !== undefined) {
                this.subscribeToSaveResponse(this.tariffService.update(this.tariff));
            } else {
                this.subscribeToSaveResponse(this.tariffService.create(this.tariff));
            }
        } else {
            this.tariff.tariffName = '';
            this.tariff.utilityProviderKey = '';
            this.tariff.status = TariffStatus.NEW;
            this.tariff.providerName = this.providers.find(value => value.id === this.tariff.providerId).name;
            this.subscribeToSaveResponse(this.tariffService.importTariff(this.tariff));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Tariff>>) {
        result.subscribe((res: HttpResponse<Tariff>) => this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Tariff) {
        this.eventManager.broadcast({ name: 'tariffListModification', content: 'OK' });
        this.isSaving = false;
        this.activeModal.dismiss(result);
        this.tariffUpdateFinished = true;
    }

    private onSaveError() {
        this.isSaving = false;
        this.tariffUpdateFinished = true;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    loadProviders() {
        this.providerService.all().subscribe((providerResponse: HttpResponse<Provider[]>) => {
            this.providers = providerResponse.body;
        });
    }

    beforeTabChange($event: NgbTabChangeEvent) {
        this.activeIdString = $event.nextId;
    }
}

@Component({
    selector: 'jhi-tariff-popup',
    template: ''
})
export class TariffPopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private tariffPopupService: TariffPopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if (params['id']) {
                this.tariffPopupService.open(TariffDialogComponent as Component, params['id']);
            } else {
                this.tariffPopupService.open(TariffDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
