import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Event e2e test', () => {
    let navBarPage: NavBarPage;
    let eventDialogPage: EventDialogPage;
    let eventComponentsPage: EventComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Events', () => {
        navBarPage.goToEntity('event');
        eventComponentsPage = new EventComponentsPage();
        expect(eventComponentsPage.getTitle()).toMatch(/billingWebApp.event.home.title/);
    });

    it('should load create Event dialog', () => {
        eventComponentsPage.clickOnCreateButton();
        eventDialogPage = new EventDialogPage();
        expect(eventDialogPage.getModalTitle()).toMatch(/billingWebApp.event.home.createOrEditLabel/);
        eventDialogPage.close();
    });

    it('should create and save Events', () => {
        eventComponentsPage.clickOnCreateButton();
        eventDialogPage.setEventTimestampInput(12310020012301);
        expect(eventDialogPage.getEventTimestampInput()).toMatch('2001-12-31T02:30');
        eventDialogPage.setEventTypeInput('eventType');
        expect(eventDialogPage.getEventTypeInput()).toMatch('eventType');
        eventDialogPage.setMessageInput('message');
        expect(eventDialogPage.getMessageInput()).toMatch('message');
        eventDialogPage.setEventInput('event');
        expect(eventDialogPage.getEventInput()).toMatch('event');
        eventDialogPage.setDurationInput('5');
        expect(eventDialogPage.getDurationInput()).toMatch('5');
        eventDialogPage.setIpAddressInput('ipAddress');
        expect(eventDialogPage.getIpAddressInput()).toMatch('ipAddress');
        eventDialogPage.equipmentSelectLastOption();
        eventDialogPage.save();
        expect(eventDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class EventComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-event div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class EventDialogPage {
    modalTitle = element(by.css('h4#myEventLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    eventTimestampInput = element(by.css('input#field_eventTimestamp'));
    eventTypeInput = element(by.css('input#field_eventType'));
    messageInput = element(by.css('input#field_message'));
    eventInput = element(by.css('input#field_event'));
    durationInput = element(by.css('input#field_duration'));
    ipAddressInput = element(by.css('input#field_ipAddress'));
    equipmentSelect = element(by.css('select#field_equipment'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setEventTimestampInput = function(eventTimestamp) {
        this.eventTimestampInput.sendKeys(eventTimestamp);
    };

    getEventTimestampInput = function() {
        return this.eventTimestampInput.getAttribute('value');
    };

    setEventTypeInput = function(eventType) {
        this.eventTypeInput.sendKeys(eventType);
    };

    getEventTypeInput = function() {
        return this.eventTypeInput.getAttribute('value');
    };

    setMessageInput = function(message) {
        this.messageInput.sendKeys(message);
    };

    getMessageInput = function() {
        return this.messageInput.getAttribute('value');
    };

    setEventInput = function(event) {
        this.eventInput.sendKeys(event);
    };

    getEventInput = function() {
        return this.eventInput.getAttribute('value');
    };

    setDurationInput = function(duration) {
        this.durationInput.sendKeys(duration);
    };

    getDurationInput = function() {
        return this.durationInput.getAttribute('value');
    };

    setIpAddressInput = function(ipAddress) {
        this.ipAddressInput.sendKeys(ipAddress);
    };

    getIpAddressInput = function() {
        return this.ipAddressInput.getAttribute('value');
    };

    equipmentSelectLastOption = function() {
        this.equipmentSelect
            .all(by.tagName('option'))
            .last()
            .click();
    };

    equipmentSelectOption = function(option) {
        this.equipmentSelect.sendKeys(option);
    };

    getEquipmentSelect = function() {
        return this.equipmentSelect;
    };

    getEquipmentSelectedOption = function() {
        return this.equipmentSelect.element(by.css('option:checked')).getText();
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
