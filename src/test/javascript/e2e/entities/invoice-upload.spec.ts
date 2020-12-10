import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('InvoiceUpload e2e test', () => {
    let navBarPage: NavBarPage;
    let invoiceUploadDialogPage: InvoiceUploadDialogPage;
    let invoiceUploadComponentsPage: InvoiceUploadComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load InvoiceUploads', () => {
        navBarPage.goToEntity('invoice-upload');
        invoiceUploadComponentsPage = new InvoiceUploadComponentsPage();
        expect(invoiceUploadComponentsPage.getTitle()).toMatch(/billingWebApp.invoiceUpload.home.title/);
    });

    it('should load create InvoiceUpload dialog', () => {
        invoiceUploadComponentsPage.clickOnCreateButton();
        invoiceUploadDialogPage = new InvoiceUploadDialogPage();
        expect(invoiceUploadDialogPage.getModalTitle()).toMatch(/billingWebApp.invoiceUpload.home.createOrEditLabel/);
        invoiceUploadDialogPage.close();
    });

    it('should create and save InvoiceUploads', () => {
        invoiceUploadComponentsPage.clickOnCreateButton();
        invoiceUploadDialogPage.setFileNameInput('fileName');
        expect(invoiceUploadDialogPage.getFileNameInput()).toMatch('fileName');
        invoiceUploadDialogPage.setFilePathInput('filePath');
        expect(invoiceUploadDialogPage.getFilePathInput()).toMatch('filePath');
        invoiceUploadDialogPage.setStatusInput('status');
        expect(invoiceUploadDialogPage.getStatusInput()).toMatch('status');
        invoiceUploadDialogPage.setMessageInput('message');
        expect(invoiceUploadDialogPage.getMessageInput()).toMatch('message');
        invoiceUploadDialogPage.save();
        expect(invoiceUploadDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class InvoiceUploadComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-invoice-upload div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class InvoiceUploadDialogPage {
    modalTitle = element(by.css('h4#myInvoiceUploadLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    fileNameInput = element(by.css('input#field_fileName'));
    filePathInput = element(by.css('input#field_filePath'));
    statusInput = element(by.css('input#field_status'));
    messageInput = element(by.css('input#field_message'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setFileNameInput = function(fileName) {
        this.fileNameInput.sendKeys(fileName);
    };

    getFileNameInput = function() {
        return this.fileNameInput.getAttribute('value');
    };

    setFilePathInput = function(filePath) {
        this.filePathInput.sendKeys(filePath);
    };

    getFilePathInput = function() {
        return this.filePathInput.getAttribute('value');
    };

    setStatusInput = function(status) {
        this.statusInput.sendKeys(status);
    };

    getStatusInput = function() {
        return this.statusInput.getAttribute('value');
    };

    setMessageInput = function(message) {
        this.messageInput.sendKeys(message);
    };

    getMessageInput = function() {
        return this.messageInput.getAttribute('value');
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
