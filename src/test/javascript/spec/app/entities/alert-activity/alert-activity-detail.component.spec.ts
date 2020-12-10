/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { BillingWebTestModule } from '../../../test.module';
import { AlertActivityDetailComponent } from '../../../../../../main/webapp/app/entities/alert-activity/alert-activity-detail.component';
import { AlertActivityService } from '../../../../../../main/webapp/app/entities/alert-activity/alert-activity.service';
import { AlertActivity } from '../../../../../../main/webapp/app/entities/alert-activity/alert-activity.model';

describe('Component Tests', () => {
    describe('AlertActivity Management Detail Component', () => {
        let comp: AlertActivityDetailComponent;
        let fixture: ComponentFixture<AlertActivityDetailComponent>;
        let service: AlertActivityService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BillingWebTestModule],
                declarations: [AlertActivityDetailComponent],
                providers: [AlertActivityService]
            })
                .overrideTemplate(AlertActivityDetailComponent, '')
                .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AlertActivityDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AlertActivityService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(
                    Observable.of(
                        new HttpResponse({
                            body: new AlertActivity(123)
                        })
                    )
                );

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.alertActivity).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
