import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('StagingMeter e2e test', () => {
    let navBarPage: NavBarPage;
    let stagingMeterDialogPage: StagingMeterDialogPage;
    let stagingMeterComponentsPage: StagingMeterComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load StagingMeters', () => {
        navBarPage.goToEntity('staging-meter');
        stagingMeterComponentsPage = new StagingMeterComponentsPage();
        expect(stagingMeterComponentsPage.getTitle()).toMatch(/billingWebApp.stagingMeter.home.title/);
    });

    it('should load create StagingMeter dialog', () => {
        stagingMeterComponentsPage.clickOnCreateButton();
        stagingMeterDialogPage = new StagingMeterDialogPage();
        expect(stagingMeterDialogPage.getModalTitle()).toMatch(/billingWebApp.stagingMeter.home.createOrEditLabel/);
        stagingMeterDialogPage.close();
    });

    it('should create and save StagingMeters', () => {
        stagingMeterComponentsPage.clickOnCreateButton();
        stagingMeterDialogPage.setMeterIdInput('meterId');
        expect(stagingMeterDialogPage.getMeterIdInput()).toMatch('meterId');
        stagingMeterDialogPage.setLogicalMeterIdInput('logicalMeterId');
        expect(stagingMeterDialogPage.getLogicalMeterIdInput()).toMatch('logicalMeterId');
        stagingMeterDialogPage.setMeterNumberInput('meterNumber');
        expect(stagingMeterDialogPage.getMeterNumberInput()).toMatch('meterNumber');
        stagingMeterDialogPage.setServiceTypeInput('serviceType');
        expect(stagingMeterDialogPage.getServiceTypeInput()).toMatch('serviceType');
        stagingMeterDialogPage.setTariffInput('tariff');
        expect(stagingMeterDialogPage.getTariffInput()).toMatch('tariff');
        stagingMeterDialogPage.setServiceAddressInput('serviceAddress');
        expect(stagingMeterDialogPage.getServiceAddressInput()).toMatch('serviceAddress');
        stagingMeterDialogPage.setServiceCityInput('serviceCity');
        expect(stagingMeterDialogPage.getServiceCityInput()).toMatch('serviceCity');
        stagingMeterDialogPage.setServiceStateInput('serviceState');
        expect(stagingMeterDialogPage.getServiceStateInput()).toMatch('serviceState');
        stagingMeterDialogPage.setServiceZipInput('serviceZip');
        expect(stagingMeterDialogPage.getServiceZipInput()).toMatch('serviceZip');
        stagingMeterDialogPage.setBulbTypeInput('bulbType');
        expect(stagingMeterDialogPage.getBulbTypeInput()).toMatch('bulbType');
        stagingMeterDialogPage.setPodIdInput('podId');
        expect(stagingMeterDialogPage.getPodIdInput()).toMatch('podId');
        stagingMeterDialogPage.setIntervalStartInput('2000-12-31');
        expect(stagingMeterDialogPage.getIntervalStartInput()).toMatch('2000-12-31');
        stagingMeterDialogPage.setIntervalEndInput('2000-12-31');
        expect(stagingMeterDialogPage.getIntervalEndInput()).toMatch('2000-12-31');
        stagingMeterDialogPage.setBulbQuantityInput('5');
        expect(stagingMeterDialogPage.getBulbQuantityInput()).toMatch('5');
        stagingMeterDialogPage.setMeterConstantMultiplierInput('5');
        expect(stagingMeterDialogPage.getMeterConstantMultiplierInput()).toMatch('5');
        stagingMeterDialogPage.setMeterConversionMultiplierInput('5');
        expect(stagingMeterDialogPage.getMeterConversionMultiplierInput()).toMatch('5');
        stagingMeterDialogPage.setThirdPartyProviderInput('thirdPartyProvider');
        expect(stagingMeterDialogPage.getThirdPartyProviderInput()).toMatch('thirdPartyProvider');
        stagingMeterDialogPage.setThirdPartyAccountNumberInput('thirdPartyAccountNumber');
        expect(stagingMeterDialogPage.getThirdPartyAccountNumberInput()).toMatch('thirdPartyAccountNumber');
        stagingMeterDialogPage.setDegreeDayStatusInput('degreeDayStatus');
        expect(stagingMeterDialogPage.getDegreeDayStatusInput()).toMatch('degreeDayStatus');
        stagingMeterDialogPage.setOpTempInput('opTemp');
        expect(stagingMeterDialogPage.getOpTempInput()).toMatch('opTemp');
        stagingMeterDialogPage.setTimeRangeInput('timeRange');
        expect(stagingMeterDialogPage.getTimeRangeInput()).toMatch('timeRange');
        stagingMeterDialogPage.setCddInput('5');
        expect(stagingMeterDialogPage.getCddInput()).toMatch('5');
        stagingMeterDialogPage.setHddInput('5');
        expect(stagingMeterDialogPage.getHddInput()).toMatch('5');
        stagingMeterDialogPage.setWeatherSensitivityIndexInput('5');
        expect(stagingMeterDialogPage.getWeatherSensitivityIndexInput()).toMatch('5');
        stagingMeterDialogPage.setWeatherNormalizedConsumptionInput('5');
        expect(stagingMeterDialogPage.getWeatherNormalizedConsumptionInput()).toMatch('5');
        stagingMeterDialogPage.setAvgMonthlyBaseloadInput('5');
        expect(stagingMeterDialogPage.getAvgMonthlyBaseloadInput()).toMatch('5');
        stagingMeterDialogPage.setPredictedConsumptionInput('5');
        expect(stagingMeterDialogPage.getPredictedConsumptionInput()).toMatch('5');
        stagingMeterDialogPage.setServiceIdentifierInput('serviceIdentifier');
        expect(stagingMeterDialogPage.getServiceIdentifierInput()).toMatch('serviceIdentifier');
        stagingMeterDialogPage.setCreateDateInput(12310020012301);
        expect(stagingMeterDialogPage.getCreateDateInput()).toMatch('2001-12-31T02:30');
        stagingMeterDialogPage.setLastModifiedInput(12310020012301);
        expect(stagingMeterDialogPage.getLastModifiedInput()).toMatch('2001-12-31T02:30');
        stagingMeterDialogPage.invoiceSelectLastOption();
        stagingMeterDialogPage.save();
        expect(stagingMeterDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class StagingMeterComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-staging-meter div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class StagingMeterDialogPage {
    modalTitle = element(by.css('h4#myStagingMeterLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    meterIdInput = element(by.css('input#field_meterId'));
    logicalMeterIdInput = element(by.css('input#field_logicalMeterId'));
    meterNumberInput = element(by.css('input#field_meterNumber'));
    serviceTypeInput = element(by.css('input#field_serviceType'));
    tariffInput = element(by.css('input#field_tariff'));
    serviceAddressInput = element(by.css('input#field_serviceAddress'));
    serviceCityInput = element(by.css('input#field_serviceCity'));
    serviceStateInput = element(by.css('input#field_serviceState'));
    serviceZipInput = element(by.css('input#field_serviceZip'));
    bulbTypeInput = element(by.css('input#field_bulbType'));
    podIdInput = element(by.css('input#field_podId'));
    intervalStartInput = element(by.css('input#field_intervalStart'));
    intervalEndInput = element(by.css('input#field_intervalEnd'));
    bulbQuantityInput = element(by.css('input#field_bulbQuantity'));
    meterConstantMultiplierInput = element(by.css('input#field_meterConstantMultiplier'));
    meterConversionMultiplierInput = element(by.css('input#field_meterConversionMultiplier'));
    thirdPartyProviderInput = element(by.css('input#field_thirdPartyProvider'));
    thirdPartyAccountNumberInput = element(by.css('input#field_thirdPartyAccountNumber'));
    degreeDayStatusInput = element(by.css('input#field_degreeDayStatus'));
    opTempInput = element(by.css('input#field_opTemp'));
    timeRangeInput = element(by.css('input#field_timeRange'));
    cddInput = element(by.css('input#field_cdd'));
    hddInput = element(by.css('input#field_hdd'));
    weatherSensitivityIndexInput = element(by.css('input#field_weatherSensitivityIndex'));
    weatherNormalizedConsumptionInput = element(by.css('input#field_weatherNormalizedConsumption'));
    avgMonthlyBaseloadInput = element(by.css('input#field_avgMonthlyBaseload'));
    predictedConsumptionInput = element(by.css('input#field_predictedConsumption'));
    serviceIdentifierInput = element(by.css('input#field_serviceIdentifier'));
    createDateInput = element(by.css('input#field_createDate'));
    lastModifiedInput = element(by.css('input#field_lastModified'));
    invoiceSelect = element(by.css('select#field_invoice'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setMeterIdInput = function(meterId) {
        this.meterIdInput.sendKeys(meterId);
    };

    getMeterIdInput = function() {
        return this.meterIdInput.getAttribute('value');
    };

    setLogicalMeterIdInput = function(logicalMeterId) {
        this.logicalMeterIdInput.sendKeys(logicalMeterId);
    };

    getLogicalMeterIdInput = function() {
        return this.logicalMeterIdInput.getAttribute('value');
    };

    setMeterNumberInput = function(meterNumber) {
        this.meterNumberInput.sendKeys(meterNumber);
    };

    getMeterNumberInput = function() {
        return this.meterNumberInput.getAttribute('value');
    };

    setServiceTypeInput = function(serviceType) {
        this.serviceTypeInput.sendKeys(serviceType);
    };

    getServiceTypeInput = function() {
        return this.serviceTypeInput.getAttribute('value');
    };

    setTariffInput = function(tariff) {
        this.tariffInput.sendKeys(tariff);
    };

    getTariffInput = function() {
        return this.tariffInput.getAttribute('value');
    };

    setServiceAddressInput = function(serviceAddress) {
        this.serviceAddressInput.sendKeys(serviceAddress);
    };

    getServiceAddressInput = function() {
        return this.serviceAddressInput.getAttribute('value');
    };

    setServiceCityInput = function(serviceCity) {
        this.serviceCityInput.sendKeys(serviceCity);
    };

    getServiceCityInput = function() {
        return this.serviceCityInput.getAttribute('value');
    };

    setServiceStateInput = function(serviceState) {
        this.serviceStateInput.sendKeys(serviceState);
    };

    getServiceStateInput = function() {
        return this.serviceStateInput.getAttribute('value');
    };

    setServiceZipInput = function(serviceZip) {
        this.serviceZipInput.sendKeys(serviceZip);
    };

    getServiceZipInput = function() {
        return this.serviceZipInput.getAttribute('value');
    };

    setBulbTypeInput = function(bulbType) {
        this.bulbTypeInput.sendKeys(bulbType);
    };

    getBulbTypeInput = function() {
        return this.bulbTypeInput.getAttribute('value');
    };

    setPodIdInput = function(podId) {
        this.podIdInput.sendKeys(podId);
    };

    getPodIdInput = function() {
        return this.podIdInput.getAttribute('value');
    };

    setIntervalStartInput = function(intervalStart) {
        this.intervalStartInput.sendKeys(intervalStart);
    };

    getIntervalStartInput = function() {
        return this.intervalStartInput.getAttribute('value');
    };

    setIntervalEndInput = function(intervalEnd) {
        this.intervalEndInput.sendKeys(intervalEnd);
    };

    getIntervalEndInput = function() {
        return this.intervalEndInput.getAttribute('value');
    };

    setBulbQuantityInput = function(bulbQuantity) {
        this.bulbQuantityInput.sendKeys(bulbQuantity);
    };

    getBulbQuantityInput = function() {
        return this.bulbQuantityInput.getAttribute('value');
    };

    setMeterConstantMultiplierInput = function(meterConstantMultiplier) {
        this.meterConstantMultiplierInput.sendKeys(meterConstantMultiplier);
    };

    getMeterConstantMultiplierInput = function() {
        return this.meterConstantMultiplierInput.getAttribute('value');
    };

    setMeterConversionMultiplierInput = function(meterConversionMultiplier) {
        this.meterConversionMultiplierInput.sendKeys(meterConversionMultiplier);
    };

    getMeterConversionMultiplierInput = function() {
        return this.meterConversionMultiplierInput.getAttribute('value');
    };

    setThirdPartyProviderInput = function(thirdPartyProvider) {
        this.thirdPartyProviderInput.sendKeys(thirdPartyProvider);
    };

    getThirdPartyProviderInput = function() {
        return this.thirdPartyProviderInput.getAttribute('value');
    };

    setThirdPartyAccountNumberInput = function(thirdPartyAccountNumber) {
        this.thirdPartyAccountNumberInput.sendKeys(thirdPartyAccountNumber);
    };

    getThirdPartyAccountNumberInput = function() {
        return this.thirdPartyAccountNumberInput.getAttribute('value');
    };

    setDegreeDayStatusInput = function(degreeDayStatus) {
        this.degreeDayStatusInput.sendKeys(degreeDayStatus);
    };

    getDegreeDayStatusInput = function() {
        return this.degreeDayStatusInput.getAttribute('value');
    };

    setOpTempInput = function(opTemp) {
        this.opTempInput.sendKeys(opTemp);
    };

    getOpTempInput = function() {
        return this.opTempInput.getAttribute('value');
    };

    setTimeRangeInput = function(timeRange) {
        this.timeRangeInput.sendKeys(timeRange);
    };

    getTimeRangeInput = function() {
        return this.timeRangeInput.getAttribute('value');
    };

    setCddInput = function(cdd) {
        this.cddInput.sendKeys(cdd);
    };

    getCddInput = function() {
        return this.cddInput.getAttribute('value');
    };

    setHddInput = function(hdd) {
        this.hddInput.sendKeys(hdd);
    };

    getHddInput = function() {
        return this.hddInput.getAttribute('value');
    };

    setWeatherSensitivityIndexInput = function(weatherSensitivityIndex) {
        this.weatherSensitivityIndexInput.sendKeys(weatherSensitivityIndex);
    };

    getWeatherSensitivityIndexInput = function() {
        return this.weatherSensitivityIndexInput.getAttribute('value');
    };

    setWeatherNormalizedConsumptionInput = function(weatherNormalizedConsumption) {
        this.weatherNormalizedConsumptionInput.sendKeys(weatherNormalizedConsumption);
    };

    getWeatherNormalizedConsumptionInput = function() {
        return this.weatherNormalizedConsumptionInput.getAttribute('value');
    };

    setAvgMonthlyBaseloadInput = function(avgMonthlyBaseload) {
        this.avgMonthlyBaseloadInput.sendKeys(avgMonthlyBaseload);
    };

    getAvgMonthlyBaseloadInput = function() {
        return this.avgMonthlyBaseloadInput.getAttribute('value');
    };

    setPredictedConsumptionInput = function(predictedConsumption) {
        this.predictedConsumptionInput.sendKeys(predictedConsumption);
    };

    getPredictedConsumptionInput = function() {
        return this.predictedConsumptionInput.getAttribute('value');
    };

    setServiceIdentifierInput = function(serviceIdentifier) {
        this.serviceIdentifierInput.sendKeys(serviceIdentifier);
    };

    getServiceIdentifierInput = function() {
        return this.serviceIdentifierInput.getAttribute('value');
    };

    setCreateDateInput = function(createDate) {
        this.createDateInput.sendKeys(createDate);
    };

    getCreateDateInput = function() {
        return this.createDateInput.getAttribute('value');
    };

    setLastModifiedInput = function(lastModified) {
        this.lastModifiedInput.sendKeys(lastModified);
    };

    getLastModifiedInput = function() {
        return this.lastModifiedInput.getAttribute('value');
    };

    invoiceSelectLastOption = function() {
        this.invoiceSelect
            .all(by.tagName('option'))
            .last()
            .click();
    };

    invoiceSelectOption = function(option) {
        this.invoiceSelect.sendKeys(option);
    };

    getInvoiceSelect = function() {
        return this.invoiceSelect;
    };

    getInvoiceSelectedOption = function() {
        return this.invoiceSelect.element(by.css('option:checked')).getText();
    };

    save() {
        this.saveButton.click();
    }

    close() {
        this.closeButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}
