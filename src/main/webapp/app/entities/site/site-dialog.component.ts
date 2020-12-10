import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, debounceTime, distinctUntilChanged, map, tap, switchMap } from 'rxjs/operators';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Site } from './site.model';
import { SitePopupService } from './site-popup.service';
import { SiteService } from './site.service';

@Component({
    selector: 'jhi-site-dialog',
    templateUrl: './site-dialog.component.html'
})
export class SiteDialogComponent implements OnInit {
    site: Site;
    isSaving: boolean;
    siteSelected: Site;
    searchText: string;
    searching = false;
    searchFailed = false;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private siteService: SiteService,
        private eventManager: JhiEventManager,
        @Inject(DOCUMENT) document
    ) {
        this.siteSelected = null;
        this.searchText = document.getElementById('field_parentSite');
    }

    searchSites = (text$: Observable<string>) =>
        text$.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            tap(() => (this.searching = true)),
            switchMap(term => {
                if (term === '') {
                    this.searchFailed = true;
                    return of([]);
                }

                return this.siteService.query({ 'budderflyId.contains': term }).pipe(
                    map(response => response.body),
                    tap(() => (this.searchFailed = false)),
                    catchError(() => {
                        this.searchFailed = true;
                        return of([]);
                    })
                );
            }),
            tap(() => (this.searching = false))
        );

    formatterSites = (site: Site) => {
        if (this.site.id !== site.id) {
            return site.budderflyId;
        }
    };

    parentSite = (site: Site) => site.id;

    ngOnInit() {
        this.isSaving = false;

        if (this.site.parentSiteId !== null && this.site.parentSiteId !== undefined) {
            this.siteService.find(this.site.parentSiteId).subscribe((siteResponse: HttpResponse<Site>) => {
                this.siteSelected = siteResponse.body;
                this.searchText = this.siteSelected.budderflyId;
            });
        }
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.site.id !== undefined) {
            if (this.siteSelected === null || this.siteSelected === '') {
                if (confirm('You have not selected any parent site, do you want save it anyway ?')) {
                    this.site.parentSiteId = null;
                    this.subscribeToSaveResponse(this.siteService.update(this.site));
                } else {
                    this.isSaving = false;
                }
            } else {
                this.site.parentSiteId = this.parentSite(this.siteSelected);
                this.subscribeToSaveResponse(this.siteService.update(this.site));
            }
        } else {
            this.subscribeToSaveResponse(this.siteService.create(this.site));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Site>>) {
        result.subscribe((res: HttpResponse<Site>) => this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Site) {
        this.eventManager.broadcast({ name: 'siteListModification', content: 'OK' });
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackSiteById(index: number, item: Site) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-site-popup',
    template: ''
})
export class SitePopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private sitePopupService: SitePopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if (params['id']) {
                this.sitePopupService.open(SiteDialogComponent as Component, params['id']);
            } else {
                this.sitePopupService.open(SiteDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
