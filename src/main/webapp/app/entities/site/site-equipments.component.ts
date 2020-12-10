import { Component, OnInit, OnDestroy, Input, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { Equipment, EquipmentReport, EquipmentTypeCode, RefrigerationReport } from '../equipment/equipment.model';
import { Event } from '../event/event.model';
import { EquipmentService } from '../equipment/equipment.service';
import { ITEMS_PER_PAGE, Principal } from '../../shared';
import { EventService } from '../event/event.service';
import { MetricsService } from './metrics.service';
import { AllChartData, Monitor, MetricTemplate, RequestDTO } from './site.model';
import {
    HourCacheObject,
    DayCacheObject,
    MonthCacheObject,
    YearCacheObject,
    DataSummarized,
    RefrigerationDataSummarized,
    RefrigerationNonHourlyDataSummarized,
    Ke2DayCacheObject,
    Ke2HourCacheObject,
    Ke2MonthCacheObject,
    Ke2YearCacheObject
} from './cache.model';
import { MonitorService } from './monitor.service';
import { MetricsCacheService } from './metrics-cache.service';
import { Observable } from 'rxjs';
import { RefrigerationCacheService } from './refrigeration-cache.service';

@Component({
    selector: 'jhi-site-equipments',
    templateUrl: '../equipment/equipment-event.component.html',
    styles: ['.active { font: bold;} .monitorSelector {width:360px; display: flex; padding-top:7px; height: 55px; padding-left:7px;}']
})
export class SiteEquipmentsComponent implements OnInit, OnDestroy {
    @Input() budderflyId: string;
    @Input() timeZoneID: string;
    @ViewChild('t') consumption_tabs;

    currentAccount: any;
    selectedEquipment: Equipment;
    equipments: Equipment[] = [];
    events: Event[];
    error: any;
    success: any;
    eventSubscriber: Subscription;
    currentSearch: string;
    routeData: any;
    links: any;
    totalItems: any;
    queryCount: any;
    itemsPerPage: any;
    page: any;
    predicate: any;
    previousPage: any;
    reverse: any;

    currentYear: Date;
    currentMonth: Date;
    currentDay: Date;
    currentHour: Date;

    showEquipmentData: boolean;
    mainSelected = false;
    yearChartData = [];
    yearChartColors = [];
    yearChartLabels = [];
    yearChartOptions = {};
    monthChartData = [];
    monthChartColors = [];
    monthChartLabels = [];
    monthChartOptions = {};
    dayChartData = [];
    dayChartColors = [];
    dayChartLabels = [];
    dayChartOptions = {};
    hourChartData = [];
    hourChartColors = [];
    hourChartLabels = [];
    hourChartOptions = {};
    equipmentReport: EquipmentReport;

    yearDemandChartData = [];
    yearDemandChartColors = [];
    yearDemandChartOptions = {};
    yearDemandChartLabels = [];

    monthDemandChartData = [];
    monthDemandChartColors = [];
    monthDemandChartOptions = {};
    monthDemandChartLabels = [];
    dayDemandChartData = [];
    dayDemandChartColors = [];
    dayDemandChartOptions = {};
    dayDemandChartLabels = [];
    hourDemandChartData = [];
    hourDemandChartColors = [];
    hourDemandChartOptions = {};
    hourDemandChartLabels = [];

    shortMonths = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

    hourDataLoaded: boolean;
    dayDataLoaded: boolean;
    monthDataLoaded: boolean;
    yearDataLoaded: boolean;
    hourDemandDataLoaded: boolean;
    dayDemandDataLoaded: boolean;
    monthDemandDataLoaded: boolean;
    yearDemandDataLoaded: boolean;

    monitors: Monitor[];
    selectedMonitor: Monitor;
    showPowerGraph: boolean;
    // 10% offset for the MAX value
    scaleOffset = 0.1;
    showMultipleMonitors: boolean;
    nonAvailableMonitors: boolean;
    alertMonitorFound: boolean;

    actualDate: Date;
    actualDateMinus1Hour: Date;

    starTabName: string;

    tmpUTCHourReqDate: Date;
    currentShowHour: Date;
    currentShowDay: Date;
    currentShowMonth: Date;
    currentShowYear: number;
    currentClientTZ: Date;

    totalHourConsumption: number;
    maxHourDemand: number;
    totalDayConsumption: number;
    maxDayDemand: number;
    totalMonthConsumption: number;
    maxMonthDemand: number;
    totalYearConsumption: number;
    maxYearDemand: number;

    reattempts: number;
    selectedPowerMonitorId: string;
    powerMonitors: Array<Monitor> = [];

    // refrigeration
    // Hour
    showKe2Graph: boolean;
    hourKe2ChartData = [];
    hourKe2ChartColors = [];
    hourKe2ChartLabels = [];
    hourKe2ChartOptions = {};
    refrigerationReport: RefrigerationReport;
    maxCoilTemp: number;
    maxRoomTemp: number;
    ke2HourDataLoaded: boolean;
    // Day
    dayKe2ChartData = [];
    dayKe2ChartColors = [];
    dayKe2ChartLabels = [];
    dayKe2ChartOptions = {};
    minCoilTemp: number;
    minRoomTemp: number;
    ke2DayDataLoaded: boolean;
    avgCoilTemp: number;
    avgRoomTemp: number;
    apexMaxCoilTemp: number;
    apexMaxRoomTemp: number;
    selectedRefrigerationMonitorId: string;
    refrigerationMonitors: Array<Monitor> = [];
    showDropDown: boolean;
    activePoint: any;
    // month
    monthKe2ChartData = [];
    monthKe2ChartColors = [];
    monthKe2ChartLabels = [];
    monthKe2ChartOptions = {};
    ke2MonthDataLoaded: boolean;
    // year

    yearKe2ChartData = [];
    yearKe2ChartColors = [];
    yearKe2ChartLabels = [];
    yearKe2ChartOptions = {};
    ke2YearDataLoaded: boolean;

    changeEquipmentCurrentGraphTab: string;

    constructor(
        private equipmentService: EquipmentService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private principal: Principal,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private eventManager: JhiEventManager,
        private eventService: EventService,
        private metricsService: MetricsService,
        private monitorService: MonitorService,
        private metricsCacheService: MetricsCacheService,
        private refrigerationCacheService: RefrigerationCacheService
    ) {
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.page = 1;
        this.reverse = true;
        this.predicate = 'id';
        this.currentSearch =
            this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['search']
                ? this.activatedRoute.snapshot.params['search']
                : '';
        this.showEquipmentData = false;

        this.hourDataLoaded = false;
        this.dayDataLoaded = false;
        this.monthDataLoaded = false;
        this.yearDataLoaded = false;
        this.hourDemandDataLoaded = false;
        this.dayDemandDataLoaded = false;
        this.monthDemandDataLoaded = false;
        this.yearDemandDataLoaded = false;

        this.showPowerGraph = false;
        this.showKe2Graph = false;
        this.showMultipleMonitors = false;
        this.nonAvailableMonitors = true;
        this.ke2HourDataLoaded = false;
        this.ke2DayDataLoaded = false;
        this.ke2MonthDataLoaded = false;
        this.ke2YearDataLoaded = false;
        this.showDropDown = false;

        this.starTabName = 'day-tab';
    }

    loadAll() {
        this.equipmentService.getEquipmentsByBudderflyId(this.budderflyId).subscribe(
            (res: HttpResponse<Equipment[]>) => {
                this.sortEquipmentsByMain(res.body);
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    loadEvents(equipment: Equipment) {
        this.mainSelected = false;
        if (equipment.equipmentTypeCode === 'MAIN') {
            this.mainSelected = true;
        }

        this.selectedEquipment = equipment;

        this.showEquipmentData = true;
        this.eventService
            .getByEquipmentId(equipment.id, {
                page: this.page - 1,
                query: this.currentSearch,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(
                (res: HttpResponse<Event[]>) => this.onSuccess(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    loadPage(page: number) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.transition();
        }
    }

    transition() {
        this.loadEvents(this.selectedEquipment);
    }

    clear() {
        this.page = 0;
        this.currentSearch = '';
        this.router.navigate([
            '/equipment',
            {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        ]);
        this.loadAll();
    }

    ngOnInit() {
        if (this.timeZoneID === 'undefined' || this.timeZoneID == null) {
            this.timeZoneID = 'UTC';
        }

        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInEquipment();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Equipment) {
        return item.id;
    }
    registerChangeInEquipment() {
        this.eventSubscriber = this.eventManager.subscribe('equipmentListModification', response => this.loadAll());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'desc' : 'asc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    onSelectedPowerMonitorChange(selectedPowerMonitorFromList) {
        this.selectedPowerMonitorId = selectedPowerMonitorFromList.externalId;
        this.changeMonitorData(selectedPowerMonitorFromList);
    }

    onSelectedRefrigerationMonitorChange(selectedKe2MonitorFromList) {
        this.selectedRefrigerationMonitorId = selectedKe2MonitorFromList;
        this.ke2HourDataLoaded = false;
        this.showDropDown = false;
        this.loadInitialRefrigerationDataInOrder();
    }

    private onSuccess(data, headers) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        this.queryCount = this.totalItems;
        // this.page = pagingParams.page;

        this.events = data;
    }
    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
        console.error('Error while getting data, the page will be refreshed, please contact support');
        // reload the data for the selected equipment in order to refresh the graphs
        if (this.selectedEquipment) {
            this.changeEquipmentData(this.selectedEquipment);
        } else {
            console.error('ERROR: couldnt refresh the equipment');
        }
    }

    // this will sort the equipments and will put the MAIN element as the first one (if is present)
    sortEquipmentsByMain(e: Equipment[]) {
        this.equipments = [];
        const mainFound = e.filter(element => element.equipmentTypeCode === 'MAIN');
        const otherEquipments = e.filter(element => element.equipmentTypeCode !== 'MAIN');

        if (typeof mainFound !== 'undefined') {
            mainFound.forEach(element => {
                this.equipments.push(element);
            });
        }

        otherEquipments.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));
        otherEquipments.forEach(element => {
            if (element.equipmentTypeCode !== 'UNKNOWN') {
                this.equipments.push(element);
            }
        });

        // load the first equipment event automatically
        if (this.equipments.length > 0) {
            this.changeEquipmentData(this.equipments[0]);
        }
        this.equipments.map(equipment => this.setEquipmentDisplayDescription(equipment));
    }

    setEquipmentDisplayDescription(equipment: Equipment) {
        if (EquipmentTypeCode.MAIN === equipment.equipmentTypeCode) {
            equipment.displayDescription = equipment.utilityMeterNumber;
        } else if (equipment.equipmentTypeLocation && equipment.equipmentTypeLocation.location) {
            equipment.displayDescription = equipment.equipmentTypeLocation.location;
        }
    }

    isActive(e: any) {
        return e.id === this.selectedEquipment.id;
    }

    changeMonitorData(m: any) {
        this.selectedMonitor = m;

        // prevent requesting data for monitors without externalId
        // the UI will show a warning
        if (this.selectedMonitor.externalId) {
            this.selectedPowerMonitorId = this.selectedMonitor.externalId;
            this.loadGraphDataAndOptions();
        }
    }

    changeEqipmentMonitorData(monitorExternalId: string) {
        this.selectedRefrigerationMonitorId = monitorExternalId;

        // prevent requesting data for monitors without externalId
        // the UI will show a warning
        if (this.selectedRefrigerationMonitorId) {
            this.loadRefrigerationGraphDataAndOptions();
        }
    }

    isMonitorActive(m: any) {
        if (this.selectedMonitor != null) {
            return m.id === this.selectedMonitor.id;
        }
        return false;
    }

    // Change equipment, this will attempt to load events for the equipment and the chartData for the equipment
    changeEquipmentData(equipment: Equipment) {
        this.loadEvents(equipment);
        this.metricsCacheService.restartCache();
        this.loadMonitors();
    }

    loadMonitors() {
        this.monitorService.getMonitorsByEquipmentId(this.selectedEquipment.id).subscribe(
            (res: HttpResponse<Monitor[]>) => {
                this.monitors = res.body;
                let powerMonitorsCount = 0;
                let refrigerationMonitorCount = 0;
                this.powerMonitors = [];
                this.refrigerationMonitors = [];
                this.showPowerGraph = false;
                this.showKe2Graph = false;
                this.alertMonitorFound = false;
                let refrigerationMonitorId: any = null;
                let powerMonitorId: any = null;

                if (this.monitors.length > 0) {
                    this.nonAvailableMonitors = false;
                    for (let i = 0; i < this.monitors.length; i++) {
                        if (this.monitors[i].metricTemplate === MetricTemplate.POWER) {
                            powerMonitorsCount++;
                            this.powerMonitors.push(this.monitors[i]);
                            powerMonitorId = i;
                        }
                        if (this.monitors[i].metricTemplate === MetricTemplate.ALERT) {
                            this.alertMonitorFound = true;
                        }
                        if (
                            this.monitors[i].metricTemplate === MetricTemplate.POWER_AND_STATUS ||
                            this.monitors[i].metricTemplate === MetricTemplate.REFRIGERATION
                        ) {
                            refrigerationMonitorCount++;
                            this.refrigerationMonitors.push(this.monitors[i]);
                            refrigerationMonitorId = i;
                        }
                    }

                    this.showMultipleMonitors = powerMonitorsCount > 1;

                    if (powerMonitorId != null) {
                        // load last POWER monitor, we shouldnt have more than 1.
                        this.changeMonitorData(this.monitors[powerMonitorId]);
                        this.showPowerGraph = true;
                    }
                    if (refrigerationMonitorId != null) {
                        this.changeEqipmentMonitorData(this.refrigerationMonitors[0].externalId);
                        // this.selectedRefrigerationMonitorId = this.monitors[refrigerationMonitorId].externalId;
                        this.showKe2Graph = true;
                    } else {
                        this.showKe2Graph = false;
                    }
                } else {
                    this.nonAvailableMonitors = true;
                    this.selectedMonitor = null;
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    // Method that is going to be called at the beginning of the load of the page
    loadGraphDataAndOptions() {
        this.hourDataLoaded = false;
        this.dayDataLoaded = false;
        this.monthDataLoaded = false;
        this.yearDataLoaded = false;
        this.hourDemandDataLoaded = false;
        this.dayDemandDataLoaded = false;
        this.monthDemandDataLoaded = false;
        this.yearDemandDataLoaded = false;

        this.actualDate = new Date();

        this.reattempts = 0;
        this.loadInitialDataInOrder();
    }

    // Method that is going to be called at the beginning of the load of the page
    loadRefrigerationGraphDataAndOptions() {
        this.hourDataLoaded = false;
        this.dayDataLoaded = false;
        this.monthDataLoaded = false;
        this.yearDataLoaded = false;
        this.hourDemandDataLoaded = false;
        this.dayDemandDataLoaded = false;
        this.monthDemandDataLoaded = false;
        this.yearDemandDataLoaded = false;
        this.ke2HourDataLoaded = false;
        this.ke2DayDataLoaded = false;
        this.ke2MonthDataLoaded = false;
        this.ke2YearDataLoaded = false;
        this.showDropDown = false;

        this.actualDate = new Date();

        this.reattempts = 0;
        this.loadInitialRefrigerationDataInOrder();
    }

    processYearReport(data: any, demand: boolean, consumption: boolean) {
        this.equipmentReport = data;

        const consumptionData = [];
        const demandData = [];
        const rankData = [];
        const primeData = [];
        const labels = [];
        let label: string;
        let i;

        for (i = 0; i < this.equipmentReport.reportByYear.length; i++) {
            label = this.equipmentReport.reportByYear[i].monthName;
            consumptionData.push(this.equipmentReport.reportByYear[i].consumption);
            demandData.push(this.equipmentReport.reportByYear[i].demand);
            rankData.push(this.equipmentReport.reportByYear[i].rank);
            primeData.push(this.equipmentReport.reportByYear[i].primeData);
            labels.push(label);
        }

        if (consumption) {
            this.yearChartData = [];
            this.yearChartColors = [];
            this.yearChartOptions = {};
            this.yearChartLabels.length = 0;

            const allChartInformation: AllChartData = this.getGraphData(consumptionData, rankData, primeData);
            // hack to solve issue about labels not refreshed in the graph.
            for (i = 0; i < labels.length; i++) {
                this.yearChartLabels.push(labels[i]);
            }

            this.yearChartOptions = allChartInformation.options;
            this.yearChartData = allChartInformation.data;
            // hack to solve issue about colors not refreshed in the graph.
            setTimeout(() => {
                this.yearChartColors = allChartInformation.colors;
            }, 50);
        }

        if (demand) {
            this.yearDemandChartData = [];
            this.yearDemandChartColors = [];
            this.yearDemandChartOptions = {};
            this.yearDemandChartLabels.length = 0;

            const allChartDemandInformation: AllChartData = this.getGraphData(demandData, rankData, primeData);
            // hack to solve issue about labels not refreshed in the graph.
            for (i = 0; i < labels.length; i++) {
                this.yearDemandChartLabels.push(labels[i]);
            }

            this.yearDemandChartOptions = allChartDemandInformation.options;
            this.yearDemandChartData = allChartDemandInformation.data;
            // hack to solve issue about colors not refreshed in the graph.
            setTimeout(() => {
                this.yearDemandChartColors = allChartDemandInformation.colors;
            }, 50);
        }

        this.currentShowYear = this.equipmentReport.reportByYear[0].year;
        this.currentYear = new Date(this.equipmentReport.reportByYear[0].requestDate);

        const summarizedInfo: DataSummarized = this.metricsCacheService.summarizeData(this.equipmentReport.reportByYear);
        this.totalYearConsumption = summarizedInfo.totalConsumption;
        // Note the plus sign that drops any "extra" zeroes at the end.
        this.totalYearConsumption = +this.totalYearConsumption.toFixed(4);
        this.maxYearDemand = summarizedInfo.maxDemand;
        this.maxYearDemand = +this.maxYearDemand.toFixed(4);

        this.yearDataLoaded = true;
        this.yearDemandDataLoaded = true;
    }

    // this will process the data from our servers and populate the objects needed to build the graph
    processMonthReport(data: any, demand: boolean, consumption: boolean) {
        this.equipmentReport = data;

        const consumptionData = [];
        const demandData = [];
        const rankData = [];
        const primeData = [];
        const labels = [];

        let label: string;
        let i;

        for (i = 0; i < this.equipmentReport.reportByMonth.length; i++) {
            label = this.equipmentReport.reportByMonth[i].month + '/' + this.equipmentReport.reportByMonth[i].day;
            consumptionData.push(this.equipmentReport.reportByMonth[i].consumption);
            demandData.push(this.equipmentReport.reportByMonth[i].demand);
            rankData.push(this.equipmentReport.reportByMonth[i].rank);
            primeData.push(this.equipmentReport.reportByMonth[i].primeData);
            labels.push(label);
        }

        if (consumption) {
            this.monthChartData = [];
            this.monthChartColors = [];
            this.monthChartLabels.length = 0;
            this.monthChartOptions = {};

            const allChartInformation: AllChartData = this.getGraphData(consumptionData, rankData, primeData);

            for (i = 0; i < labels.length; i++) {
                this.monthChartLabels.push(labels[i]);
            }

            this.monthChartOptions = allChartInformation.options;
            this.monthChartData = allChartInformation.data;
            // hack to solve issue about colors not refreshed in the graph.
            setTimeout(() => {
                this.monthChartColors = allChartInformation.colors;
            }, 50);
        }

        if (demand) {
            this.monthDemandChartData = [];
            this.monthDemandChartColors = [];
            this.monthDemandChartLabels.length = 0;
            this.monthDemandChartOptions = {};

            const allChartInformation: AllChartData = this.getGraphData(demandData, rankData, primeData);
            // hack to solve issue about labels not refreshed in the graph.
            for (i = 0; i < labels.length; i++) {
                this.monthDemandChartLabels.push(labels[i]);
            }

            this.monthDemandChartOptions = allChartInformation.options;
            this.monthDemandChartData = allChartInformation.data;
            // hack to solve issue about colors not refreshed in the graph.
            setTimeout(() => {
                this.monthDemandChartColors = allChartInformation.colors;
            }, 50);
        }

        this.currentShowMonth = new Date(
            this.equipmentReport.reportByMonth[0].year,
            this.equipmentReport.reportByMonth[0].month - 1,
            this.equipmentReport.reportByMonth[0].day
        );
        this.currentMonth = new Date(this.equipmentReport.reportByMonth[0].requestDate);

        const summarizedInfo: DataSummarized = this.metricsCacheService.summarizeData(this.equipmentReport.reportByMonth);
        this.totalMonthConsumption = summarizedInfo.totalConsumption;
        this.totalMonthConsumption = +this.totalMonthConsumption.toFixed(4);
        this.maxMonthDemand = summarizedInfo.maxDemand;
        // Note the plus sign that drops any "extra" zeroes at the end.
        this.maxMonthDemand = +this.maxMonthDemand.toFixed(4);

        this.monthDataLoaded = true;
        this.monthDemandDataLoaded = true;
    }

    // this will process the data from our servers and populate the objects needed to build the graph
    processDayReport(data: any, demand: boolean, consumption: boolean) {
        this.equipmentReport = data;

        const consumptionData = [];
        const demandData = [];
        const rankData = [];
        const primeData = [];
        const labels = [];
        let label: string;
        let i;

        for (i = 0; i < this.equipmentReport.reportByDay.length; i++) {
            let hourlabel: string;
            if (this.equipmentReport.reportByDay[i].hour > 12) {
                hourlabel = 'PM';
                const translatedHour = this.equipmentReport.reportByDay[i].hour - 12;
                label = translatedHour + ' ' + hourlabel;
            } else {
                hourlabel = 'AM';
                label = this.equipmentReport.reportByDay[i].hour + ' ' + hourlabel;
            }
            labels.push(label);
            consumptionData.push(this.equipmentReport.reportByDay[i].consumption);
            rankData.push(this.equipmentReport.reportByDay[i].rank);
            primeData.push(this.equipmentReport.reportByDay[i].primeData);
            demandData.push(this.equipmentReport.reportByDay[i].demand);
        }

        if (consumption) {
            this.dayChartData = [];
            this.dayChartColors = [];
            this.dayChartLabels.length = 0;
            this.dayChartOptions = {};

            const allChartInformation: AllChartData = this.getGraphData(consumptionData, rankData, primeData);
            // hack to solve issue about labels not refreshed in the graph.
            for (i = 0; i < labels.length; i++) {
                this.dayChartLabels.push(labels[i]);
            }

            this.dayChartOptions = allChartInformation.options;
            this.dayChartData = allChartInformation.data;
            // hack to solve issue about colors not refreshed in the graph.
            setTimeout(() => {
                this.dayChartColors = allChartInformation.colors;
            }, 50);
        }

        if (demand) {
            this.dayDemandChartData = [];
            this.dayDemandChartColors = [];
            this.dayDemandChartLabels.length = 0;
            this.dayDemandChartOptions = {};

            const allChartInformation: AllChartData = this.getGraphData(demandData, rankData, primeData);

            // hack to solve issue about labels not refreshed in the graph.
            for (i = 0; i < labels.length; i++) {
                this.dayDemandChartLabels.push(labels[i]);
            }

            this.dayDemandChartOptions = allChartInformation.options;
            this.dayDemandChartData = allChartInformation.data;
            // hack to solve issue about colors not refreshed in the graph.
            setTimeout(() => {
                this.dayDemandChartColors = allChartInformation.colors;
            }, 50);
        }

        this.currentShowDay = new Date(
            this.equipmentReport.reportByDay[0].year,
            this.equipmentReport.reportByDay[0].month - 1,
            this.equipmentReport.reportByDay[0].day
        );
        this.currentDay = new Date(this.equipmentReport.reportByDay[0].requestDate);

        const summarizedInfo: DataSummarized = this.metricsCacheService.summarizeData(this.equipmentReport.reportByDay);
        this.totalDayConsumption = summarizedInfo.totalConsumption;
        this.totalDayConsumption = +this.totalDayConsumption.toFixed(4);
        this.maxDayDemand = summarizedInfo.maxDemand;
        // Note the plus sign that drops any "extra" zeroes at the end.
        this.maxDayDemand = +this.maxDayDemand.toFixed(4);

        this.dayDataLoaded = true;
        this.dayDemandDataLoaded = true;
    }

    // this will process the data from our servers and populate the objects needed to build the graph
    processHourReport(data: any, demand: boolean, consumption: boolean) {
        this.equipmentReport = data;

        const consumptionData = [];
        const demandData = [];
        const rankData = [];
        let label: string;
        let i;

        const labels = [];

        for (i = 0; i < this.equipmentReport.reportByHour.length; i++) {
            label = this.equipmentReport.reportByHour[i].minute.toString();
            consumptionData.push(this.equipmentReport.reportByHour[i].consumption);
            demandData.push(this.equipmentReport.reportByHour[i].demand);
            rankData.push(this.equipmentReport.reportByHour[i].rank);
            labels.push(label);
        }

        if (consumption) {
            this.hourChartData = [];
            this.hourChartColors = [];
            this.hourChartLabels.length = 0;
            this.hourChartOptions = {};

            const allChartInformation: AllChartData = this.getGraphData(consumptionData, rankData, null);

            // hack to solve issue about labels not refreshed in the graph.
            for (i = 0; i < labels.length; i++) {
                this.hourChartLabels.push(labels[i]);
            }

            this.hourChartOptions = allChartInformation.options;
            this.hourChartData = allChartInformation.data;
            // hack to solve issue about colors not refreshed in the graph.
            setTimeout(() => {
                this.hourChartColors = allChartInformation.colors;
            }, 50);
        }

        if (demand) {
            this.hourDemandChartData = [];
            this.hourDemandChartColors = [];
            this.hourDemandChartLabels.length = 0;
            this.hourDemandChartOptions = {};

            const allChartInformation: AllChartData = this.getGraphData(demandData, rankData, null);
            // hack to solve issue about labels not refreshed in the graph.
            for (i = 0; i < labels.length; i++) {
                this.hourDemandChartLabels.push(labels[i]);
            }

            this.hourDemandChartOptions = allChartInformation.options;
            this.hourDemandChartData = allChartInformation.data;
            // hack to solve issue about colors not refreshed in the graph.
            setTimeout(() => {
                this.hourDemandChartColors = allChartInformation.colors;
            }, 50);
        }

        this.currentShowHour = new Date(
            this.equipmentReport.reportByHour[0].year,
            this.equipmentReport.reportByHour[0].month - 1,
            this.equipmentReport.reportByHour[0].day,
            this.equipmentReport.reportByHour[0].hour
        );
        this.currentHour = new Date(this.equipmentReport.reportByHour[0].requestDate);

        if (!this.currentClientTZ) {
            this.currentClientTZ = new Date(this.currentShowHour.getTime());
        }

        const summarizedInfo: DataSummarized = this.metricsCacheService.summarizeData(this.equipmentReport.reportByHour);
        this.totalHourConsumption = summarizedInfo.totalConsumption;
        this.totalHourConsumption = +this.totalHourConsumption.toFixed(4);
        this.maxHourDemand = summarizedInfo.maxDemand;
        // Note the plus sign that drops any "extra" zeroes at the end.
        this.maxHourDemand = +this.maxHourDemand.toFixed(4);

        this.hourDataLoaded = true;
        this.hourDemandDataLoaded = true;
    }

    // Calculate the next year and call processYearReport to refresh the graph
    nextYear() {
        this.yearDataLoaded = false;
        this.yearDemandDataLoaded = false;
        const yearDate = this.currentYear;
        yearDate.setFullYear(this.currentYear.getFullYear() + 1);
        if (this.showPowerGraph) {
            this.retrieveYearData(yearDate.getFullYear(), true, true);
        }
        if (this.showKe2Graph) {
            this.retrieveRefrigerationYearData(yearDate.getFullYear(), true, true, true, true, true, true);
        }
    }

    // Calculate the previous year and call processYearReport to refresh the graph
    previousYear() {
        this.yearDataLoaded = false;
        this.yearDemandDataLoaded = false;
        const yearDate = this.currentYear;
        yearDate.setFullYear(this.currentYear.getFullYear() - 1);
        if (this.showPowerGraph) {
            this.retrieveYearData(yearDate.getFullYear(), true, true);
        }
        if (this.showKe2Graph) {
            this.retrieveRefrigerationYearData(yearDate.getFullYear(), true, true, true, true, true, true);
        }
    }

    // Calculate the next month and call processMonthReport to refresh the graph
    nextMonth() {
        this.monthDataLoaded = false;
        this.monthDemandDataLoaded = false;
        const monthDate = this.currentMonth;
        monthDate.setMonth(this.currentMonth.getMonth() + 1);
        if (this.showPowerGraph) {
            this.retrieveMonthData(this.currentMonth.getFullYear(), monthDate.getMonth() + 1, true, true);
        }
        if (this.showKe2Graph) {
            this.retrieveRefrigerationMonthData(
                this.currentMonth.getFullYear(),
                monthDate.getMonth() + 1,
                true,
                true,
                true,
                true,
                true,
                true
            );
        }
    }

    // Calculate the previous month and call processMonthReport to refresh the graph
    previousMonth() {
        this.monthDataLoaded = false;
        this.monthDemandDataLoaded = false;
        const monthDate = this.currentMonth;
        monthDate.setMonth(this.currentMonth.getMonth() - 1);
        if (this.showPowerGraph) {
            this.retrieveMonthData(this.currentMonth.getFullYear(), monthDate.getMonth() + 1, true, true);
        }
        if (this.showKe2Graph) {
            this.retrieveRefrigerationMonthData(
                this.currentDay.getFullYear(),
                monthDate.getMonth() + 1,
                true,
                true,
                true,
                true,
                true,
                true
            );
        }
    }

    nextDay() {
        this.dayDataLoaded = false;
        this.dayDemandDataLoaded = false;
        const date = this.currentDay;
        date.setDate(this.currentDay.getDate() + 1);
        if (this.showPowerGraph) {
            this.retrieveDayData(this.currentDay.getFullYear(), date.getMonth() + 1, date.getDate(), true, true);
        }
        if (this.showKe2Graph) {
            this.retrieveRefrigerationDayData(
                this.currentDay.getFullYear(),
                date.getMonth() + 1,
                date.getDate(),
                true,
                true,
                true,
                true,
                true,
                true
            );
        }
    }

    previousDay() {
        this.dayDataLoaded = false;
        this.dayDemandDataLoaded = false;
        const date = this.currentDay;
        date.setDate(this.currentDay.getDate() - 1);
        if (this.showPowerGraph) {
            this.retrieveDayData(this.currentDay.getFullYear(), date.getMonth() + 1, date.getDate(), true, true);
        }
        if (this.showKe2Graph) {
            this.retrieveRefrigerationDayData(
                this.currentDay.getFullYear(),
                date.getMonth() + 1,
                date.getDate(),
                true,
                true,
                true,
                true,
                true,
                true
            );
        }
    }

    nextHour() {
        this.hourDataLoaded = false;
        this.hourDemandDataLoaded = false;
        const date = this.currentHour;
        date.setHours(this.currentHour.getHours() + 1);
        if (this.showPowerGraph) {
            this.retrieveHourData(this.currentHour.getFullYear(), date.getMonth() + 1, date.getDate(), date.getHours(), true, true, false);
        }
        if (this.showKe2Graph) {
            this.retrieveRefrigerationHourData(
                this.currentHour.getFullYear(),
                date.getMonth() + 1,
                date.getDate(),
                date.getHours(),
                true,
                true,
                false
            );
        }
    }

    previousHour() {
        this.hourDataLoaded = false;
        this.hourDemandDataLoaded = false;
        const date = this.currentHour;
        date.setHours(this.currentHour.getHours() - 1);
        if (this.showPowerGraph) {
            this.retrieveHourData(this.currentHour.getFullYear(), date.getMonth() + 1, date.getDate(), date.getHours(), true, true, false);
        }
        if (this.showKe2Graph) {
            this.retrieveRefrigerationHourData(
                this.currentHour.getFullYear(),
                date.getMonth() + 1,
                date.getDate(),
                date.getHours(),
                true,
                true,
                false
            );
        }
    }

    // Function that is going to be called from the chart when the user clicks.
    // First we analyze if the event.active is length 1 and if the _model is different from undefined,
    // this means we have clicked a bar in the chart.
    // Then we will analyze which is the active tab and act according to each tab
    onChartClick(evt: any) {
        if (evt.active.length === 1 && evt.active[0]._model !== 'undefined') {
            const value: string = evt.active[0]._model.label;
            const activeTab = this.consumption_tabs.activeId;
            let splited;

            switch (activeTab) {
                case 'year-tab':
                    this.monthDataLoaded = false;
                    this.monthDemandDataLoaded = false;
                    this.retrieveMonthData(this.currentYear.getFullYear(), this.getMonth(value), true, true);
                    if (this.showKe2Graph) {
                        this.retrieveRefrigerationMonthData(
                            this.currentYear.getFullYear(),
                            this.getMonth(value),
                            true,
                            true,
                            true,
                            true,
                            true,
                            true
                        );
                    }
                    this.consumption_tabs.select('month-tab');
                    break;
                case 'month-tab':
                    // load the day information
                    this.dayDataLoaded = false;
                    this.dayDemandDataLoaded = false;
                    splited = value.split('/');
                    this.retrieveDayData(this.currentMonth.getFullYear(), splited[0], splited[1], true, true);
                    if (this.showKe2Graph) {
                        this.retrieveRefrigerationDayData(
                            this.currentMonth.getFullYear(),
                            splited[0],
                            splited[1],
                            true,
                            true,
                            true,
                            true,
                            true,
                            true
                        );
                    }
                    this.consumption_tabs.select('day-tab');
                    break;
                case 'day-tab':
                    this.hourDataLoaded = false;
                    this.hourDemandDataLoaded = false;
                    this.retrieveHourData(
                        this.currentDay.getFullYear(),
                        this.currentDay.getMonth() + 1,
                        this.currentDay.getDate(),
                        this.getHour(value),
                        true,
                        true,
                        true
                    );
                    if (this.showKe2Graph) {
                        this.retrieveRefrigerationHourData(
                            this.currentDay.getFullYear(),
                            this.currentDay.getMonth() + 1,
                            this.currentDay.getDate(),
                            this.getHour(value),
                            true,
                            true,
                            true
                        );
                    }
                    this.consumption_tabs.select('hour-tab');
                    break;
                case 'hour-tab':
                    // do nothing, since we cant go in much more detail
                    break;
            }
            evt = null;
        }
    }

    // Function that will return the hour
    // Used for retrieving the hour data on onChartClick (year -tab)
    getHour(value: string) {
        const splited = value.split(' ');
        let hour: number = Number(splited[0]);

        if (splited[1] === 'PM') {
            hour = hour + 12;
        }
        return hour;
    }

    // Function that will return the number of month
    // Used for retrieving the month data on onChartClick (year -tab)
    getMonth(monthName: string) {
        return this.shortMonths.indexOf(monthName) + 1;
    }

    calculateScale(arr: any) {
        const scale = this.getMaxValueInArray(arr);
        const offset = scale * this.scaleOffset;
        if (scale === 0) {
            return 1;
        } else {
            return scale + offset;
        }
    }

    getMaxValueInArray(arr: any) {
        return Math.max.apply(Math, arr);
    }

    getColorsFromArr(arr: any, rankData: any, primeData: any) {
        const consumptionBarColors = [];
        let i;
        const maxValueInArray = this.getMaxValueInArray(arr);
        for (i = 0; i < arr.length; i++) {
            if (maxValueInArray === arr[i]) {
                if (rankData[i] === -1) {
                    consumptionBarColors.push('rgba(189, 195, 199, 1)');
                } else {
                    consumptionBarColors.push('rgba(158,46,16,0.44)');
                }
            } else {
                if (rankData[i] === -1) {
                    consumptionBarColors.push('rgba(189, 195, 199, 1)');
                } else {
                    consumptionBarColors.push('rgba(0, 18, 158, 0.44)');
                }
            }
        }

        return consumptionBarColors;
    }

    getGraphData(cdata: any, rankData: any, primeData: any) {
        let chartData = [];
        let chartColors = [];
        let chartOptions = {};
        const allChartInformation: AllChartData = {};

        let consumptionBarColors = [];

        consumptionBarColors = this.getColorsFromArr(cdata, rankData, primeData);

        chartData = [{ data: cdata }];
        chartColors = [{ backgroundColor: consumptionBarColors }];

        const yscale = this.calculateScale(cdata);
        chartOptions = {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                yAxes: [
                    {
                        display: true,
                        ticks: {
                            beginAtZero: true,
                            steps: 1,
                            stepValue: 1,
                            max: yscale
                        }
                    }
                ]
            },
            legend: {
                display: false
            }
        };

        allChartInformation.data = chartData;
        allChartInformation.colors = chartColors;
        allChartInformation.options = chartOptions;

        return allChartInformation;
    }

    retrieveHourData(
        year: number,
        month: number,
        day: number,
        hour: number,
        demand: boolean,
        consumption: boolean,
        revertToClientTz: boolean
    ) {
        // if the value is stored on the localCache, return this.number
        const hourObject: HourCacheObject = this.metricsCacheService.getHourDataFromCache(
            this.selectedPowerMonitorId,
            year,
            month,
            day,
            hour
        );
        if (hourObject) {
            this.processHourReport(hourObject.data, demand, consumption);
        } else {
            const tempRequest: RequestDTO = new RequestDTO(
                this.getLocalDateTime(year, month, day, hour),
                this.timeZoneID,
                revertToClientTz
            );
            this.metricsService.getHourReportByMonitorId(this.selectedPowerMonitorId, tempRequest).subscribe(
                (res: HttpResponse<EquipmentReport>) => {
                    this.processHourReport(res.body, demand, consumption);
                    this.metricsCacheService.storeHourDataInCache(this.selectedPowerMonitorId, year, month, day, hour, res.body);
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        }
    }

    retrieveDayData(year: number, month: number, day: number, demand: boolean, consumption: boolean) {
        const actualDay = this.actualDate.getUTCDate();
        const actualMonth = this.actualDate.getUTCMonth() + 1;
        const actualYear = this.actualDate.getUTCFullYear();
        // if the value is stored on the localCache, return this.number
        const dayObject: DayCacheObject = this.metricsCacheService.getDayDataFromCache(this.selectedPowerMonitorId, year, month, day);
        if (dayObject) {
            if (actualYear === year && actualMonth === month && actualDay === day) {
                this.mergePartialDayData(dayObject.data, demand, consumption);
            } else {
                this.processDayReport(dayObject.data, demand, consumption);
            }
        } else {
            const tempRequest: RequestDTO = new RequestDTO(
                this.getLocalDateTime(year, month, day, this.currentDay.getHours()),
                this.timeZoneID
            );
            this.metricsService.getDayReportByMonitorId(this.selectedPowerMonitorId, tempRequest).subscribe(
                (res: HttpResponse<EquipmentReport>) => {
                    if (actualYear === year && actualMonth === month && actualDay === day) {
                        this.mergePartialDayData(res.body, demand, consumption);
                    } else {
                        this.processDayReport(res.body, demand, consumption);
                    }
                    this.metricsCacheService.storeDayDataInCache(this.selectedPowerMonitorId, year, month, day, res.body);
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        }
    }

    retrieveMonthData(year: number, month: number, demand: boolean, consumption: boolean) {
        const actualMonth = this.actualDate.getUTCMonth() + 1;
        const actualYear = this.actualDate.getUTCFullYear();
        // if the value is stored on the localCache, return this.number
        const monthObject: MonthCacheObject = this.metricsCacheService.getMonthDataFromCache(this.selectedPowerMonitorId, year, month);
        if (monthObject) {
            if (actualYear === year && actualMonth === month) {
                this.mergePartialMonthData(monthObject.data, demand, consumption);
            } else {
                this.processMonthReport(monthObject.data, demand, consumption);
            }
        } else {
            const tempRequest: RequestDTO = new RequestDTO(
                this.getLocalDateTime(year, month, this.currentMonth.getDate(), this.currentMonth.getHours()),
                this.timeZoneID
            );
            this.metricsService.getMonthReportByMonitorId(this.selectedPowerMonitorId, tempRequest).subscribe(
                (res: HttpResponse<EquipmentReport>) => {
                    if (actualYear === year && actualMonth === month) {
                        this.mergePartialMonthData(res.body, demand, consumption);
                    } else {
                        this.processMonthReport(res.body, demand, consumption);
                    }
                    this.metricsCacheService.storeMonthDataInCache(this.selectedPowerMonitorId, year, month, res.body);
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        }
    }

    retrieveYearData(year: number, demand: boolean, consumption: boolean) {
        const actualYear = this.actualDate.getUTCFullYear();
        // if the value is stored on the localCache, return this.number
        const yearObject: YearCacheObject = this.metricsCacheService.getYearDataFromCache(this.selectedPowerMonitorId, year);
        if (yearObject) {
            if (actualYear === year) {
                this.mergePartialYearData(yearObject.data, demand, consumption);
            } else {
                this.processYearReport(yearObject.data, demand, consumption);
            }
        } else {
            const tempRequest: RequestDTO = new RequestDTO(
                this.getLocalDateTime(year, this.currentYear.getMonth() + 1, this.currentYear.getDate(), this.currentYear.getHours()),
                this.timeZoneID
            );
            this.metricsService.getYearReportByMonitorId(this.selectedPowerMonitorId, tempRequest).subscribe(
                (res: HttpResponse<EquipmentReport>) => {
                    if (actualYear === year) {
                        this.mergePartialYearData(res.body, demand, consumption);
                    } else {
                        this.processYearReport(res.body, demand, consumption);
                    }
                    this.metricsCacheService.storeYearDataInCache(this.selectedPowerMonitorId, year, res.body);
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        }
    }

    // The main purpose of this method is to retrieve the data in order.
    loadInitialDataInOrder() {
        const observablesDeleteAmu = [];
        // dates will be handled in UTC format
        const year = this.actualDate.getUTCFullYear();
        const month = this.actualDate.getUTCMonth() + 1;
        const day = this.actualDate.getUTCDate();

        // a temporary fix to the issue that we don't have the current hour, that is why we are using UTCHour - 1
        // since the date may change because of this operation, then we will also send year, month and day information
        // while getting hour information
        this.actualDateMinus1Hour = new Date(this.actualDate.getTime());
        this.actualDateMinus1Hour.setHours(this.actualDateMinus1Hour.getHours() - 1);
        const hourYear = this.actualDateMinus1Hour.getUTCFullYear();
        const hourMonth = this.actualDateMinus1Hour.getUTCMonth() + 1;
        const hourDay = this.actualDateMinus1Hour.getUTCDate();
        const hour = this.actualDateMinus1Hour.getUTCHours();

        const tempRequest: RequestDTO = new RequestDTO(this.getLocalDateTime(hourYear, hourMonth, hourDay, hour), this.timeZoneID, false);

        observablesDeleteAmu.push(this.metricsService.getHourReportByMonitorId(this.selectedPowerMonitorId, tempRequest));
        // This will be used for date conversion in metrics side
        observablesDeleteAmu.push(this.metricsService.getDayReportByMonitorId(this.selectedPowerMonitorId, tempRequest));
        observablesDeleteAmu.push(this.metricsService.getMonthReportByMonitorId(this.selectedPowerMonitorId, tempRequest));
        observablesDeleteAmu.push(this.metricsService.getYearReportByMonitorId(this.selectedPowerMonitorId, tempRequest));

        Observable.forkJoin(observablesDeleteAmu).subscribe(
            response => {
                response.forEach(
                    (res: HttpResponse<EquipmentReport>) => {
                        if (res.body.reportByHour.length > 0) {
                            this.processHourReport(res.body, true, true);
                            this.metricsCacheService.storeHourDataInCache(
                                this.selectedPowerMonitorId,
                                hourYear,
                                hourMonth,
                                hourDay,
                                hour,
                                res.body
                            );
                        }

                        if (res.body.reportByDay.length > 0) {
                            this.mergePartialDayData(res.body, true, true);
                            this.metricsCacheService.storeDayDataInCache(this.selectedPowerMonitorId, year, month, day, res.body);
                        }

                        if (res.body.reportByMonth.length > 0) {
                            this.mergePartialMonthData(res.body, true, true);
                            this.metricsCacheService.storeMonthDataInCache(this.selectedPowerMonitorId, year, month, res.body);
                        }

                        if (res.body.reportByYear.length > 0) {
                            // this method is going to load partial data from month and add it to the year information.
                            this.mergePartialYearData(res.body, true, true);
                            this.metricsCacheService.storeYearDataInCache(this.selectedPowerMonitorId, year, res.body);
                        }
                    },
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            },
            error => {
                console.error(error);
                this.reattempts++;
                if (this.reattempts < 2) {
                    this.loadInitialDataInOrder();
                }
            }
        );
    }

    mergePartialYearData(arr: any, demand: boolean, consumption: boolean) {
        const targetMonth = this.actualDate.getUTCMonth() + 1;
        const targetYear = this.actualDate.getUTCFullYear();
        for (let i = 0; i < arr.reportByYear.length; i++) {
            if (arr.reportByYear[i].month === targetMonth && arr.reportByYear[i].year === targetYear) {
                const monthObject: MonthCacheObject = this.metricsCacheService.getMonthDataFromCache(
                    this.selectedPowerMonitorId,
                    targetYear,
                    targetMonth
                );
                if (monthObject) {
                    arr.reportByYear[i].consumption = monthObject.totalConsumption;
                    arr.reportByYear[i].demand = monthObject.maxDemand;
                    arr.reportByYear[i].rank = -1;
                }
            }
        }

        this.processYearReport(arr, demand, consumption);
    }

    mergePartialMonthData(arr: any, demand: boolean, consumption: boolean) {
        const targetDay = this.actualDate.getUTCDate();
        const targetMonth = this.actualDate.getUTCMonth() + 1;
        const targetYear = this.actualDate.getUTCFullYear();
        for (let i = 0; i < arr.reportByMonth.length; i++) {
            if (
                arr.reportByMonth[i].day === targetDay &&
                arr.reportByMonth[i].month === targetMonth &&
                arr.reportByMonth[i].year === targetYear
            ) {
                const dayObject: DayCacheObject = this.metricsCacheService.getDayDataFromCache(
                    this.selectedPowerMonitorId,
                    targetYear,
                    targetMonth,
                    targetDay
                );
                if (dayObject) {
                    arr.reportByMonth[i].consumption = dayObject.totalConsumption;
                    arr.reportByMonth[i].demand = dayObject.maxDemand;
                    arr.reportByMonth[i].rank = -1;
                }
            }
        }

        this.processMonthReport(arr, demand, consumption);
    }

    mergePartialDayData(arr: any, demand: boolean, consumption: boolean) {
        const targetHour = this.actualDateMinus1Hour.getUTCHours();
        const targetDay = this.actualDateMinus1Hour.getUTCDate();
        const targetMonth = this.actualDateMinus1Hour.getUTCMonth() + 1;
        const targetYear = this.actualDateMinus1Hour.getUTCFullYear();

        // currentShowHour contains the hour translated to the client TZ
        const currentHourInClientTz = this.currentClientTZ.getHours();
        for (let i = 0; i < arr.reportByDay.length; i++) {
            // we will use the currentHourInClientTz in order to put the partial calculation in the correct spot for the day.
            if (
                arr.reportByDay[i].hour === currentHourInClientTz &&
                arr.reportByDay[i].day === targetDay &&
                arr.reportByDay[i].month === targetMonth &&
                arr.reportByDay[i].year === targetYear
            ) {
                // the targetHour is in UTC which is how we store that data in the cache and in S3
                const hourObject: HourCacheObject = this.metricsCacheService.getHourDataFromCache(
                    this.selectedPowerMonitorId,
                    targetYear,
                    targetMonth,
                    targetDay,
                    targetHour
                );
                if (hourObject) {
                    arr.reportByDay[i].consumption = hourObject.totalConsumption;
                    arr.reportByDay[i].demand = hourObject.maxDemand;
                    arr.reportByDay[i].rank = -1;
                }
            }
        }

        this.processDayReport(arr, demand, consumption);
    }

    getLocalDateTime(year: number, month: number, day: number, hour: number) {
        let tmpMonth: string;
        if (month < 10) {
            tmpMonth = '0' + month;
        } else {
            tmpMonth = month.toString();
        }
        let tmpDay: string;
        if (day < 10) {
            tmpDay = '0' + day;
        } else {
            tmpDay = day.toString();
        }
        let tmpHour: string;
        if (hour < 10) {
            tmpHour = '0' + hour;
        } else {
            tmpHour = hour.toString();
        }

        return year + '-' + tmpMonth + '-' + tmpDay + ' ' + tmpHour + ':00:00';
    }

    // REFRIGERATION data received from KE2

    mergePartialKe2YearData(
        arr: any,
        maxCoilTemp: boolean,
        avgCoilTemp: boolean,
        minCoilTemp: boolean,
        maxRoomTemp: boolean,
        avgRoomTemp: boolean,
        minRoomTemp: boolean
    ) {
        const targetMonth = this.actualDate.getUTCMonth() + 1;
        const targetYear = this.actualDate.getUTCFullYear();
        for (let i = 0; i < arr.reportByYear.length; i++) {
            if (arr.reportByYear[i].month === targetMonth && arr.reportByYear[i].year === targetYear) {
                const monthObject: Ke2MonthCacheObject = this.refrigerationCacheService.getMonthDataFromCache(
                    this.selectedRefrigerationMonitorId,
                    targetYear,
                    targetMonth
                );
                const summarizedInfo: RefrigerationNonHourlyDataSummarized = this.refrigerationCacheService.summarizeNonHourlyRefrigerationData(
                    monthObject.data.reportByMonth
                );

                if (monthObject) {
                    arr.reportByYear[i].maxCoilTemp = summarizedInfo.maxCoilTemp;
                    arr.reportByYear[i].avgCoilTemp = summarizedInfo.avgCoilTemp;
                    arr.reportByYear[i].minCoilTemp = summarizedInfo.minCoilTemp;
                    arr.reportByYear[i].maxRoomTemp = summarizedInfo.maxRoomTemp;
                    arr.reportByYear[i].avgRoomTemp = summarizedInfo.avgRoomTemp;
                    arr.reportByYear[i].minRoomTemp = summarizedInfo.minRoomTemp;
                    arr.reportByYear[i].rank = -1;
                }
            }
        }

        this.processRefrigerationYearReport(arr, maxCoilTemp, avgCoilTemp, minCoilTemp, maxRoomTemp, avgRoomTemp, minRoomTemp);
    }

    mergePartialKe2MonthData(
        arr: any,
        maxCoilTemp: boolean,
        avgCoilTemp: boolean,
        minCoilTemp: boolean,
        maxRoomTemp: boolean,
        avgRoomTemp: boolean,
        minRoomTemp: boolean
    ) {
        const targetDay = this.actualDate.getUTCDate();
        const targetMonth = this.actualDate.getUTCMonth() + 1;
        const targetYear = this.actualDate.getUTCFullYear();
        for (let i = 0; i < arr.reportByMonth.length; i++) {
            if (
                arr.reportByMonth[i].day === targetDay &&
                arr.reportByMonth[i].month === targetMonth &&
                arr.reportByMonth[i].year === targetYear
            ) {
                const dayObject: Ke2DayCacheObject = this.refrigerationCacheService.getDayDataFromCache(
                    this.selectedRefrigerationMonitorId,
                    targetYear,
                    targetMonth,
                    targetDay
                );
                const summarizedInfo: RefrigerationNonHourlyDataSummarized = this.refrigerationCacheService.summarizeNonHourlyRefrigerationData(
                    dayObject.data.reportByDay
                );

                if (dayObject) {
                    arr.reportByMonth[i].maxCoilTemp = summarizedInfo.maxCoilTemp;
                    arr.reportByMonth[i].avgCoilTemp = summarizedInfo.avgCoilTemp;
                    arr.reportByMonth[i].minCoilTemp = summarizedInfo.minCoilTemp;
                    arr.reportByMonth[i].maxRoomTemp = summarizedInfo.maxRoomTemp;
                    arr.reportByMonth[i].avgRoomTemp = summarizedInfo.avgRoomTemp;
                    arr.reportByMonth[i].minRoomTemp = summarizedInfo.minRoomTemp;
                    arr.reportByMonth[i].rank = -1;
                }
            }
        }

        this.processRefrigerationMonthReport(arr, maxCoilTemp, avgCoilTemp, minCoilTemp, maxRoomTemp, avgRoomTemp, minRoomTemp);
    }

    mergePartialKe2DayData(
        arr: any,
        maxCoilTemp: boolean,
        avgCoilTemp: boolean,
        minCoilTemp: boolean,
        maxRoomTemp: boolean,
        avgRoomTemp: boolean,
        minRoomTemp: boolean
    ) {
        const targetHour = this.actualDateMinus1Hour.getUTCHours();
        const targetDay = this.actualDateMinus1Hour.getUTCDate();
        const targetMonth = this.actualDateMinus1Hour.getUTCMonth() + 1;
        const targetYear = this.actualDateMinus1Hour.getUTCFullYear();

        // currentShowHour contains the hour translated to the client TZ
        const currentHourInClientTz = this.currentClientTZ.getHours();
        for (let i = 0; i < arr.reportByDay.length; i++) {
            // we will use the currentHourInClientTz in order to put the partial calculation in the correct spot for the day.
            if (
                arr.reportByDay[i].hour === currentHourInClientTz &&
                arr.reportByDay[i].day === targetDay &&
                arr.reportByDay[i].month === targetMonth &&
                arr.reportByDay[i].year === targetYear
            ) {
                // the targetHour is in UTC which is how we store that data in the cache and in S3
                const hourObject: Ke2HourCacheObject = this.refrigerationCacheService.getHourDataFromCache(
                    this.selectedRefrigerationMonitorId,
                    targetYear,
                    targetMonth,
                    targetDay,
                    targetHour
                );
                const summarizedInfo: RefrigerationNonHourlyDataSummarized = this.refrigerationCacheService.summarizeNonHourlyRefrigerationData(
                    hourObject.data.reportByHour
                );

                if (hourObject) {
                    arr.reportByDay[i].maxCoilTemp = summarizedInfo.maxCoilTemp;
                    arr.reportByDay[i].avgCoilTemp = summarizedInfo.avgCoilTemp;
                    arr.reportByDay[i].minCoilTemp = summarizedInfo.minCoilTemp;
                    arr.reportByDay[i].maxRoomTemp = summarizedInfo.maxRoomTemp;
                    arr.reportByDay[i].avgRoomTemp = summarizedInfo.avgRoomTemp;
                    arr.reportByDay[i].minRoomTemp = summarizedInfo.minRoomTemp;
                    arr.reportByDay[i].rank = -1;
                }
            }
        }

        this.processRefrigerationDayReport(arr, maxCoilTemp, avgCoilTemp, minCoilTemp, maxRoomTemp, avgRoomTemp, minRoomTemp);
    }

    processRefrigerationHourReport(data: any, coilTemp: boolean, roomTemp: boolean) {
        this.refrigerationReport = data;

        const coilTempData = [];
        const roomTempData = [];
        const rankData = [];
        let label: string;
        let i;

        const labels = [];

        for (i = 0; i < this.refrigerationReport.reportByHour.length; i++) {
            label = this.refrigerationReport.reportByHour[i].minute.toString();
            coilTempData.push(this.refrigerationReport.reportByHour[i].coilTemp);
            roomTempData.push(this.refrigerationReport.reportByHour[i].roomTemp);
            rankData.push(this.refrigerationReport.reportByHour[i].rank);
            labels.push(label);
        }

        if (coilTemp && roomTemp) {
            this.hourKe2ChartData = [];
            this.hourKe2ChartColors = [];
            this.hourKe2ChartLabels.length = 0;
            this.hourKe2ChartOptions = {};

            const allChartInformation: AllChartData = this.getRefrigerationHourlyGraphData(coilTempData, roomTempData, rankData, null);

            // hack to solve issue about labels not refreshed in the graph.
            for (i = 0; i < labels.length; i++) {
                this.hourKe2ChartLabels.push(labels[i]);
            }

            this.hourKe2ChartOptions = allChartInformation.options;
            this.hourKe2ChartData = allChartInformation.data;
            // hack to solve issue about colors not refreshed in the graph.
            setTimeout(() => {
                this.hourKe2ChartColors = allChartInformation.colors;
            }, 50);
        }
        this.currentShowHour = new Date(
            this.refrigerationReport.reportByHour[0].year,
            this.refrigerationReport.reportByHour[0].month - 1,
            this.refrigerationReport.reportByHour[0].day,
            this.refrigerationReport.reportByHour[0].hour
        );
        this.currentHour = new Date(this.refrigerationReport.reportByHour[0].requestDate);

        if (!this.currentClientTZ) {
            this.currentClientTZ = new Date(this.currentShowHour.getTime());
        }

        const summarizedInfo: RefrigerationDataSummarized = this.refrigerationCacheService.summarizeRefrigerationData(
            this.refrigerationReport.reportByHour
        );

        this.maxCoilTemp = summarizedInfo.maxCoilTemp;
        this.maxRoomTemp = summarizedInfo.maxRoomTemp;

        this.showDropDown = this.refrigerationMonitors.length > 1;

        this.ke2HourDataLoaded = true;
    }

    // this will process the data from our servers and populate the objects needed to build the graph
    processRefrigerationDayReport(
        data: any,
        maxCoilTemp: boolean,
        avgCoilTemp: boolean,
        minCoilTemp: boolean,
        maxRoomTemp: boolean,
        avgRoomTemp: boolean,
        minRoomTemp: boolean
    ) {
        this.refrigerationReport = data;

        const maxCoilTempData = [];
        const avgCoilTempData = [];
        const minCoilTempData = [];
        const maxRoomTempData = [];
        const avgRoomTempData = [];
        const minRoomTempData = [];
        const primeData = [];
        let label: string;
        const rankData = [];
        let i;

        const labels = [];

        for (i = 0; i < this.refrigerationReport.reportByDay.length; i++) {
            let hourlabel: string;
            if (this.refrigerationReport.reportByDay[i].hour > 12) {
                hourlabel = 'PM';
                const translatedHour = this.refrigerationReport.reportByDay[i].hour - 12;
                label = translatedHour + ' ' + hourlabel;
            } else {
                hourlabel = 'AM';
                label = this.refrigerationReport.reportByDay[i].hour + ' ' + hourlabel;
            }
            labels.push(label);
            maxCoilTempData.push(this.refrigerationReport.reportByDay[i].maxCoilTemp);
            avgCoilTempData.push(this.refrigerationReport.reportByDay[i].avgCoilTemp);
            minCoilTempData.push(this.refrigerationReport.reportByDay[i].minCoilTemp);
            maxRoomTempData.push(this.refrigerationReport.reportByDay[i].maxRoomTemp);
            avgRoomTempData.push(this.refrigerationReport.reportByDay[i].avgRoomTemp);
            minRoomTempData.push(this.refrigerationReport.reportByDay[i].minRoomTemp);
            primeData.push(this.refrigerationReport.reportByDay[i].primeData);
            rankData.push(this.refrigerationReport.reportByDay[i].rank);
        }
        if (maxCoilTemp && avgCoilTemp && minCoilTemp && maxRoomTemp && avgRoomTemp && minRoomTemp) {
            this.dayKe2ChartData = [];
            this.dayKe2ChartColors = [];
            this.dayKe2ChartLabels.length = 0;
            this.dayKe2ChartOptions = {};

            const allChartInformation: AllChartData = this.getRefrigerationGraphData(
                maxCoilTempData,
                avgCoilTempData,
                minCoilTempData,
                maxRoomTempData,
                avgRoomTempData,
                minRoomTempData,
                rankData,
                primeData
            );

            // hack to solve issue about labels not refreshed in the graph.
            for (i = 0; i < labels.length; i++) {
                this.dayKe2ChartLabels.push(labels[i]);
            }

            this.dayKe2ChartOptions = allChartInformation.options;
            this.dayKe2ChartData = allChartInformation.data;
            // hack to solve issue about colors not refreshed in the graph.
            setTimeout(() => {
                this.dayKe2ChartColors = allChartInformation.colors;
            }, 50);
        }
        this.currentShowDay = new Date(
            this.refrigerationReport.reportByDay[0].year,
            this.refrigerationReport.reportByDay[0].month - 1,
            this.refrigerationReport.reportByDay[0].day
        );
        this.currentDay = new Date(this.refrigerationReport.reportByDay[0].requestDate);

        const summarizedInfo: RefrigerationNonHourlyDataSummarized = this.refrigerationCacheService.summarizeNonHourlyRefrigerationData(
            this.refrigerationReport.reportByDay
        );

        this.apexMaxCoilTemp = summarizedInfo.apexMaxCoilTemp;
        this.apexMaxRoomTemp = summarizedInfo.apexMaxRoomTemp;

        this.showDropDown = this.refrigerationMonitors.length > 1;

        this.ke2DayDataLoaded = true;
    }

    processRefrigerationMonthReport(
        data: any,
        maxCoilTemp: boolean,
        avgCoilTemp: boolean,
        minCoilTemp: boolean,
        maxRoomTemp: boolean,
        avgRoomTemp: boolean,
        minRoomTemp: boolean
    ) {
        this.refrigerationReport = data;

        const maxCoilTempData = [];
        const avgCoilTempData = [];
        const minCoilTempData = [];
        const maxRoomTempData = [];
        const avgRoomTempData = [];
        const minRoomTempData = [];
        const primeData = [];
        let label: string;
        const rankData = [];
        let i;

        const labels = [];

        for (i = 0; i < this.refrigerationReport.reportByMonth.length; i++) {
            label = this.refrigerationReport.reportByMonth[i].month + '/' + this.refrigerationReport.reportByMonth[i].day;
            maxCoilTempData.push(this.refrigerationReport.reportByMonth[i].maxCoilTemp);
            avgCoilTempData.push(this.refrigerationReport.reportByMonth[i].avgCoilTemp);
            minCoilTempData.push(this.refrigerationReport.reportByMonth[i].minCoilTemp);
            maxRoomTempData.push(this.refrigerationReport.reportByMonth[i].maxRoomTemp);
            avgRoomTempData.push(this.refrigerationReport.reportByMonth[i].avgRoomTemp);
            minRoomTempData.push(this.refrigerationReport.reportByMonth[i].minRoomTemp);
            rankData.push(this.refrigerationReport.reportByMonth[i].rank);
            primeData.push(this.refrigerationReport.reportByMonth[i].primeData);
            labels.push(label);
        }

        if (maxCoilTemp && avgCoilTemp && minCoilTemp && maxRoomTemp && avgRoomTemp && minRoomTemp) {
            this.monthKe2ChartData = [];
            this.monthKe2ChartColors = [];
            this.monthKe2ChartLabels.length = 0;
            this.monthKe2ChartOptions = {};

            const allChartInformation: AllChartData = this.getRefrigerationGraphData(
                maxCoilTempData,
                avgCoilTempData,
                minCoilTempData,
                maxRoomTempData,
                avgRoomTempData,
                minRoomTempData,
                rankData,
                primeData
            );

            // hack to solve issue about labels not refreshed in the graph.
            for (i = 0; i < labels.length; i++) {
                this.monthKe2ChartLabels.push(labels[i]);
            }

            this.monthKe2ChartOptions = allChartInformation.options;
            this.monthKe2ChartData = allChartInformation.data;
            // hack to solve issue about colors not refreshed in the graph.
            setTimeout(() => {
                this.monthKe2ChartColors = allChartInformation.colors;
            }, 50);
        }

        this.currentShowMonth = new Date(
            this.refrigerationReport.reportByMonth[0].year,
            this.refrigerationReport.reportByMonth[0].month - 1,
            this.refrigerationReport.reportByMonth[0].day
        );
        this.currentMonth = new Date(this.refrigerationReport.reportByMonth[0].requestDate);

        const summarizedInfo: RefrigerationNonHourlyDataSummarized = this.refrigerationCacheService.summarizeNonHourlyRefrigerationData(
            this.refrigerationReport.reportByMonth
        );

        this.apexMaxCoilTemp = summarizedInfo.apexMaxCoilTemp;
        this.apexMaxRoomTemp = summarizedInfo.apexMaxRoomTemp;

        this.showDropDown = this.refrigerationMonitors.length > 1;

        this.ke2MonthDataLoaded = true;
    }

    processRefrigerationYearReport(
        data: any,
        maxCoilTemp: boolean,
        avgCoilTemp: boolean,
        minCoilTemp: boolean,
        maxRoomTemp: boolean,
        avgRoomTemp: boolean,
        minRoomTemp: boolean
    ) {
        this.refrigerationReport = data;

        const maxCoilTempData = [];
        const avgCoilTempData = [];
        const minCoilTempData = [];
        const maxRoomTempData = [];
        const avgRoomTempData = [];
        const minRoomTempData = [];
        const primeData = [];
        let label: string;
        const rankData = [];
        let i;

        const labels = [];

        for (i = 0; i < this.refrigerationReport.reportByYear.length; i++) {
            label = this.refrigerationReport.reportByYear[i].monthName;
            maxCoilTempData.push(this.refrigerationReport.reportByYear[i].maxCoilTemp);
            avgCoilTempData.push(this.refrigerationReport.reportByYear[i].avgCoilTemp);
            minCoilTempData.push(this.refrigerationReport.reportByYear[i].minCoilTemp);
            maxRoomTempData.push(this.refrigerationReport.reportByYear[i].maxRoomTemp);
            avgRoomTempData.push(this.refrigerationReport.reportByYear[i].avgRoomTemp);
            minRoomTempData.push(this.refrigerationReport.reportByYear[i].minRoomTemp);
            rankData.push(this.refrigerationReport.reportByYear[i].rank);
            primeData.push(this.refrigerationReport.reportByYear[i].primeData);
            labels.push(label);
        }

        if (maxCoilTemp && avgCoilTemp && minCoilTemp && maxRoomTemp && avgRoomTemp && minRoomTemp) {
            this.yearKe2ChartData = [];
            this.yearKe2ChartColors = [];
            this.yearKe2ChartLabels.length = 0;
            this.yearKe2ChartOptions = {};

            const allChartInformation: AllChartData = this.getRefrigerationGraphData(
                maxCoilTempData,
                avgCoilTempData,
                minCoilTempData,
                maxRoomTempData,
                avgRoomTempData,
                minRoomTempData,
                rankData,
                primeData
            );

            // hack to solve issue about labels not refreshed in the graph.
            for (i = 0; i < labels.length; i++) {
                this.yearKe2ChartLabels.push(labels[i]);
            }

            this.yearKe2ChartOptions = allChartInformation.options;
            this.yearKe2ChartData = allChartInformation.data;
            console.log(this.yearKe2ChartData);
            // hack to solve issue about colors not refreshed in the graph.
            setTimeout(() => {
                this.yearKe2ChartColors = allChartInformation.colors;
            }, 50);
        }

        this.currentShowYear = this.refrigerationReport.reportByYear[0].year;
        this.currentYear = new Date(this.refrigerationReport.reportByYear[0].requestDate);

        const summarizedInfo: RefrigerationNonHourlyDataSummarized = this.refrigerationCacheService.summarizeNonHourlyRefrigerationData(
            this.refrigerationReport.reportByYear
        );

        this.apexMaxCoilTemp = summarizedInfo.apexMaxCoilTemp;
        this.apexMaxRoomTemp = summarizedInfo.apexMaxRoomTemp;

        this.showDropDown = this.refrigerationMonitors.length > 1;

        this.ke2YearDataLoaded = true;
    }

    getColorsFromRefrigerationArray(arr: any, rankData: any, primeData: any) {
        const coilTempLineColor = [];
        const roomTempLineColor = [];
        const coilTempBorderColor = [];
        const roomTempBorderColor = [];
        const pointRadius = [];
        let i;
        const maxValueInArray = this.getMaxValueInArray(arr);
        for (i = 0; i < arr.length; i++) {
            if (arr[i] === null) {
                pointRadius.push(0);
                coilTempLineColor.push('rgba(255, 255, 255, 0)');
                roomTempLineColor.push('rgba(255, 255, 255, 0)');
                coilTempBorderColor.push('rgba(255, 255, 255, 0)');
                roomTempBorderColor.push('rgba(255, 255, 255, 0)');
            } else {
                if (maxValueInArray === arr[i]) {
                    if (rankData[i] === -1) {
                        coilTempLineColor.push('rgba(189, 195, 199, 1)');
                        roomTempLineColor.push('rgba(189, 195, 199, 1)');
                        coilTempBorderColor.push('rgba(189, 195, 199, 0.50)');
                        roomTempBorderColor.push('rgba(189, 195, 199, 0.50)');
                        pointRadius.push(3.3);
                    } else {
                        coilTempLineColor.push('rgba(185, 24, 24, 0.87)');
                        roomTempLineColor.push('rgba(185, 24, 24, 0.87)');
                        coilTempBorderColor.push('rgba(185, 24, 24, 0.50)');
                        roomTempBorderColor.push('rgba(185, 24, 24, 0.50)');
                        pointRadius.push(7);
                    }
                } else {
                    if (rankData[i] === -1) {
                        coilTempLineColor.push('rgba(189, 195, 199, 1)');
                        roomTempLineColor.push('rgba(189, 195, 199, 1)');
                        coilTempBorderColor.push('rgba(189, 195, 199, 0.50)');
                        roomTempBorderColor.push('rgba(189, 195, 199, 0.50)');
                        pointRadius.push(3.3);
                    } else {
                        coilTempLineColor.push('rgba(0, 18, 158, 0.60)');
                        roomTempLineColor.push('rgba(15, 98, 4, 0.60)');
                        coilTempBorderColor.push('rgba(0, 18, 158, 0.25)');
                        roomTempBorderColor.push('rgba(15, 98, 4, 0.25)');
                        pointRadius.push(3.3);
                    }
                }
            }
        }

        return { coilTempLineColor, roomTempLineColor, pointRadius, coilTempBorderColor, roomTempBorderColor };
    }

    getRefrigerationGraphData(
        maxCoilTemp: any,
        avgCoilTemp: any,
        minCoilTemp: any,
        maxRoomTemp: any,
        avgRoomTemp: any,
        minRoomTemp: any,
        rankData: any,
        primeData: any
    ) {
        let chartData = [];
        let chartColors = [];
        let chartOptions = {};
        const allChartInformation: AllChartData = {};

        const maxCoilTempLinevalues = this.getColorsFromRefrigerationArray(maxCoilTemp, rankData, primeData);
        const avgCoilTempLinevalues = this.getColorsFromRefrigerationArray(avgCoilTemp, rankData, primeData);
        const minCoilTempLinevalues = this.getColorsFromRefrigerationArray(minCoilTemp, rankData, primeData);
        const maxRoomTempLinevalues = this.getColorsFromRefrigerationArray(maxRoomTemp, rankData, primeData);
        const avgRoomTempLinevalues = this.getColorsFromRefrigerationArray(avgRoomTemp, rankData, primeData);
        const minRoomTempLinevalues = this.getColorsFromRefrigerationArray(minRoomTemp, rankData, primeData);

        chartData = [
            { data: maxCoilTemp, label: 'Max Coil Temp' },
            { data: avgCoilTemp, label: 'Avg Coil Temp' },
            { data: minCoilTemp, label: 'Min Coil Temp' },
            { data: maxRoomTemp, label: 'Max Room Temp' },
            { data: avgRoomTemp, label: 'Avg Room Temp' },
            { data: minRoomTemp, label: 'Min Room Temp' }
        ];
        chartColors = [
            {
                backgroundColor: maxCoilTempLinevalues.coilTempLineColor,
                borderColor: maxCoilTempLinevalues.coilTempBorderColor,
                pointRadius: maxCoilTempLinevalues.pointRadius,
                fill: false
            },
            {
                backgroundColor: avgCoilTempLinevalues.coilTempLineColor,
                borderColor: avgCoilTempLinevalues.coilTempBorderColor,
                pointRadius: maxCoilTempLinevalues.pointRadius,
                fill: false
            },
            {
                backgroundColor: minCoilTempLinevalues.coilTempLineColor,
                borderColor: minCoilTempLinevalues.coilTempBorderColor,
                pointRadius: maxCoilTempLinevalues.pointRadius,
                fill: false
            },
            {
                backgroundColor: maxRoomTempLinevalues.roomTempLineColor,
                borderColor: maxRoomTempLinevalues.roomTempBorderColor,
                pointRadius: maxRoomTempLinevalues.pointRadius,
                fill: false
            },
            {
                backgroundColor: avgRoomTempLinevalues.roomTempLineColor,
                borderColor: avgRoomTempLinevalues.roomTempBorderColor,
                pointRadius: maxCoilTempLinevalues.pointRadius,
                fill: false
            },
            {
                backgroundColor: minRoomTempLinevalues.roomTempLineColor,
                borderColor: minRoomTempLinevalues.roomTempBorderColor,
                pointRadius: maxCoilTempLinevalues.pointRadius,
                fill: false
            }
        ];

        const yscale = this.calculateScale(maxRoomTemp);

        chartOptions = {
            onClick: this.ke2GraphClickEvent.bind(this),
            layout: {
                padding: {
                    top: 5
                }
            },
            responsive: true,
            maintainAspectRatio: false,
            spanGaps: false,
            lineOnHover: {
                enabled: false
            },
            elements: {
                line: {
                    tension: 0.000001
                }
            },
            plugins: {
                filler: {
                    propagate: false
                }
            },
            scales: {
                xAxes: [
                    {
                        ticks: {
                            autoSkip: false
                        }
                    }
                ],
                yAxes: [
                    {
                        display: true,
                        ticks: {
                            beginAtZero: true,
                            max: yscale
                        }
                    }
                ]
            },
            legend: {
                display: false
            }
        };

        allChartInformation.data = chartData;
        allChartInformation.colors = chartColors;
        allChartInformation.options = chartOptions;

        return allChartInformation;
    }

    getRefrigerationHourlyGraphData(coilTemp: any, roomTemp: any, rankData: any, primeData: any) {
        let chartData = [];
        let chartColors = [];
        let chartOptions = {};
        const allChartInformation: AllChartData = {};

        let coilTempLine = [];
        let roomTempLine = [];
        let coilTempPointRadius = [];
        let roomTempPointRadius = [];
        let coilTempBorderColor = [];
        let roomTempBorderColor = [];

        coilTempLine = this.getColorsFromRefrigerationArray(coilTemp, rankData, primeData).coilTempLineColor;
        roomTempLine = this.getColorsFromRefrigerationArray(roomTemp, rankData, primeData).roomTempLineColor;
        coilTempPointRadius = this.getColorsFromRefrigerationArray(coilTemp, rankData, primeData).pointRadius;
        roomTempPointRadius = this.getColorsFromRefrigerationArray(roomTemp, rankData, primeData).pointRadius;
        coilTempBorderColor = this.getColorsFromRefrigerationArray(coilTemp, rankData, primeData).coilTempBorderColor;
        roomTempBorderColor = this.getColorsFromRefrigerationArray(roomTemp, rankData, primeData).roomTempBorderColor;

        chartData = [{ data: coilTemp, label: 'Coil Temp' }, { data: roomTemp, label: 'Room Temp' }];
        chartColors = [
            { backgroundColor: coilTempLine, fill: false, borderColor: coilTempBorderColor, pointRadius: coilTempPointRadius },
            { backgroundColor: roomTempLine, fill: false, borderColor: roomTempBorderColor, pointRadius: roomTempPointRadius }
        ];

        const yscale = this.calculateScale(roomTemp);
        // const yscale2 = this.calculateScale(minCoilTemp);

        chartOptions = {
            onClick: this.ke2GraphClickEvent.bind(this),
            layout: {
                padding: {
                    top: 5
                }
            },
            responsive: true,
            maintainAspectRatio: false,
            spanGaps: false,
            lineOnHover: {
                enabled: false
            },
            elements: {
                line: {
                    tension: 0.000001
                }
            },
            plugins: {
                filler: {
                    propagate: false
                }
            },
            scales: {
                xAxes: [
                    {
                        ticks: {
                            autoSkip: false
                        }
                    }
                ],
                yAxes: [
                    {
                        display: true,
                        ticks: {
                            beginAtZero: true,
                            max: yscale
                        }
                    }
                ]
            },
            legend: {
                display: true
            }
        };

        allChartInformation.data = chartData;
        allChartInformation.colors = chartColors;
        allChartInformation.options = chartOptions;

        return allChartInformation;
    }

    // retrieve data
    retrieveRefrigerationYearData(
        year: number,
        maxCoilTemp: boolean,
        avgCoilTemp: boolean,
        minCoilTemp: boolean,
        maxRoomTemp: boolean,
        avgRoomTemp: boolean,
        minRoomTemp: boolean
    ) {
        const actualYear = this.actualDate.getUTCFullYear();
        // if the value is stored on the localCache, return this.number
        const yearObject: Ke2YearCacheObject = this.refrigerationCacheService.getYearDataFromCache(
            this.selectedRefrigerationMonitorId,
            year
        );
        if (yearObject) {
            if (actualYear === year) {
                this.mergePartialKe2YearData(yearObject.data, maxCoilTemp, avgCoilTemp, minCoilTemp, maxRoomTemp, avgRoomTemp, minRoomTemp);
            } else {
                this.processRefrigerationYearReport(
                    yearObject.data,
                    maxCoilTemp,
                    avgCoilTemp,
                    minCoilTemp,
                    maxRoomTemp,
                    avgRoomTemp,
                    minRoomTemp
                );
            }
        } else {
            const tempRequest: RequestDTO = new RequestDTO(
                this.getLocalDateTime(year, this.currentYear.getMonth() + 1, this.currentYear.getDate(), this.currentYear.getHours()),
                this.timeZoneID
            );
            this.metricsService.getKe2YearReportByMonitorId(this.selectedRefrigerationMonitorId, tempRequest).subscribe(
                (res: HttpResponse<RefrigerationReport>) => {
                    if (actualYear === year) {
                        this.mergePartialKe2YearData(
                            res.body,
                            maxCoilTemp,
                            avgCoilTemp,
                            minCoilTemp,
                            maxRoomTemp,
                            avgRoomTemp,
                            minRoomTemp
                        );
                    } else {
                        this.processRefrigerationYearReport(
                            res.body,
                            maxCoilTemp,
                            avgCoilTemp,
                            minCoilTemp,
                            maxRoomTemp,
                            avgRoomTemp,
                            minRoomTemp
                        );
                    }
                    this.refrigerationCacheService.storeYearDataInCache(this.selectedRefrigerationMonitorId, year, res.body);
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        }
    }

    retrieveRefrigerationMonthData(
        year: number,
        month: number,
        maxCoilTemp: boolean,
        avgCoilTemp: boolean,
        minCoilTemp: boolean,
        maxRoomTemp: boolean,
        avgRoomTemp: boolean,
        minRoomTemp: boolean
    ) {
        const actualMonth = this.actualDate.getUTCMonth() + 1;
        const actualYear = this.actualDate.getUTCFullYear();
        // if the value is stored on the localCache, return this.number
        const monthObject: Ke2MonthCacheObject = this.refrigerationCacheService.getMonthDataFromCache(
            this.selectedRefrigerationMonitorId,
            year,
            month
        );
        if (monthObject) {
            if (actualYear === year && actualMonth === month) {
                this.mergePartialKe2MonthData(
                    monthObject.data,
                    maxCoilTemp,
                    avgCoilTemp,
                    minCoilTemp,
                    maxRoomTemp,
                    avgRoomTemp,
                    minRoomTemp
                );
            } else {
                this.processRefrigerationMonthReport(
                    monthObject.data,
                    maxCoilTemp,
                    avgCoilTemp,
                    minCoilTemp,
                    maxRoomTemp,
                    avgRoomTemp,
                    minRoomTemp
                );
            }
        } else {
            const tempRequest: RequestDTO = new RequestDTO(
                this.getLocalDateTime(year, month, this.currentMonth.getDate(), this.currentMonth.getHours()),
                this.timeZoneID
            );
            this.metricsService.getKe2MonthReportByMonitorId(this.selectedRefrigerationMonitorId, tempRequest).subscribe(
                (res: HttpResponse<RefrigerationReport>) => {
                    if (actualYear === year && actualMonth === month) {
                        this.mergePartialKe2MonthData(
                            res.body,
                            maxCoilTemp,
                            avgCoilTemp,
                            minCoilTemp,
                            maxRoomTemp,
                            avgRoomTemp,
                            minRoomTemp
                        );
                    } else {
                        this.processRefrigerationMonthReport(
                            res.body,
                            maxCoilTemp,
                            avgCoilTemp,
                            minCoilTemp,
                            maxRoomTemp,
                            avgRoomTemp,
                            minRoomTemp
                        );
                    }
                    this.refrigerationCacheService.storeMonthDataInCache(this.selectedRefrigerationMonitorId, year, month, res.body);
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        }
    }

    retrieveRefrigerationDayData(
        year: number,
        month: number,
        day: number,
        maxCoilTemp: boolean,
        avgCoilTemp: boolean,
        minCoilTemp: boolean,
        maxRoomTemp: boolean,
        avgRoomTemp: boolean,
        minRoomTemp: boolean
    ) {
        const actualDay = this.actualDate.getUTCDate();
        const actualMonth = this.actualDate.getUTCMonth() + 1;
        const actualYear = this.actualDate.getUTCFullYear();
        // if the value is stored on the localCache, return this.number
        const dayObject: Ke2DayCacheObject = this.refrigerationCacheService.getDayDataFromCache(
            this.selectedRefrigerationMonitorId,
            year,
            month,
            day
        );
        if (dayObject) {
            if (actualYear === year && actualMonth === month && actualDay === day) {
                this.mergePartialKe2DayData(dayObject.data, maxCoilTemp, avgCoilTemp, minCoilTemp, maxRoomTemp, avgRoomTemp, minRoomTemp);
            } else {
                this.processRefrigerationDayReport(
                    dayObject.data,
                    maxCoilTemp,
                    avgCoilTemp,
                    minCoilTemp,
                    maxRoomTemp,
                    avgRoomTemp,
                    minRoomTemp
                );
            }
        } else {
            const tempRequest: RequestDTO = new RequestDTO(
                this.getLocalDateTime(year, month, day, this.currentDay.getHours()),
                this.timeZoneID
            );
            this.metricsService.getKe2DayReportByMonitorId(this.selectedRefrigerationMonitorId, tempRequest).subscribe(
                (res: HttpResponse<RefrigerationReport>) => {
                    if (actualYear === year && actualMonth === month && actualDay === day) {
                        this.mergePartialKe2DayData(res.body, maxCoilTemp, avgCoilTemp, minCoilTemp, maxRoomTemp, avgRoomTemp, minRoomTemp);
                    } else {
                        this.processRefrigerationDayReport(
                            res.body,
                            maxCoilTemp,
                            avgCoilTemp,
                            minCoilTemp,
                            maxRoomTemp,
                            avgRoomTemp,
                            minRoomTemp
                        );
                    }
                    this.refrigerationCacheService.storeDayDataInCache(this.selectedRefrigerationMonitorId, year, month, day, res.body);
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        }
    }

    retrieveRefrigerationHourData(
        year: number,
        month: number,
        day: number,
        hour: number,
        coilTemp: boolean,
        roomTemp: boolean,
        revertToClientTz: boolean
    ) {
        // if the value is stored on the localCache, return this.number
        const hourObject: Ke2HourCacheObject = this.refrigerationCacheService.getHourDataFromCache(
            this.selectedRefrigerationMonitorId,
            year,
            month,
            day,
            hour
        );
        if (hourObject) {
            this.processRefrigerationHourReport(hourObject.data, coilTemp, roomTemp);
        } else {
            const tempRequest: RequestDTO = new RequestDTO(
                this.getLocalDateTime(year, month, day, hour),
                this.timeZoneID,
                revertToClientTz
            );
            this.metricsService.getKe2HourReportByMonitorId(this.selectedRefrigerationMonitorId, tempRequest).subscribe(
                (res: HttpResponse<RefrigerationReport>) => {
                    this.processRefrigerationHourReport(res.body, coilTemp, roomTemp);
                    this.refrigerationCacheService.storeHourDataInCache(
                        this.selectedRefrigerationMonitorId,
                        year,
                        month,
                        day,
                        hour,
                        res.body
                    );
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        }
    }

    loadInitialRefrigerationDataInOrder() {
        const refrigerationReports = [];
        // dates will be handled in UTC format
        const year = this.actualDate.getUTCFullYear();
        const month = this.actualDate.getUTCMonth() + 1;
        const day = this.actualDate.getUTCDate();

        // a temporary fix to the issue that we don't have the current hour, that is why we are using UTCHour - 1
        // since the date may change because of this operation, then we will also send year, month and day information
        // while getting hour information
        this.actualDateMinus1Hour = new Date(this.actualDate.getTime());
        this.actualDateMinus1Hour.setHours(this.actualDateMinus1Hour.getHours() - 1);
        const hourYear = this.actualDateMinus1Hour.getUTCFullYear();
        const hourMonth = this.actualDateMinus1Hour.getUTCMonth() + 1;
        const hourDay = this.actualDateMinus1Hour.getUTCDate();
        const hour = this.actualDateMinus1Hour.getUTCHours();

        const tempRequest: RequestDTO = new RequestDTO(this.getLocalDateTime(hourYear, hourMonth, hourDay, hour), this.timeZoneID, false);

        refrigerationReports.push(this.metricsService.getKe2HourReportByMonitorId(this.selectedRefrigerationMonitorId, tempRequest));
        refrigerationReports.push(this.metricsService.getKe2DayReportByMonitorId(this.selectedRefrigerationMonitorId, tempRequest));
        refrigerationReports.push(this.metricsService.getKe2MonthReportByMonitorId(this.selectedRefrigerationMonitorId, tempRequest));
        refrigerationReports.push(this.metricsService.getKe2YearReportByMonitorId(this.selectedRefrigerationMonitorId, tempRequest));

        Observable.forkJoin(refrigerationReports).subscribe(
            response => {
                response.forEach(
                    (res: HttpResponse<RefrigerationReport>) => {
                        if (res.body.reportByHour.length > 0) {
                            this.processRefrigerationHourReport(res.body, true, true);
                            this.refrigerationCacheService.storeHourDataInCache(
                                this.selectedRefrigerationMonitorId,
                                hourYear,
                                hourMonth,
                                hourDay,
                                hour,
                                res.body
                            );
                        }
                        if (res.body.reportByDay.length > 0) {
                            this.mergePartialKe2DayData(res.body, true, true, true, true, true, true);
                            this.refrigerationCacheService.storeDayDataInCache(
                                this.selectedRefrigerationMonitorId,
                                year,
                                month,
                                day,
                                res.body
                            );
                        }
                        if (res.body.reportByMonth.length > 0) {
                            this.mergePartialKe2MonthData(res.body, true, true, true, true, true, true);
                            this.refrigerationCacheService.storeMonthDataInCache(
                                this.selectedRefrigerationMonitorId,
                                year,
                                month,
                                res.body
                            );
                        }
                        if (res.body.reportByYear.length > 0) {
                            // this method is going to load partial data from month and add it to the year information.
                            this.mergePartialKe2YearData(res.body, true, true, true, true, true, true);
                            this.refrigerationCacheService.storeYearDataInCache(this.selectedRefrigerationMonitorId, year, res.body);
                        }
                    },
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            },
            error => {
                console.error(error);
                this.reattempts++;
                if (this.reattempts < 2) {
                    this.loadInitialRefrigerationDataInOrder();
                }
            }
        );
    }

    ke2GraphClickEvent(event: any, array) {
        console.log(event);
        const chart = array[0]._chart.chart;
        const clickedElementIndex = array[0]._index;
        const label = chart.config.data.labels[clickedElementIndex];
        // get value by index
        const value = chart.data.datasets[0].data[clickedElementIndex];
        const activeTab = this.consumption_tabs.activeId;
        switch (activeTab) {
            case 'year-tab':
                this.ke2MonthDataLoaded = false;
                this.retrieveRefrigerationMonthData(
                    this.currentYear.getFullYear(),
                    this.getMonth(label),
                    true,
                    true,
                    true,
                    true,
                    true,
                    true
                );
                this.consumption_tabs.select('month-tab');
                break;
            case 'month-tab':
                // load the day information
                this.ke2DayDataLoaded = false;
                const splited = label.split('/');
                this.retrieveRefrigerationDayData(
                    this.currentMonth.getFullYear(),
                    splited[0],
                    splited[1],
                    true,
                    true,
                    true,
                    true,
                    true,
                    true
                );
                this.consumption_tabs.select('day-tab');
                break;
            case 'day-tab':
                this.ke2HourDataLoaded = false;
                this.retrieveRefrigerationHourData(
                    this.currentDay.getFullYear(),
                    this.currentDay.getMonth() + 1,
                    this.currentDay.getDate(),
                    this.getHour(label),
                    true,
                    true,
                    true
                );
                this.consumption_tabs.select('hour-tab');
                break;
            case 'hour-tab':
                break;
        }
        event = null;
    }
}
