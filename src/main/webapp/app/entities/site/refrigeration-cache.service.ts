import { Injectable } from '@angular/core';
import { Item } from 'angular4-multiselect-dropdown/dist/menu-item';

import {
    Ke2HourCacheObject,
    Ke2DayCacheObject,
    Ke2MonthCacheObject,
    Ke2YearCacheObject,
    Cache,
    RefrigerationDataSummarized,
    RefrigerationNonHourlyDataSummarized
} from './cache.model';

@Injectable()
export class RefrigerationCacheService {
    private cacheLimit = 10;
    private hourCacheName = 'hour-cache';
    private dayCacheName = 'day-cache';
    private monthCacheName = 'month-cache';
    private yearCacheName = 'year-cache';

    constructor() {}

    storeHourDataInCache(monitorId: string, year: number, month: number, day: number, hour: number, data: any) {
        const summarizedInfo: RefrigerationDataSummarized = this.summarizeRefrigerationData(data.reportByHour);
        const hourCacheObject: Ke2HourCacheObject = new Ke2HourCacheObject(
            monitorId,
            year,
            month,
            day,
            hour,
            data,
            summarizedInfo.maxCoilTemp,
            summarizedInfo.maxRoomTemp
        );

        this.storeInCache(this.hourCacheName, hourCacheObject);
    }

    storeDayDataInCache(monitorId: string, year: number, month: number, day: number, data: any) {
        const summarizedInfo: RefrigerationNonHourlyDataSummarized = this.summarizeNonHourlyRefrigerationData(data.reportByDay);
        const dayCacheObject: Ke2DayCacheObject = new Ke2DayCacheObject(
            monitorId,
            year,
            month,
            day,
            data,
            summarizedInfo.maxCoilTemp,
            summarizedInfo.avgCoilTemp,
            summarizedInfo.minCoilTemp,
            summarizedInfo.maxRoomTemp,
            summarizedInfo.avgRoomTemp,
            summarizedInfo.minRoomTemp
        );

        this.storeInCache(this.dayCacheName, dayCacheObject);
    }

    storeMonthDataInCache(monitorId: string, year: number, month: number, data: any) {
        const summarizedInfo: RefrigerationNonHourlyDataSummarized = this.summarizeNonHourlyRefrigerationData(data.reportByDay);
        const monthCacheObject: Ke2MonthCacheObject = new Ke2MonthCacheObject(
            monitorId,
            year,
            month,
            data,
            summarizedInfo.maxCoilTemp,
            summarizedInfo.avgCoilTemp,
            summarizedInfo.minCoilTemp,
            summarizedInfo.maxRoomTemp,
            summarizedInfo.avgRoomTemp,
            summarizedInfo.minRoomTemp
        );

        this.storeInCache(this.monthCacheName, monthCacheObject);
    }

    storeYearDataInCache(monitorId: string, year: number, data: any) {
        const summarizedInfo: RefrigerationNonHourlyDataSummarized = this.summarizeNonHourlyRefrigerationData(data.reportByDay);
        const yearCacheObject: Ke2YearCacheObject = new Ke2YearCacheObject(
            monitorId,
            year,
            data,
            summarizedInfo.maxCoilTemp,
            summarizedInfo.avgCoilTemp,
            summarizedInfo.minCoilTemp,
            summarizedInfo.maxRoomTemp,
            summarizedInfo.avgRoomTemp,
            summarizedInfo.minRoomTemp
        );

        this.storeInCache(this.yearCacheName, yearCacheObject);
    }

    getYearDataFromCache(monitorId: string, year: number) {
        const cache = JSON.parse(localStorage.getItem(this.yearCacheName));
        let yearObject: Ke2YearCacheObject;
        if (cache) {
            // we loop in reverse in order to get the last result in the array.
            for (let i = cache.storedObjects.length; i--; ) {
                if (cache.storedObjects[i].monitorId === monitorId && cache.storedObjects[i].year === year) {
                    yearObject = cache.storedObjects[i];
                    break;
                }
            }
        }
        return yearObject;
    }

    getMonthDataFromCache(monitorId: string, year: number, month: number) {
        const cache = JSON.parse(localStorage.getItem(this.monthCacheName));
        let monthObject: Ke2MonthCacheObject;
        if (cache) {
            // we loop in reverse in order to get the last result in the array.
            for (let i = cache.storedObjects.length; i--; ) {
                if (
                    cache.storedObjects[i].monitorId === monitorId &&
                    cache.storedObjects[i].year === year &&
                    cache.storedObjects[i].month === month
                ) {
                    monthObject = cache.storedObjects[i];
                    break;
                }
            }
        }
        return monthObject;
    }

