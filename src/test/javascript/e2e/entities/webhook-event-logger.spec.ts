import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('WebhookEventLogger e2e test', () => {
    let navBarPage: NavBarPage;
    let webhookEventLoggerDialogPage: WebhookEventLoggerDialogPage;
    let webhookEventLoggerComponentsPage: WebhookEventLoggerComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load WebhookEventLoggers', () => {
        navBarPage.goToEntity('webhook-event-logger');
        webhookEventLoggerComponentsPage = new WebhookEventLoggerComponentsPage();
        expect(webhookEventLoggerComponentsPage.getTitle()).toMatch(/billingWebApp.webhookEventLogger.home.title/);
    });

    it('should load create WebhookEventLogger dialog', () => {
        webhookEventLoggerComponentsPage.clickOnCreateButton();
        webhookEventLoggerDialogPage = new WebhookEventLoggerDialogPage();
        expect(webhookEventLoggerDialogPage.getModalTitle()).toMatch(/billingWebApp.webhookEventLogger.home.createOrEditLabel/);
        webhookEventLoggerDialogPage.close();
    });

    it('should create and save WebhookEventLoggers', () => {
        webhookEventLoggerComponentsPage.clickOnCreateButton();
        webhookEventLoggerDialogPage.setEventIdInput('eventId');
        expect(webhookEventLoggerDialogPage.getEventIdInput()).toMatch('eventId');
        webhookEventLoggerDialogPage.setEventTypeInput('eventType');
        expect(webhookEventLoggerDialogPage.getEventTypeInput()).toMatch('eventType');
        webhookEventLoggerDialogPage.setEventDateInput(12310020012301);
        expect(webhookEventLoggerDialogPage.getEventDateInput()).toMatch('2001-12-31T02:30');
        webhookEventLoggerDialogPage.setEventEndpointInput('eventEndpoint');
        expect(webhookEventLoggerDialogPage.getEventEndpointInput()).toMatch('eventEndpoint');
        webhookEventLoggerDialogPage.setStatusInput('status');
        expect(webhookEventLoggerDialogPage.getStatusInput()).toMatch('status');
        webhookEventLoggerDialogPage.setProviderIdInput('providerId');
        expect(webhookEventLoggerDialogPage.getProviderIdInput()).toMatch('providerId');
        webhookEventLoggerDialogPage.save();
        expect(webhookEventLoggerDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class WebhookEventLoggerComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-webhook-event-logger div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class WebhookEventLoggerDialogPage {
    modalTitle = element(by.css('h4#myWebhookEventLoggerLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    eventIdInput = element(by.css('input#field_eventId'));
    eventTypeInput = element(by.css('input#field_eventType'));
    eventDateInput = element(by.css('input#field_eventDate'));
    eventEndpointInput = element(by.css('input#field_eventEndpoint'));
    statusInput = element(by.css('input#field_status'));
    providerIdInput = element(by.css('input#field_providerId'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setEventIdInput = function(eventId) {
        this.eventIdInput.sendKeys(eventId);
    };

    getEventIdInput = function() {
        return this.eventIdInput.getAttribute('value');
    };

    setEventTypeInput = function(eventType) {
        this.eventTypeInput.sendKeys(eventType);
    };

    getEventTypeInput = function() {
        return this.eventTypeInput.getAttribute('value');
    };

    setEventDateInput = function(eventDate) {
        this.eventDateInput.sendKeys(eventDate);
    };

    getEventDateInput = function() {
        return this.eventDateInput.getAttribute('value');
    };

    setEventEndpointInput = function(eventEndpoint) {
        this.eventEndpointInput.sendKeys(eventEndpoint);
    };

    getEventEndpointInput = function() {
        return this.eventEndpointInput.getAttribute('value');
    };

    setStatusInput = function(status) {
        this.statusInput.sendKeys(status);
    };

    getStatusInput = function() {
        return this.statusInput.getAttribute('value');
    };

    setProviderIdInput = function(providerId) {
        this.providerIdInput.sendKeys(providerId);
    };

    getProviderIdInput = function() {
        return this.providerIdInput.getAttribute('value');
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
