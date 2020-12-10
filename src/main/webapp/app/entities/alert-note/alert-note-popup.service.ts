import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { AlertNote } from './alert-note.model';
import { AlertNoteService } from './alert-note.service';

@Injectable()
export class AlertNotePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private alertNoteService: AlertNoteService
    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.alertNoteService.find(id).subscribe((alertNoteResponse: HttpResponse<AlertNote>) => {
                    const alertNote: AlertNote = alertNoteResponse.body;
                    alertNote.date = this.datePipe.transform(alertNote.date, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.alertNoteModalRef(component, alertNote);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.alertNoteModalRef(component, new AlertNote());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    alertNoteModalRef(component: Component, alertNote: AlertNote): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static' });
        modalRef.componentInstance.alertNote = alertNote;
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
