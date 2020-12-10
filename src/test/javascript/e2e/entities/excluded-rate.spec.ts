import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('ExcludedRate e2e test', () => {
    let navBarPage: NavBarPage;
    let excludedRateDialogPage: ExcludedRateDialogPage;
    let excludedRateComponentsPage: ExcludedRateComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load ExcludedRates', () => {
        navBarPage.goToEntity('excluded-rate');
        excludedRateComponentsPage = new ExcludedRateComponentsPage();
        expect(excludedRateComponentsPage.getTitle()).toMatch(/billingWebApp.excludedRate.home.title/);
    });

    it('should load create ExcludedRate dialog', () => {
        excludedRateComponentsPage.clickOnCreateButton();
        excludedRateDialogPage = new ExcludedRateDialogPage();
        expect(excludedRateDialogPage.getModalTitle()).toMatch(/billingWebApp.excludedRate.home.createOrEditLabel/);
        excludedRateDialogPage.close();
    });

    it('should create and save ExcludedRates', () => {
        excludedRateComponentsPage.clickOnCreateButton();
        excludedRateDialogPage.setChargeIdInput('chargeId');
        expect(excludedRateDialogPage.getChargeIdInput()).toMatch('chargeId');
        excludedRateDialogPage.setChargeActualDescriptionNameInput('chargeActualDescriptionName');
        expect(excludedRateDialogPage.getChargeActualDescriptionNameInput()).toMatch('chargeActualDescriptionName');
        excludedRateDialogPage.setCustomerTypeInput('customerType');
        expect(excludedRateDialogPage.getCustomerTypeInput()).toMatch('customerType');
        excludedRateDialogPage.setUtilityProviderInput('utilityProvider');
        expect(excludedRateDialogPage.getUtilityProviderInput()).toMatch('utilityProvider');
        excludedRateDialogPage.setSiteIdInput('siteId');
        expect(excludedRateDialogPage.getSiteIdInput()).toMatch('siteId');
        excludedRateDialogPage
            .getActiveInput()
            .isSelected()
            .then(selected => {
                if (selected) {
                    excludedRateDialogPage.getActiveInput().click();
                    expect(excludedRateDialogPage.getActiveInput().isSelected()).toBeFalsy();
                } else {
                    excludedRateDialogPage.getActiveInput().click();
                    expect(excludedRateDialogPage.getActiveInput().isSelected()).toBeTruthy();
                }
            });
        excludedRateDialogPage.save();
        expect(excludedRateDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class ExcludedRateComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-excluded-rate div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class ExcludedRateDialogPage {
    modalTitle = element(by.css('h4#myExcludedRateLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    chargeIdInput = element(by.css('input#field_chargeId'));
    chargeActualDescriptionNameInput = element(by.css('input#field_chargeActualDescriptionName'));
    customerTypeInput = element(by.css('input#field_customerType'));
    utilityProviderInput = element(by.css('input#field_utilityProvider'));
    siteIdInput = element(by.css('input#field_siteId'));
    activeInput = element(by.css('input#field_active'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setChargeIdInput = function(chargeId) {
        this.chargeIdInput.sendKeys(chargeId);
    };

    getChargeIdInput = function() {
        return this.chargeIdInput.getAttribute('value');
    };

    setChargeActualDescriptionNameInput = function(chargeActualDescriptionName) {
        this.chargeActualDescriptionNameInput.sendKeys(chargeActualDescriptionName);
    };

    getChargeActualDescriptionNameInput = function() {
        return this.chargeActualDescriptionNameInput.getAttribute('value');
    };

    setCustomerTypeInput = function(customerType) {
        this.customerTypeInput.sendKeys(customerType);
    };

    getCustomerTypeInput = function() {
        return this.customerTypeInput.getAttribute('value');
    };

    setUtilityProviderInput = function(utilityProvider) {
        this.utilityProviderInput.sendKeys(utilityProvider);
    };

    getUtilityProviderInput = function() {
        return this.utilityProviderInput.getAttribute('value');
    };

    setSiteIdInput = function(siteId) {
        this.siteIdInput.sendKeys(siteId);
    };

    getSiteIdInput = function() {
        return this.siteIdInput.getAttribute('value');
    };

    getActiveInput = function() {
        return this.activeInput;
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
