import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MainService {
    private layoutData: any;
    private domain: string;
    public layoutOptions: any;

    constructor(private http: HttpClient) {}

    getLayout() {
        const options = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        const domain = this.getDomain();
        const observable = this.http.get(`https://d3rbhwp8vebia6.cloudfront.net/home.main.web/branding-sources/${domain}.json`, {
            observe: 'response'
        });

        return new Promise((resolve, reject) => {
            observable.subscribe(layoutOptions => {
                this.layoutOptions = layoutOptions.body;
                resolve(layoutOptions.body);
            });
        });
    }

    setLayoutByDomain(layoutData) {
        this.layoutData = layoutData;
        this.domain = this.getDomain();
    }

    getLayoutByDomain() {
        return this.layoutData[this.domain];
    }

    getDomain() {
        const hostName = window.location.hostname;

        if (hostName && (hostName.search('cadderpillar') > -1 || hostName.search('zippyyum') > -1)) {
            return 'cadderpillar';
        }
        return 'budderfly';
    }
}
