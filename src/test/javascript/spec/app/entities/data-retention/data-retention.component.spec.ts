/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BillingWebTestModule } from '../../../test.module';
import { DataRetentionComponent } from '../../../../../../main/webapp/app/entities/data-retention/data-retention.component';
import { DataRetentionService } from '../../../../../../main/webapp/app/entities/data-retention/data-retention.service';
import { DataRetention } from '../../../../../../main/webapp/app/entities/data-retention/data-retention.model';

describe('Component Tests', () => {
    describe('DataRetention Management Component', () => {
        let comp: DataRetentionComponent;
        let fixture: ComponentFixture<DataRetentionComponent>;
        let service: DataRetentionService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BillingWebTestModule],
                declarations: [DataRetentionComponent],
                providers: [DataRetentionService]
            })
                .overrideTemplate(DataRetentionComponent, '')
                .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DataRetentionComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DataRetentionService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(
                    Observable.of(
                        new HttpResponse({
                            body: [new DataRetention(123)],
                            headers
                        })
                    )
                );

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.dataRetentions[0]).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
