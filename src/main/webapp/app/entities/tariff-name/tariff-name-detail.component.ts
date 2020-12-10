import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { TariffName } from './tariff-name.model';
import { TariffNameService } from './tariff-name.service';

@Component({
    selector: 'jhi-tariff-name-detail',
    templateUrl: './tariff-name-detail.component.html'
})
export class TariffNameDetailComponent implements OnInit, OnDestroy {
    tariffName: TariffName;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(private eventManager: JhiEventManager, private tariffNameService: TariffNameService, private route: ActivatedRoute) {}

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
        this.registerChangeInTariffNames();
    }

    load(id) {
        this.tariffNameService.find(id).subscribe((tariffNameResponse: HttpResponse<TariffName>) => {
            this.tariffName = tariffNameResponse.body;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTariffNames() {
        this.eventSubscriber = this.eventManager.subscribe('tariffNameListModification', response => this.load(this.tariffName.id));
    }
}
