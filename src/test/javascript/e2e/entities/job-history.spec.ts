import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('JobHistory e2e test', () => {
    let navBarPage: NavBarPage;
    let jobHistoryDialogPage: JobHistoryDialogPage;
    let jobHistoryComponentsPage: JobHistoryComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load JobHistories', () => {
        navBarPage.goToEntity('job-history');
        jobHistoryComponentsPage = new JobHistoryComponentsPage();
        expect(jobHistoryComponentsPage.getTitle()).toMatch(/billingWebApp.jobHistory.home.title/);
    });

    it('should load create JobHistory dialog', () => {
        jobHistoryComponentsPage.clickOnCreateButton();
        jobHistoryDialogPage = new JobHistoryDialogPage();
        expect(jobHistoryDialogPage.getModalTitle()).toMatch(/billingWebApp.jobHistory.home.createOrEditLabel/);
        jobHistoryDialogPage.close();
    });

    it('should create and save JobHistories', () => {
        jobHistoryComponentsPage.clickOnCreateButton();
        jobHistoryDialogPage.setDescriptionInput('description');
        expect(jobHistoryDialogPage.getDescriptionInput()).toMatch('description');
        jobHistoryDialogPage.typeSelectLastOption();
        jobHistoryDialogPage.setCreateDateInput(12310020012301);
        expect(jobHistoryDialogPage.getCreateDateInput()).toMatch('2001-12-31T02:30');
        jobHistoryDialogPage.siteAccountSelectLastOption();
        jobHistoryDialogPage.save();
        expect(jobHistoryDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class JobHistoryComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-job-history div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class JobHistoryDialogPage {
    modalTitle = element(by.css('h4#myJobHistoryLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    descriptionInput = element(by.css('input#field_description'));
    typeSelect = element(by.css('select#field_type'));
    createDateInput = element(by.css('input#field_createDate'));
    siteAccountSelect = element(by.css('select#field_siteAccount'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setDescriptionInput = function(description) {
        this.descriptionInput.sendKeys(description);
    };

    getDescriptionInput = function() {
        return this.descriptionInput.getAttribute('value');
    };

    setTypeSelect = function(type) {
        this.typeSelect.sendKeys(type);
    };

    getTypeSelect = function() {
        return this.typeSelect.element(by.css('option:checked')).getText();
    };

    typeSelectLastOption = function() {
        this.typeSelect
            .all(by.tagName('option'))
            .last()
            .click();
    };
    setCreateDateInput = function(createDate) {
        this.createDateInput.sendKeys(createDate);
    };

    getCreateDateInput = function() {
        return this.createDateInput.getAttribute('value');
    };

    siteAccountSelectLastOption = function() {
        this.siteAccountSelect
            .all(by.tagName('option'))
            .last()
            .click();
    };

    siteAccountSelectOption = function(option) {
        this.siteAccountSelect.sendKeys(option);
    };

    getSiteAccountSelect = function() {
        return this.siteAccountSelect;
    };

    getSiteAccountSelectedOption = function() {
        return this.siteAccountSelect.element(by.css('option:checked')).getText();
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
