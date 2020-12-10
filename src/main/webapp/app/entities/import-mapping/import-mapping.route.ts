import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ImportMappingComponent } from './import-mapping.component';
import { JhiPaginationUtil } from 'ng-jhipster';
import { Injectable } from '@angular/core';

@Injectable()
export class ImportMappingResolvePagingParams implements Resolve<any> {
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

export const importMappingRoute: Routes = [
    {
        path: 'import-mapping',
        component: ImportMappingComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.importMapping.home.title'
        },
        resolve: {
            pagingParams: ImportMappingResolvePagingParams
        },
        canActivate: [UserRouteAccessService]
    }
];
