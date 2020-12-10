import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Templates } from './templates.model';
import { TemplatesService } from './templates.service';

@Component({
    selector: 'jhi-templates-detail',
    templateUrl: './templates-detail.component.html'
})
export class TemplatesDetailComponent implements OnInit, OnDestroy {
    templates: Templates;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(private eventManager: JhiEventManager, private templatesService: TemplatesService, private route: ActivatedRoute) {}

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
        this.registerChangeInTemplates();
    }

    load(id) {
        this.templatesService.find(id).subscribe((templatesResponse: HttpResponse<Templates>) => {
            this.templates = templatesResponse.body;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTemplates() {
        this.eventSubscriber = this.eventManager.subscribe('templatesListModification', response => this.load(this.templates.id));
    }
}
