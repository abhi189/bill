import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('NoticeReport e2e test', () => {
    let navBarPage: NavBarPage;
    let noticeReportDialogPage: NoticeReportDialogPage;
    let noticeReportComponentsPage: NoticeReportComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load NoticeReports', () => {
        navBarPage.goToEntity('notice-report');
        noticeReportComponentsPage = new NoticeReportComponentsPage();
        expect(noticeReportComponentsPage.getTitle()).toMatch(/billingWebApp.noticeReport.home.title/);
    });

    it('should load create NoticeReport dialog', () => {
        noticeReportComponentsPage.clickOnCreateButton();
        noticeReportDialogPage = new NoticeReportDialogPage();
        expect(noticeReportDialogPage.getModalTitle()).toMatch(/billingWebApp.noticeReport.home.createOrEditLabel/);
        noticeReportDialogPage.close();
    });

    it('should create and save NoticeReports', () => {
        noticeReportComponentsPage.clickOnCreateButton();
        noticeReportDialogPage.setDateInput(12310020012301);
        expect(noticeReportDialogPage.getDateInput()).toMatch('2001-12-31T02:30');
        noticeReportDialogPage.statusSelectLastOption();
        noticeReportDialogPage.setEventCountInput('5');
        expect(noticeReportDialogPage.getEventCountInput()).toMatch('5');
        noticeReportDialogPage.save();
        expect(noticeReportDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class NoticeReportComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-notice-report div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class NoticeReportDialogPage {
    modalTitle = element(by.css('h4#myNoticeReportLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    dateInput = element(by.css('input#field_date'));
    statusSelect = element(by.css('select#field_status'));
    eventCountInput = element(by.css('input#field_eventCount'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setDateInput = function(date) {
        this.dateInput.sendKeys(date);
    };

    getDateInput = function() {
        return this.dateInput.getAttribute('value');
    };

    setStatusSelect = function(status) {
        this.statusSelect.sendKeys(status);
    };

    getStatusSelect = function() {
        return this.statusSelect.element(by.css('option:checked')).getText();
    };

    statusSelectLastOption = function() {
        this.statusSelect
            .all(by.tagName('option'))
            .last()
            .click();
    };
    setEventCountInput = function(eventCount) {
        this.eventCountInput.sendKeys(eventCount);
    };

    getEventCountInput = function() {
        return this.eventCountInput.getAttribute('value');
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
