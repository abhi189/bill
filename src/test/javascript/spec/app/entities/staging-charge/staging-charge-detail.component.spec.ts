/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { BillingWebTestModule } from '../../../test.module';
import { StagingChargeDetailComponent } from '../../../../../../main/webapp/app/entities/staging-charge/staging-charge-detail.component';
import { StagingChargeService } from '../../../../../../main/webapp/app/entities/staging-charge/staging-charge.service';
import { StagingCharge } from '../../../../../../main/webapp/app/entities/staging-charge/staging-charge.model';

describe('Component Tests', () => {
    describe('StagingCharge Management Detail Component', () => {
        let comp: StagingChargeDetailComponent;
        let fixture: ComponentFixture<StagingChargeDetailComponent>;
        let service: StagingChargeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BillingWebTestModule],
                declarations: [StagingChargeDetailComponent],
                providers: [StagingChargeService]
            })
                .overrideTemplate(StagingChargeDetailComponent, '')
                .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(StagingChargeDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StagingChargeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(
                    Observable.of(
                        new HttpResponse({
                            body: new StagingCharge(123)
                        })
                    )
                );

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.stagingCharge).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
