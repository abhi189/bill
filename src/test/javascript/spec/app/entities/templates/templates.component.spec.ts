/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BillingWebTestModule } from '../../../test.module';
import { TemplatesComponent } from '../../../../../../main/webapp/app/entities/templates/templates.component';
import { TemplatesService } from '../../../../../../main/webapp/app/entities/templates/templates.service';
import { Templates } from '../../../../../../main/webapp/app/entities/templates/templates.model';

describe('Component Tests', () => {
    describe('Templates Management Component', () => {
        let comp: TemplatesComponent;
        let fixture: ComponentFixture<TemplatesComponent>;
        let service: TemplatesService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BillingWebTestModule],
                declarations: [TemplatesComponent],
                providers: [TemplatesService]
            })
                .overrideTemplate(TemplatesComponent, '')
                .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TemplatesComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TemplatesService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(
                    Observable.of(
                        new HttpResponse({
                            body: [new Templates(123)],
                            headers
                        })
                    )
                );

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.templates[0]).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
