import { Input, Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { SiteService } from './site.service';
import { Router } from '@angular/router';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

@Component({
    selector: 'jhi-site-ach-delete-dialog',
    templateUrl: './site-ACH-delete-dialog.component.html'
})
export class SiteACHDeleteDialogComponent {
    budderflyId = '';

    @Input()
    set shop(shop: any) {
        this.budderflyId = shop;
    }

    constructor(
        private siteService: SiteService,
        public activeModal: NgbActiveModal,
        private router: Router,
        private jhiAlertService: JhiAlertService
    ) {}

    deleteACH() {
        this.siteService.deleteACH(this.budderflyId).subscribe(
            res => {
                this.activeModal.dismiss();
                this.router.routeReuseStrategy.shouldReuseRoute = function() {
                    return false;
                };
                this.router.onSameUrlNavigation = 'reload';
                this.router.navigate(['/site']);
            },
            err => {
                this.activeModal.dismiss();
                this.router.routeReuseStrategy.shouldReuseRoute = function() {
                    return false;
                };
                this.router.onSameUrlNavigation = 'reload';
                this.router.navigate(['/site']);

                this.jhiAlertService.error('ACHInfo.error', this.budderflyId, null);
            }
        );
    }
}
