import { Component, EventEmitter, AfterViewInit, Output, OnInit, ElementRef, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Dashboard } from '../../dashboard.service';
import { AccountService } from '../../../core/auth/account.service';
import { AuthServerProvider } from '../../../core/auth/auth-jwt.service';
import { store, template } from '@angular/core/src/render3';
import { threadId } from 'worker_threads';

@Component({
    selector: 'jhi-dashboard-invoice',
    templateUrl: './invoice.component.html',
    styleUrls: ['./invoice.component.scss']
})
export class DashboardInvoiceComponent implements OnInit {
    // @Output() onBillingClick = new EventEmitter();
    @Input() layoutOptions;
    @Input() budderflyId: string;
    @Input() storeSelected: any = {};
    @Input() onSiteClick;
    // @Input() handleSiteClick();
    // getting from parent component

    public invoiceSelected: Array<any>;
    public invoiceList: Array<any>;
    public showUserDetails: boolean;
    public getInvoice: Array<any>;
    constructor(
        private elm: ElementRef,
        private accountService: AccountService,
        private authServerProvider: AuthServerProvider,
        private router: Router,
        private dashboard: Dashboard
    ) {
        this.dashboard.invoiceSelected$.subscribe(id => {
            if (this.budderflyId !== id) {
                this.budderflyId = id;
                this.dashboard.getInvoiceFromBudderflyId(this.budderflyId).subscribe(
                    res => {
                        this.constructInvoiceList(res);
                    },
                    err => console.log('Error fetching stores. ', err)
                );
            }
        });

        this.dashboard.getInvoice$.subscribe(res => {
            this.getInvoice = [...res];
        });
    }

    // ngOnInit(){
    // // this.dashboard.getStores('sample').subscribe(res => {
    //     //     this.storeList = this.enableSlected(res);
    //     // });
    //     // this.invoiceSelected = [...this.dashboard.selectedInvoices];
    // }

    ngOnInit() {
        // this.dashboard.currentMessage.subscribe(budderflyId => this.budderflyId = budderflyId)
        this.getInvoice = [...this.dashboard.selectedInvoices];
    }

    constructInvoiceList(invoices): void {
        invoices = invoices.map(invoice => {
            const {
                budderflyId,
                invoiceNumber,
                statementDate,
                dueDate,
                priorBalance,
                totalNewElectricCharges,
                totalOtherCharges,
                taxes,
                amountDue,
                pdfUrl
            } = invoice;

            return {
                budderflyId,
                invoiceNumber,
                statementDate,
                dueDate,
                priorBalance,
                totalOtherCharges,
                totalNewElectricCharges,
                taxes,
                amountDue,
                pdfUrl
            };
        });
        const finalInvoices = this.enableSlected(invoices);
        this.invoiceList = finalInvoices;
    }

    // handleDocumentClick(event) {
    //     if (this.showUserDetails) {
    //         const dropdown = this.elm.nativeElement.querySelector('.user-details');

    //         if (dropdown && !dropdown.contains(event.target)) {
    //             this.showUserDetails = false;
    //         }
    //     }
    // }

    setInvoiceSelected(invoice): boolean {
        if (this.getInvoice.length) {
            return this._getInvoiceIndex(invoice) > -1 ? true : false;
        }
        return false;
    }

    enableSlected(invoices) {
        if (!this.getInvoice.length) {
            return invoices;
        }

        return invoices.map(invoice => {
            let invoiceInner = {
                ...invoice,
                checkedManually: false
            };

            for (let i = 0, len = this.getInvoice.length; i < len; i += 1) {
                if (this.setInvoiceSelected(invoice)) {
                    invoiceInner = {
                        ...invoice,
                        checkedManually: true
                    };
                    break;
                }
            }
            return invoiceInner;
        });
    }

    private _getInvoiceIndex(invoices): number {
        if (!this.getInvoice.length) {
            return -1;
        }
        let invoiceIndex = -1,
            i = 0;
        const len = this.getInvoice.length;

        for (; i < len; i += 1) {
            const selectedInvoice = this.getInvoice[i];

            if (invoices.budderflyId === selectedInvoice.budderflyId) {
                invoiceIndex = i;
                break;
            }
        }
        return invoiceIndex;
    }

    getInvoiceFromList(budderflyId: string) {
        this.dashboard.getInvoiceFromBudderflyId(budderflyId).subscribe(
            res => {
                console.log('Res: ', res);
            },
            err => {
                console.log('Err: ', err);
            }
        );
    }

    // toggleSidebar() {
    //     this.toggleSideBar.next();
    // }

    // toggleUserDropDown() {
    //     this.showUserDetails = !this.showUserDetails;
    // }

    logout() {
        if (this.accountService.isAuthenticated()) {
            this.authServerProvider.logout().subscribe(() => {
                this.accountService.authenticate(null);
                this.router.navigate(['']);
            });
        } else {
            this.accountService.authenticate(null);
            this.router.navigate(['']);
        }
    }
}
