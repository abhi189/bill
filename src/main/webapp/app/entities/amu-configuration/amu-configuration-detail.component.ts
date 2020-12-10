import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';
import { NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';

import { AmuConfiguration } from './amu-configuration.model';
import { AmuConfigurationService } from './amu-configuration.service';
import { ExpectedSavings } from '../expected-savings/expected-savings.model';
import { ExpectedSavingsService } from '../expected-savings/expected-savings.service';
import { Templates } from '../templates/templates.model';
import { TemplatesService } from '../templates/templates.service';
import { ExpectedSavingsDialogComponent } from '../expected-savings/expected-savings-dialog.component';
import { ExpectedSavingsPopupService } from '../expected-savings/expected-savings-popup.service';
import { TemplatesDialogComponent } from '../templates/templates-dialog.component';
import { TemplatesPopupService } from '../templates/templates-popup.service';

@Component({
    selector: 'jhi-amu-configuration-detail',
    templateUrl: './amu-configuration-detail.component.html'
})
export class AmuConfigurationDetailComponent implements OnInit, OnDestroy {
    amuConfiguration: AmuConfiguration;
    expectedSavings: ExpectedSavings[];
    expectedSavingsLoaded = false;
    templates: Templates[];
    templatesLoaded = false;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private amuConfigurationService: AmuConfigurationService,
        private route: ActivatedRoute,
        private expectedSavingsService: ExpectedSavingsService,
        private templatesService: TemplatesService,
        private expectedSavingsPopupService: ExpectedSavingsPopupService,
        private templatesPopupService: TemplatesPopupService
    ) {}

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
        this.registerChangeInAmuConfigurations();
        this.registerChangeInExpectedSavings();
        this.registerChangeInTemplates();
    }

    load(id) {
        this.amuConfigurationService.find(id).subscribe((amuConfigurationResponse: HttpResponse<AmuConfiguration>) => {
            this.amuConfiguration = amuConfigurationResponse.body;
        });
    }

    loadExpectedSavings(customerType: string) {
        this.expectedSavingsService.findByCustomerType(customerType).subscribe(
            (res: HttpResponse<ExpectedSavings[]>) => {
                this.expectedSavings = res.body;
                this.expectedSavingsLoaded = true;
            },
            (res: HttpErrorResponse) => {
                // this.onError(res.message);
                this.expectedSavingsLoaded = false;
            }
        );
        return;
    }

    loadTemplates(customerType: string) {
        this.templatesService.findByCustomerType(customerType).subscribe(
            (res: HttpResponse<Templates[]>) => {
                this.templates = res.body;
                this.templatesLoaded = true;
            },
            (res: HttpErrorResponse) => {
                // this.onError(res.message);
                this.templatesLoaded = false;
            }
        );
        return;
    }

    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInAmuConfigurations() {
        this.eventSubscriber = this.eventManager.subscribe('amuConfigurationListModification', response =>
            this.load(this.amuConfiguration.id)
        );
    }

    registerChangeInExpectedSavings() {
        this.eventSubscriber = this.eventManager.subscribe('expectedSavingsListModification', response =>
            this.loadExpectedSavings(this.amuConfiguration.customerType)
        );
    }

    registerChangeInTemplates() {
        this.eventSubscriber = this.eventManager.subscribe('templatesListModification', response =>
            this.loadTemplates(this.amuConfiguration.customerType)
        );
    }

    beforeTabChange($event: NgbTabChangeEvent) {
        if ($event.nextId === 'tabExpectedSavings' && this.expectedSavingsLoaded === false) {
            this.loadExpectedSavings(this.amuConfiguration.customerType);
        }
        if ($event.nextId === 'tabTemplates' && this.templatesLoaded === false) {
            this.loadTemplates(this.amuConfiguration.customerType);
        }
    }

    public openExpectedSavingsPopup() {
        const expectedSaving = new ExpectedSavings();
        expectedSaving.customerType = this.amuConfiguration.customerType;
        this.expectedSavingsPopupService.expectedSavingsModalRef(ExpectedSavingsDialogComponent as Component, expectedSaving);
    }

    public openTemplatesPopup() {
        const templates = new Templates();
        templates.customerType = this.amuConfiguration.customerType;
        this.templatesPopupService.templatesModalRef(TemplatesDialogComponent as Component, templates);
    }
}
