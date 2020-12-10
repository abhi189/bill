/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BillingWebTestModule } from '../../../test.module';
import { StagingChargeComponent } from '../../../../../../main/webapp/app/entities/staging-charge/staging-charge.component';
import { StagingChargeService } from '../../../../../../main/webapp/app/entities/staging-charge/staging-charge.service';
import { StagingCharge } from '../../../../../../main/webapp/app/entities/staging-charge/staging-charge.model';

describe('Component Tests', () => {
    describe('StagingCharge Management Component', () => {
        let comp: StagingChargeComponent;
        let fixture: ComponentFixture<StagingChargeComponent>;
        let service: StagingChargeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BillingWebTestModule],
                declarations: [StagingChargeComponent],
                providers: [StagingChargeService]
            })
                .overrideTemplate(StagingChargeComponent, '')
                .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(StagingChargeComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StagingChargeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(
                    Observable.of(
                        new HttpResponse({
                            body: [new StagingCharge(123)],
                            headers
                        })
                    )
                );

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.stagingCharges[0]).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
