import { Component, Input, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { BudderflyInvoice } from '../budderfly-invoice.model';
import { BudderflyInvoiceValidationService } from './auto-approval-tests.service';
import { BudderflyInvoiceResultsStatus, BudderflyInvoiceValidation, BudderflyInvoiceValidationResults } from './auto-approval-tests.model';
import { JhiAlertService } from 'ng-jhipster';

@Component({
    selector: 'jhi-auto-approval-tests',
    templateUrl: './auto-approval-tests.html',
    styles: [
        `
            .row-rates {
                padding-top: 20px;
                overflow: scroll;
            }
        `
    ]
})
export class AutoApprovalTestsComponent implements OnInit {
    @Input() buddeflyInvoice: BudderflyInvoice;
    buddeflyInvoiceId: number;
    budderflyInvoiceValidations: BudderflyInvoiceValidation[];
    budderflyInvoiceValidationResults: BudderflyInvoiceValidationResults[];

    constructor(private budderflyInvoiceService: BudderflyInvoiceValidationService, private jhiAlertService: JhiAlertService) {}

    ngOnInit(): void {
        this.buddeflyInvoiceId = this.buddeflyInvoice.id;
        console.log('bdID: ' + this.buddeflyInvoice);
        this.loadAll();
    }

    private loadAll() {
        this.budderflyInvoiceService.getAll().subscribe(
            (res: HttpResponse<BudderflyInvoiceValidation[]>) => {
                this.budderflyInvoiceValidations = res.body;
                this.loadAllByInvoiceId();
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        return;
    }

    private loadAllByInvoiceId() {
        this.budderflyInvoiceService
            .getAllByInvoiceId(this.buddeflyInvoiceId)
            .subscribe(
                (res: HttpResponse<BudderflyInvoiceValidationResults[]>) => this.onSuccess(res.body),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        return;
    }

    private onSuccess(body: BudderflyInvoiceValidationResults[]) {
        this.budderflyInvoiceValidationResults = body;
        this.budderflyInvoiceValidationResults.forEach(result => {
            const index = this.budderflyInvoiceValidations.findIndex(biv => biv.id === result.budderflyInvoiceValidationId);
            if (index >= 0) {
                this.budderflyInvoiceValidations[index].budderflyInvoiceValidationResult = result;
            }
        });
    }

    private onError(error) {
        this.budderflyInvoiceValidationResults = [];
        this.jhiAlertService.error(error, null, null);
    }

    runTest(biv: BudderflyInvoiceValidation, budderflyInvoice: BudderflyInvoice) {
        biv.running = true;
        this.budderflyInvoiceService.runTest(budderflyInvoice, biv.endpoint).subscribe(
            (result: HttpResponse<boolean>) => {
                if (result) {
                    this.loadAll();
                }
            },
            (res: HttpErrorResponse) => {
                biv.running = false;
                this.onError(res.statusText);
            },
            () => (biv.running = false)
        );
    }
}
