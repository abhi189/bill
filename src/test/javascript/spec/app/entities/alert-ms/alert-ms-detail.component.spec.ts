/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { BillingWebTestModule } from '../../../test.module';
import { AlertMsDetailComponent } from '../../../../../../main/webapp/app/entities/alert-ms/alert-ms-detail.component';
import { AlertMsService } from '../../../../../../main/webapp/app/entities/alert-ms/alert-ms.service';
import { AlertMs } from '../../../../../../main/webapp/app/entities/alert-ms/alert-ms.model';

describe('Component Tests', () => {
    describe('AlertMs Management Detail Component', () => {
        let comp: AlertMsDetailComponent;
        let fixture: ComponentFixture<AlertMsDetailComponent>;
        let service: AlertMsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BillingWebTestModule],
                declarations: [AlertMsDetailComponent],
                providers: [AlertMsService]
            })
                .overrideTemplate(AlertMsDetailComponent, '')
                .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AlertMsDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AlertMsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(
                    Observable.of(
                        new HttpResponse({
                            body: new AlertMs(123)
                        })
                    )
                );

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.alertMs).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
