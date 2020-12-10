import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { INVENTORY_SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Monitor } from './site.model';

@Injectable()
export class MonitorService {
    private resourceUrl = INVENTORY_SERVER_API_URL + 'api/monitors';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) {}

    getMonitorsByEquipmentId(equipmentId: number): Observable<HttpResponse<Monitor[]>> {
        return this.http
            .get<Monitor[]>(`${this.resourceUrl}/by-equipment/${equipmentId}`, { observe: 'response' })
            .map((res: HttpResponse<Monitor[]>) => this.convertArrayResponse(res));
    }

    private convertArrayResponse(res: HttpResponse<Monitor[]>): HttpResponse<Monitor[]> {
        const jsonResponse: Monitor[] = res.body;
        const body: Monitor[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({ body });
    }

    /**
     * Convert a returned JSON object to AlertMs.
     */
    private convertItemFromServer(monitor: Monitor): Monitor {
        const copy: Monitor = Object.assign({}, monitor);
        return copy;
    }

    /**
     * Convert a Site to a JSON which can be sent to the server.
     */
    private convert(monitor: Monitor): Monitor {
        const copy: Monitor = Object.assign({}, monitor);
        return copy;
    }
}
