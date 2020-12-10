import { Component, OnInit, Input } from '@angular/core';
import { Ame, Amu, Amun } from '../../../shared/model/ame.model';
import { DatePipe } from '@angular/common';
import { AmunService } from '../site-account-ame-amun/amun.service';
import { AmuService } from '../site-account-ame-amu/amu.service';

@Component({
    selector: 'jhi-site-account-performance',
    templateUrl: './site-account-performance.component.html',
    styles: [
        `
            .select-ame {
                -webkit-appearance: none !important;
                -moz-appearance: none !important;
                appearance: none !important;
                border-radius: 0.15rem;
            }
            .legend {
                list-style: none;
                font-size: 14px;
            }
            .legend li {
                float: left;
                margin-right: 10px;
            }
            .legend span {
                border: 1px solid #ccc;
                float: left;
                width: 15px;
                height: 15px;
                margin: 4px;
            }
            .legend .normalized-kwh {
                background-color: #0b62a4;
            }
            .legend .amu {
                background-color: #7a92a3;
            }
            .legend .used-for-amu {
                background-color: #116979;
            }
            .legend .savings {
                background-color: #dc3545;
            }
        `
    ]
})
export class SiteAccountPerformanceComponent implements OnInit {
    _ameId: number;
    get ameId(): number {
        return this._ameId;
    }

    @Input('ameId')
    set ameId(value: number) {
        this._ameId = value;
        this.processAmeData();
    }

    ames = new Array<Ame>();
    amuTotals: Array<any>;
    amunsUsed;
    amuns;
    amus;
    validAmeData = false;
    dataLoaded = false;
    errorMessage = '';
    amunsByYear = {
        firstYearAmuns: [],
        secondYearAmuns: [],
        thirdYearAmuns: []
    };
    years: {
        firstYear: number;
        secondYear: number;
        thirdYear: number;
        lastYear: number;
    };
    allYears = [];
    thereIsNoPreviousYear = false;
    thereIsNoNextYear = true;
    currentYear: number;
    chartBarDataKWH = [];
    chartBarOptionsKWH = {};
    percentageChanged: Array<any>;
    percentageChangedPTO: Array<any>;
    postTakeOver: Array<any>;
    nextYearsPostTakeOver: Array<any>;
    nextYearsPercentageChangePTO: Array<any>;
    averages: {
        amuAverage: number;
        firstYearAmunsAverage: number;
        secondYearAmunsAverage: number;
        thirdYearAmunsAverage: number;
        postTakeOverAverage: number;
        percentageChangedAverage: number;
        percentageChangedPTO: number;
        nextYearsPostTakeOver: Array<number>;
        nextYearsPercentageChangePTO: Array<number>;
    };

    constantValues: {
        months: Array<any>;
        shortMonths: Array<any>;
        totalRateComponent: Array<any>;
        usageType: Array<any>;
    };

    constructor(private datePipe: DatePipe, private amunService: AmunService, private amuService: AmuService) {}

    ngOnInit() {}

    async processAmeData() {
        try {
            const amunsResponse = await this.amunService.getAllAmuns(this.ameId).toPromise();
            this.amuns = amunsResponse ? amunsResponse.body : [];
            const amusResponse = await this.amuService.getAmus(this.ameId).toPromise();
            this.amus = amusResponse ? amusResponse.body : [];
            this.constantValues = this.defineContantValues();
            this.amuTotals = this.getAmuTotals(this.amus);
            this.amunsUsed = this.getAmunsUsed(this.amuns);
            if (this.amuTotals == null || this.amuTotals.length < 1 || this.amunsUsed == null || this.amunsUsed.length < 1) {
                throw new Error('Invalid data');
            }
            this.years = this.getYears(this.amunsUsed);
            this.amunsByYear = this.getAmunsByYear(this.amunsUsed, this.years);
            this.percentageChanged = this.getPercentageChangedValues();
            this.postTakeOver = this.getPostTakeOver(this.amuns, this.years);
            this.percentageChangedPTO = this.getPercentageChangedPostTakeOver(this.postTakeOver, this.amuTotals);
            this.nextYearsPostTakeOver = this.getNextYearPostTakeOver(this.amuns, this.years);
            this.nextYearsPercentageChangePTO = this.getNextYearPercentageChangePTO(this.nextYearsPostTakeOver, this.amuTotals);
            this.averages = this.getAverages(
                this.amuTotals,
                this.amunsByYear,
                this.postTakeOver,
                this.percentageChanged,
                this.percentageChangedPTO,
                this.nextYearsPostTakeOver,
                this.nextYearsPercentageChangePTO
            );

            this.setChartBarData();
            this.validAmeData = true;
        } catch (error) {
            this.errorMessage = error.message;
            this.validAmeData = false;
        } finally {
            this.dataLoaded = true;
        }
    }

