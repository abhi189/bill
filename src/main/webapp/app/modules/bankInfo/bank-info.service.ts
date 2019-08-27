import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { delay, flatMap } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
const routingNumbersData = require('../../shared/static/routing-numbers.json');

@Injectable({ providedIn: 'root' })
export class BankingInfo {
    private routingNumberById: any = {};
    private routingNumbers: any = [];
    private storeUpdate: Subject<any> = new Subject<any>();
    public storeUpdate$ = this.storeUpdate.asObservable();

    constructor(private http: HttpClient) {}

    updateStore(store) {
        this.storeUpdate.next(store);
    }

    constructRoutingById() {
        this.routingNumbers = routingNumbersData;
        this.routingNumbers.forEach((routingObj: any = {}) => {
            const { routingNumber } = routingObj;

            if (!this.routingNumberById[routingNumber]) {
                this.routingNumberById[routingNumber] = routingObj;
            }
        });
    }

    getRoutingNumbers(): Observable<any> {
        return this.http.get('../../shared/static/routing-numbers.json');
    }

    findRoutingNumberById(routingNumber: string) {
        if (this.routingNumberById[routingNumber]) {
            return this.routingNumberById[routingNumber];
        }
        return undefined;
    }

    getStoreInfoById(storeNo: string): Observable<any> {
        return this.http.get(`${SERVER_API_URL}/injobs/api/sites/sites-by-budderfly-id/${storeNo}`);
    }

    getParams(data) {
        const params = new HttpParams();

        for (const prop in data) {
            if (data.hasOwnProperty(prop)) {
                params.set(prop, data[prop]);
            }
        }
        return params;
    }

    updateAllAutoPayStores(data): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        return this.http.post(`${SERVER_API_URL}/accounting/api/add-all-autopay-bank-details/`, data, { headers });
    }

    updateStoreAutoPay(data): Observable<any> {
        return this.updateAutopayNet(data).pipe(
            flatMap(res => {
                if (parseInt(res, 10) === Number(res)) {
                    const { budderflyId, id } = data;
                    return this.updateAutoPayLocalDB({ paymentType: 'ETF', budderflyId, id });
                }
                throw Error('Update Failed');
            })
        );
    }

    updateAutoPayLocalDB({ paymentType, id, budderflyId }): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        const body = { paymentType, id };

        return this.http.put(`${SERVER_API_URL}/sites/api/sites/portal/${budderflyId}`, body, { headers });
    }

    updateAutopayNet(data): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        return this.http.post(`${SERVER_API_URL}/accounting/api/add-autopay-bank-details/`, data, { headers });

        // return from(storeIds).pipe(
        //     mergeMap(storeId => {
        //         data = {
        //             ...data,
        //             budderflyId: storeId
        //         };
        //         return this.http.post(`${SERVER_API_URL}/accounting/api/add-autopay-bank-details/`, data, { headers });
        //     })
        // );

        // const requests = storeIds.map(storeId => {
        //     const request = {
        //         ...data,
        //         budderflyId: storeId
        //     };
        //     return {
        //         url: `${SERVER_API_URL}/accounting/api/add-autopay-bank-details/`,
        //         body: request,
        //         header: { headers }
        //     };
        // });

        // console.log('Requests: ', requests);

        // const responses$ = from(requests)
        //     .pipe(
        //         map((option: any, index: number) => {
        //             return this.http.post(option.url, option.body, option.header);
        //         })
        //     )
        //     .pipe(concatAll())
        //     .pipe(toArray());

        // return responses$;

        // of(storeInfo).pipe(
        //     concatMap(store => this.http.post(`${SERVER_API_URL}/accounting/api/add-autopay-bank-details/`, store, { headers }))
        // ).subscribe(
        //     res => console.log('Res: ', res),
        //     err => console.log('Err: ', err)
        // );

        // const postCalls = storeIds.map(storeId => {
        //     data = {
        //         ...data,
        //         budderflyId: storeId
        //     };
        //     return this.http.post(`${SERVER_API_URL}/accounting/api/add-autopay-bank-details/`, data, { headers });
        // });

        // return forkJoin(postCalls);
    }
}
