import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';
import { SiteConfigurationsService } from './site-configurations.service';
import { SiteAlertType, SiteNoticeType } from './site-configurations.model';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'jhi-site-configurations',
    templateUrl: './site-configurations.component.html',
    styles: []
})
export class SiteConfigurationsComponent implements OnInit {
    _bfUuid: string;
    get bfUuid(): string {
        return this._bfUuid;
    }

    @Input('bfUuid')
    set bfUuid(value: string) {
        this._bfUuid = value;
    }

    siteAlertTypes: SiteAlertType[] = [];
    siteNoticeTypes: SiteNoticeType[] = [];

    constructor(private siteConfigurationsService: SiteConfigurationsService, private jhiAlertService: JhiAlertService) {}

    ngOnInit() {
        this.siteConfigurationsService
            .getAlertConfigurationsByBfUuid(this._bfUuid)
            .subscribe(
                (res: HttpResponse<SiteAlertType[]>) => this.onAlertSuccess(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        this.siteConfigurationsService
            .getNoticeConfigurationsByBfUuid(this._bfUuid)
            .subscribe(
                (res: HttpResponse<SiteNoticeType[]>) => this.onNoticeSuccess(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

    private onAlertSuccess(data, headers) {
        this.siteAlertTypes = data;
    }

    private onNoticeSuccess(data, headers) {
        this.siteNoticeTypes = data;
    }

    onAlertChange(event) {
        this.siteConfigurationsService
            .updateAlertConfigurations(event)
            .subscribe((res: HttpResponse<SiteNoticeType>) => res.body, (res: HttpErrorResponse) => this.onError(res.message));
    }

    onNoticeChange(event) {
        this.siteConfigurationsService
            .updateNoticeConfigurations(event)
            .subscribe((res: HttpResponse<SiteNoticeType>) => res.body, (res: HttpErrorResponse) => this.onError(res.message));
    }

    getTranslateType(type: string) {
        return 'billingWebApp.site.configurations.' + type;
    }

    getAlertId(id: number) {
        return 'alert-' + id;
    }

    getNoticeId(id: number) {
        return 'notice-' + id;
    }
}
