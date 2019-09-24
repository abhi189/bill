import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PortalSharedModule } from 'app/shared';
import { ModulesRoutes } from './modules.route';

@NgModule({
    imports: [PortalSharedModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ModulesModule {}
