import { Component, OnInit, OnDestroy, Input, ViewChild } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { AlertMs, AlertMsReport, ReportByDay } from './alert-ms.model';
import { AlertMsService } from './alert-ms.service';
import { ITEMS_PER_PAGE, Principal } from '../../shared';
import * as moment from 'moment';

@Component({
    selector: 'jhi-alert-ms',
    templateUrl: './alert-ms.component.html'
})
export class AlertMsComponent implements OnInit, OnDestroy {
    @Input() budderflyId: string;
    @ViewChild('t') t;

    currentAccount: any;
    alertMs: AlertMs[];
    alertReport: AlertMsReport;
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
    showSearchBar: boolean;
    showCreateButton: boolean;
    showRowButtons: boolean;
    noAlerts: boolean;
    showCharts: boolean;

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
                        max: 20
                    }
                }
            ]
        },
        legend: {
            display: false
        }
    };

    dayChartData = [];
    dayChartColors = [];
    dayChartLabels = [];
    weekChartData = [];
    weekChartColors = [];
    weekChartLabels = [];
    monthChartData = [];
    monthChartColors = [];
    monthChartLabels = [];
    yearChartData = [];
    yearChartColors = [];
    yearChartLabels = [];

    currentYear: number;
    currentWeekDate: Date;
    currentMonthDate: Date;
    currentDate: Date;

    options = { year: 'numeric', month: '2-digit', day: '2-digit' };

    constructor(
        private alertMsService: AlertMsService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private principal: Principal,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private eventManager: JhiEventManager
    ) {
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.routeData = this.activatedRoute.data.subscribe(data => {
            if (typeof data.pagingParams !== 'undefined') {
                this.page = data.pagingParams.page;
                this.previousPage = data.pagingParams.page;
                this.reverse = data.pagingParams.ascending;
                this.predicate = data.pagingParams.predicate;
                this.showSearchBar = true;
                this.showCreateButton = true;
                this.showRowButtons = true;
                this.noAlerts = true;
                this.showCharts = false;
            } else {
                // When we are calling this component from the sites view, we send data.paringParams
                this.page = data.paringParams.page;
                this.reverse = data.paringParams.ascending;
                this.predicate = data.paringParams.predicate;
                this.previousPage = data.paringParams.page;
                this.showSearchBar = false;
                this.showCreateButton = false;
                this.showRowButtons = false;
                this.noAlerts = true;
                this.showCharts = true;
            }
        });
        this.currentSearch =
            this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['search']
                ? this.activatedRoute.snapshot.params['search']
                : '';
    }

    loadAll() {
        if (typeof this.budderflyId === 'undefined') {
            if (this.currentSearch) {
                this.alertMsService
                    .search({
                        page: this.page - 1,
                        query: this.currentSearch,
                        size: this.itemsPerPage,
                        sort: this.sort()
                    })
                    .subscribe(
                        (res: HttpResponse<AlertMs[]>) => this.onSuccess(res.body, res.headers),
                        (res: HttpErrorResponse) => this.onError(res.message)
                    );
                return;
            }
            this.alertMsService
                .query({
                    page: this.page - 1,
                    size: this.itemsPerPage,
                    sort: this.sort()
                })
                .subscribe(
                    (res: HttpResponse<AlertMs[]>) => this.onSuccess(res.body, res.headers),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
        } else {
            if (this.showCharts) {
                this.loadGraphDataAndOptions();
            }
        }
    }
    loadPage(page: number) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.transition();
        }
    }
    transition() {
        this.router.navigate([], {
            queryParams: {
                page: this.page,
                size: this.itemsPerPage,
                search: this.currentSearch,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        });
        this.loadAll();
    }

    clear() {
        this.page = 0;
        this.currentSearch = '';
        this.router.navigate([
            '/alert-ms',
            {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        ]);
        this.loadAll();
    }
    search(query) {
        if (!query) {
            return this.clear();
        }
        this.page = 0;
        this.currentSearch = query;
        this.router.navigate([
            '/alert-ms',
            {
                search: this.currentSearch,
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        ]);
        this.loadAll();
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInAlertMs();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: AlertMs) {
        return item.id;
    }
    registerChangeInAlertMs() {
        this.eventSubscriber = this.eventManager.subscribe('alertMsListModification', response => this.loadAll());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    private onSuccess(data, headers) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        this.queryCount = this.totalItems;
        // this.page = pagingParams.page;
        this.alertMs = data;
        if (this.alertMs.length > 0) {
            this.noAlerts = false;
        }
    }
    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

    // Method that is going to be called at the beginning of the load of the page
    loadGraphDataAndOptions() {
        // disable this until we get the info.
        this.showCharts = false;

        this.alertMsService
            .getReportByBudderflyId(this.budderflyId)
            .subscribe(
                (res: HttpResponse<AlertMsReport>) => this.processReport(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    // Method that is going to be called at the beginning of the load of the page
    processReport(data, headers) {
        this.alertReport = data;

        this.processMonthReport(data, false);
        this.processDayReport(data, false);
        this.processWeekReport(data, false);
        this.processYearReport(data, true);

        this.showCharts = true;
    }

    // this will process the data from our servers and populate the objects needed to build the graph
    processDayReport(data, refreshData: boolean) {
        this.alertReport = data;
        this.dayChartData = [];
        this.dayChartColors = [];
        this.dayChartLabels.length = 0;
        const chartData = [];
        const barColors = [];
        let label: string;
        let i;
        this.currentDate = new Date(
            this.alertReport.reportByHourDTOs[0].year,
            this.alertReport.reportByHourDTOs[0].month - 1,
            this.alertReport.reportByHourDTOs[0].day
        );

        for (i = 0; i < this.alertReport.reportByHourDTOs.length; i++) {
            let hourlabel: string;
            const date: string = this.alertReport.reportByHourDTOs[i].month + '/' + this.alertReport.reportByHourDTOs[i].day;
            if (this.alertReport.reportByHourDTOs[i].hour > 12) {
                hourlabel = 'PM';
                const translatedHour = this.alertReport.reportByHourDTOs[i].hour - 12;
                label = translatedHour + ' ' + hourlabel + ' ' + date;
            } else {
                hourlabel = 'AM';
                label = this.alertReport.reportByHourDTOs[i].hour + ' ' + hourlabel + ' ' + date;
            }
            chartData.push(this.alertReport.reportByHourDTOs[i].count);
            // set color bards, by default we will use blue
            barColors.push('rgba(0,60,100,0.1)');
            this.dayChartLabels.push(label);
        }

        this.dayChartData.push({
            data: chartData
        });

        this.dayChartColors.push({
            backgroundColor: barColors
        });

        if (refreshData) {
            this.retrieveData('day');
        }
    }

    // this will process the data from our servers and populate the objects needed to build the graph
    processMonthReport(data, refreshData: boolean) {
        this.alertReport = data;
        this.monthChartData = [];
        this.monthChartColors = [];
        this.monthChartLabels.length = 0;
        const chartData = [];
        const barColors = [];
        let label: string;
        let i;
        this.currentMonthDate = new Date(
            this.alertReport.reportByDayDTOs[0].year,
            this.alertReport.reportByDayDTOs[0].month - 1,
            this.alertReport.reportByDayDTOs[0].day
        );

        for (i = 0; i < this.alertReport.reportByDayDTOs.length; i++) {
            label = this.alertReport.reportByDayDTOs[i].month + '/' + this.alertReport.reportByDayDTOs[i].day;

            chartData.push(this.alertReport.reportByDayDTOs[i].count);
            // set color bards, by default we will use blue
            barColors.push('rgba(0,60,100,0.1)');
            this.monthChartLabels.push(label);
        }

        this.monthChartData.push({
            data: chartData
        });

        this.monthChartColors.push({
            backgroundColor: barColors
        });

        if (refreshData) {
            this.retrieveData('month');
        }
    }

    // this will process the data from our servers and populate the objects needed to build the graph
    processWeekReport(data, refreshData: boolean) {
        this.alertReport = data;
        this.weekChartData = [];
        this.weekChartColors = [];
        this.weekChartLabels.length = 0;
        const chartData = [];
        const barColors = [];
        let label: string;
        let i;
        this.currentWeekDate = new Date(
            this.alertReport.reportByWeekDTOs[0].year,
            this.alertReport.reportByWeekDTOs[0].month - 1,
            this.alertReport.reportByWeekDTOs[0].day
        );

        for (i = 0; i < this.alertReport.reportByWeekDTOs.length; i++) {
            label = this.alertReport.reportByWeekDTOs[i].dayName;

            chartData.push(this.alertReport.reportByWeekDTOs[i].count);
            // set color bards, by default we will use blue
            barColors.push('rgba(0,60,100,0.1)');
            this.weekChartLabels.push(label);
        }

        this.weekChartData.push({
            data: chartData
        });

        this.weekChartColors.push({
            backgroundColor: barColors
        });

        if (refreshData) {
            this.retrieveData('week');
        }
    }

    // this will process the data from our servers and populate the objects needed to build the graph
    processYearReport(data, refreshData: boolean) {
        this.alertReport = data;
        this.yearChartData = [];
        this.yearChartColors = [];
        this.yearChartLabels.length = 0;
        const chartData = [];
        const barColors = [];
        let label: string;
        let i;
        this.currentYear = this.alertReport.reportByMonthDTOs[0].year;
        for (i = 0; i < this.alertReport.reportByMonthDTOs.length; i++) {
            label = this.alertReport.reportByMonthDTOs[i].monthName;

            chartData.push(this.alertReport.reportByMonthDTOs[i].count);
            // set color bards, by default we will use blue
            barColors.push('rgba(0,60,100,0.1)');
            this.yearChartLabels.push(label);
        }

        this.yearChartData.push({
            data: chartData
        });

        this.yearChartColors.push({
            backgroundColor: barColors
        });

        if (refreshData) {
            this.retrieveData('year');
        }
    }

    // Calculate the next year and call processYearReport to refresh the graph
    nextYear() {
        const year = this.currentYear + 1;
        // build date for next year
        const date: string = year + '-01-01';
        this.alertMsService
            .getYearReportByBudderflyId(this.budderflyId, date)
            .subscribe(
                (res: HttpResponse<AlertMsReport>) => this.processYearReport(res.body, true),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    // Calculate the previous year and call processYearReport to refresh the graph
    previousYear() {
        const year = this.currentYear - 1;
        // build date for next year
        const date: string = year + '-01-01';
        this.alertMsService
            .getYearReportByBudderflyId(this.budderflyId, date)
            .subscribe(
                (res: HttpResponse<AlertMsReport>) => this.processYearReport(res.body, true),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    // Calculate the next week and call processWeekReport to refresh the graph
    nextWeek() {
        this.currentWeekDate.setDate(this.currentWeekDate.getDate() + 7);
        const date: string = this.currentWeekDate.toLocaleDateString('en-US', this.options);
        const splited = date.split('/');
        // yyyy-mm-dd
        const finalDate: string = splited[2] + '-' + splited[0] + '-' + splited[1];

        this.alertMsService
            .getWeekReportByBudderflyId(this.budderflyId, finalDate)
            .subscribe(
                (res: HttpResponse<AlertMsReport>) => this.processWeekReport(res.body, true),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    // Calculate the previous week and call processWeekReport to refresh the graph
    previousWeek() {
        this.currentWeekDate.setDate(this.currentWeekDate.getDate() - 7);
        const date: string = this.currentWeekDate.toLocaleDateString('en-US', this.options);
        const splited = date.split('/');
        // yyyy-mm-dd
        const finalDate: string = splited[2] + '-' + splited[0] + '-' + splited[1];

        this.alertMsService
            .getWeekReportByBudderflyId(this.budderflyId, finalDate)
            .subscribe(
                (res: HttpResponse<AlertMsReport>) => this.processWeekReport(res.body, true),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    // Calculate the next month and call processMonthReport to refresh the graph
    nextMonth() {
        this.currentMonthDate.setMonth(this.currentMonthDate.getMonth() + 1);
        const date: string = this.currentMonthDate.toLocaleDateString('en-US', this.options);
        const splited = date.split('/');
        // yyyy-mm-dd
        const finalDate: string = splited[2] + '-' + splited[0] + '-' + splited[1];

        this.alertMsService
            .getMonthReportByBudderflyId(this.budderflyId, finalDate)
            .subscribe(
                (res: HttpResponse<AlertMsReport>) => this.processMonthReport(res.body, true),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    // Calculate the previous month and call processMonthReport to refresh the graph
    previousMonth() {
        this.currentMonthDate.setMonth(this.currentMonthDate.getMonth() - 1);
        const date: string = this.currentMonthDate.toLocaleDateString('en-US', this.options);
        const splited = date.split('/');
        // yyyy-mm-dd
        const finalDate: string = splited[2] + '-' + splited[0] + '-' + splited[1];

        this.alertMsService
            .getMonthReportByBudderflyId(this.budderflyId, finalDate)
            .subscribe(
                (res: HttpResponse<AlertMsReport>) => this.processMonthReport(res.body, true),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    // Calculate the next day and call processDayReport to refresh the graph
    nextDay() {
        this.currentDate.setDate(this.currentDate.getDate() + 1);
        const date: string = this.currentDate.toLocaleDateString('en-US', this.options);
        const splited = date.split('/');
        // yyyy-mm-dd
        const finalDate: string = splited[2] + '-' + splited[0] + '-' + splited[1];

        this.alertMsService
            .getDayReportByBudderflyId(this.budderflyId, finalDate)
            .subscribe(
                (res: HttpResponse<AlertMsReport>) => this.processDayReport(res.body, true),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    // Calculate the previous day and call processDayReport to refresh the graph
    previousDay() {
        this.currentDate.setDate(this.currentDate.getDate() - 1);
        const date: string = this.currentDate.toLocaleDateString('en-US', this.options);
        const splited = date.split('/');
        // yyyy-mm-dd
        const finalDate: string = splited[2] + '-' + splited[0] + '-' + splited[1];

        this.alertMsService
            .getDayReportByBudderflyId(this.budderflyId, finalDate)
            .subscribe(
                (res: HttpResponse<AlertMsReport>) => this.processDayReport(res.body, true),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    // function that is called on the tab change event. Then is going to retrieve according to the tab.
    fetchData(evt: any) {
        switch (evt.nextId) {
            case 'year-tab':
                this.retrieveData('year');
                break;
            case 'month-tab':
                this.retrieveData('month');
                break;
            case 'week-tab':
                this.retrieveData('week');
                break;
            case 'day-tab':
                this.retrieveData('day');
                break;
        }
    }

    // function that is going to retrieve the data according to the key.
    // Used by the fetchData function when the tab changes.
    // This is going to populate the main table of alerts, so the user can see the alerts filtered.
    retrieveData(key: string) {
        let fromDate: string;
        let date: string;
        let splited;

        switch (key) {
            case 'month':
                date = this.currentMonthDate.toLocaleDateString('en-US', this.options);
                splited = date.split('/');
                // yyyy-mm-dd
                fromDate = splited[2] + '-' + splited[0] + '-' + splited[1];
                break;
            case 'week':
                date = this.currentWeekDate.toLocaleDateString('en-US', this.options);
                splited = date.split('/');
                // yyyy-mm-dd
                fromDate = splited[2] + '-' + splited[0] + '-' + splited[1];
                break;
            case 'day':
                date = this.currentDate.toLocaleDateString('en-US', this.options);
                splited = date.split('/');
                // yyyy-mm-dd
                fromDate = splited[2] + '-' + splited[0] + '-' + splited[1];
                break;
            default:
                fromDate = this.currentYear + '-01-01';
                break;
        }

        this.alertMsService
            .getByBudderflyIdBetweenDates(this.budderflyId, fromDate, key, {
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(
                (res: HttpResponse<AlertMs[]>) => this.onSuccess(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    // Function that is going to be called from the chart when the user clicks.
    // First we analyze if the event.active is length 1 and if the _model is different from undefined,
    // this means we have clicked a bar in the chart.
    // Then we will analyze which is the active tab and act according to each tab
    onChartClick(evt: any) {
        if (evt.active.length === 1 && evt.active[0]._model !== 'undefined') {
            const value: string = evt.active[0]._model.label;
            const activeTab = this.t.activeId;
            let finalDate: string;
            let formattedDate: string;
            let splited;
            switch (activeTab) {
                case 'day-tab':
                    // do nothing, since we cant go in much more detail
                    break;
                case 'month-tab':
                    // load the day information
                    splited = value.split('/');
                    formattedDate = this.currentMonthDate.getFullYear() + '-' + splited[0] + '-' + splited[1];
                    const momentDate = moment(formattedDate, 'YYYY-MM-DD');
                    finalDate = momentDate.format('YYYY-MM-DD');

                    this.alertMsService
                        .getDayReportByBudderflyId(this.budderflyId, finalDate)
                        .subscribe(
                            (res: HttpResponse<AlertMsReport>) => this.processDayReport(res.body, true),
                            (res: HttpErrorResponse) => this.onError(res.message)
                        );

                    // switch to that tab.
                    this.t.select('day-tab');
                    break;
                case 'week-tab':
                    // load the day information
                    formattedDate = this.currentWeekDate.toLocaleDateString('en-US', this.options);
                    splited = formattedDate.split('/');
                    const dayNumber = this.calculateDateBasedOnWeek(value, this.currentWeekDate.getDate());
                    // yyyy-mm-dd
                    finalDate = splited[2] + '-' + splited[0] + '-' + dayNumber;

                    this.alertMsService
                        .getDayReportByBudderflyId(this.budderflyId, finalDate)
                        .subscribe(
                            (res: HttpResponse<AlertMsReport>) => this.processDayReport(res.body, true),
                            (res: HttpErrorResponse) => this.onError(res.message)
                        );
                    // switch to that tab.
                    this.t.select('day-tab');
                    break;
                case 'year-tab':
                    /// load the month information
                    finalDate = this.currentYear + '-' + this.getMonth(value) + '-01';
                    // yyyy-mm-dd
                    this.alertMsService
                        .getMonthReportByBudderflyId(this.budderflyId, finalDate)
                        .subscribe(
                            (res: HttpResponse<AlertMsReport>) => this.processMonthReport(res.body, true),
                            (res: HttpErrorResponse) => this.onError(res.message)
                        );

                    // switch to that tab.
                    this.t.select('month-tab');
                    break;
            }
        }
    }

    // Function that will return the number of month fixed in 2 characters.
    // Used for building the month date on onChartClick (year -tab)
    getMonth(month: string) {
        let day: string;
        switch (month) {
            case 'JAN':
                day = '01';
                break;
            case 'FEB':
                day = '02';
                break;
            case 'MAR':
                day = '03';
                break;
            case 'APR':
                day = '04';
                break;
            case 'MAY':
                day = '05';
                break;
            case 'JUN':
                day = '06';
                break;
            case 'JUL':
                day = '07';
                break;
            case 'AUG':
                day = '08';
                break;
            case 'SEP':
                day = '09';
                break;
            case 'OCT':
                day = '10';
                break;
            case 'NOV':
                day = '11';
                break;
            case 'DEC':
                day = '12';
                break;
        }

        return day;
    }

    // function that will return the day number according to the day.
    // The day number must be the start of the week.
    // If the start of the week is 19 and we sent TUE the retung will be 19 + 2 = 21
    calculateDateBasedOnWeek(weekDay: string, day: number) {
        let plus: number;
        switch (weekDay) {
            case 'SUN':
                plus = 0;
                break;
            case 'MON':
                plus = 1;
                break;
            case 'TUE':
                plus = 2;
                break;
            case 'WED':
                plus = 3;
                break;
            case 'THU':
                plus = 4;
                break;
            case 'FRI':
                plus = 5;
                break;
            case 'SAT':
                plus = 6;
                break;
        }
        return day + plus;
    }
}
