import { Component, Input } from '@angular/core';

@Component({
    selector: 'jhi-dashboard-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class DashboardSidebarComponent {
    @Input() layoutOptions;
    constructor() {}
}
