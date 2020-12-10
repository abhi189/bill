import { Component, OnInit, Input } from '@angular/core';
import { AmeActivitiesService } from './ame-activities.service';

@Component({
    selector: 'jhi-site-account-ame-activities',
    templateUrl: './site-account-ame-activities.component.html',
    styles: []
})
export class SiteAccountAmeActivitiesComponent implements OnInit {
    _ameId: number;
    get ameId(): number {
        return this._ameId;
    }

    @Input('ameId')
    set ameId(value: number) {
        this._ameId = value;
        this.getActivities();
    }

    ameActivities = [];

    constructor(private ameActivitiesService: AmeActivitiesService) {}

    ngOnInit() {}

    getActivities() {
        this.ameActivitiesService.getActivities(this.ameId).subscribe(
            result => {
                this.ameActivities = result.body;
            },
            error => console.log('Error while getting Activities', error)
        );
    }
}
