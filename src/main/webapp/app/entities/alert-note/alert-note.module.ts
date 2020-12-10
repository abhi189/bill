import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BillingWebSharedModule } from '../../shared';
import {
    AlertNoteService,
    AlertNotePopupService,
    AlertNoteComponent,
    AlertNoteDetailComponent,
    AlertNoteDialogComponent,
    AlertNotePopupComponent,
    AlertNoteDeletePopupComponent,
    AlertNoteDeleteDialogComponent,
    alertNoteRoute,
    alertNotePopupRoute,
    AlertNoteResolvePagingParams
} from './';

const ENTITY_STATES = [...alertNoteRoute, ...alertNotePopupRoute];

@NgModule({
    imports: [BillingWebSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        AlertNoteComponent,
        AlertNoteDetailComponent,
        AlertNoteDialogComponent,
        AlertNoteDeleteDialogComponent,
        AlertNotePopupComponent,
        AlertNoteDeletePopupComponent
    ],
    entryComponents: [
        AlertNoteComponent,
        AlertNoteDialogComponent,
        AlertNotePopupComponent,
        AlertNoteDeleteDialogComponent,
        AlertNoteDeletePopupComponent
    ],
    providers: [AlertNoteService, AlertNotePopupService, AlertNoteResolvePagingParams],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BillingWebAlertNoteModule {}
