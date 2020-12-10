import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { AlertNoteComponent } from './alert-note.component';
import { AlertNoteDetailComponent } from './alert-note-detail.component';
import { AlertNotePopupComponent } from './alert-note-dialog.component';
import { AlertNoteDeletePopupComponent } from './alert-note-delete-dialog.component';

@Injectable()
export class AlertNoteResolvePagingParams implements Resolve<any> {
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

export const alertNoteRoute: Routes = [
    {
        path: 'alert-note',
        component: AlertNoteComponent,
        resolve: {
            pagingParams: AlertNoteResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.alertNote.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'alert-note/:id',
        component: AlertNoteDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.alertNote.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const alertNotePopupRoute: Routes = [
    {
        path: 'alert-note-new',
        component: AlertNotePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.alertNote.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'alert-note/:id/edit',
        component: AlertNotePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.alertNote.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'alert-note/:id/delete',
        component: AlertNoteDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.alertNote.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
