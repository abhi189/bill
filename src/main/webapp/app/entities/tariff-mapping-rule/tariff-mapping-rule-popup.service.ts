import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { TariffMappingRule } from './tariff-mapping-rule.model';
import { TariffMappingRuleService } from './tariff-mapping-rule.service';

@Injectable()
export class TariffMappingRulePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(private modalService: NgbModal, private router: Router, private tariffMappingRuleService: TariffMappingRuleService) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.tariffMappingRuleService.find(id).subscribe((tariffMappingRuleResponse: HttpResponse<TariffMappingRule>) => {
                    const tariffMappingRule: TariffMappingRule = tariffMappingRuleResponse.body;
                    this.ngbModalRef = this.tariffMappingRuleModalRef(component, tariffMappingRule);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.tariffMappingRuleModalRef(component, new TariffMappingRule());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    tariffMappingRuleModalRef(component: Component, tariffMappingRule: TariffMappingRule): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static' });
        modalRef.componentInstance.tariffMappingRule = tariffMappingRule;
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
