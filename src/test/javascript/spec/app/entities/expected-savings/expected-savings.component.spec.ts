/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BillingWebTestModule } from '../../../test.module';
import { ExpectedSavingsComponent } from '../../../../../../main/webapp/app/entities/expected-savings/expected-savings.component';
import { ExpectedSavingsService } from '../../../../../../main/webapp/app/entities/expected-savings/expected-savings.service';
import { ExpectedSavings } from '../../../../../../main/webapp/app/entities/expected-savings/expected-savings.model';

describe('Component Tests', () => {
    describe('ExpectedSavings Management Component', () => {
        let comp: ExpectedSavingsComponent;
        let fixture: ComponentFixture<ExpectedSavingsComponent>;
        let service: ExpectedSavingsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BillingWebTestModule],
                declarations: [ExpectedSavingsComponent],
                providers: [ExpectedSavingsService]
            })
                .overrideTemplate(ExpectedSavingsComponent, '')
                .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ExpectedSavingsComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ExpectedSavingsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(
                    Observable.of(
                        new HttpResponse({
                            body: [new ExpectedSavings(123)],
                            headers
                        })
                    )
                );

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.expectedSavings[0]).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
