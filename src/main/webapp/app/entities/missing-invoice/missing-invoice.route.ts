import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { MissingInvoiceComponent } from './missing-invoice.component';
import { MissingInvoiceDetailComponent } from './missing-invoice-detail.component';
import { MissingInvoicePopupComponent } from './missing-invoice-dialog.component';
import { MissingInvoiceDeletePopupComponent } from './missing-invoice-delete-dialog.component';

@Injectable()
export class MissingInvoiceResolvePagingParams implements Resolve<any> {
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

export const missingInvoiceRoute: Routes = [
    {
        path: 'missing-invoice',
        component: MissingInvoiceComponent,
        resolve: {
            pagingParams: MissingInvoiceResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.missingInvoice.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'missing-invoice/:id',
        component: MissingInvoiceDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.missingInvoice.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const missingInvoicePopupRoute: Routes = [
    {
        path: 'missing-invoice-new',
        component: MissingInvoicePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.missingInvoice.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'missing-invoice/:id/edit',
        component: MissingInvoicePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.missingInvoice.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'missing-invoice/:id/delete',
        component: MissingInvoiceDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.missingInvoice.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
