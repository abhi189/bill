import { Component, Input, OnInit } from '@angular/core';
import { AssociatedAgreement, AssociatedAgreementType } from './discount-associated-agreement.model';
import { DiscountAssociatedAgreementService } from './discount-associated-agreement.service';
import { Observable } from 'rxjs';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
    selector: 'jhi-discount-associated-agreement',
    templateUrl: './discount-associated-agreement.component.html',
    styles: []
})
export class DiscountAssociatedAgreementComponent implements OnInit {
    @Input() discountId;
    associatedAgreements: AssociatedAgreement[] = [];
    originalAssociatedAgreements: AssociatedAgreement[] = [];
    toBeDeletedAssociatedAgreements: AssociatedAgreement[] = [];
    toBeCreatedAssociatedAgreements: AssociatedAgreement[] = [];
    toBeUpdatedAssociatedAgreements: AssociatedAgreement[] = [];
    associatedAgreementTypeOptions = [];
    editingAssociatedAgreements = false;
    creatingAssociatedAgreements = false;
    formCreateNewAssociatedAgreement: FormGroup;

    constructor(private discountAssociatedAgreementService: DiscountAssociatedAgreementService, private formBuilder: FormBuilder) {}

    ngOnInit() {
        if (this.discountId > 0) {
            this.loadAssociatedAgreements();
            this.getAssociatedAgreementTypes();
        }
    }

    getAssociatedAgreementTypes() {
        Object.keys(AssociatedAgreementType).forEach(key => {
            this.associatedAgreementTypeOptions.push(AssociatedAgreementType[key]);
        });
    }

    loadAssociatedAgreements() {
        this.discountAssociatedAgreementService.getAssociatedAgreements(this.discountId).subscribe(res => {
            this.associatedAgreements = res.body;
            this.originalAssociatedAgreements = Object.assign([], this.associatedAgreements);
        });
    }

    editAssociatedAgreements() {
        this.editingAssociatedAgreements = true;
    }

    cancelEditAssociatedAgreements() {
        this.editingAssociatedAgreements = false;
        this.creatingAssociatedAgreements = false;
        this.associatedAgreements = Object.assign([], this.originalAssociatedAgreements);
        this.toBeDeletedAssociatedAgreements = [];
        this.toBeCreatedAssociatedAgreements = [];
    }

    saveAssociatedAgreements() {
        this.editingAssociatedAgreements = false;
        this.creatingAssociatedAgreements = false;
        if (this.toBeDeletedAssociatedAgreements.length > 0) {
            this.deleteAssociatedAgreements();
        }
        if (this.toBeCreatedAssociatedAgreements.length > 0) {
            this.createAssociatedAgreements();
        }
        if (this.toBeUpdatedAssociatedAgreements.length > 0) {
            this.updateAssociatedAgreements();
        }
    }

    onEditExistingAssociatedAgreement(associatedAgreement) {
        if (AssociatedAgreement.prototype.isPersisted.apply(associatedAgreement)) {
            const hasNotBeenAddedYet = !(this.toBeUpdatedAssociatedAgreements.findIndex(a => a.id === associatedAgreement.id) > -1);
            if (hasNotBeenAddedYet) {
                this.toBeUpdatedAssociatedAgreements.push(associatedAgreement);
            }
        }
    }

    updateAssociatedAgreements() {
        const observablesUpdateAssociatedAgreement = [];
        this.toBeUpdatedAssociatedAgreements.forEach(associatedAgreement => {
            observablesUpdateAssociatedAgreement.push(
                this.discountAssociatedAgreementService.updateAssociatedAgreement(associatedAgreement)
            );
        });
        Observable.forkJoin(observablesUpdateAssociatedAgreement).subscribe(
            res => {
                this.loadAssociatedAgreements();
            },
            err => {
                this.associatedAgreements = Object.assign([], this.originalAssociatedAgreements);
            }
        );
        this.toBeUpdatedAssociatedAgreements = [];
    }

    deleteAssociatedAgreements() {
        const observablesDeleteAssociatedAgreement = [];
        this.toBeDeletedAssociatedAgreements.forEach(associatedAgreement => {
            observablesDeleteAssociatedAgreement.push(
                this.discountAssociatedAgreementService.deleteAssociatedAgreement(associatedAgreement.id)
            );
        });
        Observable.forkJoin(observablesDeleteAssociatedAgreement).subscribe(
            res => {
                this.loadAssociatedAgreements();
            },
            err => {
                this.associatedAgreements = Object.assign([], this.originalAssociatedAgreements);
            }
        );
        this.toBeDeletedAssociatedAgreements = [];
    }

    createAssociatedAgreements() {
        const observablesCreateAssociatedAgreement = [];
        this.toBeCreatedAssociatedAgreements.forEach(discountAssociatedAgreement => {
            discountAssociatedAgreement.discountId = this.discountId;
            observablesCreateAssociatedAgreement.push(
                this.discountAssociatedAgreementService.createAssociatedAgreement(discountAssociatedAgreement)
            );
        });
        Observable.forkJoin(observablesCreateAssociatedAgreement).subscribe(
            res => {
                this.loadAssociatedAgreements();
            },
            err => {
                this.associatedAgreements = Object.assign([], this.originalAssociatedAgreements);
            }
        );
        this.toBeCreatedAssociatedAgreements = [];
    }

    addNewAssociatedAgreement() {
        this.creatingAssociatedAgreements = true;
        // Validation for the new associatedAgreement goes here.
        this.formCreateNewAssociatedAgreement = this.formBuilder.group({
            agreementType: ['', Validators.required],
            version: ['', Validators.required]
        });
    }

    discardNewAssociatedAgreement() {
        this.creatingAssociatedAgreements = false;
        this.formCreateNewAssociatedAgreement.reset();
    }

    confirmNewAssociatedAgreement() {
        this.creatingAssociatedAgreements = false;
        this.toBeCreatedAssociatedAgreements.push(this.formCreateNewAssociatedAgreement.value as AssociatedAgreement);
        this.associatedAgreements.push(this.formCreateNewAssociatedAgreement.value as AssociatedAgreement);
    }

    removeAssociatedAgreement(i: number, associatedAgreement: AssociatedAgreement) {
        this.associatedAgreements.splice(i, 1);
        if (AssociatedAgreement.prototype.isPersisted.apply(associatedAgreement)) {
            this.toBeDeletedAssociatedAgreements.push(associatedAgreement);
        } else {
            this.removeAssociatedAgreementFromToBeCreated(associatedAgreement);
        }
    }

    private removeAssociatedAgreementFromToBeCreated(associatedAgreement: AssociatedAgreement) {
        const indexToBeCreatedAssociatedAgreement = this.toBeCreatedAssociatedAgreements.findIndex(ds => {
            return AssociatedAgreement.prototype.equals.apply(associatedAgreement, [ds]);
        });
        if (indexToBeCreatedAssociatedAgreement > -1) {
            this.toBeCreatedAssociatedAgreements.splice(indexToBeCreatedAssociatedAgreement, 1);
        }
    }

    previousState() {
        window.history.back();
    }
}
