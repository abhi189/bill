import { Injectable } from '@angular/core';
import { IotComponent } from './iot.component';
import { JhiPaginationUtil } from 'ng-jhipster';
import { UserRouteAccessService } from '../../shared';
import { IotPopupComponent } from './iot-dialog.component';
import { IotDeletePopupComponent } from './iot-delete-dialog.component';
import { IotDiscoverDevicesPopupComponent } from './iot-discover-devices-popup.component';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

@Injectable()
export class IotResolvePagingParams implements Resolve<any> {
    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
        };
    }
}

export const iotRoute: Routes = [
    {
        path: 'iot',
        component: IotComponent,
        resolve: {
            pagingParams: IotResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.iot.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const iotPopupRoute: Routes = [
    {
        path: 'iot-new',
        component: IotPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.iot.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'iot-discovery',
        component: IotDiscoverDevicesPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.iot.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'iot/:id/edit',
        component: IotPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.iot.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'iot/:id/delete',
        component: IotDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.iot.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
