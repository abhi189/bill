import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('DataRetention e2e test', () => {
    let navBarPage: NavBarPage;
    let dataRetentionDialogPage: DataRetentionDialogPage;
    let dataRetentionComponentsPage: DataRetentionComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load DataRetentions', () => {
        navBarPage.goToEntity('data-retention');
        dataRetentionComponentsPage = new DataRetentionComponentsPage();
        expect(dataRetentionComponentsPage.getTitle()).toMatch(/billingWebApp.dataRetention.home.title/);
    });

    it('should load create DataRetention dialog', () => {
        dataRetentionComponentsPage.clickOnCreateButton();
        dataRetentionDialogPage = new DataRetentionDialogPage();
        expect(dataRetentionDialogPage.getModalTitle()).toMatch(/billingWebApp.dataRetention.home.createOrEditLabel/);
        dataRetentionDialogPage.close();
    });

    it('should create and save DataRetentions', () => {
        dataRetentionComponentsPage.clickOnCreateButton();
        dataRetentionDialogPage.setServiceNameInput('serviceName');
        expect(dataRetentionDialogPage.getServiceNameInput()).toMatch('serviceName');
        dataRetentionDialogPage.setServiceDescriptionInput('serviceDescription');
        expect(dataRetentionDialogPage.getServiceDescriptionInput()).toMatch('serviceDescription');
        dataRetentionDialogPage.setServiceRetentionPeriodYearInput('5');
        expect(dataRetentionDialogPage.getServiceRetentionPeriodYearInput()).toMatch('5');
        dataRetentionDialogPage.setServiceRetentionPeriodMonthInput('5');
        expect(dataRetentionDialogPage.getServiceRetentionPeriodMonthInput()).toMatch('5');
        dataRetentionDialogPage.setServiceRetentionPeriodDayInput('5');
        expect(dataRetentionDialogPage.getServiceRetentionPeriodDayInput()).toMatch('5');
        dataRetentionDialogPage.setServiceEndpointInput('serviceEndpoint');
        expect(dataRetentionDialogPage.getServiceEndpointInput()).toMatch('serviceEndpoint');
        dataRetentionDialogPage.save();
        expect(dataRetentionDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class DataRetentionComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-data-retention div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class DataRetentionDialogPage {
    modalTitle = element(by.css('h4#myDataRetentionLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    serviceNameInput = element(by.css('input#field_serviceName'));
    serviceDescriptionInput = element(by.css('input#field_serviceDescription'));
    serviceRetentionPeriodYearInput = element(by.css('input#field_serviceRetentionPeriodYear'));
    serviceRetentionPeriodMonthInput = element(by.css('input#field_serviceRetentionPeriodMonth'));
    serviceRetentionPeriodDayInput = element(by.css('input#field_serviceRetentionPeriodDay'));
    serviceEndpointInput = element(by.css('input#field_serviceEndpoint'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setServiceNameInput = function(serviceName) {
        this.serviceNameInput.sendKeys(serviceName);
    };

    getServiceNameInput = function() {
        return this.serviceNameInput.getAttribute('value');
    };

    setServiceDescriptionInput = function(serviceDescription) {
        this.serviceDescriptionInput.sendKeys(serviceDescription);
    };

    getServiceDescriptionInput = function() {
        return this.serviceDescriptionInput.getAttribute('value');
    };

    setServiceRetentionPeriodYearInput = function(serviceRetentionPeriodYear) {
        this.serviceRetentionPeriodYearInput.sendKeys(serviceRetentionPeriodYear);
    };

    getServiceRetentionPeriodYearInput = function() {
        return this.serviceRetentionPeriodYearInput.getAttribute('value');
    };

    setServiceRetentionPeriodMonthInput = function(serviceRetentionPeriodMonth) {
        this.serviceRetentionPeriodMonthInput.sendKeys(serviceRetentionPeriodMonth);
    };

    getServiceRetentionPeriodMonthInput = function() {
        return this.serviceRetentionPeriodMonthInput.getAttribute('value');
    };

    setServiceRetentionPeriodDayInput = function(serviceRetentionPeriodDay) {
        this.serviceRetentionPeriodDayInput.sendKeys(serviceRetentionPeriodDay);
    };

    getServiceRetentionPeriodDayInput = function() {
        return this.serviceRetentionPeriodDayInput.getAttribute('value');
    };

    setServiceEndpointInput = function(serviceEndpoint) {
        this.serviceEndpointInput.sendKeys(serviceEndpoint);
    };

    getServiceEndpointInput = function() {
        return this.serviceEndpointInput.getAttribute('value');
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
