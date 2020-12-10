import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { InvoiceUploadComponent } from './invoice-upload.component';
import { InvoiceUploadPopupComponent } from './invoice-upload-dialog.component';
import { InvoiceUploadDeletePopupComponent } from './invoice-upload-delete-dialog.component';

@Injectable()
export class InvoiceUploadResolvePagingParams implements Resolve<any> {
    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,desc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
        };
    }
}

export const invoiceUploadRoute: Routes = [
    {
        path: 'invoice-upload',
        component: InvoiceUploadComponent,
        resolve: {
            pagingParams: InvoiceUploadResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.invoiceUpload.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const invoiceUploadPopupRoute: Routes = [
    {
        path: 'invoice-upload-new',
        component: InvoiceUploadPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.invoiceUpload.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    } /*, we may want to delete files in the future
    {
        path: 'invoice-upload/:id/delete',
        component: InvoiceUploadDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.invoiceUpload.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }*/
];
