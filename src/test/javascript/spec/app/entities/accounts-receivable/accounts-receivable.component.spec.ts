/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BillingWebTestModule } from '../../../test.module';
import { AccountsReceivableComponent } from '../../../../../../main/webapp/app/entities/accounts-receivable/accounts-receivable.component';
import { AccountsReceivableService } from '../../../../../../main/webapp/app/entities/accounts-receivable/accounts-receivable.service';
import { AccountsReceivable } from '../../../../../../main/webapp/app/entities/accounts-receivable/accounts-receivable.model';

describe('Component Tests', () => {
    describe('AccountsReceivable Management Component', () => {
        let comp: AccountsReceivableComponent;
        let fixture: ComponentFixture<AccountsReceivableComponent>;
        let service: AccountsReceivableService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BillingWebTestModule],
                declarations: [AccountsReceivableComponent],
                providers: [AccountsReceivableService]
            })
                .overrideTemplate(AccountsReceivableComponent, '')
                .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AccountsReceivableComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AccountsReceivableService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(
                    Observable.of(
                        new HttpResponse({
                            body: [new AccountsReceivable(123)],
                            headers
                        })
                    )
                );

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.accountsReceivables[0]).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
