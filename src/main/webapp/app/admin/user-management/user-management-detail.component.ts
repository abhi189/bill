import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { User, UserService, ITEMS_PER_PAGE } from '../../shared';

@Component({
    selector: 'jhi-user-mgmt-detail',
    templateUrl: './user-management-detail.component.html'
})
export class UserMgmtDetailComponent implements OnInit, OnDestroy {
    user: User;
    activeIdString: string;
    utilitiesLoaded = false;
    loadingUserSites = false;
    userSitesError: string;
    itemsPerPage = ITEMS_PER_PAGE;
    currentSearch: string;
    page: number;
    userSites: Array<any> = [];
    private subscription: Subscription;
    predicate: any;
    totalItems: number;
    queryCount: any;
    previousPage: any;
    reverse: any;
    links: any;
    routeData: any;
    private sitesOwnedByUser: any;

    constructor(
        private userService: UserService,
        private route: ActivatedRoute,
        private jhiAlertService: JhiAlertService,
        private router: Router,
        private parseLinks: JhiParseLinks
    ) {
        this.userService.reloadUserSites$.subscribe(res => {
            if (res) {
                this.loadUtilities(this.user.login);
            }
        });
    }

    ngOnInit() {
        this.setRouteDefaults();
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['login']);
        });
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.activeIdString = 'userDetails';
    }
    setRouteDefaults() {
        this.page = 0;
        this.previousPage = 0;
        this.reverse = true;
        this.predicate = 'id';
    }

    dismissPopup() {}

    load(login) {
        this.userService.find(login).subscribe(response => {
            this.user = response.body;
        });
    }

    loadPage(page: number) {
        if (page - 1 !== this.previousPage) {
            this.previousPage = page;
            this.transition();
        }
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    transition() {
        this.previousPage = this.page - 1;
        this.loadAll();
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    loadUtilities(login: string) {
        const options = {
            page: this.page - 1,
            size: this.itemsPerPage,
            sort: this.sort()
        };

        if (this.currentSearch) {
            options['query'] = this.currentSearch;
            this.userService.searchUserSites(options, this.sitesOwnedByUser).subscribe(
                res => {
                    this.loadData(res);
                },
                err => {
                    this.userSitesError = err;
                    this.utilitiesLoaded = false;
                }
            );
        } else {
            this.userService.getSites(login, options).subscribe(
                res => {
                    this.loadData(res);
                    this.sitesOwnedByUser = res.body;
                    this.userService.setUserSites(res.body);
                },
                err => {
                    this.userSitesError = err;
                    this.utilitiesLoaded = false;
                }
            );
        }
    }

    loadData({ body, headers }) {
        this.utilitiesLoaded = false;
        this.totalItems = headers.get('X-Total-Count');
        this.queryCount = this.totalItems;
        this.userSites = body;
    }

    search(query) {
        if (!query) {
            return this.clear();
        }
        this.page = 0;
        this.currentSearch = query;
        this.loadAll();
    }

    clear() {
        this.currentSearch = '';
        this.page = 0;
        this.loadAll();
    }

    loadAll() {
        this.loadUtilities(this.user.login);
    }

    beforeTabChange($event: NgbTabChangeEvent) {
        if ($event.nextId === 'userSites' && this.utilitiesLoaded === false) {
            this.userSitesError = '';
            this.page = 0;
            this.loadingUserSites = true;
            this.loadUtilities(this.user.login);
        }
    }

    handleRemoveSiteClick(id: any) {
        this.userService.removeSite({ userId: this.user.id, budderflyId: id }).subscribe(
            res => {
                this.jhiAlertService.success('userManagement.removeSite', { param: id });
                this.loadUtilities(this.user.login);
            },
            err => {
                console.log('Error: ', err);
            }
        );
    }
}
