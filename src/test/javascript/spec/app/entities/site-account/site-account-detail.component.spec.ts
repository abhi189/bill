/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { BillingWebTestModule } from '../../../test.module';
import { SiteAccountDetailComponent } from '../../../../../../main/webapp/app/entities/site-account/site-account-detail.component';
import { SiteAccountService } from '../../../../../../main/webapp/app/entities/site-account/site-account.service';
import { SiteAccount } from '../../../../../../main/webapp/app/entities/site-account/site-account.model';

describe('Component Tests', () => {
    describe('SiteAccount Management Detail Component', () => {
        let comp: SiteAccountDetailComponent;
        let fixture: ComponentFixture<SiteAccountDetailComponent>;
        let service: SiteAccountService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BillingWebTestModule],
                declarations: [SiteAccountDetailComponent],
                providers: [SiteAccountService]
            })
                .overrideTemplate(SiteAccountDetailComponent, '')
                .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SiteAccountDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SiteAccountService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(
                    Observable.of(
                        new HttpResponse({
                            body: new SiteAccount(123)
                        })
                    )
                );

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.siteAccount).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
