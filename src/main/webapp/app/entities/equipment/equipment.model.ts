import { BaseEntity } from './../../shared';
import { EquipmentType } from '../equipment-type';

export class Equipment implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
        public bfSiteId?: string,
        public budderflyId?: string,
        public state?: string,
        public macAddress?: string,
        public ipAddress?: string,
        public locationDetails?: string,
        public equipmentNr?: number,
        public equipmentType?: EquipmentType,
        public equipmentTypeId?: number,
        public equipmentTypeCode?: string,
        public utilityMeterNumber?: string,
        public equipmentTypeLocation?: EquipmentTypeLocation,
        public equipmentTypeLocationId?: number,
        public displayDescription?: string // Will be either the UtilityNumber (if its type MAIN) or the location
    ) {}
}

export class EquipmentReport {
    constructor(
        public reportByYear?: EquipmentReportByYear[],
        public reportByMonth?: EquipmentReportByMonth[],
        public reportByDay?: EquipmentReportByDay[],
        public reportByHour?: EquipmentReportByHour[]
    ) {}
}

export class RefrigerationReport {
    constructor(
        public reportByHour?: RefrigerationReportByHour[],
        public reportByDay?: RefrigerationReportByDay[],
        public reportByMonth?: RefrigerationReportByMonth[],
        public reportByYear?: RefrigerationReportByYear[]
    ) {}
}

export class EquipmentReportByYear {
    constructor(
        public demand?: number,
        public consumption?: number,
        public rank?: number,
        public month?: number,
        public year?: number,
        public monthName?: string,
        public timeZoneId?: string,
        public requestDate?: string,
        public primeData?: boolean
    ) {}
}

export class EquipmentReportByMonth {
    constructor(
        public demand?: number,
        public consumption?: number,
        public rank?: number,
        public day?: number,
        public month?: number,
        public year?: number,
        public timeZoneId?: string,
        public requestDate?: string,
        public primeData?: boolean
    ) {}
}

export class EquipmentReportByDay {
    constructor(
        public demand?: number,
        public consumption?: number,
        public rank?: number,
        public hour?: number,
        public day?: number,
        public month?: number,
        public year?: number,
        public timeZoneId?: string,
        public requestDate?: string,
        public primeData?: boolean
    ) {}
}

export class EquipmentReportByHour {
    constructor(
        public demand?: number,
        public consumption?: number,
        public rank?: number,
        public hour?: number,
        public day?: number,
        public month?: number,
        public year?: number,
        public minute?: number,
        public hourLabel?: number,
        public timeZoneId?: string,
        public requestDate?: string
    ) {}
}
export class EquipmentTypeLocation {
    constructor(public id?: number, public location?: string, public code?: string) {}
}

export const enum EquipmentTypeCode {
    UNKNOWN = 'UNKNOWN',
    MAIN = 'MAIN',
    HVAC = 'HVAC',
    OTHER = 'OTHER',
    FREEZER = 'FREEZER',
    COOLER = 'COOLER',
    EXHAUST = 'EXHAUST',
    BREADOVEN = 'BREADOVEN',
    LIGHTING = 'LIGHTING',
    WATERHEATER = 'WATERHEATER',
    SPEEDOVEN = 'SPEEDOVEN',
    OVEN = 'OVEN',
    HEATPUMP = 'HEATPUMP',
    POWERSOAKSTATION = 'POWERSOAKSTATION',
    POS = 'POS',
    TIMER = 'TIMER',
    MICROWAVE = 'MICROWAVE',
    BREWER = 'BREWER',
    ICEMAKER = 'ICEMAKER',
    HOTWATER = 'HOTWATER',
    WATERDISPENSER = 'WATERDISPENSER',
    HEATEDCABINET = 'HEATEDCABINET',
    REFRIGERATOR = 'REFRIGERATOR',
    DISPENSER = 'DISPENSER',
    CONVECTIONOVEN = 'CONVECTIONOVEN',
    CARBONATOR = 'CARBONATOR',
    BREADER = 'BREADER',
    SODAMACHINE = 'SODAMACHINE',
    DRAWER = 'DRAWER',
    VELOCITYFRYER = 'VELOCITYFRYER',
    SUPPLYFAN = 'SUPPLYFAN',
    WARMER = 'WARMER',
    MARINATOR = 'MARINATOR',
    HOTWELL = 'HOTWELL',
    HEATEDDISPLAY = 'HEATEDDISPLAY',
    GRILLINGOVEN = 'GRILLINGOVEN',
    COLDWELL = 'COLDWELL',
    OVENTRANSFORMER = 'OVENTRANSFORMER',
    PANNIPRESS = 'PANNIPRESS',
    UPS = 'UPS',
    CHILLER = 'CHILLER',
    BATTERY = 'BATTERY',
    ICEMACHINE = 'ICEMACHINE',
    FREEZERFAN = 'FREEZERFAN',
    COOLERFAN = 'COOLERFAN',
    SANDWICHUNIT = 'SANDWICHUNIT',
    COFFEEMAKER = 'COFFEEMAKER',
    TOASTEROVEN = 'TOASTEROVEN',
    COMPRESSOR = 'COMPRESSOR',
    TOASTER = 'TOASTER'
}

export class RefrigerationReportByHour {
    constructor(
        public coilTemp?: number,
        public roomTemp?: number,
        public rank?: number,
        public hour?: number,
        public day?: number,
        public month?: number,
        public year?: number,
        public minute?: number,
        public hourLabel?: number,
        public timeZoneId?: string,
        public requestDate?: string
    ) {}
}

export class RefrigerationReportByDay {
    constructor(
        public maxCoilTemp?: number,
        public avgCoilTemp?: number,
        public minCoilTemp?: number,
        public maxRoomTemp?: number,
        public avgRoomTemp?: number,
        public minRoomTemp?: number,
        public rank?: number,
        public hour?: number,
        public day?: number,
        public month?: number,
        public year?: number,
        public timeZoneId?: string,
        public requestDate?: string,
        public primeData?: boolean
    ) {}
}

export class RefrigerationReportByMonth {
    constructor(
        public maxCoilTemp?: number,
        public avgCoilTemp?: number,
        public minCoilTemp?: number,
        public maxRoomTemp?: number,
        public avgRoomTemp?: number,
        public minRoomTemp?: number,
        public rank?: number,
        public day?: number,
        public month?: number,
        public year?: number,
        public timeZoneId?: string,
        public requestDate?: string,
        public primeData?: boolean
    ) {}
}

export class RefrigerationReportByYear {
    constructor(
        public maxCoilTemp?: number,
        public avgCoilTemp?: number,
        public minCoilTemp?: number,
        public maxRoomTemp?: number,
        public avgRoomTemp?: number,
        public minRoomTemp?: number,
        public rank?: number,
        public month?: number,
        public year?: number,
        public monthName?: string,
        public timeZoneId?: string,
        public requestDate?: string,
        public primeData?: boolean
    ) {}
}
