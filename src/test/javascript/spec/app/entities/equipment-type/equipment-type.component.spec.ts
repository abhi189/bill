/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BillingWebTestModule } from '../../../test.module';
import { EquipmentTypeComponent } from '../../../../../../main/webapp/app/entities/equipment-type/equipment-type.component';
import { EquipmentTypeService } from '../../../../../../main/webapp/app/entities/equipment-type/equipment-type.service';
import { EquipmentType } from '../../../../../../main/webapp/app/entities/equipment-type/equipment-type.model';

describe('Component Tests', () => {
    describe('EquipmentType Management Component', () => {
        let comp: EquipmentTypeComponent;
        let fixture: ComponentFixture<EquipmentTypeComponent>;
        let service: EquipmentTypeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BillingWebTestModule],
                declarations: [EquipmentTypeComponent],
                providers: [EquipmentTypeService]
            })
                .overrideTemplate(EquipmentTypeComponent, '')
                .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EquipmentTypeComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EquipmentTypeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(
                    Observable.of(
                        new HttpResponse({
                            body: [new EquipmentType(123)],
                            headers
                        })
                    )
                );

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.equipmentTypes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
