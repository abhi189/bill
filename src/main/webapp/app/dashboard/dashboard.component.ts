import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, Event, PRIMARY_OUTLET, RoutesRecognized, ActivationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { map, mergeMap, buffer, pluck } from 'rxjs/internal/operators';
import { Dashboard } from './dashboard.service';
import { AccountService, UserService, User } from 'app/core';

@Component({
    selector: 'jhi-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
    public sideBarVisible: boolean;
    public showSuccessModal: boolean;
    // public breadcrumbs$: Observable<any>;
    public breadcrumbs: Array<any> = [];
    public showStoresList: boolean;
    public storesUpdated = [];
    public enableCloseUpdate: boolean;
    private storesUpdateSubscriber;
    private updateModalSubscriber;
    private navigationSubscription;

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private dashboard: Dashboard,
        private accountService: AccountService
    ) {
        const that = this;
        this.storesUpdateSubscriber = this.dashboard.storesUpdated$.subscribe(
            store => {
                that.constructUpdatedStores(store);
            },
            err => {
                console.log('Error: ', err);
            },
            () => {
                this.enableCloseUpdate = true;
            }
        );
        this.updateModalSubscriber = this.dashboard.openUpdateModal$.subscribe(res => (this.showSuccessModal = res));
        this.navigationSubscription = this.router.events.subscribe(e => {
            if (e instanceof NavigationEnd) {
                this.reinitializeData(e);
            }
        });
    }

    ngOnInit() {
        this.showSuccessModal = false;
        this.accountService.identity().then(account => {
            // if (!account) {
            //     this.router.navigate(['/']);
            // }
        });
        this.showStoresList = true;
        this.sideBarVisible = true;
        this.setBreadCrumbs();
    }

    ngOnDestroy() {
        this.showStoresList = false;
        this.sideBarVisible = false;
        if (this.storesUpdateSubscriber) {
            this.storesUpdateSubscriber.unsubscribe();
        }
        if (this.updateModalSubscriber) {
            this.updateModalSubscriber.unsubscribe();
        }
    }

    constructUpdatedStores(store) {
        if (this.storesUpdated.length) {
            let storeExists = false;

            for (let i = 0, len = this.storesUpdated.length; i < len; i += 1) {
                const storeUpdated = this.storesUpdated[i];

                if (storeUpdated.storeId === store.storeId) {
                    storeExists = true;
                    break;
                }
            }
            if (!storeExists) {
                this.storesUpdated.push(store);
            }
        } else {
            this.storesUpdated.push(store);
        }
    }

    reinitializeData(event) {
        console.log('Event: ', event);
    }

    closeStoreUpdateModal() {
        this.dashboard.openStoreUpdateModal(false);
        if (typeof location.reload === 'function') {
            location.reload();
        } else {
            this.showStoresListTable();
            this.dashboard.clearSelectedStores();
            this.router.navigate(['main']);
        }
        // window.location.href = '/main';
    }

    setBreadCrumbs(): void {
        const navigationEnd$ = this.router.events.pipe(filter(event => event instanceof NavigationEnd));

        // this.breadcrumbs$ = of([1, 2, 3, 4, 5]);
        this.router.events
            .pipe(
                filter(ev => ev instanceof ActivationEnd),
                pluck('snapshot'),
                pluck('data'),
                buffer(navigationEnd$),
                map((bcData: any[]) => bcData.reverse())
            )
            .subscribe(breadcrumbsArr => {
                let breadcrumbs = breadcrumbsArr;

                breadcrumbs = breadcrumbs.filter(breadcrumb => Object.keys(breadcrumb) && Object.keys(breadcrumb).length);
                this.breadcrumbs = breadcrumbs;
            });
    }

    handleToggleSideBar() {
        this.sideBarVisible = !this.sideBarVisible;
    }

    showAutoPayForm() {
        this.showStoresList = false;
    }

    showStoresListTable() {
        this.showStoresList = true;
    }
}
