/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { BillingWebTestModule } from '../../../test.module';
import { SolutionDetailComponent } from '../../../../../../main/webapp/app/entities/solution/solution-detail.component';
import { SolutionService } from '../../../../../../main/webapp/app/entities/solution/solution.service';
import { Solution } from '../../../../../../main/webapp/app/entities/solution/solution.model';

describe('Component Tests', () => {
    describe('Solution Management Detail Component', () => {
        let comp: SolutionDetailComponent;
        let fixture: ComponentFixture<SolutionDetailComponent>;
        let service: SolutionService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BillingWebTestModule],
                declarations: [SolutionDetailComponent],
                providers: [SolutionService]
            })
                .overrideTemplate(SolutionDetailComponent, '')
                .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SolutionDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SolutionService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(
                    Observable.of(
                        new HttpResponse({
                            body: new Solution(123)
                        })
                    )
                );

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.solution).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
