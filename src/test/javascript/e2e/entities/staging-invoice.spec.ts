import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('StagingInvoice e2e test', () => {
    let navBarPage: NavBarPage;
    let stagingInvoiceDialogPage: StagingInvoiceDialogPage;
    let stagingInvoiceComponentsPage: StagingInvoiceComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load StagingInvoices', () => {
        navBarPage.goToEntity('staging-invoice');
        stagingInvoiceComponentsPage = new StagingInvoiceComponentsPage();
        expect(stagingInvoiceComponentsPage.getTitle()).toMatch(/billingWebApp.stagingInvoice.home.title/);
    });

    it('should load create StagingInvoice dialog', () => {
        stagingInvoiceComponentsPage.clickOnCreateButton();
        stagingInvoiceDialogPage = new StagingInvoiceDialogPage();
        expect(stagingInvoiceDialogPage.getModalTitle()).toMatch(/billingWebApp.stagingInvoice.home.createOrEditLabel/);
        stagingInvoiceDialogPage.close();
    });

    it('should create and save StagingInvoices', () => {
        stagingInvoiceComponentsPage.clickOnCreateButton();
        stagingInvoiceDialogPage.setElectricSupplierInput('electricSupplier');
        expect(stagingInvoiceDialogPage.getElectricSupplierInput()).toMatch('electricSupplier');
        stagingInvoiceDialogPage.setIntervalStartInput('2000-12-31');
        expect(stagingInvoiceDialogPage.getIntervalStartInput()).toMatch('2000-12-31');
        stagingInvoiceDialogPage.setIntervalEndInput('2000-12-31');
        expect(stagingInvoiceDialogPage.getIntervalEndInput()).toMatch('2000-12-31');
        stagingInvoiceDialogPage.setBillingDaysInput('5');
        expect(stagingInvoiceDialogPage.getBillingDaysInput()).toMatch('5');
        stagingInvoiceDialogPage.setStatementDateInput(12310020012301);
        expect(stagingInvoiceDialogPage.getStatementDateInput()).toMatch('2001-12-31T02:30');
        stagingInvoiceDialogPage.setDueByDateInput(12310020012301);
        expect(stagingInvoiceDialogPage.getDueByDateInput()).toMatch('2001-12-31T02:30');
        stagingInvoiceDialogPage.setInvoiceNumberInput('invoiceNumber');
        expect(stagingInvoiceDialogPage.getInvoiceNumberInput()).toMatch('invoiceNumber');
        stagingInvoiceDialogPage.setStatementCreateDateInput(12310020012301);
        expect(stagingInvoiceDialogPage.getStatementCreateDateInput()).toMatch('2001-12-31T02:30');
        stagingInvoiceDialogPage.setStatementTypeInput('statementType');
        expect(stagingInvoiceDialogPage.getStatementTypeInput()).toMatch('statementType');
        stagingInvoiceDialogPage.setNewChargesInput('5');
        expect(stagingInvoiceDialogPage.getNewChargesInput()).toMatch('5');
        stagingInvoiceDialogPage.setTotalBillAmountInput('5');
        expect(stagingInvoiceDialogPage.getTotalBillAmountInput()).toMatch('5');
        stagingInvoiceDialogPage.setAmountDueInput('5');
        expect(stagingInvoiceDialogPage.getAmountDueInput()).toMatch('5');
        stagingInvoiceDialogPage.setOutstandingBalanceInput('5');
        expect(stagingInvoiceDialogPage.getOutstandingBalanceInput()).toMatch('5');
        stagingInvoiceDialogPage.setPreviousBalanceInput('5');
        expect(stagingInvoiceDialogPage.getPreviousBalanceInput()).toMatch('5');
        stagingInvoiceDialogPage.setPeakKWHInput('5');
        expect(stagingInvoiceDialogPage.getPeakKWHInput()).toMatch('5');
        stagingInvoiceDialogPage.setMidPeakKWHInput('5');
        expect(stagingInvoiceDialogPage.getMidPeakKWHInput()).toMatch('5');
        stagingInvoiceDialogPage.setOffPeakKWHInput('5');
        expect(stagingInvoiceDialogPage.getOffPeakKWHInput()).toMatch('5');
        stagingInvoiceDialogPage.setTotalKWHInput('5');
        expect(stagingInvoiceDialogPage.getTotalKWHInput()).toMatch('5');
        stagingInvoiceDialogPage.setPeakKWInput('5');
        expect(stagingInvoiceDialogPage.getPeakKWInput()).toMatch('5');
        stagingInvoiceDialogPage.setMidPeakKWInput('5');
        expect(stagingInvoiceDialogPage.getMidPeakKWInput()).toMatch('5');
        stagingInvoiceDialogPage.setOffPeakKWInput('5');
        expect(stagingInvoiceDialogPage.getOffPeakKWInput()).toMatch('5');
        stagingInvoiceDialogPage.setMaxKWInput('5');
        expect(stagingInvoiceDialogPage.getMaxKWInput()).toMatch('5');
        stagingInvoiceDialogPage.setSiteAccountIdInput('5');
        expect(stagingInvoiceDialogPage.getSiteAccountIdInput()).toMatch('5');
        stagingInvoiceDialogPage.setProviderIdInput('providerId');
        expect(stagingInvoiceDialogPage.getProviderIdInput()).toMatch('providerId');
        stagingInvoiceDialogPage.setProviderStatementIdInput('providerStatementId');
        expect(stagingInvoiceDialogPage.getProviderStatementIdInput()).toMatch('providerStatementId');
        stagingInvoiceDialogPage.setProviderNameInput('providerName');
        expect(stagingInvoiceDialogPage.getProviderNameInput()).toMatch('providerName');
        stagingInvoiceDialogPage.setJobHistoryIdInput('5');
        expect(stagingInvoiceDialogPage.getJobHistoryIdInput()).toMatch('5');
        stagingInvoiceDialogPage.setTotalUnitInput('totalUnit');
        expect(stagingInvoiceDialogPage.getTotalUnitInput()).toMatch('totalUnit');
        stagingInvoiceDialogPage.setTotalVolumeInput('5');
        expect(stagingInvoiceDialogPage.getTotalVolumeInput()).toMatch('5');
        stagingInvoiceDialogPage.setBillingAccountInput('billingAccount');
        expect(stagingInvoiceDialogPage.getBillingAccountInput()).toMatch('billingAccount');
        stagingInvoiceDialogPage.setBillingAddressInput('billingAddress');
        expect(stagingInvoiceDialogPage.getBillingAddressInput()).toMatch('billingAddress');
        stagingInvoiceDialogPage.setBillingContactInput('billingContact');
        expect(stagingInvoiceDialogPage.getBillingContactInput()).toMatch('billingContact');
        stagingInvoiceDialogPage.setUpdatedDateInput(12310020012301);
        expect(stagingInvoiceDialogPage.getUpdatedDateInput()).toMatch('2001-12-31T02:30');
        stagingInvoiceDialogPage.setAuthorizationUidInput('authorizationUid');
        expect(stagingInvoiceDialogPage.getAuthorizationUidInput()).toMatch('authorizationUid');
        stagingInvoiceDialogPage.setSourceLinkInput('sourceLink');
        expect(stagingInvoiceDialogPage.getSourceLinkInput()).toMatch('sourceLink');
        stagingInvoiceDialogPage.setCreatedDateInput(12310020012301);
        expect(stagingInvoiceDialogPage.getCreatedDateInput()).toMatch('2001-12-31T02:30');
        stagingInvoiceDialogPage.setLastModifiedInput(12310020012301);
        expect(stagingInvoiceDialogPage.getLastModifiedInput()).toMatch('2001-12-31T02:30');
        stagingInvoiceDialogPage
            .getImportedInput()
            .isSelected()
            .then(selected => {
                if (selected) {
                    stagingInvoiceDialogPage.getImportedInput().click();
                    expect(stagingInvoiceDialogPage.getImportedInput().isSelected()).toBeFalsy();
                } else {
                    stagingInvoiceDialogPage.getImportedInput().click();
                    expect(stagingInvoiceDialogPage.getImportedInput().isSelected()).toBeTruthy();
                }
            });
        stagingInvoiceDialogPage.save();
        expect(stagingInvoiceDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class StagingInvoiceComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-staging-invoice div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class StagingInvoiceDialogPage {
    modalTitle = element(by.css('h4#myStagingInvoiceLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    electricSupplierInput = element(by.css('input#field_electricSupplier'));
    intervalStartInput = element(by.css('input#field_intervalStart'));
    intervalEndInput = element(by.css('input#field_intervalEnd'));
    billingDaysInput = element(by.css('input#field_billingDays'));
    statementDateInput = element(by.css('input#field_statementDate'));
    dueByDateInput = element(by.css('input#field_dueByDate'));
    invoiceNumberInput = element(by.css('input#field_invoiceNumber'));
    statementCreateDateInput = element(by.css('input#field_statementCreateDate'));
    statementTypeInput = element(by.css('input#field_statementType'));
    newChargesInput = element(by.css('input#field_newCharges'));
    totalBillAmountInput = element(by.css('input#field_totalBillAmount'));
    amountDueInput = element(by.css('input#field_amountDue'));
    outstandingBalanceInput = element(by.css('input#field_outstandingBalance'));
    previousBalanceInput = element(by.css('input#field_previousBalance'));
    peakKWHInput = element(by.css('input#field_peakKWH'));
    midPeakKWHInput = element(by.css('input#field_midPeakKWH'));
    offPeakKWHInput = element(by.css('input#field_offPeakKWH'));
    totalKWHInput = element(by.css('input#field_totalKWH'));
    peakKWInput = element(by.css('input#field_peakKW'));
    midPeakKWInput = element(by.css('input#field_midPeakKW'));
    offPeakKWInput = element(by.css('input#field_offPeakKW'));
    maxKWInput = element(by.css('input#field_maxKW'));
    siteAccountIdInput = element(by.css('input#field_siteAccountId'));
    providerIdInput = element(by.css('input#field_providerId'));
    providerStatementIdInput = element(by.css('input#field_providerStatementId'));
    providerNameInput = element(by.css('input#field_providerName'));
    jobHistoryIdInput = element(by.css('input#field_jobHistoryId'));
    totalUnitInput = element(by.css('input#field_totalUnit'));
    totalVolumeInput = element(by.css('input#field_totalVolume'));
    billingAccountInput = element(by.css('input#field_billingAccount'));
    billingAddressInput = element(by.css('input#field_billingAddress'));
    billingContactInput = element(by.css('input#field_billingContact'));
    updatedDateInput = element(by.css('input#field_updatedDate'));
    authorizationUidInput = element(by.css('input#field_authorizationUid'));
    sourceLinkInput = element(by.css('input#field_sourceLink'));
    createdDateInput = element(by.css('input#field_createdDate'));
    lastModifiedInput = element(by.css('input#field_lastModified'));
    importedInput = element(by.css('input#field_imported'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setElectricSupplierInput = function(electricSupplier) {
        this.electricSupplierInput.sendKeys(electricSupplier);
    };

    getElectricSupplierInput = function() {
        return this.electricSupplierInput.getAttribute('value');
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

    setBillingDaysInput = function(billingDays) {
        this.billingDaysInput.sendKeys(billingDays);
    };

    getBillingDaysInput = function() {
        return this.billingDaysInput.getAttribute('value');
    };

    setStatementDateInput = function(statementDate) {
        this.statementDateInput.sendKeys(statementDate);
    };

    getStatementDateInput = function() {
        return this.statementDateInput.getAttribute('value');
    };

    setDueByDateInput = function(dueByDate) {
        this.dueByDateInput.sendKeys(dueByDate);
    };

    getDueByDateInput = function() {
        return this.dueByDateInput.getAttribute('value');
    };

    setInvoiceNumberInput = function(invoiceNumber) {
        this.invoiceNumberInput.sendKeys(invoiceNumber);
    };

    getInvoiceNumberInput = function() {
        return this.invoiceNumberInput.getAttribute('value');
    };

    setStatementCreateDateInput = function(statementCreateDate) {
        this.statementCreateDateInput.sendKeys(statementCreateDate);
    };

    getStatementCreateDateInput = function() {
        return this.statementCreateDateInput.getAttribute('value');
    };

    setStatementTypeInput = function(statementType) {
        this.statementTypeInput.sendKeys(statementType);
    };

    getStatementTypeInput = function() {
        return this.statementTypeInput.getAttribute('value');
    };

    setNewChargesInput = function(newCharges) {
        this.newChargesInput.sendKeys(newCharges);
    };

    getNewChargesInput = function() {
        return this.newChargesInput.getAttribute('value');
    };

    setTotalBillAmountInput = function(totalBillAmount) {
        this.totalBillAmountInput.sendKeys(totalBillAmount);
    };

    getTotalBillAmountInput = function() {
        return this.totalBillAmountInput.getAttribute('value');
    };

    setAmountDueInput = function(amountDue) {
        this.amountDueInput.sendKeys(amountDue);
    };

    getAmountDueInput = function() {
        return this.amountDueInput.getAttribute('value');
    };

    setOutstandingBalanceInput = function(outstandingBalance) {
        this.outstandingBalanceInput.sendKeys(outstandingBalance);
    };

    getOutstandingBalanceInput = function() {
        return this.outstandingBalanceInput.getAttribute('value');
    };

    setPreviousBalanceInput = function(previousBalance) {
        this.previousBalanceInput.sendKeys(previousBalance);
    };

    getPreviousBalanceInput = function() {
        return this.previousBalanceInput.getAttribute('value');
    };

    setPeakKWHInput = function(peakKWH) {
        this.peakKWHInput.sendKeys(peakKWH);
    };

    getPeakKWHInput = function() {
        return this.peakKWHInput.getAttribute('value');
    };

    setMidPeakKWHInput = function(midPeakKWH) {
        this.midPeakKWHInput.sendKeys(midPeakKWH);
    };

    getMidPeakKWHInput = function() {
        return this.midPeakKWHInput.getAttribute('value');
    };

    setOffPeakKWHInput = function(offPeakKWH) {
        this.offPeakKWHInput.sendKeys(offPeakKWH);
    };

    getOffPeakKWHInput = function() {
        return this.offPeakKWHInput.getAttribute('value');
    };

    setTotalKWHInput = function(totalKWH) {
        this.totalKWHInput.sendKeys(totalKWH);
    };

    getTotalKWHInput = function() {
        return this.totalKWHInput.getAttribute('value');
    };

    setPeakKWInput = function(peakKW) {
        this.peakKWInput.sendKeys(peakKW);
    };

    getPeakKWInput = function() {
        return this.peakKWInput.getAttribute('value');
    };

    setMidPeakKWInput = function(midPeakKW) {
        this.midPeakKWInput.sendKeys(midPeakKW);
    };

    getMidPeakKWInput = function() {
        return this.midPeakKWInput.getAttribute('value');
    };

    setOffPeakKWInput = function(offPeakKW) {
        this.offPeakKWInput.sendKeys(offPeakKW);
    };

    getOffPeakKWInput = function() {
        return this.offPeakKWInput.getAttribute('value');
    };

    setMaxKWInput = function(maxKW) {
        this.maxKWInput.sendKeys(maxKW);
    };

    getMaxKWInput = function() {
        return this.maxKWInput.getAttribute('value');
    };

    setSiteAccountIdInput = function(siteAccountId) {
        this.siteAccountIdInput.sendKeys(siteAccountId);
    };

    getSiteAccountIdInput = function() {
        return this.siteAccountIdInput.getAttribute('value');
    };

    setProviderIdInput = function(providerId) {
        this.providerIdInput.sendKeys(providerId);
    };

    getProviderIdInput = function() {
        return this.providerIdInput.getAttribute('value');
    };

    setProviderStatementIdInput = function(providerStatementId) {
        this.providerStatementIdInput.sendKeys(providerStatementId);
    };

    getProviderStatementIdInput = function() {
        return this.providerStatementIdInput.getAttribute('value');
    };

    setProviderNameInput = function(providerName) {
        this.providerNameInput.sendKeys(providerName);
    };

    getProviderNameInput = function() {
        return this.providerNameInput.getAttribute('value');
    };

    setJobHistoryIdInput = function(jobHistoryId) {
        this.jobHistoryIdInput.sendKeys(jobHistoryId);
    };

    getJobHistoryIdInput = function() {
        return this.jobHistoryIdInput.getAttribute('value');
    };

    setTotalUnitInput = function(totalUnit) {
        this.totalUnitInput.sendKeys(totalUnit);
    };

    getTotalUnitInput = function() {
        return this.totalUnitInput.getAttribute('value');
    };

    setTotalVolumeInput = function(totalVolume) {
        this.totalVolumeInput.sendKeys(totalVolume);
    };

    getTotalVolumeInput = function() {
        return this.totalVolumeInput.getAttribute('value');
    };

    setBillingAccountInput = function(billingAccount) {
        this.billingAccountInput.sendKeys(billingAccount);
    };

    getBillingAccountInput = function() {
        return this.billingAccountInput.getAttribute('value');
    };

    setBillingAddressInput = function(billingAddress) {
        this.billingAddressInput.sendKeys(billingAddress);
    };

    getBillingAddressInput = function() {
        return this.billingAddressInput.getAttribute('value');
    };

    setBillingContactInput = function(billingContact) {
        this.billingContactInput.sendKeys(billingContact);
    };

    getBillingContactInput = function() {
        return this.billingContactInput.getAttribute('value');
    };

    setUpdatedDateInput = function(updatedDate) {
        this.updatedDateInput.sendKeys(updatedDate);
    };

    getUpdatedDateInput = function() {
        return this.updatedDateInput.getAttribute('value');
    };

    setAuthorizationUidInput = function(authorizationUid) {
        this.authorizationUidInput.sendKeys(authorizationUid);
    };

    getAuthorizationUidInput = function() {
        return this.authorizationUidInput.getAttribute('value');
    };

    setSourceLinkInput = function(sourceLink) {
        this.sourceLinkInput.sendKeys(sourceLink);
    };

    getSourceLinkInput = function() {
        return this.sourceLinkInput.getAttribute('value');
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

    getImportedInput = function() {
        return this.importedInput;
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
