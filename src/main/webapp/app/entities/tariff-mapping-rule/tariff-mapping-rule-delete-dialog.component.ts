import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TariffMappingRule } from './tariff-mapping-rule.model';
import { TariffMappingRulePopupService } from './tariff-mapping-rule-popup.service';
import { TariffMappingRuleService } from './tariff-mapping-rule.service';

@Component({
    selector: 'jhi-tariff-mapping-rule-delete-dialog',
    templateUrl: './tariff-mapping-rule-delete-dialog.component.html'
})
export class TariffMappingRuleDeleteDialogComponent {
    tariffMappingRule: TariffMappingRule;

    constructor(
        private tariffMappingRuleService: TariffMappingRuleService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.tariffMappingRuleService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'tariffMappingRuleListModification',
                content: 'Deleted an tariffMappingRule'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-tariff-mapping-rule-delete-popup',
    template: ''
})
export class TariffMappingRuleDeletePopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private tariffMappingRulePopupService: TariffMappingRulePopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.tariffMappingRulePopupService.open(TariffMappingRuleDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
