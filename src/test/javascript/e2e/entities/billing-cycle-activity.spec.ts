import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('BillingCycleActivity e2e test', () => {
    let navBarPage: NavBarPage;
    let billingCycleActivityDialogPage: BillingCycleActivityDialogPage;
    let billingCycleActivityComponentsPage: BillingCycleActivityComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load BillingCycleActivities', () => {
        navBarPage.goToEntity('billing-cycle-activity');
        billingCycleActivityComponentsPage = new BillingCycleActivityComponentsPage();
        expect(billingCycleActivityComponentsPage.getTitle()).toMatch(/billingWebApp.billingCycleActivity.home.title/);
    });

    it('should load create BillingCycleActivity dialog', () => {
        billingCycleActivityComponentsPage.clickOnCreateButton();
        billingCycleActivityDialogPage = new BillingCycleActivityDialogPage();
        expect(billingCycleActivityDialogPage.getModalTitle()).toMatch(/billingWebApp.billingCycleActivity.home.createOrEditLabel/);
        billingCycleActivityDialogPage.close();
    });

    it('should create and save BillingCycleActivities', () => {
        billingCycleActivityComponentsPage.clickOnCreateButton();
        billingCycleActivityDialogPage.setUserInput('user');
        expect(billingCycleActivityDialogPage.getUserInput()).toMatch('user');
        billingCycleActivityDialogPage.activitySelectLastOption();
        billingCycleActivityDialogPage.levelSelectLastOption();
        billingCycleActivityDialogPage.setMessageInput('message');
        expect(billingCycleActivityDialogPage.getMessageInput()).toMatch('message');
        billingCycleActivityDialogPage.setActivityDateInput(12310020012301);
        expect(billingCycleActivityDialogPage.getActivityDateInput()).toMatch('2001-12-31T02:30');
        billingCycleActivityDialogPage.billingCycleSelectLastOption();
        billingCycleActivityDialogPage.save();
        expect(billingCycleActivityDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class BillingCycleActivityComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-billing-cycle-activity div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class BillingCycleActivityDialogPage {
    modalTitle = element(by.css('h4#myBillingCycleActivityLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    userInput = element(by.css('input#field_user'));
    activitySelect = element(by.css('select#field_activity'));
    levelSelect = element(by.css('select#field_level'));
    messageInput = element(by.css('input#field_message'));
    activityDateInput = element(by.css('input#field_activityDate'));
    billingCycleSelect = element(by.css('select#field_billingCycle'));

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

    setActivityDateInput = function(activityDate) {
        this.activityDateInput.sendKeys(activityDate);
    };

    getActivityDateInput = function() {
        return this.activityDateInput.getAttribute('value');
    };

    billingCycleSelectLastOption = function() {
        this.billingCycleSelect
            .all(by.tagName('option'))
            .last()
            .click();
    };

    billingCycleSelectOption = function(option) {
        this.billingCycleSelect.sendKeys(option);
    };

    getBillingCycleSelect = function() {
        return this.billingCycleSelect;
    };

    getBillingCycleSelectedOption = function() {
        return this.billingCycleSelect.element(by.css('option:checked')).getText();
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
