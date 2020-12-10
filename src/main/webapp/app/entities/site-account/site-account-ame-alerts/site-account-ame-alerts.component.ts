import { Component, OnInit, Input } from '@angular/core';
import { AmeAlertsService } from './ame-alerts.service';

@Component({
    selector: 'jhi-site-account-ame-alerts',
    templateUrl: './site-account-ame-alerts.component.html',
    styles: []
})
export class SiteAccountAmeAlertsComponent implements OnInit {
    _ameId: number;
    get ameId(): number {
        return this._ameId;
    }

    @Input('ameId')
    set ameId(value: number) {
        this._ameId = value;
        this.getAlerts();
    }

    ameIssues = [];

    constructor(private ameAlertsService: AmeAlertsService) {}

    ngOnInit() {
        this.getAlerts();
    }

    getAlerts() {
        this.ameAlertsService.getAlerts(this.ameId).subscribe(
            result => {
                this.ameIssues = result.body;
            },
            error => console.log('Error while deleting AmeIssues', error)
        );
    }

    deleteAlerts() {
        this.ameAlertsService.deleteAlerts(this.ameId).subscribe(
            result => {
                // clear the array if we get the response
                this.ameIssues = [];
            },
            error => console.log('Error while deleting AmeIssues', error)
        );
    }
}
