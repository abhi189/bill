import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('JobExecutionAuditLog e2e test', () => {
    let navBarPage: NavBarPage;
    let jobExecutionAuditLogDialogPage: JobExecutionAuditLogDialogPage;
    let jobExecutionAuditLogComponentsPage: JobExecutionAuditLogComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load JobExecutionAuditLogs', () => {
        navBarPage.goToEntity('job-execution-audit-log');
        jobExecutionAuditLogComponentsPage = new JobExecutionAuditLogComponentsPage();
        expect(jobExecutionAuditLogComponentsPage.getTitle()).toMatch(/billingWebApp.jobExecutionAuditLog.home.title/);
    });

    it('should load create JobExecutionAuditLog dialog', () => {
        jobExecutionAuditLogComponentsPage.clickOnCreateButton();
        jobExecutionAuditLogDialogPage = new JobExecutionAuditLogDialogPage();
        expect(jobExecutionAuditLogDialogPage.getModalTitle()).toMatch(/billingWebApp.jobExecutionAuditLog.home.createOrEditLabel/);
        jobExecutionAuditLogDialogPage.close();
    });

    /* it('should create and save JobExecutionAuditLogs', () => {
        jobExecutionAuditLogComponentsPage.clickOnCreateButton();
        jobExecutionAuditLogDialogPage.jobExecutionTypeSelectLastOption();
        jobExecutionAuditLogDialogPage.setExecutionMessageInput('executionMessage');
        expect(jobExecutionAuditLogDialogPage.getExecutionMessageInput()).toMatch('executionMessage');
        jobExecutionAuditLogDialogPage.setExecutionDateInput('2000-12-31');
        expect(jobExecutionAuditLogDialogPage.getExecutionDateInput()).toMatch('2000-12-31');
        jobExecutionAuditLogDialogPage.jobDescriptionSelectLastOption();
        jobExecutionAuditLogDialogPage.save();
        expect(jobExecutionAuditLogDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });*/

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class JobExecutionAuditLogComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-job-execution-audit-log div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class JobExecutionAuditLogDialogPage {
    modalTitle = element(by.css('h4#myJobExecutionAuditLogLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    jobExecutionTypeSelect = element(by.css('select#field_jobExecutionType'));
    executionMessageInput = element(by.css('input#field_executionMessage'));
    executionDateInput = element(by.css('input#field_executionDate'));
    jobDescriptionSelect = element(by.css('select#field_jobDescription'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setJobExecutionTypeSelect = function(jobExecutionType) {
        this.jobExecutionTypeSelect.sendKeys(jobExecutionType);
    };

    getJobExecutionTypeSelect = function() {
        return this.jobExecutionTypeSelect.element(by.css('option:checked')).getText();
    };

    jobExecutionTypeSelectLastOption = function() {
        this.jobExecutionTypeSelect
            .all(by.tagName('option'))
            .last()
            .click();
    };
    setExecutionMessageInput = function(executionMessage) {
        this.executionMessageInput.sendKeys(executionMessage);
    };

    getExecutionMessageInput = function() {
        return this.executionMessageInput.getAttribute('value');
    };

    setExecutionDateInput = function(executionDate) {
        this.executionDateInput.sendKeys(executionDate);
    };

    getExecutionDateInput = function() {
        return this.executionDateInput.getAttribute('value');
    };

    jobDescriptionSelectLastOption = function() {
        this.jobDescriptionSelect
            .all(by.tagName('option'))
            .last()
            .click();
    };

    jobDescriptionSelectOption = function(option) {
        this.jobDescriptionSelect.sendKeys(option);
    };

    getJobDescriptionSelect = function() {
        return this.jobDescriptionSelect;
    };

    getJobDescriptionSelectedOption = function() {
        return this.jobDescriptionSelect.element(by.css('option:checked')).getText();
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
