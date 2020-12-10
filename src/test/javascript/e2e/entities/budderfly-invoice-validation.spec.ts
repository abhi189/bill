import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('BudderflyInvoiceValidation e2e test', () => {
    let navBarPage: NavBarPage;
    let budderflyInvoiceValidationDialogPage: BudderflyInvoiceValidationDialogPage;
    let budderflyInvoiceValidationComponentsPage: BudderflyInvoiceValidationComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load BudderflyInvoiceValidations', () => {
        navBarPage.goToEntity('budderfly-invoice-validation');
        budderflyInvoiceValidationComponentsPage = new BudderflyInvoiceValidationComponentsPage();
        expect(budderflyInvoiceValidationComponentsPage.getTitle()).toMatch(/billingWebApp.budderflyInvoiceValidation.home.title/);
    });

    it('should load create BudderflyInvoiceValidation dialog', () => {
        budderflyInvoiceValidationComponentsPage.clickOnCreateButton();
        budderflyInvoiceValidationDialogPage = new BudderflyInvoiceValidationDialogPage();
        expect(budderflyInvoiceValidationDialogPage.getModalTitle()).toMatch(
            /billingWebApp.budderflyInvoiceValidation.home.createOrEditLabel/
        );
        budderflyInvoiceValidationDialogPage.close();
    });

    it('should create and save BudderflyInvoiceValidations', () => {
        budderflyInvoiceValidationComponentsPage.clickOnCreateButton();
        budderflyInvoiceValidationDialogPage.setTestNameInput('testName');
        expect(budderflyInvoiceValidationDialogPage.getTestNameInput()).toMatch('testName');
        budderflyInvoiceValidationDialogPage.setDescriptionInput('description');
        expect(budderflyInvoiceValidationDialogPage.getDescriptionInput()).toMatch('description');
        budderflyInvoiceValidationDialogPage.setConfigInput('config');
        expect(budderflyInvoiceValidationDialogPage.getConfigInput()).toMatch('config');
        budderflyInvoiceValidationDialogPage
            .getEnabledInput()
            .isSelected()
            .then(selected => {
                if (selected) {
                    budderflyInvoiceValidationDialogPage.getEnabledInput().click();
                    expect(budderflyInvoiceValidationDialogPage.getEnabledInput().isSelected()).toBeFalsy();
                } else {
                    budderflyInvoiceValidationDialogPage.getEnabledInput().click();
                    expect(budderflyInvoiceValidationDialogPage.getEnabledInput().isSelected()).toBeTruthy();
                }
            });
        budderflyInvoiceValidationDialogPage.setOrderInput('5');
        expect(budderflyInvoiceValidationDialogPage.getOrderInput()).toMatch('5');
        budderflyInvoiceValidationDialogPage.setEndpointInput('endpoint');
        expect(budderflyInvoiceValidationDialogPage.getEndpointInput()).toMatch('endpoint');
        budderflyInvoiceValidationDialogPage
            .getUpdateInvoiceStatusInput()
            .isSelected()
            .then(selected => {
                if (selected) {
                    budderflyInvoiceValidationDialogPage.getUpdateInvoiceStatusInput().click();
                    expect(budderflyInvoiceValidationDialogPage.getUpdateInvoiceStatusInput().isSelected()).toBeFalsy();
                } else {
                    budderflyInvoiceValidationDialogPage.getUpdateInvoiceStatusInput().click();
                    expect(budderflyInvoiceValidationDialogPage.getUpdateInvoiceStatusInput().isSelected()).toBeTruthy();
                }
            });
        budderflyInvoiceValidationDialogPage.save();
        expect(budderflyInvoiceValidationDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class BudderflyInvoiceValidationComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-budderfly-invoice-validation div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class BudderflyInvoiceValidationDialogPage {
    modalTitle = element(by.css('h4#myBudderflyInvoiceValidationLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    testNameInput = element(by.css('input#field_testName'));
    descriptionInput = element(by.css('input#field_description'));
    configInput = element(by.css('textarea#field_config'));
    enabledInput = element(by.css('input#field_enabled'));
    orderInput = element(by.css('input#field_order'));
    endpointInput = element(by.css('input#field_endpoint'));
    updateInvoiceStatusInput = element(by.css('input#field_updateInvoiceStatus'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setTestNameInput = function(testName) {
        this.testNameInput.sendKeys(testName);
    };

    getTestNameInput = function() {
        return this.testNameInput.getAttribute('value');
    };

    setDescriptionInput = function(description) {
        this.descriptionInput.sendKeys(description);
    };

    getDescriptionInput = function() {
        return this.descriptionInput.getAttribute('value');
    };

    setConfigInput = function(config) {
        this.configInput.sendKeys(config);
    };

    getConfigInput = function() {
        return this.configInput.getAttribute('value');
    };

    getEnabledInput = function() {
        return this.enabledInput;
    };
    setOrderInput = function(order) {
        this.orderInput.sendKeys(order);
    };

    getOrderInput = function() {
        return this.orderInput.getAttribute('value');
    };

    setEndpointInput = function(endpoint) {
        this.endpointInput.sendKeys(endpoint);
    };

    getEndpointInput = function() {
        return this.endpointInput.getAttribute('value');
    };

    getUpdateInvoiceStatusInput = function() {
        return this.updateInvoiceStatusInput;
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
