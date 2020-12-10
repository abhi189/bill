import { IotService } from './iot.service';
import { RouterModule } from '@angular/router';
import { IotComponent } from './iot.component';
import { BillingWebSharedModule } from '../../shared';
import { IotPopupService } from './iot-popup.service';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IotResolvePagingParams, iotRoute, iotPopupRoute } from './iot.route';
import { IotDialogComponent, IotPopupComponent } from './iot-dialog.component';
import { IotDeleteDialogComponent, IotDeletePopupComponent } from './iot-delete-dialog.component';
import { IotDiscoverDevicesPopupComponent, IotDiscoverDevicesDialogComponent } from './iot-discover-devices-popup.component';

const ENTITY_STATES = [...iotRoute, ...iotPopupRoute];

@NgModule({
    imports: [BillingWebSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        IotComponent,
        IotDeleteDialogComponent,
        IotDeletePopupComponent,
        IotPopupComponent,
        IotDialogComponent,
        IotDiscoverDevicesPopupComponent,
        IotDiscoverDevicesDialogComponent
    ],
    entryComponents: [
        IotComponent,
        IotDeleteDialogComponent,
        IotDeletePopupComponent,
        IotPopupComponent,
        IotDialogComponent,
        IotDiscoverDevicesPopupComponent,
        IotDiscoverDevicesDialogComponent
    ],
    providers: [IotResolvePagingParams, IotPopupService, IotService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BillingWebIotModule {}
