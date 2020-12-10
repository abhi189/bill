import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

@Injectable()
export class PasswordService {
    constructor(private http: HttpClient) {}

    save(payload: any): Observable<any> {
        return this.http.post(SERVER_API_URL + 'authenticate/api/account/change-password', payload);
    }
}
