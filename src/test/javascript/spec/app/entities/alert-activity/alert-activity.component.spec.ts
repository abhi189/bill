/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BillingWebTestModule } from '../../../test.module';
import { AlertActivityComponent } from '../../../../../../main/webapp/app/entities/alert-activity/alert-activity.component';
import { AlertActivityService } from '../../../../../../main/webapp/app/entities/alert-activity/alert-activity.service';
import { AlertActivity } from '../../../../../../main/webapp/app/entities/alert-activity/alert-activity.model';

describe('Component Tests', () => {
    describe('AlertActivity Management Component', () => {
        let comp: AlertActivityComponent;
        let fixture: ComponentFixture<AlertActivityComponent>;
        let service: AlertActivityService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BillingWebTestModule],
                declarations: [AlertActivityComponent],
                providers: [AlertActivityService]
            })
                .overrideTemplate(AlertActivityComponent, '')
                .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AlertActivityComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AlertActivityService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(
                    Observable.of(
                        new HttpResponse({
                            body: [new AlertActivity(123)],
                            headers
                        })
                    )
                );

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.alertActivities[0]).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
