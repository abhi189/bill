/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { BillingWebTestModule } from '../../../test.module';
import { AccountsReceivableDetailComponent } from '../../../../../../main/webapp/app/entities/accounts-receivable/accounts-receivable-detail.component';
import { AccountsReceivableService } from '../../../../../../main/webapp/app/entities/accounts-receivable/accounts-receivable.service';
import { AccountsReceivable } from '../../../../../../main/webapp/app/entities/accounts-receivable/accounts-receivable.model';

describe('Component Tests', () => {
    describe('AccountsReceivable Management Detail Component', () => {
        let comp: AccountsReceivableDetailComponent;
        let fixture: ComponentFixture<AccountsReceivableDetailComponent>;
        let service: AccountsReceivableService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BillingWebTestModule],
                declarations: [AccountsReceivableDetailComponent],
                providers: [AccountsReceivableService]
            })
                .overrideTemplate(AccountsReceivableDetailComponent, '')
                .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AccountsReceivableDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AccountsReceivableService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(
                    Observable.of(
                        new HttpResponse({
                            body: new AccountsReceivable(123)
                        })
                    )
                );

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.accountsReceivable).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
