import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('TariffVersionHistory e2e test', () => {
    let navBarPage: NavBarPage;
    let tariffVersionHistoryDialogPage: TariffVersionHistoryDialogPage;
    let tariffVersionHistoryComponentsPage: TariffVersionHistoryComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load TariffVersionHistories', () => {
        navBarPage.goToEntity('tariff-version-history');
        tariffVersionHistoryComponentsPage = new TariffVersionHistoryComponentsPage();
        expect(tariffVersionHistoryComponentsPage.getTitle()).toMatch(/billingWebApp.tariffVersionHistory.home.title/);
    });

    it('should load create TariffVersionHistory dialog', () => {
        tariffVersionHistoryComponentsPage.clickOnCreateButton();
        tariffVersionHistoryDialogPage = new TariffVersionHistoryDialogPage();
        expect(tariffVersionHistoryDialogPage.getModalTitle()).toMatch(/billingWebApp.tariffVersionHistory.home.createOrEditLabel/);
        tariffVersionHistoryDialogPage.close();
    });

    it('should create and save TariffVersionHistories', () => {
        tariffVersionHistoryComponentsPage.clickOnCreateButton();
        tariffVersionHistoryDialogPage.setEffectiveDateInput('2000-12-31');
        expect(tariffVersionHistoryDialogPage.getEffectiveDateInput()).toMatch('2000-12-31');
        tariffVersionHistoryDialogPage.setEndDateInput('2000-12-31');
        expect(tariffVersionHistoryDialogPage.getEndDateInput()).toMatch('2000-12-31');
        tariffVersionHistoryDialogPage.setDocumentUrlInput('documentUrl');
        expect(tariffVersionHistoryDialogPage.getDocumentUrlInput()).toMatch('documentUrl');
        tariffVersionHistoryDialogPage.tariffSelectLastOption();
        tariffVersionHistoryDialogPage.save();
        expect(tariffVersionHistoryDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class TariffVersionHistoryComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-tariff-version-history div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class TariffVersionHistoryDialogPage {
    modalTitle = element(by.css('h4#myTariffVersionHistoryLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    effectiveDateInput = element(by.css('input#field_effectiveDate'));
    endDateInput = element(by.css('input#field_endDate'));
    documentUrlInput = element(by.css('input#field_documentUrl'));
    tariffSelect = element(by.css('select#field_tariff'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setEffectiveDateInput = function(effectiveDate) {
        this.effectiveDateInput.sendKeys(effectiveDate);
    };

    getEffectiveDateInput = function() {
        return this.effectiveDateInput.getAttribute('value');
    };

    setEndDateInput = function(endDate) {
        this.endDateInput.sendKeys(endDate);
    };

    getEndDateInput = function() {
        return this.endDateInput.getAttribute('value');
    };

    setDocumentUrlInput = function(documentUrl) {
        this.documentUrlInput.sendKeys(documentUrl);
    };

    getDocumentUrlInput = function() {
        return this.documentUrlInput.getAttribute('value');
    };

    tariffSelectLastOption = function() {
        this.tariffSelect
            .all(by.tagName('option'))
            .last()
            .click();
    };

    tariffSelectOption = function(option) {
        this.tariffSelect.sendKeys(option);
    };

    getTariffSelect = function() {
        return this.tariffSelect;
    };

    getTariffSelectedOption = function() {
        return this.tariffSelect.element(by.css('option:checked')).getText();
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
