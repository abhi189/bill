import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';
import { ImportMapping } from './import-mapping.model';
import { Principal } from '../../shared';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'jhi-import-mapping',
    templateUrl: './import-mapping.component.html'
})
export class ImportMappingComponent implements OnInit {
    currentAccount: any;
    eventSubscriber: Subscription;
    importMapping: ImportMapping;

    constructor(
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal,
        private activatedroute: ActivatedRoute,
        private router: Router
    ) {
        this.activatedroute.queryParams.subscribe(data => {
            this.importMapping = data as ImportMapping;
        });
    }

    ngOnInit() {
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
    }

    restartJob() {
        this.router.navigate(['../../tariff/' + this.importMapping.tariffId, { jobId: this.importMapping.jobId }]);
    }

    previousState() {
        window.history.back();
    }
}
