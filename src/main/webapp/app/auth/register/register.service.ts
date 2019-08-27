import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';

@Injectable({ providedIn: 'root' })
export class Register {
    constructor(private http: HttpClient) {}

    mockSave(account: any): Observable<any> {
        return new Observable(observer => {
            setTimeout(() => {
                observer.next(account);
            }, 1000);
        });
    }

    save(account: any): Observable<any> {
        return this.http.post(SERVER_API_URL + `authenticate/api/send-register-for-portal?email=${account.email}`, {});
    }
}
