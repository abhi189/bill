import { Component, Input, OnInit } from '@angular/core';
import { DiscountSolution } from './discount-solution.model';
import { DiscountSolutionService } from './discount-solution.service';
import { Observable } from 'rxjs';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
    selector: 'jhi-discount-solution',
    templateUrl: './discount-solution.component.html',
    styles: []
})
export class DiscountSolutionComponent implements OnInit {
    @Input() discountId;
    discountSolutions: DiscountSolution[] = [];
    originalDiscountSolutions: DiscountSolution[] = [];
    toBeDeletedDiscountSolutions: DiscountSolution[] = [];
    toBeCreatedDiscountSolutions: DiscountSolution[] = [];
    toBeUpdatedDiscountSolutions: DiscountSolution[] = [];
    editingSolutions = false;
    creatingSolutions = false;
    formCreateNewDiscountSolution: FormGroup;

    constructor(private discountSolutionService: DiscountSolutionService, private formBuilder: FormBuilder) {}

    ngOnInit() {
        if (this.discountId > 0) {
            this.loadDiscountSolutions();
        }
    }

    loadDiscountSolutions() {
        this.discountSolutionService.getDiscountSolutions(this.discountId).subscribe(res => {
            this.discountSolutions = res.body;
            this.originalDiscountSolutions = Object.assign([], this.discountSolutions);
        });
    }

    editSolutions() {
        this.editingSolutions = true;
    }

    cancelEditSolutions() {
        this.editingSolutions = false;
        this.creatingSolutions = false;
        this.discountSolutions = Object.assign([], this.originalDiscountSolutions);
        this.toBeDeletedDiscountSolutions = [];
        this.toBeCreatedDiscountSolutions = [];
    }

    saveSolutions() {
        this.editingSolutions = false;
        this.creatingSolutions = false;
        if (this.toBeDeletedDiscountSolutions.length > 0) {
            this.deleteDiscountSolutions();
        }
        if (this.toBeCreatedDiscountSolutions.length > 0) {
            this.createDiscountSolutions();
        }
        if (this.toBeUpdatedDiscountSolutions.length > 0) {
            this.updateDiscountSolutions();
        }
    }

    onEditExistingSolution(solution) {
        if (DiscountSolution.prototype.isPersisted.apply(solution)) {
            const hasNotBeenAddedYet = !(this.toBeUpdatedDiscountSolutions.findIndex(c => c.id === solution.id) > -1);
            if (hasNotBeenAddedYet) {
                this.toBeUpdatedDiscountSolutions.push(solution);
            }
        }
    }

    updateDiscountSolutions() {
        const observablesUpdateDiscountSolution = [];
        this.toBeUpdatedDiscountSolutions.forEach(discountSolution => {
            observablesUpdateDiscountSolution.push(this.discountSolutionService.updateDiscountSolution(discountSolution));
        });
        Observable.forkJoin(observablesUpdateDiscountSolution).subscribe(
            res => {
                this.loadDiscountSolutions();
            },
            err => {
                this.discountSolutions = Object.assign([], this.originalDiscountSolutions);
            }
        );
        this.toBeUpdatedDiscountSolutions = [];
    }

    deleteDiscountSolutions() {
        const observablesDeleteDiscountSolution = [];
        this.toBeDeletedDiscountSolutions.forEach(discountSolution => {
            observablesDeleteDiscountSolution.push(this.discountSolutionService.deleteDiscountSolution(discountSolution.id));
        });
        Observable.forkJoin(observablesDeleteDiscountSolution).subscribe(
            res => {
                this.loadDiscountSolutions();
            },
            err => {
                this.discountSolutions = Object.assign([], this.originalDiscountSolutions);
            }
        );
        this.toBeDeletedDiscountSolutions = [];
    }

    createDiscountSolutions() {
        const observablesCreateDiscountSolution = [];
        this.toBeCreatedDiscountSolutions.forEach(discountSolution => {
            discountSolution.discountId = this.discountId;
            observablesCreateDiscountSolution.push(this.discountSolutionService.createDiscountSolution(discountSolution));
        });
        Observable.forkJoin(observablesCreateDiscountSolution).subscribe(
            res => {
                this.loadDiscountSolutions();
            },
            err => {
                this.discountSolutions = Object.assign([], this.originalDiscountSolutions);
            }
        );
        this.toBeCreatedDiscountSolutions = [];
    }

    addNewSolution() {
        this.creatingSolutions = true;
        // Validation for the new solution goes here.
        this.formCreateNewDiscountSolution = this.formBuilder.group({
            name: ['', Validators.required]
        });
    }

    discardNewSolution() {
        this.creatingSolutions = false;
        this.formCreateNewDiscountSolution.reset();
    }

    confirmNewSolution() {
        this.creatingSolutions = false;
        this.toBeCreatedDiscountSolutions.push(this.formCreateNewDiscountSolution.value as DiscountSolution);
        this.discountSolutions.push(this.formCreateNewDiscountSolution.value as DiscountSolution);
    }

    removeSolution(i: number, solution: DiscountSolution) {
        this.discountSolutions.splice(i, 1);
        if (DiscountSolution.prototype.isPersisted.apply(solution)) {
            this.toBeDeletedDiscountSolutions.push(solution);
        } else {
            this.removeDiscountSolutionFromToBeCreated(solution);
        }
    }

    private removeDiscountSolutionFromToBeCreated(solution: DiscountSolution) {
        const indexToBeCreatedDiscountSolution = this.toBeCreatedDiscountSolutions.findIndex(ds => {
            /**
             * A simpler solution would be to call return solution.equals(dc)
             * but we cant guarantee its type (not even by casting) since it comes from an angular form
             */
            return DiscountSolution.prototype.equals.apply(solution, [ds]);
        });
        if (indexToBeCreatedDiscountSolution > -1) {
            this.toBeCreatedDiscountSolutions.splice(indexToBeCreatedDiscountSolution, 1);
        }
    }

    previousState() {
        window.history.back();
    }
}