    findAllYears(amuns: Amun[]) {
        this.allYears = [];
        amuns.forEach(amun => {
            if (!this.allYears.includes(amun.year)) {
                this.allYears.push(amun.year);
            }
        });
    }

    setChartBarData(year?: number) {
        this.findAllYears(this.amuns);
        this.currentYear = this.allYears[this.allYears.length - 1];
        year = year || this.currentYear;
        const amunsByMonth = this.setAmunsByMonthData(year);
        this.chartBarDataKWH = [
            { month: 'Jan', usedForAmu: amunsByMonth[0].usedForAmu, normalizedKwh: +amunsByMonth[0].usage, amu: +this.amuTotals[0] },
            { month: 'Feb', usedForAmu: amunsByMonth[1].usedForAmu, normalizedKwh: +amunsByMonth[1].usage, amu: +this.amuTotals[1] },
            { month: 'Mar', usedForAmu: amunsByMonth[2].usedForAmu, normalizedKwh: +amunsByMonth[2].usage, amu: +this.amuTotals[2] },
            { month: 'Apr', usedForAmu: amunsByMonth[3].usedForAmu, normalizedKwh: +amunsByMonth[3].usage, amu: +this.amuTotals[3] },
            { month: 'May', usedForAmu: amunsByMonth[4].usedForAmu, normalizedKwh: +amunsByMonth[4].usage, amu: +this.amuTotals[4] },
            { month: 'Jun', usedForAmu: amunsByMonth[5].usedForAmu, normalizedKwh: +amunsByMonth[5].usage, amu: +this.amuTotals[5] },
            { month: 'Jul', usedForAmu: amunsByMonth[6].usedForAmu, normalizedKwh: +amunsByMonth[6].usage, amu: +this.amuTotals[6] },
            { month: 'Aug', usedForAmu: amunsByMonth[7].usedForAmu, normalizedKwh: +amunsByMonth[7].usage, amu: +this.amuTotals[7] },
            { month: 'Sep', usedForAmu: amunsByMonth[8].usedForAmu, normalizedKwh: +amunsByMonth[8].usage, amu: +this.amuTotals[8] },
            { month: 'Oct', usedForAmu: amunsByMonth[9].usedForAmu, normalizedKwh: +amunsByMonth[9].usage, amu: +this.amuTotals[9] },
            { month: 'Nov', usedForAmu: amunsByMonth[10].usedForAmu, normalizedKwh: +amunsByMonth[10].usage, amu: +this.amuTotals[10] },
            { month: 'Dec', usedForAmu: amunsByMonth[11].usedForAmu, normalizedKwh: +amunsByMonth[11].usage, amu: +this.amuTotals[11] }
        ];

        this.chartBarOptionsKWH = {
            xkey: 'month',
            ykeys: ['normalizedKwh', 'amu'],
            labels: ['Normalized kWh', 'AMU'],
            hideHover: 'auto',
            hoverCallback(index, options, content, row) {
                const savingsPercentage = (((row.amu - row.normalizedKwh) / row.amu) * 100).toFixed(2);
                const savingsDiv = `<div class='morris-hover-point' style='color: #dc3545'>
                                    Monthly Savings: ${savingsPercentage}%
                                </div>`;
                return content + savingsDiv;
            },
            barColors(row, series, type) {
                const isUsedForAmu = series.key === 'normalizedKwh' && this.options.data[row.x].usedForAmu;
                if (series.key === 'amu') {
                    return '#7a92a3';
                }
                if (isUsedForAmu) {
                    return '#116979';
                }
                return '#0b62a4';
            }
        };

        this.setYearPaginatorData(year);
    }

