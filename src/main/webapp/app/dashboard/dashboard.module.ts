import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PortalSharedModule } from 'app/shared';
import { ModulesModule } from '../modules/modules.module';
import { DashboardComponent } from './dashboard.component';
import { DashboardNavbarComponent } from './components/navbar/navbar.component';
import { DashboardSidebarComponent } from './components/sidebar/sidebar.component';
import { DashboardInvoiceComponent } from './components/invoices/invoice.component';
import { DashboardListComponent } from './components/list/list.component';
import { DashboardRoutes } from './dashboard.route';

@NgModule({
    imports: [PortalSharedModule, ModulesModule, CommonModule, RouterModule.forChild(DashboardRoutes)],
    declarations: [
        DashboardNavbarComponent,
        DashboardSidebarComponent,
        DashboardComponent,
        DashboardInvoiceComponent,
        DashboardListComponent
    ],
    exports: [DashboardNavbarComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DashboardModule {}
