import { Route } from '@angular/router';

import { InvoicesComponent } from './invoices.component';

export const INVOICES_ROUTE: Route = {
    path: '',
    component: InvoicesComponent,
    data: {
        authorities: [],
        pageTitle: 'home.title'
    }
};
