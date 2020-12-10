import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('AccountsReceivable e2e test', () => {
    let navBarPage: NavBarPage;
    let accountsReceivableDialogPage: AccountsReceivableDialogPage;
    let accountsReceivableComponentsPage: AccountsReceivableComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load AccountsReceivables', () => {
        navBarPage.goToEntity('accounts-receivable');
        accountsReceivableComponentsPage = new AccountsReceivableComponentsPage();
        expect(accountsReceivableComponentsPage.getTitle()).toMatch(/billingWebApp.accountsReceivable.home.title/);
    });

    it('should load create AccountsReceivable dialog', () => {
        accountsReceivableComponentsPage.clickOnCreateButton();
        accountsReceivableDialogPage = new AccountsReceivableDialogPage();
        expect(accountsReceivableDialogPage.getModalTitle()).toMatch(/billingWebApp.accountsReceivable.home.createOrEditLabel/);
        accountsReceivableDialogPage.close();
    });

    it('should create and save AccountsReceivables', () => {
        accountsReceivableComponentsPage.clickOnCreateButton();
        accountsReceivableDialogPage.setPreviousBalanceInput('5');
        expect(accountsReceivableDialogPage.getPreviousBalanceInput()).toMatch('5');
        accountsReceivableDialogPage.setPaymentsReceivedInput('5');
        expect(accountsReceivableDialogPage.getPaymentsReceivedInput()).toMatch('5');
        accountsReceivableDialogPage.setOutstandingBalanceInput('5');
        expect(accountsReceivableDialogPage.getOutstandingBalanceInput()).toMatch('5');
        accountsReceivableDialogPage.save();
        expect(accountsReceivableDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class AccountsReceivableComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-accounts-receivable div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class AccountsReceivableDialogPage {
    modalTitle = element(by.css('h4#myAccountsReceivableLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    previousBalanceInput = element(by.css('input#field_previousBalance'));
    paymentsReceivedInput = element(by.css('input#field_paymentsReceived'));
    outstandingBalanceInput = element(by.css('input#field_outstandingBalance'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setPreviousBalanceInput = function(previousBalance) {
        this.previousBalanceInput.sendKeys(previousBalance);
    };

    getPreviousBalanceInput = function() {
        return this.previousBalanceInput.getAttribute('value');
    };

    setPaymentsReceivedInput = function(paymentsReceived) {
        this.paymentsReceivedInput.sendKeys(paymentsReceived);
    };

    getPaymentsReceivedInput = function() {
        return this.paymentsReceivedInput.getAttribute('value');
    };

    setOutstandingBalanceInput = function(outstandingBalance) {
        this.outstandingBalanceInput.sendKeys(outstandingBalance);
    };

    getOutstandingBalanceInput = function() {
        return this.outstandingBalanceInput.getAttribute('value');
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
