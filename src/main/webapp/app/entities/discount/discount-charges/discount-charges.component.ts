import { Component, Input, OnInit } from '@angular/core';
import { DiscountCharge, UsageType, InvoiceSection, Month } from './discount-charge.model';
import { DiscountChargesService } from './discount-charges.service';
import { Observable } from 'rxjs';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
    selector: 'jhi-discount-charges',
    templateUrl: './discount-charges.component.html',
    styles: []
})
export class DiscountChargesComponent implements OnInit {
    @Input() discountId;
    discountCharges: DiscountCharge[] = [];
    originalDiscountCharges: DiscountCharge[] = [];
    toBeDeletedDiscountCharges: DiscountCharge[] = [];
    toBeCreatedDiscountCharges: DiscountCharge[] = [];
    toBeUpdatedDiscountCharges: DiscountCharge[] = [];
    editingCharges = false;
    creatingCharges = false;
    formCreateNewDiscountCharge: FormGroup;
    usageTypeOptions = [];
    invoiceSectionOptions = [];
    monthOptions = [];

    constructor(private discountChargesService: DiscountChargesService, private formBuilder: FormBuilder) {}

    ngOnInit() {
        if (this.discountId > 0) {
            this.loadDiscountCharges();
            this.usageTypeOptions = Object.keys(UsageType);
            this.invoiceSectionOptions = Object.keys(InvoiceSection);
            this.monthOptions = Object.keys(Month);
        }
    }

    loadDiscountCharges() {
        this.discountChargesService.getDiscountCharges(this.discountId).subscribe(res => {
            this.discountCharges = res.body;
            this.originalDiscountCharges = Object.assign([], this.discountCharges);
        });
    }

    editCharges() {
        this.editingCharges = true;
    }

    cancelEditCharges() {
        this.editingCharges = false;
        this.creatingCharges = false;
        this.discountCharges = Object.assign([], this.originalDiscountCharges);
        this.toBeDeletedDiscountCharges = [];
        this.toBeCreatedDiscountCharges = [];
    }

    saveCharges() {
        this.editingCharges = false;
        this.creatingCharges = false;
        if (this.toBeDeletedDiscountCharges.length > 0) {
            this.deleteDiscountCharges();
        }
        if (this.toBeCreatedDiscountCharges.length > 0) {
            this.createDiscountCharges();
        }
        if (this.toBeUpdatedDiscountCharges.length > 0) {
            this.updateDiscountCharges();
        }
    }

    onEditExistingCharge(charge) {
        if (DiscountCharge.prototype.isPersisted.apply(charge)) {
            const hasNotBeenAddedYet = !(this.toBeUpdatedDiscountCharges.findIndex(c => c.id === charge.id) > -1);
            if (hasNotBeenAddedYet) {
                this.toBeUpdatedDiscountCharges.push(charge);
            }
        }
    }

    updateDiscountCharges() {
        const observablesUpdateDiscountCharge = [];
        this.toBeUpdatedDiscountCharges.forEach(discountCharge => {
            observablesUpdateDiscountCharge.push(this.discountChargesService.updateDiscountCharge(discountCharge));
        });
        Observable.forkJoin(observablesUpdateDiscountCharge).subscribe(
            res => {
                this.loadDiscountCharges();
            },
            err => {
                this.discountCharges = Object.assign([], this.originalDiscountCharges);
            }
        );
        this.toBeUpdatedDiscountCharges = [];
    }

    deleteDiscountCharges() {
        const observablesDeleteDiscountCharge = [];
        this.toBeDeletedDiscountCharges.forEach(discountCharge => {
            observablesDeleteDiscountCharge.push(this.discountChargesService.deleteDiscountCharge(discountCharge.id));
        });
        Observable.forkJoin(observablesDeleteDiscountCharge).subscribe(
            res => {
                this.loadDiscountCharges();
            },
            err => {
                this.discountCharges = Object.assign([], this.originalDiscountCharges);
            }
        );
        this.toBeDeletedDiscountCharges = [];
    }

    createDiscountCharges() {
        const observablesCreateDiscountCharge = [];
        this.toBeCreatedDiscountCharges.forEach(discountCharge => {
            discountCharge.discountId = this.discountId;
            observablesCreateDiscountCharge.push(this.discountChargesService.createDiscountCharge(discountCharge));
        });
        Observable.forkJoin(observablesCreateDiscountCharge).subscribe(
            res => {
                this.loadDiscountCharges();
            },
            err => {
                this.discountCharges = Object.assign([], this.originalDiscountCharges);
            }
        );
        this.toBeCreatedDiscountCharges = [];
    }

    addNewCharge() {
        this.creatingCharges = true;
        // Validation for the new charge goes here.
        this.formCreateNewDiscountCharge = this.formBuilder.group({
            name: ['', Validators.required],
            tier: [],
            usageAmount: [],
            usageType: [],
            rate: [],
            total: [],
            invoiceSection: [],
            chargeId: [],
            chargeActualName: [],
            usage: [],
            month: [],
            rateComponent: []
        });
    }

    discardNewCharge() {
        this.creatingCharges = false;
        this.formCreateNewDiscountCharge.reset();
    }

    confirmNewCharge() {
        this.creatingCharges = false;
        this.toBeCreatedDiscountCharges.push(this.formCreateNewDiscountCharge.value as DiscountCharge);
        this.discountCharges.push(this.formCreateNewDiscountCharge.value as DiscountCharge);
    }

    removeCharge(i: number, charge: DiscountCharge) {
        this.discountCharges.splice(i, 1);
        if (DiscountCharge.prototype.isPersisted.apply(charge)) {
            this.toBeDeletedDiscountCharges.push(charge);
        } else {
            this.removeDiscountChargeFromToBeCreated(charge);
        }
    }

    private removeDiscountChargeFromToBeCreated(charge: DiscountCharge) {
        const indexToBeCreatedDiscountCharge = this.toBeCreatedDiscountCharges.findIndex(dc => {
            /**
             * A simpler solution would be to call return charge.equals(dc)
             * but we cant guarantee its type (not even by casting) since it comes from an angular form
             */
            return DiscountCharge.prototype.equals.apply(charge, [dc]);
        });
        if (indexToBeCreatedDiscountCharge > -1) {
            this.toBeCreatedDiscountCharges.splice(indexToBeCreatedDiscountCharge, 1);
        }
    }
}
