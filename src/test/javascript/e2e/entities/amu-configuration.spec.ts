import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('AmuConfiguration e2e test', () => {
    let navBarPage: NavBarPage;
    let amuConfigurationDialogPage: AmuConfigurationDialogPage;
    let amuConfigurationComponentsPage: AmuConfigurationComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load AmuConfigurations', () => {
        navBarPage.goToEntity('amu-configuration');
        amuConfigurationComponentsPage = new AmuConfigurationComponentsPage();
        expect(amuConfigurationComponentsPage.getTitle()).toMatch(/billingWebApp.amuConfiguration.home.title/);
    });

    it('should load create AmuConfiguration dialog', () => {
        amuConfigurationComponentsPage.clickOnCreateButton();
        amuConfigurationDialogPage = new AmuConfigurationDialogPage();
        expect(amuConfigurationDialogPage.getModalTitle()).toMatch(/billingWebApp.amuConfiguration.home.createOrEditLabel/);
        amuConfigurationDialogPage.close();
    });

    it('should create and save AmuConfigurations', () => {
        amuConfigurationComponentsPage.clickOnCreateButton();
        amuConfigurationDialogPage.setCustomerTypeInput('customerType');
        expect(amuConfigurationDialogPage.getCustomerTypeInput()).toMatch('customerType');
        amuConfigurationDialogPage.setUtilityProviderInput('utilityProvider');
        expect(amuConfigurationDialogPage.getUtilityProviderInput()).toMatch('utilityProvider');
        amuConfigurationDialogPage.setMessageInput('message');
        expect(amuConfigurationDialogPage.getMessageInput()).toMatch('message');
        amuConfigurationDialogPage.algorithmSelectLastOption();
        amuConfigurationDialogPage.save();
        expect(amuConfigurationDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class AmuConfigurationComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-amu-configuration div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class AmuConfigurationDialogPage {
    modalTitle = element(by.css('h4#myAmuConfigurationLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    customerTypeInput = element(by.css('input#field_customerType'));
    utilityProviderInput = element(by.css('input#field_utilityProvider'));
    messageInput = element(by.css('input#field_message'));
    algorithmSelect = element(by.css('select#field_algorithm'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

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

    setMessageInput = function(message) {
        this.messageInput.sendKeys(message);
    };

    getMessageInput = function() {
        return this.messageInput.getAttribute('value');
    };

    setAlgorithmSelect = function(algorithm) {
        this.algorithmSelect.sendKeys(algorithm);
    };

    getAlgorithmSelect = function() {
        return this.algorithmSelect.element(by.css('option:checked')).getText();
    };

    algorithmSelectLastOption = function() {
        this.algorithmSelect
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
