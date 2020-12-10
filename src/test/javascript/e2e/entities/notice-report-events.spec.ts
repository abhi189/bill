import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('NoticeReportEvents e2e test', () => {
    let navBarPage: NavBarPage;
    let noticeReportEventsDialogPage: NoticeReportEventsDialogPage;
    let noticeReportEventsComponentsPage: NoticeReportEventsComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load NoticeReportEvents', () => {
        navBarPage.goToEntity('notice-report-events');
        noticeReportEventsComponentsPage = new NoticeReportEventsComponentsPage();
        expect(noticeReportEventsComponentsPage.getTitle()).toMatch(/billingWebApp.noticeReportEvents.home.title/);
    });

    it('should load create NoticeReportEvents dialog', () => {
        noticeReportEventsComponentsPage.clickOnCreateButton();
        noticeReportEventsDialogPage = new NoticeReportEventsDialogPage();
        expect(noticeReportEventsDialogPage.getModalTitle()).toMatch(/billingWebApp.noticeReportEvents.home.createOrEditLabel/);
        noticeReportEventsDialogPage.close();
    });

    /* it('should create and save NoticeReportEvents', () => {
        noticeReportEventsComponentsPage.clickOnCreateButton();
        noticeReportEventsDialogPage.setDateInput(12310020012301);
        expect(noticeReportEventsDialogPage.getDateInput()).toMatch('2001-12-31T02:30');
        noticeReportEventsDialogPage.setBudderflyIdInput('budderflyId');
        expect(noticeReportEventsDialogPage.getBudderflyIdInput()).toMatch('budderflyId');
        noticeReportEventsDialogPage.setOpenBalanceInput('5');
        expect(noticeReportEventsDialogPage.getOpenBalanceInput()).toMatch('5');
        noticeReportEventsDialogPage.setNumberOfDueInvoicesInput('5');
        expect(noticeReportEventsDialogPage.getNumberOfDueInvoicesInput()).toMatch('5');
        noticeReportEventsDialogPage.getOptOutInput().isSelected().then((selected) => {
            if (selected) {
                noticeReportEventsDialogPage.getOptOutInput().click();
                expect(noticeReportEventsDialogPage.getOptOutInput().isSelected()).toBeFalsy();
            } else {
                noticeReportEventsDialogPage.getOptOutInput().click();
                expect(noticeReportEventsDialogPage.getOptOutInput().isSelected()).toBeTruthy();
            }
        });
        noticeReportEventsDialogPage.setInvoiceDaysOverdueInput('5');
        expect(noticeReportEventsDialogPage.getInvoiceDaysOverdueInput()).toMatch('5');
        noticeReportEventsDialogPage.setInvoiceNumberInput('invoiceNumber');
        expect(noticeReportEventsDialogPage.getInvoiceNumberInput()).toMatch('invoiceNumber');
        noticeReportEventsDialogPage.setInvoiceAmountDueInput('5');
        expect(noticeReportEventsDialogPage.getInvoiceAmountDueInput()).toMatch('5');
        noticeReportEventsDialogPage.setInvoiceDueDateInput('2000-12-31');
        expect(noticeReportEventsDialogPage.getInvoiceDueDateInput()).toMatch('2000-12-31');
        noticeReportEventsDialogPage.noticeTypeSelectLastOption();
        noticeReportEventsDialogPage.setMessageInput('message');
        expect(noticeReportEventsDialogPage.getMessageInput()).toMatch('message');
        noticeReportEventsDialogPage.noticeReportSelectLastOption();
        noticeReportEventsDialogPage.save();
        expect(noticeReportEventsDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });*/

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class NoticeReportEventsComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-notice-report-events div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class NoticeReportEventsDialogPage {
    modalTitle = element(by.css('h4#myNoticeReportEventsLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    dateInput = element(by.css('input#field_date'));
    budderflyIdInput = element(by.css('input#field_budderflyId'));
    openBalanceInput = element(by.css('input#field_openBalance'));
    numberOfDueInvoicesInput = element(by.css('input#field_numberOfDueInvoices'));
    optOutInput = element(by.css('input#field_optOut'));
    invoiceDaysOverdueInput = element(by.css('input#field_invoiceDaysOverdue'));
    invoiceNumberInput = element(by.css('input#field_invoiceNumber'));
    invoiceAmountDueInput = element(by.css('input#field_invoiceAmountDue'));
    invoiceDueDateInput = element(by.css('input#field_invoiceDueDate'));
    noticeTypeSelect = element(by.css('select#field_noticeType'));
    messageInput = element(by.css('input#field_message'));
    noticeReportSelect = element(by.css('select#field_noticeReport'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setDateInput = function(date) {
        this.dateInput.sendKeys(date);
    };

    getDateInput = function() {
        return this.dateInput.getAttribute('value');
    };

    setBudderflyIdInput = function(budderflyId) {
        this.budderflyIdInput.sendKeys(budderflyId);
    };

    getBudderflyIdInput = function() {
        return this.budderflyIdInput.getAttribute('value');
    };

    setOpenBalanceInput = function(openBalance) {
        this.openBalanceInput.sendKeys(openBalance);
    };

    getOpenBalanceInput = function() {
        return this.openBalanceInput.getAttribute('value');
    };

    setNumberOfDueInvoicesInput = function(numberOfDueInvoices) {
        this.numberOfDueInvoicesInput.sendKeys(numberOfDueInvoices);
    };

    getNumberOfDueInvoicesInput = function() {
        return this.numberOfDueInvoicesInput.getAttribute('value');
    };

    getOptOutInput = function() {
        return this.optOutInput;
    };
    setInvoiceDaysOverdueInput = function(invoiceDaysOverdue) {
        this.invoiceDaysOverdueInput.sendKeys(invoiceDaysOverdue);
    };

    getInvoiceDaysOverdueInput = function() {
        return this.invoiceDaysOverdueInput.getAttribute('value');
    };

    setInvoiceNumberInput = function(invoiceNumber) {
        this.invoiceNumberInput.sendKeys(invoiceNumber);
    };

    getInvoiceNumberInput = function() {
        return this.invoiceNumberInput.getAttribute('value');
    };

    setInvoiceAmountDueInput = function(invoiceAmountDue) {
        this.invoiceAmountDueInput.sendKeys(invoiceAmountDue);
    };

    getInvoiceAmountDueInput = function() {
        return this.invoiceAmountDueInput.getAttribute('value');
    };

    setInvoiceDueDateInput = function(invoiceDueDate) {
        this.invoiceDueDateInput.sendKeys(invoiceDueDate);
    };

    getInvoiceDueDateInput = function() {
        return this.invoiceDueDateInput.getAttribute('value');
    };

    setNoticeTypeSelect = function(noticeType) {
        this.noticeTypeSelect.sendKeys(noticeType);
    };

    getNoticeTypeSelect = function() {
        return this.noticeTypeSelect.element(by.css('option:checked')).getText();
    };

    noticeTypeSelectLastOption = function() {
        this.noticeTypeSelect
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

    noticeReportSelectLastOption = function() {
        this.noticeReportSelect
            .all(by.tagName('option'))
            .last()
            .click();
    };

    noticeReportSelectOption = function(option) {
        this.noticeReportSelect.sendKeys(option);
    };

    getNoticeReportSelect = function() {
        return this.noticeReportSelect;
    };

    getNoticeReportSelectedOption = function() {
        return this.noticeReportSelect.element(by.css('option:checked')).getText();
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
