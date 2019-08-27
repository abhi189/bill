import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InvoicesComponent } from './invoices.component';
import { INVOICES_ROUTE } from './invoices.route';

@NgModule({
    imports: [RouterModule.forChild([INVOICES_ROUTE])],
    declarations: [InvoicesComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InvoicesModule {}
