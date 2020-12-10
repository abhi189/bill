/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { BillingWebTestModule } from '../../../test.module';
import { AlertDetailComponent } from '../../../../../../main/webapp/app/entities/alert/alert-detail.component';
import { AlertService } from '../../../../../../main/webapp/app/entities/alert/alert.service';
import { Alert } from '../../../../../../main/webapp/app/entities/alert/alert.model';

describe('Component Tests', () => {
    describe('Alert Management Detail Component', () => {
        let comp: AlertDetailComponent;
        let fixture: ComponentFixture<AlertDetailComponent>;
        let service: AlertService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BillingWebTestModule],
                declarations: [AlertDetailComponent],
                providers: [AlertService]
            })
                .overrideTemplate(AlertDetailComponent, '')
                .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AlertDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AlertService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(
                    Observable.of(
                        new HttpResponse({
                            body: new Alert(123)
                        })
                    )
                );

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.alert).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
