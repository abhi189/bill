/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BillingWebTestModule } from '../../../test.module';
import { AlertMsComponent } from '../../../../../../main/webapp/app/entities/alert-ms/alert-ms.component';
import { AlertMsService } from '../../../../../../main/webapp/app/entities/alert-ms/alert-ms.service';
import { AlertMs } from '../../../../../../main/webapp/app/entities/alert-ms/alert-ms.model';

describe('Component Tests', () => {
    describe('AlertMs Management Component', () => {
        let comp: AlertMsComponent;
        let fixture: ComponentFixture<AlertMsComponent>;
        let service: AlertMsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BillingWebTestModule],
                declarations: [AlertMsComponent],
                providers: [AlertMsService]
            })
                .overrideTemplate(AlertMsComponent, '')
                .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AlertMsComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AlertMsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(
                    Observable.of(
                        new HttpResponse({
                            body: [new AlertMs(123)],
                            headers
                        })
                    )
                );

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.alertMs[0]).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
