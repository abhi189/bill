import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('StagingConsumption e2e test', () => {
    let navBarPage: NavBarPage;
    let stagingConsumptionDialogPage: StagingConsumptionDialogPage;
    let stagingConsumptionComponentsPage: StagingConsumptionComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load StagingConsumptions', () => {
        navBarPage.goToEntity('staging-consumption');
        stagingConsumptionComponentsPage = new StagingConsumptionComponentsPage();
        expect(stagingConsumptionComponentsPage.getTitle()).toMatch(/billingWebApp.stagingConsumption.home.title/);
    });

    it('should load create StagingConsumption dialog', () => {
        stagingConsumptionComponentsPage.clickOnCreateButton();
        stagingConsumptionDialogPage = new StagingConsumptionDialogPage();
        expect(stagingConsumptionDialogPage.getModalTitle()).toMatch(/billingWebApp.stagingConsumption.home.createOrEditLabel/);
        stagingConsumptionDialogPage.close();
    });

    it('should create and save StagingConsumptions', () => {
        stagingConsumptionComponentsPage.clickOnCreateButton();
        stagingConsumptionDialogPage.setMeasurementTypeInput('measurementType');
        expect(stagingConsumptionDialogPage.getMeasurementTypeInput()).toMatch('measurementType');
        stagingConsumptionDialogPage.setRateComponentInput('rateComponent');
        expect(stagingConsumptionDialogPage.getRateComponentInput()).toMatch('rateComponent');
        stagingConsumptionDialogPage.setIntervalStartInput('2000-12-31');
        expect(stagingConsumptionDialogPage.getIntervalStartInput()).toMatch('2000-12-31');
        stagingConsumptionDialogPage.setIntervalEndInput('2000-12-31');
        expect(stagingConsumptionDialogPage.getIntervalEndInput()).toMatch('2000-12-31');
        stagingConsumptionDialogPage.setUsageAmountInput('5');
        expect(stagingConsumptionDialogPage.getUsageAmountInput()).toMatch('5');
        stagingConsumptionDialogPage.setLoadFactorInput('5');
        expect(stagingConsumptionDialogPage.getLoadFactorInput()).toMatch('5');
        stagingConsumptionDialogPage.setMeterReadCurrentInput('5');
        expect(stagingConsumptionDialogPage.getMeterReadCurrentInput()).toMatch('5');
        stagingConsumptionDialogPage.setMeterReadPreviousInput('5');
        expect(stagingConsumptionDialogPage.getMeterReadPreviousInput()).toMatch('5');
        stagingConsumptionDialogPage.setUsageConstantMultiplierInput('5');
        expect(stagingConsumptionDialogPage.getUsageConstantMultiplierInput()).toMatch('5');
        stagingConsumptionDialogPage.setUsageConversionMultiplierInput('5');
        expect(stagingConsumptionDialogPage.getUsageConversionMultiplierInput()).toMatch('5');
        stagingConsumptionDialogPage.setCalorificValueInput('5');
        expect(stagingConsumptionDialogPage.getCalorificValueInput()).toMatch('5');
        stagingConsumptionDialogPage.setEnergyUnitInput('energyUnit');
        expect(stagingConsumptionDialogPage.getEnergyUnitInput()).toMatch('energyUnit');
        stagingConsumptionDialogPage.setLoadTypeInput('loadType');
        expect(stagingConsumptionDialogPage.getLoadTypeInput()).toMatch('loadType');
        stagingConsumptionDialogPage.setMeterReadDateInput('2000-12-31');
        expect(stagingConsumptionDialogPage.getMeterReadDateInput()).toMatch('2000-12-31');
        stagingConsumptionDialogPage.setMeterReadDeltaInput('5');
        expect(stagingConsumptionDialogPage.getMeterReadDeltaInput()).toMatch('5');
        stagingConsumptionDialogPage.setMeterReadDeltaUsageUnitInput('meterReadDeltaUsageUnit');
        expect(stagingConsumptionDialogPage.getMeterReadDeltaUsageUnitInput()).toMatch('meterReadDeltaUsageUnit');
        stagingConsumptionDialogPage.setMeterReadTypeInput('meterReadType');
        expect(stagingConsumptionDialogPage.getMeterReadTypeInput()).toMatch('meterReadType');
        stagingConsumptionDialogPage.setMeterReadTypeAsPrintedInput('meterReadTypeAsPrinted');
        expect(stagingConsumptionDialogPage.getMeterReadTypeAsPrintedInput()).toMatch('meterReadTypeAsPrinted');
        stagingConsumptionDialogPage.setPowerFactorInput('5');
        expect(stagingConsumptionDialogPage.getPowerFactorInput()).toMatch('5');
        stagingConsumptionDialogPage.setPreviousMeterReadDateInput('2000-12-31');
        expect(stagingConsumptionDialogPage.getPreviousMeterReadDateInput()).toMatch('2000-12-31');
        stagingConsumptionDialogPage.setPreviousMeterReadTypeInput('previousMeterReadType');
        expect(stagingConsumptionDialogPage.getPreviousMeterReadTypeInput()).toMatch('previousMeterReadType');
        stagingConsumptionDialogPage.setPreviousMeterReadTypeAsPrintedInput('previousMeterReadTypeAsPrinted');
        expect(stagingConsumptionDialogPage.getPreviousMeterReadTypeAsPrintedInput()).toMatch('previousMeterReadTypeAsPrinted');
        stagingConsumptionDialogPage.setUsageActualNameInput('usageActualName');
        expect(stagingConsumptionDialogPage.getUsageActualNameInput()).toMatch('usageActualName');
        stagingConsumptionDialogPage.setCreatedDateInput(12310020012301);
        expect(stagingConsumptionDialogPage.getCreatedDateInput()).toMatch('2001-12-31T02:30');
        stagingConsumptionDialogPage.setLastModifiedInput(12310020012301);
        expect(stagingConsumptionDialogPage.getLastModifiedInput()).toMatch('2001-12-31T02:30');
        stagingConsumptionDialogPage.invoiceSelectLastOption();
        stagingConsumptionDialogPage.meterSelectLastOption();
        stagingConsumptionDialogPage.save();
        expect(stagingConsumptionDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class StagingConsumptionComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-staging-consumption div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class StagingConsumptionDialogPage {
    modalTitle = element(by.css('h4#myStagingConsumptionLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    measurementTypeInput = element(by.css('input#field_measurementType'));
    rateComponentInput = element(by.css('input#field_rateComponent'));
    intervalStartInput = element(by.css('input#field_intervalStart'));
    intervalEndInput = element(by.css('input#field_intervalEnd'));
    usageAmountInput = element(by.css('input#field_usageAmount'));
    loadFactorInput = element(by.css('input#field_loadFactor'));
    meterReadCurrentInput = element(by.css('input#field_meterReadCurrent'));
    meterReadPreviousInput = element(by.css('input#field_meterReadPrevious'));
    usageConstantMultiplierInput = element(by.css('input#field_usageConstantMultiplier'));
    usageConversionMultiplierInput = element(by.css('input#field_usageConversionMultiplier'));
    calorificValueInput = element(by.css('input#field_calorificValue'));
    energyUnitInput = element(by.css('input#field_energyUnit'));
    loadTypeInput = element(by.css('input#field_loadType'));
    meterReadDateInput = element(by.css('input#field_meterReadDate'));
    meterReadDeltaInput = element(by.css('input#field_meterReadDelta'));
    meterReadDeltaUsageUnitInput = element(by.css('input#field_meterReadDeltaUsageUnit'));
    meterReadTypeInput = element(by.css('input#field_meterReadType'));
    meterReadTypeAsPrintedInput = element(by.css('input#field_meterReadTypeAsPrinted'));
    powerFactorInput = element(by.css('input#field_powerFactor'));
    previousMeterReadDateInput = element(by.css('input#field_previousMeterReadDate'));
    previousMeterReadTypeInput = element(by.css('input#field_previousMeterReadType'));
    previousMeterReadTypeAsPrintedInput = element(by.css('input#field_previousMeterReadTypeAsPrinted'));
    usageActualNameInput = element(by.css('input#field_usageActualName'));
    createdDateInput = element(by.css('input#field_createdDate'));
    lastModifiedInput = element(by.css('input#field_lastModified'));
    invoiceSelect = element(by.css('select#field_invoice'));
    meterSelect = element(by.css('select#field_meter'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setMeasurementTypeInput = function(measurementType) {
        this.measurementTypeInput.sendKeys(measurementType);
    };

    getMeasurementTypeInput = function() {
        return this.measurementTypeInput.getAttribute('value');
    };

    setRateComponentInput = function(rateComponent) {
        this.rateComponentInput.sendKeys(rateComponent);
    };

    getRateComponentInput = function() {
        return this.rateComponentInput.getAttribute('value');
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

    setUsageAmountInput = function(usageAmount) {
        this.usageAmountInput.sendKeys(usageAmount);
    };

    getUsageAmountInput = function() {
        return this.usageAmountInput.getAttribute('value');
    };

    setLoadFactorInput = function(loadFactor) {
        this.loadFactorInput.sendKeys(loadFactor);
    };

    getLoadFactorInput = function() {
        return this.loadFactorInput.getAttribute('value');
    };

    setMeterReadCurrentInput = function(meterReadCurrent) {
        this.meterReadCurrentInput.sendKeys(meterReadCurrent);
    };

    getMeterReadCurrentInput = function() {
        return this.meterReadCurrentInput.getAttribute('value');
    };

    setMeterReadPreviousInput = function(meterReadPrevious) {
        this.meterReadPreviousInput.sendKeys(meterReadPrevious);
    };

    getMeterReadPreviousInput = function() {
        return this.meterReadPreviousInput.getAttribute('value');
    };

    setUsageConstantMultiplierInput = function(usageConstantMultiplier) {
        this.usageConstantMultiplierInput.sendKeys(usageConstantMultiplier);
    };

    getUsageConstantMultiplierInput = function() {
        return this.usageConstantMultiplierInput.getAttribute('value');
    };

    setUsageConversionMultiplierInput = function(usageConversionMultiplier) {
        this.usageConversionMultiplierInput.sendKeys(usageConversionMultiplier);
    };

    getUsageConversionMultiplierInput = function() {
        return this.usageConversionMultiplierInput.getAttribute('value');
    };

    setCalorificValueInput = function(calorificValue) {
        this.calorificValueInput.sendKeys(calorificValue);
    };

    getCalorificValueInput = function() {
        return this.calorificValueInput.getAttribute('value');
    };

    setEnergyUnitInput = function(energyUnit) {
        this.energyUnitInput.sendKeys(energyUnit);
    };

    getEnergyUnitInput = function() {
        return this.energyUnitInput.getAttribute('value');
    };

    setLoadTypeInput = function(loadType) {
        this.loadTypeInput.sendKeys(loadType);
    };

    getLoadTypeInput = function() {
        return this.loadTypeInput.getAttribute('value');
    };

    setMeterReadDateInput = function(meterReadDate) {
        this.meterReadDateInput.sendKeys(meterReadDate);
    };

    getMeterReadDateInput = function() {
        return this.meterReadDateInput.getAttribute('value');
    };

    setMeterReadDeltaInput = function(meterReadDelta) {
        this.meterReadDeltaInput.sendKeys(meterReadDelta);
    };

    getMeterReadDeltaInput = function() {
        return this.meterReadDeltaInput.getAttribute('value');
    };

    setMeterReadDeltaUsageUnitInput = function(meterReadDeltaUsageUnit) {
        this.meterReadDeltaUsageUnitInput.sendKeys(meterReadDeltaUsageUnit);
    };

    getMeterReadDeltaUsageUnitInput = function() {
        return this.meterReadDeltaUsageUnitInput.getAttribute('value');
    };

    setMeterReadTypeInput = function(meterReadType) {
        this.meterReadTypeInput.sendKeys(meterReadType);
    };

    getMeterReadTypeInput = function() {
        return this.meterReadTypeInput.getAttribute('value');
    };

    setMeterReadTypeAsPrintedInput = function(meterReadTypeAsPrinted) {
        this.meterReadTypeAsPrintedInput.sendKeys(meterReadTypeAsPrinted);
    };

    getMeterReadTypeAsPrintedInput = function() {
        return this.meterReadTypeAsPrintedInput.getAttribute('value');
    };

    setPowerFactorInput = function(powerFactor) {
        this.powerFactorInput.sendKeys(powerFactor);
    };

    getPowerFactorInput = function() {
        return this.powerFactorInput.getAttribute('value');
    };

    setPreviousMeterReadDateInput = function(previousMeterReadDate) {
        this.previousMeterReadDateInput.sendKeys(previousMeterReadDate);
    };

    getPreviousMeterReadDateInput = function() {
        return this.previousMeterReadDateInput.getAttribute('value');
    };

    setPreviousMeterReadTypeInput = function(previousMeterReadType) {
        this.previousMeterReadTypeInput.sendKeys(previousMeterReadType);
    };

    getPreviousMeterReadTypeInput = function() {
        return this.previousMeterReadTypeInput.getAttribute('value');
    };

    setPreviousMeterReadTypeAsPrintedInput = function(previousMeterReadTypeAsPrinted) {
        this.previousMeterReadTypeAsPrintedInput.sendKeys(previousMeterReadTypeAsPrinted);
    };

    getPreviousMeterReadTypeAsPrintedInput = function() {
        return this.previousMeterReadTypeAsPrintedInput.getAttribute('value');
    };

    setUsageActualNameInput = function(usageActualName) {
        this.usageActualNameInput.sendKeys(usageActualName);
    };

    getUsageActualNameInput = function() {
        return this.usageActualNameInput.getAttribute('value');
    };

    setCreatedDateInput = function(createdDate) {
        this.createdDateInput.sendKeys(createdDate);
    };

    getCreatedDateInput = function() {
        return this.createdDateInput.getAttribute('value');
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

    meterSelectLastOption = function() {
        this.meterSelect
            .all(by.tagName('option'))
            .last()
            .click();
    };

    meterSelectOption = function(option) {
        this.meterSelect.sendKeys(option);
    };

    getMeterSelect = function() {
        return this.meterSelect;
    };

    getMeterSelectedOption = function() {
        return this.meterSelect.element(by.css('option:checked')).getText();
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