    getDayDataFromCache(monitorId: string, year: number, month: number, day: number) {
        const cache = JSON.parse(localStorage.getItem(this.dayCacheName));
        let dayObject: Ke2DayCacheObject;
        if (cache) {
            // we loop in reverse in order to get the last result in the array.
            for (let i = cache.storedObjects.length; i--; ) {
                if (
                    cache.storedObjects[i].monitorId === monitorId &&
                    cache.storedObjects[i].year === year &&
                    cache.storedObjects[i].month === month &&
                    cache.storedObjects[i].day === day
                ) {
                    dayObject = cache.storedObjects[i];
                    break;
                }
            }
        }
        return dayObject;
    }

    getHourDataFromCache(monitorId: string, year: number, month: number, day: number, hour: number) {
        const cache = JSON.parse(localStorage.getItem(this.hourCacheName));
        let hourObject: Ke2HourCacheObject;
        if (cache) {
            // we loop in reverse in order to get the last result in the array.
            for (let i = cache.storedObjects.length; i--; ) {
                if (
                    cache.storedObjects[i].monitorId === monitorId &&
                    cache.storedObjects[i].year === year &&
                    cache.storedObjects[i].month === month &&
                    cache.storedObjects[i].day === day &&
                    cache.storedObjects[i].hour === hour
                ) {
                    hourObject = cache.storedObjects[i];
                    break;
                }
            }
        }
        return hourObject;
    }

    private storeInCache(cacheName: string, data: any) {
        if (localStorage.getItem(cacheName)) {
            // we need to add this to the array
            const cache = JSON.parse(localStorage.getItem(cacheName));
            if (cache.storedObjects.length === this.cacheLimit) {
                cache.storedObjects.shift();
            }
            cache.storedObjects.push(data);

            localStorage.setItem(cacheName, JSON.stringify(cache));
        } else {
            // there is nothing on the cache
            const cacheData = [];
            cacheData.push(data);
            const cache: Cache = new Cache(cacheData);
            localStorage.setItem(cacheName, JSON.stringify(cache));
        }
    }

    restartCache() {
        localStorage.removeItem(this.hourCacheName);
    }

    summarizeRefrigerationData(arr: any) {
        let maxCoilTemp = 0;
        let maxRoomTemp = 0;
        for (let i = 0; i < arr.length; i++) {
            if (maxCoilTemp < arr[i].coilTemp) {
                maxCoilTemp = arr[i].coilTemp;
            }
            if (maxRoomTemp < arr[i].roomTemp) {
                maxRoomTemp = arr[i].roomTemp;
            }
        }
        return new RefrigerationDataSummarized(maxCoilTemp, maxRoomTemp);
    }

    summarizeNonHourlyRefrigerationData(arr: any) {
        let maxCoilTemp = 0;
        let avgCoilTemp = 0;
        let minCoilTemp = 0;
        let maxRoomTemp = 0;
        let avgRoomTemp = 0;
        let minRoomTemp = 0;
        let apexMaxCoilTemp = 0;
        let apexMaxRoomTemp = 0;

        let hourData = false;

        if (arr.length !== 0) {
            if (arr[0].coilTemp !== undefined || arr[0].roomTemp !== undefined) {
                hourData = true;
            }
        }

        if (hourData === true) {
            maxCoilTemp = Math.max.apply(
                null,
                arr.map(function(item) {
                    return item.coilTemp;
                })
            );
            minCoilTemp = Math.min.apply(
                null,
                arr.map(function(item) {
                    return item.coilTemp;
                })
            );
            maxRoomTemp = Math.max.apply(
                null,
                arr.map(function(item) {
                    return item.roomTemp;
                })
            );
            minRoomTemp = Math.min.apply(
                null,
                arr.map(function(item) {
                    return item.roomTemp;
                })
            );

            avgCoilTemp = (maxCoilTemp + minCoilTemp) / 2;
            avgRoomTemp = (maxRoomTemp + minRoomTemp) / 2;
        } else {
            for (let i = 0; i < arr.length; i++) {
                maxCoilTemp = arr[i].maxCoilTemp;
                avgCoilTemp = arr[i].avgCoilTemp;
                minCoilTemp = arr[i].minCoilTemp;
                maxRoomTemp = arr[i].maxRoomTemp;
                avgRoomTemp = arr[i].avgRoomTemp;
                minRoomTemp = arr[i].minRoomTemp;
            }
        }
        apexMaxCoilTemp = Math.max.apply(
            null,
            arr.map(function(item) {
                return item.maxCoilTemp;
            })
        );
        apexMaxRoomTemp = Math.max.apply(
            null,
            arr.map(function(item) {
                return item.maxRoomTemp;
            })
        );

        return new RefrigerationNonHourlyDataSummarized(
            maxCoilTemp,
            avgCoilTemp,
            minCoilTemp,
            maxRoomTemp,
            avgRoomTemp,
            minRoomTemp,
            apexMaxCoilTemp,
            apexMaxRoomTemp
        );
    }
}
