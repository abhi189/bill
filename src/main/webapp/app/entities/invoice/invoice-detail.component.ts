import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Invoice } from './invoice.model';
import { InvoiceService } from './invoice.service';
import { ExportInvoiceDialogComponent } from './export-invoice-dialog.component';
import { SiteAccountService, SiteAccount } from '../site-account';
import { SiteService } from '../site';

@Component({
    selector: 'jhi-invoice-detail',
    templateUrl: './invoice-detail.component.html'
})
export class InvoiceDetailComponent implements OnInit, OnDestroy {
    invoice: Invoice;
    siteAccount: SiteAccount;
    siteId: number;
    bId: String;
    accNum: String;
    startDate: String;
    endDate: String;
    private subscription: Subscription;
    private eventSubscriber: Subscription;
    disableControls = false;
    dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    constructor(
        private eventManager: JhiEventManager,
        private invoiceService: InvoiceService,
        private modalService: NgbModal,
        private route: ActivatedRoute,
        private siteAccountService: SiteAccountService,
        private siteService: SiteService
    ) {}

    ngOnInit() {
        this.bId = '';
        this.accNum = '';
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
        this.registerChangeInInvoices();
    }

    load(id) {
        this.invoiceService.find(id).subscribe((invoiceResponse: HttpResponse<Invoice>) => {
            this.invoice = invoiceResponse.body;
            if (this.invoice.intervalStart) {
                this.startDate = this.invoice.intervalStart.toISOString().split('T', 1)[0];
                this.invoice.intervalStart = {
                    year: this.invoice.intervalStart.getFullYear(),
                    month: this.invoice.intervalStart.getMonth() + 1,
                    day: this.invoice.intervalStart.getDate()
                };
            }
            if (this.invoice.intervalEnd) {
                this.endDate = this.invoice.intervalEnd.toISOString().split('T', 1)[0];
                this.invoice.intervalEnd = {
                    year: this.invoice.intervalEnd.getFullYear(),
                    month: this.invoice.intervalEnd.getMonth() + 1,
                    day: this.invoice.intervalEnd.getDate()
                };
            }

            this.siteAccountService.find(this.invoice.siteAccountId).subscribe((siteAccountResponse: HttpResponse<SiteAccount>) => {
                this.siteAccount = siteAccountResponse.body;
                this.bId = this.siteAccount.budderflyId;
                this.accNum = this.siteAccount.accountNumber;
                this.siteService.getSiteId(this.siteAccount.budderflyId).subscribe((siteId: HttpResponse<number>) => {
                    this.siteId = siteId.body;
                });
            });
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInInvoices() {
        this.eventSubscriber = this.eventManager.subscribe('invoiceListModification', response => this.load(this.invoice.id));
    }

    exportToNetSuite() {
        const system = 'NETSUITE';
        const partner = 'BUDDERFLY';
        const modalRef = this.modalService.open(ExportInvoiceDialogComponent);
        const invoice = this.invoiceService.convert(this.invoice);

        modalRef.componentInstance.system = system;
        modalRef.componentInstance.partner = partner;
        modalRef.componentInstance.invoice = invoice;
    }

    onIgnoreImportChange(event) {
        this.disableControls = true;
        this.invoiceService
            .update(this.invoice)
            .subscribe(
                result => console.log('Invoice updated', result),
                error => (this.invoice.ignoreImport = !this.invoice.ignoreImport),
                () => (this.disableControls = false)
            );
    }

    onImportedManuallyChange(event) {
        this.disableControls = true;
        this.invoiceService
            .update(this.invoice)
            .subscribe(
                result => console.log('Invoice updated', result),
                error => (this.invoice.importedManually = !this.invoice.importedManually),
                () => (this.disableControls = false)
            );
    }
}
