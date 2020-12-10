/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BillingWebTestModule } from '../../../test.module';
import { UtilityComponent } from '../../../../../../main/webapp/app/entities/utility/utility.component';
import { UtilityService } from '../../../../../../main/webapp/app/entities/utility/utility.service';
import { Utility } from '../../../../../../main/webapp/app/entities/utility/utility.model';

describe('Component Tests', () => {
    describe('Utility Management Component', () => {
        let comp: UtilityComponent;
        let fixture: ComponentFixture<UtilityComponent>;
        let service: UtilityService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BillingWebTestModule],
                declarations: [UtilityComponent],
                providers: [UtilityService]
            })
                .overrideTemplate(UtilityComponent, '')
                .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UtilityComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UtilityService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(
                    Observable.of(
                        new HttpResponse({
                            body: [new Utility(123)],
                            headers
                        })
                    )
                );

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.utilities[0]).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
