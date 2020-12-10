import { Injectable } from '@angular/core';

import { HourCacheObject, DayCacheObject, MonthCacheObject, YearCacheObject, Cache, DataSummarized } from './cache.model';

@Injectable()
export class MetricsCacheService {
    private cacheLimit = 10;
    private hourCacheName = 'hour-cache';
    private dayCacheName = 'day-cache';
    private monthCacheName = 'month-cache';
    private yearCacheName = 'year-cache';

    constructor() {}

    storeHourDataInCache(monitorId: string, year: number, month: number, day: number, hour: number, data: any) {
        const summarizedInfo: DataSummarized = this.summarizeData(data.reportByHour);
        const hourCacheObject: HourCacheObject = new HourCacheObject(
            monitorId,
            year,
            month,
            day,
            hour,
            data,
            summarizedInfo.totalConsumption,
            summarizedInfo.maxDemand
        );

        this.storeInCache(this.hourCacheName, hourCacheObject);
    }

    storeDayDataInCache(monitorId: string, year: number, month: number, day: number, data: any) {
        const summarizedInfo: DataSummarized = this.summarizeData(data.reportByDay);
        const dayCacheObject: DayCacheObject = new DayCacheObject(
            monitorId,
            year,
            month,
            day,
            data,
            summarizedInfo.totalConsumption,
            summarizedInfo.maxDemand
        );

        this.storeInCache(this.dayCacheName, dayCacheObject);
    }

    storeMonthDataInCache(monitorId: string, year: number, month: number, data: any) {
        const summarizedInfo: DataSummarized = this.summarizeData(data.reportByMonth);
        const monthCacheObject: MonthCacheObject = new MonthCacheObject(
            monitorId,
            year,
            month,
            data,
            summarizedInfo.totalConsumption,
            summarizedInfo.maxDemand
        );
        this.storeInCache(this.monthCacheName, monthCacheObject);
    }

    storeYearDataInCache(monitorId: string, year: number, data: any) {
        const summarizedInfo: DataSummarized = this.summarizeData(data.reportByYear);
        const yearCacheObject: YearCacheObject = new YearCacheObject(
            monitorId,
            year,
            data,
            summarizedInfo.totalConsumption,
            summarizedInfo.maxDemand
        );

        this.storeInCache(this.yearCacheName, yearCacheObject);
    }

    getHourDataFromCache(monitorId: string, year: number, month: number, day: number, hour: number) {
        const cache = JSON.parse(localStorage.getItem(this.hourCacheName));
        let hourObject: HourCacheObject;
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

    getDayDataFromCache(monitorId: string, year: number, month: number, day: number) {
        const cache = JSON.parse(localStorage.getItem(this.dayCacheName));
        let dayObject: DayCacheObject;
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

    getMonthDataFromCache(monitorId: string, year: number, month: number) {
        const cache = JSON.parse(localStorage.getItem(this.monthCacheName));
        let monthObject: MonthCacheObject;
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

    getYearDataFromCache(monitorId: string, year: number) {
        const cache = JSON.parse(localStorage.getItem(this.yearCacheName));
        let yearObject: YearCacheObject;
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
        localStorage.removeItem(this.dayCacheName);
        localStorage.removeItem(this.monthCacheName);
        localStorage.removeItem(this.yearCacheName);
    }

    summarizeData(arr: any) {
        // SUM(consumption)
        // MAX(demand)
        let maxDemand = 0;
        let totalConsumption = 0;
        for (let i = 0; i < arr.length; i++) {
            totalConsumption = parseFloat((totalConsumption + arr[i].consumption).toFixed(6));
            if (maxDemand < arr[i].demand) {
                maxDemand = arr[i].demand;
            }
        }
        return new DataSummarized(totalConsumption, maxDemand);
    }
}
