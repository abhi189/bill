/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BillingWebTestModule } from '../../../test.module';
import { SolutionComponent } from '../../../../../../main/webapp/app/entities/solution/solution.component';
import { SolutionService } from '../../../../../../main/webapp/app/entities/solution/solution.service';
import { Solution } from '../../../../../../main/webapp/app/entities/solution/solution.model';

describe('Component Tests', () => {
    describe('Solution Management Component', () => {
        let comp: SolutionComponent;
        let fixture: ComponentFixture<SolutionComponent>;
        let service: SolutionService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BillingWebTestModule],
                declarations: [SolutionComponent],
                providers: [SolutionService]
            })
                .overrideTemplate(SolutionComponent, '')
                .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SolutionComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SolutionService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(
                    Observable.of(
                        new HttpResponse({
                            body: [new Solution(123)],
                            headers
                        })
                    )
                );

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.solutions[0]).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
