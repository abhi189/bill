import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { BudderflyInvoiceValidationComponent } from './budderfly-invoice-validation.component';
import { BudderflyInvoiceValidationDetailComponent } from './budderfly-invoice-validation-detail.component';
import { BudderflyInvoiceValidationPopupComponent } from './budderfly-invoice-validation-dialog.component';
import { BudderflyInvoiceValidationDeletePopupComponent } from './budderfly-invoice-validation-delete-dialog.component';

@Injectable()
export class BudderflyInvoiceValidationResolvePagingParams implements Resolve<any> {
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

export const budderflyInvoiceValidationRoute: Routes = [
    {
        path: 'budderfly-invoice-validation',
        component: BudderflyInvoiceValidationComponent,
        resolve: {
            pagingParams: BudderflyInvoiceValidationResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.budderflyInvoiceValidation.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'budderfly-invoice-validation/:id',
        component: BudderflyInvoiceValidationDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.budderflyInvoiceValidation.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const budderflyInvoiceValidationPopupRoute: Routes = [
    {
        path: 'budderfly-invoice-validation-new',
        component: BudderflyInvoiceValidationPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.budderflyInvoiceValidation.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'budderfly-invoice-validation/:id/edit',
        component: BudderflyInvoiceValidationPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.budderflyInvoiceValidation.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'budderfly-invoice-validation/:id/delete',
        component: BudderflyInvoiceValidationDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.budderflyInvoiceValidation.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
