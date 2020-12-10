import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Discount } from './discount.model';
import { DiscountValue } from './discount-values/discount-value.model';
import { DiscountPopupService } from './discount-popup.service';
import { DiscountService } from './discount.service';
import { DiscountValuesService } from './discount-values/discount-values.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'jhi-discount-dialog',
    templateUrl: './discount-dialog.component.html',
    styles: [
        `
            .discount-value-error {
                border-left: 5px solid #dc3545;
            }
        `
    ]
})
export class DiscountDialogComponent implements OnInit {
    discount: Discount;
    isSaving: boolean;
    discountValuesToBeRemoved = new Array<DiscountValue>();
    discountValuesToBeCreated = new Array<DiscountValue>();
    creatingDiscountValue = false;
    editingDiscountValue = false;
    newDiscountValue: DiscountValue;
    formEditDiscountValue;
    validationAlerts = [];
    indexErrorDiscountValue;

    constructor(
        public activeModal: NgbActiveModal,
        private discountService: DiscountService,
        private discountValuesService: DiscountValuesService,
        private eventManager: JhiEventManager
    ) {}

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        try {
            this.validateDiscountValues();
            this.isSaving = true;
            if (this.discount.id !== undefined) {
                if (this.discountValuesToBeRemoved.length > 0) {
                    const observablesRemoveDiscountValue = [];
                    this.discountValuesToBeRemoved.forEach(discountValue => {
                        observablesRemoveDiscountValue.push(this.discountValuesService.removeDiscountValue(discountValue.id));
                    });
                    Observable.forkJoin(observablesRemoveDiscountValue).subscribe(
                        result => console.log('DiscountValues successfully removed.', result),
                        error => console.log('Error while removing DiscountValues.', error)
                    );
                }
                this.subscribeToSaveResponse(this.discountService.update(this.discount));
            } else {
                this.subscribeToSaveResponse(this.discountService.create(this.discount));
            }
        } catch (e) {
            this.createAlert(e.message);
        }
    }

    validateDiscountValues() {
        this.indexErrorDiscountValue = -1;
        let minValue = -1;
        for (let i = 0; i < this.discount.discountValues.length; i++) {
            const discountValue = this.discount.discountValues[i];
            const isUpperBoundary = i === this.discount.discountValues.length - 1;
            if (!isUpperBoundary && discountValue.endValue == null) {
                this.indexErrorDiscountValue = i;
                throw new Error('End Value is required for non upper boundary.');
            }
            if (discountValue.beginningValue <= minValue) {
                this.indexErrorDiscountValue = i;
                throw new Error(`Overlapping Discount Values. ${discountValue.beginningValue} should be bigger than ${minValue}`);
            }
            minValue = discountValue.beginningValue;
            if (discountValue.endValue && discountValue.endValue <= minValue) {
                this.indexErrorDiscountValue = i;
                throw new Error(`Overlapping Discount Values. ${discountValue.endValue} should be bigger than ${minValue}`);
            }
            minValue = discountValue.endValue;
        }
    }

    removeDiscountValue(discountValue, index) {
        this.discount.discountValues.splice(index, 1);
        const discountValueIsPersisted = discountValue.id != null;
        if (discountValueIsPersisted) {
            this.discountValuesToBeRemoved.push(discountValue);
        } else {
            this.removeDiscountValueFromToBeCreated(discountValue);
        }
    }

    private removeDiscountValueFromToBeCreated(discountValue) {
        const indexToBeCreatedDiscountValue = this.discountValuesToBeCreated.findIndex(dv => {
            return (
                dv.beginningValue === discountValue.beginningValue &&
                dv.endValue === discountValue.endValue &&
                dv.discountPercentage === discountValue.discountPercentage
            );
        });
        if (indexToBeCreatedDiscountValue > -1) {
            this.discountValuesToBeCreated.splice(indexToBeCreatedDiscountValue, 1);
        }
    }

    editDiscountValue(discountValue) {
        this.editingDiscountValue = true;
        discountValue.editing = true;

        this.formEditDiscountValue = new FormGroup({
            beginningValue: new FormControl(discountValue.beginningValue),
            endValue: new FormControl(discountValue.endValue),
            discountPercentage: new FormControl(discountValue.discountPercentage * 100)
        });
    }

    confirmEditDiscountValue(discountValue) {
        this.editingDiscountValue = false;
        discountValue.editing = false;
        discountValue.beginningValue = this.formEditDiscountValue.get('beginningValue').value;
        discountValue.endValue = this.formEditDiscountValue.get('endValue').value;
        discountValue.discountPercentage = this.formEditDiscountValue.get('discountPercentage').value / 100;
    }

    cancelEditDiscountValue(discountValue) {
        this.editingDiscountValue = false;
        discountValue.editing = false;
    }

    addDiscountValue() {
        this.newDiscountValue = new DiscountValue();
        this.creatingDiscountValue = true;
    }

    confirmAddDiscountValue() {
        this.newDiscountValue.discountPercentage = this.newDiscountValue.discountPercentage / 100;
        this.discountValuesToBeCreated.push(this.newDiscountValue);
        this.discount.discountValues.push(this.newDiscountValue);
        this.newDiscountValue = new DiscountValue();
        this.creatingDiscountValue = false;
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Discount>>) {
        result.subscribe((res: HttpResponse<Discount>) => this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Discount) {
        this.eventManager.broadcast({ name: 'discountListModification', content: 'OK' });
        this.isSaving = false;
        this.activeModal.dismiss(result);
        if (this.discountValuesToBeCreated.length > 0) {
            this.createDiscountValues(result);
        }
    }

    private createDiscountValues(discount: Discount) {
        const observablesCreateDiscountValue = [];
        this.discountValuesToBeCreated.forEach(discountValue => {
            discountValue.discountId = discount.id;
            observablesCreateDiscountValue.push(this.discountValuesService.createDiscountValue(discountValue));
        });
        Observable.forkJoin(observablesCreateDiscountValue).subscribe(
            result => {
                this.eventManager.broadcast({ name: 'discountListModification', content: 'OK' });
                console.log('DiscountValues successfully created.', result);
            },
            error => console.log('Error while creating DiscountValues.', error)
        );
    }

    private onSaveError() {
        this.isSaving = false;
    }

    createAlert(message) {
        const alert = { type: 'danger', alertClosed: false, message };
        this.validationAlerts.push(alert);
        setTimeout(() => (alert.alertClosed = true), 5000);
    }

    closeAlert(alert) {
        this.validationAlerts.splice(this.validationAlerts.indexOf(alert), 1);
    }
}

@Component({
    selector: 'jhi-discount-popup',
    template: ''
})
export class DiscountPopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private discountPopupService: DiscountPopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if (params['id']) {
                this.discountPopupService.open(DiscountDialogComponent as Component, params['id']);
            } else {
                this.discountPopupService.open(DiscountDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
