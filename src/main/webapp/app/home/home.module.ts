import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PortalSharedModule } from 'app/shared';
import { HomeAuthModule } from '../auth/auth.module';
import { HOME_ROUTE, HomeComponent } from './';

@NgModule({
    imports: [PortalSharedModule, HomeAuthModule, RouterModule.forChild([HOME_ROUTE])],
    declarations: [HomeComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PortalHomeModule {}
