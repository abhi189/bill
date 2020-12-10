export class Cache {
    constructor(public storedObjects: any) {}
}

export class HourCacheObject {
    constructor(
        public monitorId: string,
        public year: number,
        public month: number,
        public day: number,
        public hour: number,
        public data: any,
        public totalConsumption: number,
        public maxDemand: number
    ) {}
}

export class DayCacheObject {
    constructor(
        public monitorId: string,
        public year: number,
        public month: number,
        public day: number,
        public data: any,
        public totalConsumption: number,
        public maxDemand: number
    ) {}
}

export class MonthCacheObject {
    constructor(
        public monitorId: string,
        public year: number,
        public month: number,
        public data: any,
        public totalConsumption: number,
        public maxDemand: number
    ) {}
}

export class YearCacheObject {
    constructor(
        public monitorId: string,
        public year: number,
        public data: any,
        public totalConsumption: number,
        public maxDemand: number
    ) {}
}

export class DataSummarized {
    constructor(public totalConsumption: number, public maxDemand: number) {}
}

export class Ke2HourCacheObject {
    constructor(
        public monitorId: string,
        public year: number,
        public month: number,
        public day: number,
        public hour: number,
        public data: any,
        public coilTemp: number,
        public roomTemp: number
    ) {}
}

export class Ke2DayCacheObject {
    constructor(
        public monitorId: string,
        public year: number,
        public month: number,
        public day: number,
        public data: any,
        public maxCoilTemp: number,
        public avgCoilTemp: number,
        public minCoilTemp: number,
        public maxRoomTemp: number,
        public avgRoomTemp: number,
        public minRoomTemp: number
    ) {}
}

export class Ke2MonthCacheObject {
    constructor(
        public monitorId: string,
        public year: number,
        public month: number,
        public data: any,
        public maxCoilTemp: number,
        public avgCoilTemp: number,
        public minCoilTemp: number,
        public maxRoomTemp: number,
        public avgRoomTemp: number,
        public minRoomTemp: number
    ) {}
}

export class Ke2YearCacheObject {
    constructor(
        public monitorId: string,
        public year: number,
        public data: any,
        public maxCoilTemp: number,
        public avgCoilTemp: number,
        public minCoilTemp: number,
        public maxRoomTemp: number,
        public avgRoomTemp: number,
        public minRoomTemp: number
    ) {}
}

export class RefrigerationDataSummarized {
    constructor(public maxCoilTemp: number, public maxRoomTemp: number) {}
}

export class RefrigerationNonHourlyDataSummarized {
    constructor(
        public maxCoilTemp: number,
        public avgCoilTemp: number,
        public minCoilTemp: number,
        public maxRoomTemp: number,
        public avgRoomTemp: number,
        public minRoomTemp: number,
        public apexMaxCoilTemp: number,
        public apexMaxRoomTemp: number
    ) {}
}