    setYearPaginatorData(year) {
        this.thereIsNoPreviousYear = false;
        this.thereIsNoNextYear = false;

        const yearIndex = this.allYears.findIndex(y => y === year);
        const isFirstYear = yearIndex === 0;
        const isLastYear = yearIndex === this.allYears.length - 1;

        if (isFirstYear) {
            this.thereIsNoPreviousYear = true;
        }
        if (isLastYear) {
            this.thereIsNoNextYear = true;
        }
    }

    setAmunsByMonthData(year) {
        const amunsByMonth = [];
        for (let i = 0; i < 12; i++) {
            amunsByMonth.push({ month: i, usage: 0 });
        }
        this.amuns
            .filter(amun => {
                const isCorrectUsageType = this.constantValues.usageType.includes(amun.usageType);
                const isCorrectRateComponent = this.constantValues.totalRateComponent.includes(amun.rateComponent);
                const isSelectedYear = amun.year === year;
                return isCorrectUsageType && isCorrectRateComponent && isSelectedYear;
            })
            .map(amun => {
                return {
                    month: this.constantValues.shortMonths.indexOf(amun.month.toString()),
                    usage: amun.approvedUsage,
                    usedForAmu: amun.usedForAmu
                };
            })
            .forEach(amun => {
                amunsByMonth[amun.month].usage = amun.usage;
                amunsByMonth[amun.month].usedForAmu = amun.usedForAmu;
            });
        return amunsByMonth;
    }

    defineContantValues() {
        return {
            months: [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December'
            ],
            shortMonths: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
            totalRateComponent: ['[total]'],
            usageType: ['KWH']
        };
    }

    getAmuTotals(amus: Array<Amu>): Array<any> {
        const onlyTotals = amus.filter(amu => {
            const isCorrectUsageType = this.constantValues.usageType.includes(amu.usageType);
            const isCorrectRateComponent = this.constantValues.totalRateComponent.includes(amu.rateComponent);
            return isCorrectUsageType && isCorrectRateComponent;
        });
        onlyTotals.forEach(amu => {
            amu.date = this.constantValues.shortMonths.indexOf(amu.month.toString());
        });

        const amuTotals = new Array(12);
        for (let i = 0; i < amuTotals.length; i++) {
            const amuInThisMonth = onlyTotals.find(amu => {
                if (amu.date === i) {
                    return true;
                }
            });
            if (amuInThisMonth) {
                amuTotals[i] = amuInThisMonth.approvedUsage;
            } else {
                amuTotals[i] = '';
            }
        }
        return amuTotals;
    }

    getAmunsUsed(amuns: Array<Amun>) {
        const amunsUsed = amuns.filter(amun => {
            return this.constantValues.totalRateComponent.includes(amun.rateComponent);
        });

        amunsUsed.forEach(amun => {
            const amunMonth = this.constantValues.shortMonths.indexOf(amun.month.toString());
            amun.date = this.datePipe.transform(new Date(amun.year, amunMonth), 'yyyy-MM');
        });
        return this.orderByProperty(amunsUsed, 'date');
    }

    getYears(amunsUsed) {
        return {
            firstYear: amunsUsed[0].year,
            secondYear: amunsUsed[0].year + 1,
            thirdYear: amunsUsed[0].year + 2,
            lastYear: amunsUsed[amunsUsed.length - 1].year
        };
    }

