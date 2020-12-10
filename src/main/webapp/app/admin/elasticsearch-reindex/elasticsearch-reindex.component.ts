import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { JhiAlertService } from 'ng-jhipster';

import { ElasticsearchReindexModalComponent } from './elasticsearch-reindex-modal.component';

@Component({
    selector: 'jhi-elasticsearch-reindex',
    templateUrl: './elasticsearch-reindex.component.html'
})
export class ElasticsearchReindexComponent {
    selectedServices = [];

    constructor(private modalService: NgbModal, private jhiAlertService: JhiAlertService) {}

    onComboSelection(selection) {
        this.selectedServices = selection.selectedItems;
    }

    showConfirm() {
        if (this.selectedServices == null || this.selectedServices.length === 0) {
            this.jhiAlertService.error('no.service.selected', null, null);
            return;
        }

        const modalRef = this.modalService.open(ElasticsearchReindexModalComponent);
        modalRef.componentInstance.services = this.selectedServices;
    }
}
