/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { BillingWebTestModule } from '../../../test.module';
import { SiteAccountDialogComponent } from '../../../../../../main/webapp/app/entities/site-account/site-account-dialog.component';
import { SiteAccountService } from '../../../../../../main/webapp/app/entities/site-account/site-account.service';
import { SiteAccount } from '../../../../../../main/webapp/app/entities/site-account/site-account.model';

describe('Component Tests', () => {
    describe('SiteAccount Management Dialog Component', () => {
        let comp: SiteAccountDialogComponent;
        let fixture: ComponentFixture<SiteAccountDialogComponent>;
        let service: SiteAccountService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BillingWebTestModule],
                declarations: [SiteAccountDialogComponent],
                providers: [SiteAccountService]
            })
                .overrideTemplate(SiteAccountDialogComponent, '')
                .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SiteAccountDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SiteAccountService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    const entity = new SiteAccount(123);
                    spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({ body: entity })));
                    comp.siteAccount = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'siteAccountListModification', content: 'OK' });
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                })
            ));

            it('Should call create service on save for new entity', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    const entity = new SiteAccount();
                    spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({ body: entity })));
                    comp.siteAccount = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'siteAccountListModification', content: 'OK' });
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
