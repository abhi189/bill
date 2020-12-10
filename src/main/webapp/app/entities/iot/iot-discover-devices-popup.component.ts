import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IotPopupService } from './iot-popup.service';
import { ActivatedRoute } from '@angular/router';
import { IotService } from './iot.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { JhiAlertService, JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { Principal, LoginService } from '../../shared';
import { KittedItem, ProvisionStatus } from './kitted-item.model';
import { DiscoveredItem } from './discovered-item.model';
import { Observable } from 'rxjs';

@Component({
    selector: 'jhi-iot-discover-devices',
    templateUrl: './iot-discover-devices-popup.component.html'
})
export class IotDiscoverDevicesDialogComponent implements OnInit {
    discoveredItems: Array<DiscoveredItem> = new Array<DiscoveredItem>();
    token: string;
    kittedBy: string;
    provisioningFinished = true;
    selectAll: boolean;
    url: string;

    constructor(
        private eventManager: JhiEventManager,
        private iotService: IotService,
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private principal: Principal,
        private loginService: LoginService
    ) {}

    ngOnInit() {
        this.iotService
            .getProvisionUrl()
            .subscribe(
                (res: any) => (this.url = res.body.url),
                (res: HttpErrorResponse) => this.onError('billingWebApp.iot.errorWhenTryingToGetProvisionUrl')
            );
        this.selectAll = false;
        this.principal.identity().then(account => {
            this.kittedBy = account.login;
        });
        this.iotService.getToken().subscribe((res: any) => console.log(res));
        this.iotService
            .getAdresses()
            .subscribe(
                (res: any) => this.toDiscoveredItems(Object.keys(res.body)),
                (res: HttpErrorResponse) => this.onError('billingWebApp.iot.errorComunicationMdnsService')
            );
    }

    toDiscoveredItems(items: Array<string>) {
        items.forEach(element => {
            const discoveredItem = new DiscoveredItem();
            discoveredItem.ipAddress = element;
            discoveredItem.check = false;
            discoveredItem.status = ProvisionStatus.DISCOVERED;
            this.discoveredItems.push(discoveredItem);
        });
    }

    selectAllItems() {
        this.discoveredItems.forEach(element => {
            if (this.selectAll) {
                element.check = true;
            } else {
                element.check = false;
            }
        });
    }

    provisionSelected() {
        this.discoveredItems.forEach(item => {
            if (item.check) {
                this.kittingProces(item);
            }
        });
    }

    async kittingProces(item: DiscoveredItem) {
        this.loginService.login({
            username: this.kittedBy,
            password: this.principal.getPassword(),
            rememberMe: true
        });
        this.provisioningFinished = false;
        this.token = this.principal.getToken();
        this.token = 'Bearer ' + this.token;
        const payload = { url: this.url };
        let macAddress: string;
        const ipItem = item.ipAddress;
        try {
            const responseReset: HttpResponse<any> = await this.iotService.reset(ipItem, this.token, payload).toPromise();
            macAddress = responseReset.body.deviceId.toUpperCase();
            this.iotService.provision(ipItem, this.token, payload).subscribe();
            for (let i = 0; i < 15; i++) {
                this.loginService.login({
                    username: this.kittedBy,
                    password: this.principal.getPassword(),
                    rememberMe: true
                });
                this.token = this.principal.getToken();
                this.token = 'Bearer ' + this.token;
                const responseStatus: HttpResponse<any> = await this.iotService.status(ipItem, this.token, payload).toPromise();
                let status: String = responseStatus.body.status;
                status = status.toLowerCase();
                if (status.includes('conflict')) {
                    this.onError('billingWebApp.iot.itemCreated');
                    this.provisioningFinished = true;
                    item.status = ProvisionStatus.ERROR;
                    break;
                } else if (status.includes('success')) {
                    this.onSuccess('billingWebApp.iot.deviceCreatedAws');
                    this.saveItem(macAddress, ProvisionStatus.SUCCESS);
                    item.status = ProvisionStatus.SUCCESS;
                    this.provisioningFinished = true;
                    break;
                } else if (status.includes('failed')) {
                    item.status = ProvisionStatus.ERROR;
                    this.onError(status);
                    this.provisioningFinished = true;
                    break;
                } else if (
                    status === 'provisioning' ||
                    status === 'activating' ||
                    status === 'deploying fc' ||
                    status.includes('started deployment')
                ) {
                    item.status = ProvisionStatus.IN_PROGRESS;
                }
                await this.delay(60000);
            }
        } catch (Error) {
            this.onError('billingWebApp.iot.errorComunicationFCprovisioningService');
            this.provisioningFinished = true;
        }
    }

    private saveItem(macAddress: string, status: ProvisionStatus) {
        const kittedItem: KittedItem = new KittedItem();
        kittedItem.externalId = macAddress;
        kittedItem.kittedBy = this.kittedBy;
        kittedItem.tested = 'No';
        kittedItem.kitItemTypeId = 4;
        kittedItem.kittedDate = new Date().toISOString();
        kittedItem.provision = status;
        this.subscribeToSaveResponse(this.iotService.create(kittedItem));
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<KittedItem>>) {
        result.subscribe((res: HttpResponse<KittedItem>) => this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: KittedItem) {
        this.eventManager.broadcast({
            name: 'iotItemModification',
            content: 'Saved an IoT Item:' + result.id
        });
    }

    private onSaveError() {
        this.onError('billingWebApp.iot.GGFCErrorCreation');
    }

    private delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    private onError(error) {
        this.jhiAlertService.error(error, null, null);
    }

    private onSuccess(error) {
        this.jhiAlertService.success(error, null, null);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }
}

@Component({
    selector: 'jhi-iot-discover-devices-popup',
    template: ''
})
export class IotDiscoverDevicesPopupComponent implements OnInit, OnDestroy {
    routeSub: any;
    constructor(private route: ActivatedRoute, private iotPopupService: IotPopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.iotPopupService.open(IotDiscoverDevicesDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
