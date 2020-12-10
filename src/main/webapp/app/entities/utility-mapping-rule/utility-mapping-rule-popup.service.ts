import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { UtilityMappingRule } from './utility-mapping-rule.model';
import { UtilityMappingRuleService } from './utility-mapping-rule.service';

@Injectable()
export class UtilityMappingRulePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(private modalService: NgbModal, private router: Router, private utilityMappingRuleService: UtilityMappingRuleService) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.utilityMappingRuleService.find(id).subscribe((utilityMappingRuleResponse: HttpResponse<UtilityMappingRule>) => {
                    const utilityMappingRule: UtilityMappingRule = utilityMappingRuleResponse.body;
                    this.ngbModalRef = this.utilityMappingRuleModalRef(component, utilityMappingRule);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.utilityMappingRuleModalRef(component, new UtilityMappingRule());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    utilityMappingRuleModalRef(component: Component, utilityMappingRule: UtilityMappingRule): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static' });
        modalRef.componentInstance.utilityMappingRule = utilityMappingRule;
        modalRef.result.then(
            result => {
                this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                this.ngbModalRef = null;
            },
            reason => {
                this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                this.ngbModalRef = null;
            }
        );
        return modalRef;
    }
}
