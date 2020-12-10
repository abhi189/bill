/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BillingWebTestModule } from '../../../test.module';
import { AlertComponent } from '../../../../../../main/webapp/app/entities/alert/alert.component';
import { AlertService } from '../../../../../../main/webapp/app/entities/alert/alert.service';
import { Alert } from '../../../../../../main/webapp/app/entities/alert/alert.model';

describe('Component Tests', () => {
    describe('Alert Management Component', () => {
        let comp: AlertComponent;
        let fixture: ComponentFixture<AlertComponent>;
        let service: AlertService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BillingWebTestModule],
                declarations: [AlertComponent],
                providers: [AlertService]
            })
                .overrideTemplate(AlertComponent, '')
                .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AlertComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AlertService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(
                    Observable.of(
                        new HttpResponse({
                            body: [new Alert(123)],
                            headers
                        })
                    )
                );

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.alerts[0]).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
