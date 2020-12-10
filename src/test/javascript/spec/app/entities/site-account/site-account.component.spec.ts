/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BillingWebTestModule } from '../../../test.module';
import { SiteAccountComponent } from '../../../../../../main/webapp/app/entities/site-account/site-account.component';
import { SiteAccountService } from '../../../../../../main/webapp/app/entities/site-account/site-account.service';
import { SiteAccount } from '../../../../../../main/webapp/app/entities/site-account/site-account.model';

describe('Component Tests', () => {
    describe('SiteAccount Management Component', () => {
        let comp: SiteAccountComponent;
        let fixture: ComponentFixture<SiteAccountComponent>;
        let service: SiteAccountService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BillingWebTestModule],
                declarations: [SiteAccountComponent],
                providers: [SiteAccountService]
            })
                .overrideTemplate(SiteAccountComponent, '')
                .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SiteAccountComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SiteAccountService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(
                    Observable.of(
                        new HttpResponse({
                            body: [new SiteAccount(123)],
                            headers
                        })
                    )
                );

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.siteAccounts[0]).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