    getAmunsByYear(amunsUsed, years) {
        return {
            firstYearAmuns: this.getAmunByYear(amunsUsed, years.firstYear),
            secondYearAmuns: this.getAmunByYear(amunsUsed, years.secondYear),
            thirdYearAmuns: this.getAmunByYear(amunsUsed, years.thirdYear)
        };
    }

    getAmunByYear(amuns, year) {
        const amunsThisYear = amuns
            .filter(amun => amun.year === year)
            .filter(amun => this.constantValues.usageType.includes(amun.usageType))
            .map(amun => {
                return {
                    month: this.constantValues.shortMonths.indexOf(amun.month.toString()),
                    usage: amun.approvedUsage
                };
            });
        const amunsByMonth = new Array(12);
        for (let i = 0; i < amunsByMonth.length; i++) {
            const amunThisMonth = amunsThisYear.find(amun => {
                if (amun.month === i) {
                    return true;
                }
            });
            amunsByMonth[i] = amunThisMonth ? amunThisMonth.usage : '';
        }
        // This is to avoid pushing an array with empty values
        if (amunsByMonth.some(v => v)) {
            return amunsByMonth;
        } else {
            return [];
        }
    }

    getPercentageChangedValues() {
        const percentageChanged = [];
        for (let i = 0; i < this.constantValues.months.length; i++) {
            if (this.amunsByYear.secondYearAmuns[i] && this.amunsByYear.thirdYearAmuns[i]) {
                percentageChanged[i] = this.getPercentageChange(this.amunsByYear.secondYearAmuns[i], this.amunsByYear.thirdYearAmuns[i]);
            } else if (this.amunsByYear.firstYearAmuns[i] && this.amunsByYear.secondYearAmuns[i]) {
                percentageChanged[i] = this.getPercentageChange(this.amunsByYear.firstYearAmuns[i], this.amunsByYear.secondYearAmuns[i]);
            } else {
                percentageChanged[i] = '';
            }
        }
        return percentageChanged;
    }

    getPostTakeOver(amuns, years) {
        const nextMonth = this.constantValues.shortMonths.indexOf(this.amunsUsed[this.amunsUsed.length - 1].month) + 1;
        const amunsNotUsedInLastYear = amuns
            .filter(amun => {
                return amun.usedForAmu === false;
            })
            .filter(amun => {
                return amun.year === years.lastYear;
            })
            .filter(amun => {
                return this.constantValues.totalRateComponent.includes(amun.rateComponent);
            })
            .filter(amun => {
                return this.constantValues.usageType.includes(amun.usageType);
            })
            .map(amun => {
                return {
                    month: this.constantValues.shortMonths.indexOf(amun.month),
                    usage: amun.approvedUsage
                };
            });

        const postTakeOver = Array(12);
        for (let i = 0; i < this.constantValues.months.length; i++) {
            const amunInThisMonth = amunsNotUsedInLastYear.find(amun => {
                if (amun.month === i) {
                    return true;
                }
            });
            postTakeOver[i] = amunInThisMonth ? amunInThisMonth.usage : '';
        }
        return postTakeOver;
    }

