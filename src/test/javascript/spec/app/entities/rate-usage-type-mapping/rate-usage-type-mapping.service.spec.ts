/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { JhiDateUtils } from 'ng-jhipster';

import { RateUsageTypeMappingService } from '../../../../../../main/webapp/app/entities/rate-usage-type-mapping/rate-usage-type-mapping.service';
import { SERVER_API_URL } from '../../../../../../main/webapp/app/app.constants';

describe('Service Tests', () => {
    describe('RateUsageTypeMapping Service', () => {
        let injector: TestBed;
        let service: RateUsageTypeMappingService;
        let httpMock: HttpTestingController;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule],
                providers: [JhiDateUtils, RateUsageTypeMappingService]
            });
            injector = getTestBed();
            service = injector.get(RateUsageTypeMappingService);
            httpMock = injector.get(HttpTestingController);
        });

        describe('Service methods', () => {
            it('should call correct URL', () => {
                service.find(123).subscribe(() => {});

                const req = httpMock.expectOne({ method: 'GET' });

                const resourceUrl = SERVER_API_URL + 'api/rate-usage-type-mappings';
                expect(req.request.url).toEqual(resourceUrl + '/' + 123);
            });
            it('should return RateUsageTypeMapping', () => {
                service.find(123).subscribe(received => {
                    expect(received.body.id).toEqual(123);
                });

                const req = httpMock.expectOne({ method: 'GET' });
                req.flush({ id: 123 });
            });

            it('should propagate not found response', () => {
                service.find(123).subscribe(null, (_error: any) => {
                    expect(_error.status).toEqual(404);
                });

                const req = httpMock.expectOne({ method: 'GET' });
                req.flush('Invalid request parameters', {
                    status: 404,
                    statusText: 'Bad Request'
                });
            });
        });

        afterEach(() => {
            httpMock.verify();
        });
    });
});
