import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('AlertActivity e2e test', () => {
    let navBarPage: NavBarPage;
    let alertActivityDialogPage: AlertActivityDialogPage;
    let alertActivityComponentsPage: AlertActivityComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load AlertActivities', () => {
        navBarPage.goToEntity('alert-activity');
        alertActivityComponentsPage = new AlertActivityComponentsPage();
        expect(alertActivityComponentsPage.getTitle()).toMatch(/billingWebApp.alertActivity.home.title/);
    });

    it('should load create AlertActivity dialog', () => {
        alertActivityComponentsPage.clickOnCreateButton();
        alertActivityDialogPage = new AlertActivityDialogPage();
        expect(alertActivityDialogPage.getModalTitle()).toMatch(/billingWebApp.alertActivity.home.createOrEditLabel/);
        alertActivityDialogPage.close();
    });

    it('should create and save AlertActivities', () => {
        alertActivityComponentsPage.clickOnCreateButton();
        alertActivityDialogPage.setUserInput('user');
        expect(alertActivityDialogPage.getUserInput()).toMatch('user');
        alertActivityDialogPage.activitySelectLastOption();
        alertActivityDialogPage.levelSelectLastOption();
        alertActivityDialogPage.setMessageInput('message');
        expect(alertActivityDialogPage.getMessageInput()).toMatch('message');
        alertActivityDialogPage.setDateInput(12310020012301);
        expect(alertActivityDialogPage.getDateInput()).toMatch('2001-12-31T02:30');
        alertActivityDialogPage.alertSelectLastOption();
        alertActivityDialogPage.save();
        expect(alertActivityDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class AlertActivityComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-alert-activity div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class AlertActivityDialogPage {
    modalTitle = element(by.css('h4#myAlertActivityLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    userInput = element(by.css('input#field_user'));
    activitySelect = element(by.css('select#field_activity'));
    levelSelect = element(by.css('select#field_level'));
    messageInput = element(by.css('textarea#field_message'));
    dateInput = element(by.css('input#field_date'));
    alertSelect = element(by.css('select#field_alert'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setUserInput = function(user) {
        this.userInput.sendKeys(user);
    };

    getUserInput = function() {
        return this.userInput.getAttribute('value');
    };

    setActivitySelect = function(activity) {
        this.activitySelect.sendKeys(activity);
    };

    getActivitySelect = function() {
        return this.activitySelect.element(by.css('option:checked')).getText();
    };

    activitySelectLastOption = function() {
        this.activitySelect
            .all(by.tagName('option'))
            .last()
            .click();
    };
    setLevelSelect = function(level) {
        this.levelSelect.sendKeys(level);
    };

    getLevelSelect = function() {
        return this.levelSelect.element(by.css('option:checked')).getText();
    };

    levelSelectLastOption = function() {
        this.levelSelect
            .all(by.tagName('option'))
            .last()
            .click();
    };
    setMessageInput = function(message) {
        this.messageInput.sendKeys(message);
    };

    getMessageInput = function() {
        return this.messageInput.getAttribute('value');
    };

    setDateInput = function(date) {
        this.dateInput.sendKeys(date);
    };

    getDateInput = function() {
        return this.dateInput.getAttribute('value');
    };

    alertSelectLastOption = function() {
        this.alertSelect
            .all(by.tagName('option'))
            .last()
            .click();
    };

    alertSelectOption = function(option) {
        this.alertSelect.sendKeys(option);
    };

    getAlertSelect = function() {
        return this.alertSelect;
    };

    getAlertSelectedOption = function() {
        return this.alertSelect.element(by.css('option:checked')).getText();
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