    getNextYearPostTakeOver(amuns, years) {
        const currentYear = new Date().getFullYear();
        let differenceInYearBetweenLastAmunAndCurrentYear = 0;
        const nextYearPostTakeOver = [];
        if (currentYear !== years.lastYear) {
            differenceInYearBetweenLastAmunAndCurrentYear = currentYear - years.lastYear;
        }
        for (let year = 1; year <= differenceInYearBetweenLastAmunAndCurrentYear; year++) {
            const amunsNotUsedThisYear = amuns
                .filter(amun => {
                    return amun.usedForAmu === false;
                })
                .filter(amun => {
                    return amun.year === years.lastYear + year;
                })
                .filter(amun => {
                    return this.constantValues.totalRateComponent.includes(amun.rateComponent);
                })
                .filter(amun => {
                    return this.constantValues.usageType.includes(amun.usageType);
                })
                .map(amun => {
                    return {
                        month: this.constantValues.shortMonths.indexOf(amun.month),
                        usage: amun.approvedUsage
                    };
                });
            const postTakeOver = new Array(12);
            for (let month = 0; month < this.constantValues.months.length; month++) {
                const amunInThisMonth = amunsNotUsedThisYear.find(amun => {
                    if (amun.month === month) {
                        return true;
                    }
                });
                postTakeOver[month] = amunInThisMonth ? amunInThisMonth.usage : '';
            }
            // This is to avoid pushing an empty array
            if (postTakeOver.some(v => v)) {
                nextYearPostTakeOver.push(postTakeOver);
            }
        }
        return nextYearPostTakeOver;
    }

    getNextYearPercentageChangePTO(postTakeOver, amuTotals) {
        const nextYearsPercentageChange = [];
        if (postTakeOver.length > 0) {
            for (let year = 0; year < postTakeOver.length; year++) {
                nextYearsPercentageChange.push(this.getPercentageChangedPostTakeOver(postTakeOver[year], amuTotals));
            }
        }
        return nextYearsPercentageChange;
    }

    getPercentageChangedPostTakeOver(postTakeOver, amuTotals) {
        const percentageChanged = [];
        for (let i = 0; i < this.constantValues.months.length; i++) {
            if (postTakeOver[i]) {
                percentageChanged[i] = this.getPercentageChange(amuTotals[i], postTakeOver[i]);
            } else {
                percentageChanged[i] = '';
            }
        }
        return percentageChanged;
    }

    getAverages(
        amuTotals,
        amunsByYear,
        postTakeOver,
        percentageChanged,
        percentageChangedPTO,
        nextYearsPostTakeOver,
        nextYearsPercentageChangePTO
    ) {
        const averages = {
            amuAverage: this.calculateAverage(amuTotals),
            firstYearAmunsAverage: this.calculateAverage(amunsByYear.firstYearAmuns),
            secondYearAmunsAverage: this.calculateAverage(amunsByYear.secondYearAmuns),
            thirdYearAmunsAverage: this.calculateAverage(amunsByYear.thirdYearAmuns),
            postTakeOverAverage: this.calculateAverage(postTakeOver),
            percentageChangedAverage: this.calculateAverage(percentageChanged),
            percentageChangedPTO: this.calculateAverage(percentageChangedPTO),
            nextYearsPostTakeOver: nextYearsPostTakeOver.map(this.calculateAverage),
            nextYearsPercentageChangePTO: nextYearsPercentageChangePTO.map(this.calculateAverage)
        };
        return averages;
    }

    setChartBarPreviousYear() {
        const previousYear = this.currentYear - 1;
        this.setChartBarData(previousYear);
        this.currentYear = previousYear;
    }

    setChartBarNextYear() {
        const nextYear = this.currentYear + 1;
        this.setChartBarData(nextYear);
        this.currentYear = nextYear;
    }

    private calculateAverage(values) {
        const onlyNumbers = values.filter(v => typeof v === 'number');
        if (onlyNumbers.length) {
            const sum = onlyNumbers.reduce((a, b) => a + b);
            return sum / onlyNumbers.length;
        } else {
            return 0;
        }
    }

    private orderByProperty(array: Array<any>, property: string): Array<any> {
        return array.sort((a, b) => {
            if (a[property] > b[property]) {
                return 1;
            } else if (a[property] < b[property]) {
                return -1;
            }
        });
    }

    private getPercentageChange(oldNumber, newNumber) {
        const changedValue = newNumber - oldNumber;
        // Multiplying by 100 is not necessary because of the angular pipe for percent
        // return (decreaseValue / oldNumber) * 100;
        return changedValue / oldNumber;
    }
}
