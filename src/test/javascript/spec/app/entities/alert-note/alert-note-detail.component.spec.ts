/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { BillingWebTestModule } from '../../../test.module';
import { AlertNoteDetailComponent } from '../../../../../../main/webapp/app/entities/alert-note/alert-note-detail.component';
import { AlertNoteService } from '../../../../../../main/webapp/app/entities/alert-note/alert-note.service';
import { AlertNote } from '../../../../../../main/webapp/app/entities/alert-note/alert-note.model';

describe('Component Tests', () => {
    describe('AlertNote Management Detail Component', () => {
        let comp: AlertNoteDetailComponent;
        let fixture: ComponentFixture<AlertNoteDetailComponent>;
        let service: AlertNoteService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BillingWebTestModule],
                declarations: [AlertNoteDetailComponent],
                providers: [AlertNoteService]
            })
                .overrideTemplate(AlertNoteDetailComponent, '')
                .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AlertNoteDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AlertNoteService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(
                    Observable.of(
                        new HttpResponse({
                            body: new AlertNote(123)
                        })
                    )
                );

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.alertNote).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
