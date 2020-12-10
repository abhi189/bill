import { Input, Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { JhiAlertService } from 'ng-jhipster';

import {
    BILLING_SERVER_API_URL,
    INVOICE_SERVER_API_URL,
    RATE_REPOSITORY_API_URL,
    SITES_SERVER_API_URL,
    INVENTORY_SERVER_API_URL
} from '../../app.constants';

import { ElasticsearchReindexService } from './elasticsearch-reindex.service';

@Component({
    selector: 'jhi-elasticsearch-reindex-modal',
    templateUrl: './elasticsearch-reindex-modal.component.html'
})
export class ElasticsearchReindexModalComponent {
    servicesEndpoints = {
        billing: BILLING_SERVER_API_URL,
        invoice: INVOICE_SERVER_API_URL,
        sites: SITES_SERVER_API_URL,
        'rate.repository': RATE_REPOSITORY_API_URL,
        inventory: INVENTORY_SERVER_API_URL
    };

    selectedServices = [];

    @Input()
    set services(services: any) {
        this.selectedServices = services;
    }

    constructor(
        private elasticsearchReindexService: ElasticsearchReindexService,
        private jhiAlertService: JhiAlertService,
        public activeModal: NgbActiveModal
    ) {}

    reindex() {
        for (let i = 0; i < this.selectedServices.length; ++i) {
            if (!(this.selectedServices[i]['itemName'] in this.servicesEndpoints)) {
                this.jhiAlertService.error('service.not.found', { serviceName: this.selectedServices[i]['itemName'] }, null);
                continue;
            }

            this.elasticsearchReindexService.reindex(this.servicesEndpoints[this.selectedServices[i]['itemName']]).subscribe();
        }
        this.activeModal.dismiss();
    }
}
