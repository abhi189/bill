import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { ITEMS_PER_PAGE, Principal, User, UserService } from '../../shared';

@Component({
    selector: 'jhi-user-mgmt',
    templateUrl: './user-management.component.html'
})
export class UserMgmtComponent implements OnInit, OnDestroy {
    currentAccount: any;
    users: User[];
    error: any;
    success: any;
    routeData: any;
    links: any;
    totalItems: any;
    queryCount: any;
    itemsPerPage: any;
    page: any;
    predicate: any;
    currentSearch: string;
    userResults: any;
    searchUsers: Array<any> = [];
    userResultsError: any;
    previousPage: any;
    reverse: any;

    constructor(
        private userService: UserService,
        private jhiAlertService: JhiAlertService,
        private principal: Principal,
        private parseLinks: JhiParseLinks,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private eventManager: JhiEventManager
    ) {
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.routeData = this.activatedRoute.data.subscribe(data => {
            this.page = data['pagingParams'].page;
            this.previousPage = data['pagingParams'].page;
            this.reverse = data['pagingParams'].ascending;
            this.predicate = data['pagingParams'].predicate;
        });
    }

    ngOnInit() {
        this.principal.identity().then(account => {
            this.currentAccount = account;
            this.loadAll();
            this.registerChangeInUsers();
        });
    }

    ngOnDestroy() {
        this.routeData.unsubscribe();
    }

    registerChangeInUsers() {
        this.eventManager.subscribe('userListModification', response => this.loadAll());
    }

    setActive(user, isActivated) {
        user.activated = isActivated;

        this.userService.update(user).subscribe(response => {
            if (response.status === 200) {
                this.error = null;
                this.success = 'OK';
                this.loadAll();
            } else {
                this.success = null;
                this.error = 'ERROR';
            }
        });
    }

    loadAll() {
        if (this.currentSearch) {
            const options = {
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            };
            options['query'] = this.currentSearch;
            this.userService.searchUsers(options, this.userResults).subscribe(
                res => {
                    this.loadData(res);
                },
                err => {
                    this.userResultsError = err;
                }
            );
            return;
        }

        this.userService
            .query({
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(
                (res: HttpResponse<User[]>) => this.onSuccess(res.body, res.headers),
                (res: HttpResponse<any>) => this.onError(res.body)
            );
    }

    loadData({ body, headers }) {
        this.totalItems = headers.get('X-Total-Count');
        this.queryCount = this.totalItems;
        this.users = body;
    }

    search(query) {
        if (!query) {
            return this.clear();
        }
        this.currentSearch = query;
        this.page = 0;
        this.loadAll();
    }

    clear() {
        this.currentSearch = '';
        this.page = 0;
        this.loadAll();
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    loadPage(page: number) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.transition();
        }
    }

    transition() {
        this.router.navigate(['/user-management'], {
            queryParams: {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        });
        this.loadAll();
    }

    sendResetLink(user: any) {
        if (user.email) {
            this.userService.sendResetLink(user.email).subscribe(
                res => {
                    // this.eventManager.broadcast({ name: 'userListModification', content: 'Password a user'});
                    this.jhiAlertService.success('userManagement.resetLink', { param: user.email });
                },
                err => {
                    console.log('Error: ', err);
                }
            );
        }
    }

    private onSuccess(data, headers) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        this.queryCount = this.totalItems;
        this.users = data;
    }

    private onError(error) {
        this.jhiAlertService.error(error.error, error.message, null);
    }
}
