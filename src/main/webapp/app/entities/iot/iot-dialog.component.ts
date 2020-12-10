import { Principal } from '../../shared';
import { IotService } from './iot.service';
import { Observable } from 'rxjs/Observable';
import { KittedItem } from './kitted-item.model';
import { ActivatedRoute } from '@angular/router';
import { IotPopupService } from './iot-popup.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { JhiEventManager } from 'ng-jhipster';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'jhi-iot-dialog',
    templateUrl: './iot-dialog.component.html'
})
export class IotDialogComponent implements OnInit {
    kittedItem: KittedItem;
    isSaving: boolean;
    searchText: string;
    searching = false;
    searchFailed = false;

    constructor(
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager,
        private principal: Principal,
        private iotService: IotService
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.principal.identity().then(account => {
            this.kittedItem.kittedBy = account.login;
        });
        this.kittedItem.tested = 'No';
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        this.kittedItem.kittedDate = new Date().toISOString();
        if (this.kittedItem.id !== undefined) {
            this.subscribeToSaveResponse(this.iotService.update(this.kittedItem));
        } else {
            this.subscribeToSaveResponse(this.iotService.create(this.kittedItem));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<KittedItem>>) {
        result.subscribe((res: HttpResponse<KittedItem>) => this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: KittedItem) {
        this.isSaving = false;
        this.activeModal.dismiss(result);
        this.eventManager.broadcast({
            name: 'iotItemModification',
            content: 'Saved an IoT Item:' + result.id
        });
    }

    private onSaveError() {
        this.isSaving = false;
    }

    trackSiteById(index: number, item: KittedItem) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-site-popup',
    template: ''
})
export class IotPopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private iotPopupService: IotPopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if (params['id']) {
                this.iotPopupService.open(IotDialogComponent as Component, params['id']);
            } else {
                this.iotPopupService.open(IotDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
