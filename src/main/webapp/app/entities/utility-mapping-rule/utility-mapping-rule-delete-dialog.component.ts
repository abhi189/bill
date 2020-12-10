import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { UtilityMappingRule } from './utility-mapping-rule.model';
import { UtilityMappingRulePopupService } from './utility-mapping-rule-popup.service';
import { UtilityMappingRuleService } from './utility-mapping-rule.service';

@Component({
    selector: 'jhi-utility-mapping-rule-delete-dialog',
    templateUrl: './utility-mapping-rule-delete-dialog.component.html'
})
export class UtilityMappingRuleDeleteDialogComponent {
    utilityMappingRule: UtilityMappingRule;

    constructor(
        private utilityMappingRuleService: UtilityMappingRuleService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.utilityMappingRuleService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'utilityMappingRuleListModification',
                content: 'Deleted an utilityMappingRule'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-utility-mapping-rule-delete-popup',
    template: ''
})
export class UtilityMappingRuleDeletePopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private utilityMappingRulePopupService: UtilityMappingRulePopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.utilityMappingRulePopupService.open(UtilityMappingRuleDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
