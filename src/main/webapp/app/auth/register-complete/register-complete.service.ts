import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';

@Injectable({ providedIn: 'root' })
export class RegisterCompleteService {
    constructor(private http: HttpClient) {}

    mockSave(account: any): Observable<any> {
        return new Observable(observer => {
            setTimeout(() => {
                observer.next(account);
            }, 1000);
        });
    }

    validateToken(token: string) {
        return this.http.post(SERVER_API_URL + 'authenticate/api/register/token/' + token, { withCredentials: true });
    }

    save(account: any): Observable<any> {
        return this.http.post(SERVER_API_URL + 'authenticate/api/register-portal-user', account);
    }

    parseJwt(token) {
        const base64Url = token.split('.')[1];
        const base64 = decodeURIComponent(
            atob(base64Url)
                .split('')
                .map(function(c) {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                })
                .join('')
        );
        console.log(JSON.parse(base64));
        return JSON.parse(base64);
    }
}
