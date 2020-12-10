/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { BillingWebTestModule } from '../../../test.module';
import { AdjustmentDetailComponent } from '../../../../../../main/webapp/app/entities/adjustment/adjustment-detail.component';
import { AdjustmentService } from '../../../../../../main/webapp/app/entities/adjustment/adjustment.service';
import { Adjustment } from '../../../../../../main/webapp/app/entities/adjustment/adjustment.model';

describe('Component Tests', () => {
    describe('Adjustment Management Detail Component', () => {
        let comp: AdjustmentDetailComponent;
        let fixture: ComponentFixture<AdjustmentDetailComponent>;
        let service: AdjustmentService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BillingWebTestModule],
                declarations: [AdjustmentDetailComponent],
                providers: [AdjustmentService]
            })
                .overrideTemplate(AdjustmentDetailComponent, '')
                .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AdjustmentDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AdjustmentService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(
                    Observable.of(
                        new HttpResponse({
                            body: new Adjustment(123)
                        })
                    )
                );

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.adjustment).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
