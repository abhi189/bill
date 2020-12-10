import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { AccountsReceivable } from './accounts-receivable.model';
import { AccountsReceivableService } from './accounts-receivable.service';

@Component({
    selector: 'jhi-accounts-receivable-detail',
    templateUrl: './accounts-receivable-detail.component.html'
})
export class AccountsReceivableDetailComponent implements OnInit, OnDestroy {
    accountsReceivable: AccountsReceivable;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private accountsReceivableService: AccountsReceivableService,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
        this.registerChangeInAccountsReceivables();
    }

    load(id) {
        this.accountsReceivableService.find(id).subscribe((accountsReceivableResponse: HttpResponse<AccountsReceivable>) => {
            this.accountsReceivable = accountsReceivableResponse.body;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInAccountsReceivables() {
        this.eventSubscriber = this.eventManager.subscribe('accountsReceivableListModification', response =>
            this.load(this.accountsReceivable.id)
        );
    }
}
