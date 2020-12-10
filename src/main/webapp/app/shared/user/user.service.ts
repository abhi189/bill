import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { SERVER_API_URL } from '../../app.constants';
import { User } from './user.model';
import { createRequestOption } from '../model/request-util';

@Injectable()
export class UserService {
    private resourceUrl = SERVER_API_URL + 'authenticate/api/users';
    private userSites: any = [];

    private reloadUserSites: Subject<any> = new Subject();
    public reloadUserSites$ = this.reloadUserSites.asObservable();

    constructor(private http: HttpClient) {}

    hitReloadUserSites(reload: boolean) {
        this.reloadUserSites.next(reload);
    }

    create(user: User): Observable<HttpResponse<User>> {
        return this.http.post<User>(this.resourceUrl, user, { observe: 'response' });
    }

    update(user: User): Observable<HttpResponse<User>> {
        return this.http.put<User>(this.resourceUrl, user, { observe: 'response' });
    }

    find(login: string): Observable<HttpResponse<User>> {
        return this.http.get<User>(`${this.resourceUrl}/${login}`, { observe: 'response' });
    }

    sendResetLink(email: string): Observable<HttpResponse<any>> {
        return this.http.post(`${SERVER_API_URL}authenticate/api/account/reset-password/init`, email, { observe: 'response' });
    }

    query(req?: any): Observable<HttpResponse<User[]>> {
        const options = createRequestOption(req);
        return this.http.get<User[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(login: string): Observable<HttpResponse<any>> {
        return this.http.delete(`${this.resourceUrl}/${login}`, { observe: 'response' });
    }

    removeSite(options: any): Observable<HttpResponse<any>> {
        return this.http.delete(
            `${SERVER_API_URL}authenticate/api/user-sites/by-login-id/${options.userId}?budderflyId=${options.budderflyId}`,
            { observe: 'response' }
        );
    }

    authorities(): Observable<string[]> {
        return this.http.get<string[]>(SERVER_API_URL + 'authenticate/api/users/authorities');
    }

    getSites(login: string, options: any): Observable<HttpResponse<JSON[]>> {
        const params = createRequestOption(options);
        return this.http.get<JSON[]>(`${SERVER_API_URL}/sites/api/sites/by-authenticate-login/${login}`, { params, observe: 'response' });
    }

    searchUserSites(options: any, userSites: any): Observable<HttpResponse<JSON>> {
        const params = createRequestOption(options);
        return this.http.post<JSON>(`${SERVER_API_URL}/sites/api/_search/owned-by-contacts/true`, userSites, {
            observe: 'response',
            params
        });
    }
    getContactByEmail(email: string): Observable<HttpResponse<JSON>> {
        return this.http.get<JSON>(`${SERVER_API_URL}/sites/api/contacts/by-email/${email}`, { observe: 'response' });
    }

    updateSites(site: any): Observable<HttpResponse<JSON>> {
        return this.http.post<JSON>(`${SERVER_API_URL}/authenticate/api/user-sites/`, site, { observe: 'response' });
    }

    searchUsers(options: any, searchUsers: any): Observable<HttpResponse<JSON>> {
        let query = '';

        if (options.query) {
            query = `${options.query}`;
            delete options.query;
        }
        const params = createRequestOption(options);

        return this.http.get<JSON>(`${SERVER_API_URL}authenticate/api/_search/users/${query}`, { observe: 'response', params });
    }

    setUserSites(sites: any = []) {
        this.userSites = sites;
    }

    getUserSites() {
        return this.userSites;
    }
}
