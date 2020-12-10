import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('UtilityChargeConfiguration e2e test', () => {
    let navBarPage: NavBarPage;
    let utilityChargeConfigurationDialogPage: UtilityChargeConfigurationDialogPage;
    let utilityChargeConfigurationComponentsPage: UtilityChargeConfigurationComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load UtilityChargeConfigurations', () => {
        navBarPage.goToEntity('utility-charge-configuration');
        utilityChargeConfigurationComponentsPage = new UtilityChargeConfigurationComponentsPage();
        expect(utilityChargeConfigurationComponentsPage.getTitle()).toMatch(/billingWebApp.utilityChargeConfiguration.home.title/);
    });

    it('should load create UtilityChargeConfiguration dialog', () => {
        utilityChargeConfigurationComponentsPage.clickOnCreateButton();
        utilityChargeConfigurationDialogPage = new UtilityChargeConfigurationDialogPage();
        expect(utilityChargeConfigurationDialogPage.getModalTitle()).toMatch(
            /billingWebApp.utilityChargeConfiguration.home.createOrEditLabel/
        );
        utilityChargeConfigurationDialogPage.close();
    });

    it('should create and save UtilityChargeConfigurations', () => {
        utilityChargeConfigurationComponentsPage.clickOnCreateButton();
        utilityChargeConfigurationDialogPage.setServiceTypeInput('serviceType');
        expect(utilityChargeConfigurationDialogPage.getServiceTypeInput()).toMatch('serviceType');
        utilityChargeConfigurationDialogPage.setChargeIdInput('chargeId');
        expect(utilityChargeConfigurationDialogPage.getChargeIdInput()).toMatch('chargeId');
        utilityChargeConfigurationDialogPage.setChargeActualNameInput('chargeActualName');
        expect(utilityChargeConfigurationDialogPage.getChargeActualNameInput()).toMatch('chargeActualName');
        utilityChargeConfigurationDialogPage.setUtilityProviderInput('utilityProvider');
        expect(utilityChargeConfigurationDialogPage.getUtilityProviderInput()).toMatch('utilityProvider');
        utilityChargeConfigurationDialogPage.chargeCategorySelectLastOption();
        utilityChargeConfigurationDialogPage.save();
        expect(utilityChargeConfigurationDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class UtilityChargeConfigurationComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-utility-charge-configuration div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class UtilityChargeConfigurationDialogPage {
    modalTitle = element(by.css('h4#myUtilityChargeConfigurationLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    serviceTypeInput = element(by.css('input#field_serviceType'));
    chargeIdInput = element(by.css('input#field_chargeId'));
    chargeActualNameInput = element(by.css('input#field_chargeActualName'));
    utilityProviderInput = element(by.css('input#field_utilityProvider'));
    chargeCategorySelect = element(by.css('select#field_chargeCategory'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setServiceTypeInput = function(serviceType) {
        this.serviceTypeInput.sendKeys(serviceType);
    };

    getServiceTypeInput = function() {
        return this.serviceTypeInput.getAttribute('value');
    };

    setChargeIdInput = function(chargeId) {
        this.chargeIdInput.sendKeys(chargeId);
    };

    getChargeIdInput = function() {
        return this.chargeIdInput.getAttribute('value');
    };

    setChargeActualNameInput = function(chargeActualName) {
        this.chargeActualNameInput.sendKeys(chargeActualName);
    };

    getChargeActualNameInput = function() {
        return this.chargeActualNameInput.getAttribute('value');
    };

    setUtilityProviderInput = function(utilityProvider) {
        this.utilityProviderInput.sendKeys(utilityProvider);
    };

    getUtilityProviderInput = function() {
        return this.utilityProviderInput.getAttribute('value');
    };

    setChargeCategorySelect = function(chargeCategory) {
        this.chargeCategorySelect.sendKeys(chargeCategory);
    };

    getChargeCategorySelect = function() {
        return this.chargeCategorySelect.element(by.css('option:checked')).getText();
    };

    chargeCategorySelectLastOption = function() {
        this.chargeCategorySelect
            .all(by.tagName('option'))
            .last()
            .click();
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
