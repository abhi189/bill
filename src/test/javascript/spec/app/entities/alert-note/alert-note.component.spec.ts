/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BillingWebTestModule } from '../../../test.module';
import { AlertNoteComponent } from '../../../../../../main/webapp/app/entities/alert-note/alert-note.component';
import { AlertNoteService } from '../../../../../../main/webapp/app/entities/alert-note/alert-note.service';
import { AlertNote } from '../../../../../../main/webapp/app/entities/alert-note/alert-note.model';

describe('Component Tests', () => {
    describe('AlertNote Management Component', () => {
        let comp: AlertNoteComponent;
        let fixture: ComponentFixture<AlertNoteComponent>;
        let service: AlertNoteService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BillingWebTestModule],
                declarations: [AlertNoteComponent],
                providers: [AlertNoteService]
            })
                .overrideTemplate(AlertNoteComponent, '')
                .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AlertNoteComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AlertNoteService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(
                    Observable.of(
                        new HttpResponse({
                            body: [new AlertNote(123)],
                            headers
                        })
                    )
                );

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.alertNotes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
