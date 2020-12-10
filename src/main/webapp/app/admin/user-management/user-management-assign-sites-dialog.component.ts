import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';
import { Subscription } from 'rxjs/Subscription';

import { SiteService } from '../../entities/site//site.service';
import { Site } from '../../entities/site/site.model';
import { UserModalService } from './user-modal.service';
import { User, Principal, UserService } from '../../shared';
import { ExcelService } from '../../shared/service/excel.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'jhi-user-mgmt-dialog',
    templateUrl: './user-management-assign-sites-dialog.component.html'
})
export class UserMgmtAssignSiteDialogComponent implements OnInit, OnDestroy {
    user: User;
    currentAccount: any;
    languages: any[];
    authorities: any[];
    sites: Site[];
    error: any;
    success: any;
    currentSearch: string;
    eventSubscriber: Subscription;
    routeData: any;
    links: any;
    login: string;
    totalItems: any;
    queryCount: any;
    itemsPerPage: any = 20;
    page: number;
    predicate: any;
    previousPage: any;
    reverse: any;
    isSaving: any;
    updatingSite: boolean;
    selectedSites: any = [];

    excelFileName = 'SitesList';

    constructor(
        public activeModal: NgbActiveModal,
        private siteService: SiteService,
        private parseLinks: JhiParseLinks,
        private router: Router,
        private route: ActivatedRoute,
        private userService: UserService,
        private principal: Principal,
        private eventManager: JhiEventManager,
        private excelService: ExcelService,
        private jhiAlertService: JhiAlertService
    ) {
        this.route.params.subscribe(params => {
            this.load(params['login']);
        });
    }

    loadAll() {
        if (this.currentSearch) {
            const userSites = this.userService.getUserSites();

            this.siteService
                .searchByContact(
                    {
                        page: this.page - 1,
                        query: this.currentSearch,
                        size: this.itemsPerPage,
                        sort: this.sort()
                    },
                    userSites
                )
                .subscribe(
                    (res: HttpResponse<Site[]>) => this.onSuccess(res.body, res.headers),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.siteService
            .queryWithoutUser(
                {
                    page: this.page - 1,
                    size: this.itemsPerPage,
                    sort: this.sort()
                },
                this.user.login
            )
            .subscribe(
                (res: HttpResponse<Site[]>) => this.onSuccess(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }
    load(login) {
        this.userService.find(login).subscribe(response => {
            // this.user = response.body;
        });
    }
    loadPage(page: number) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.callBack();
        }
    }
    callBack() {
        this.loadAll();
    }
    redirectToSite(siteId: number) {
        this.clear();
        setTimeout(() => {
            this.router.navigate([`/site/${siteId}`]);
        }, 0);
    }

    clear() {
        this.userService.hitReloadUserSites(true);
        this.currentSearch = '';
        this.page = 0;
        this.activeModal.dismiss('cancel');
    }
    search(query) {
        if (!query) {
            return this.clear();
        }
        this.currentSearch = query;
        this.loadAll();
    }
    ngOnInit() {
        this.page = 0;
        this.predicate = 'id';
        this.reverse = true;
        this.login = this.route.snapshot.params['login'];
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        // this.registerChangeInSites();
    }

    ngOnDestroy() {
        if (this.eventSubscriber) {
            this.eventManager.destroy(this.eventSubscriber);
        }
    }

    trackId(index: number, item: Site) {
        return item.id;
    }

    handleAssignCheck(event, site) {
        if (site && this.selectedSites.length) {
            const storeIndex = this._getSelectedSiteIndex(site);
            if (storeIndex > -1) {
                this.selectedSites.splice(storeIndex, 1);
                return;
            }
        }
        this.selectedSites = [...this.selectedSites, site];
    }

    assignSites() {
        if (this.selectedSites.length) {
            this.updatingSite = true;
            const sitesUpdated = this.selectedSites.map(site => {
                return {
                    userId: this.user.id,
                    budderflyId: site.budderflyId
                };
            });

            sitesUpdated.reduce((promise, task, index) => {
                return promise.then(() => {
                    return this.userService.updateSites(task).subscribe(
                        res => {
                            if (index === sitesUpdated.length - 1) {
                                this.loadAll();
                                this.updatingSite = false;
                                this.selectedSites = [];
                            }
                            console.log('Res: ', res);
                        },
                        err => console.log('Error: ', err)
                    );
                });
            }, Promise.resolve());
        }
    }

    private _getSelectedSiteIndex(site): number {
        if (!this.selectedSites.length) {
            return -1;
        }
        let siteSelectedIndex = -1,
            i = 0;
        const len = this.selectedSites.length;

        for (; i < len; i += 1) {
            const selectedSite = this.selectedSites[i];

            if (site.budderflyId === selectedSite.budderflyId) {
                siteSelectedIndex = i;
                break;
            }
        }
        return siteSelectedIndex;
    }

    handleAssignSite(site: any) {
        this.userService.getContactByEmail(this.user.email).subscribe(
            res => {
                this.updateSite(site, res.body[0]);
            },
            err => {
                console.log('Error: ', err);
            }
        );
    }

    updateSite(site: any, response: any) {
        site['siteContact'] = response.id;

        this.userService.updateSites(site).subscribe(
            res => {
                console.log('Res: ', res);
            },
            err => {
                console.log('Error: ', err);
            }
        );
    }

    registerChangeInSites() {
        this.eventSubscriber = this.eventManager.subscribe('siteListModification', response => this.loadAll());
    }

    sort() {
        const result = [this.predicate || 'id' + ',' + (this.reverse ? 'asc' : 'desc')];
        return result;
    }

    exportAsXLSX(): void {
        this.siteService.getAllinJSON().subscribe((res: HttpResponse<JSON[]>) => {
            this.excelService.exportAsExcelFile(res.body, this.excelFileName);
        });
    }

    private onSuccess(data, headers) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        this.queryCount = this.totalItems;
        this.sites = data;
    }
    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-user-dialog',
    template: ''
})
export class UserAssignSitesDialogComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private userModalService: UserModalService) {
        this.routeSub = this.route.params.subscribe(params => {
            if (params['login']) {
                this.userModalService.open(UserMgmtAssignSiteDialogComponent as Component, params['login'], 'xl');
            } else {
                this.userModalService.open(UserMgmtAssignSiteDialogComponent as Component, 'xl');
            }
        });
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if (params['login']) {
                // this.userModalService.open(UserMgmtAssignSiteDialogComponent as Component, params['login']);
            } else {
                // this.userModalService.open(UserMgmtAssignSiteDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
