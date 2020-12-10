import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Tariff e2e test', () => {
    let navBarPage: NavBarPage;
    let tariffDialogPage: TariffDialogPage;
    let tariffComponentsPage: TariffComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Tariffs', () => {
        navBarPage.goToEntity('tariff');
        tariffComponentsPage = new TariffComponentsPage();
        expect(tariffComponentsPage.getTitle()).toMatch(/billingWebApp.tariff.home.title/);
    });

    it('should load create Tariff dialog', () => {
        tariffComponentsPage.clickOnCreateButton();
        tariffDialogPage = new TariffDialogPage();
        expect(tariffDialogPage.getModalTitle()).toMatch(/billingWebApp.tariff.home.createOrEditLabel/);
        tariffDialogPage.close();
    });

    it('should create and save Tariffs', () => {
        tariffComponentsPage.clickOnCreateButton();
        tariffDialogPage.setUtilityProviderKeyInput('utilityProviderKey');
        expect(tariffDialogPage.getUtilityProviderKeyInput()).toMatch('utilityProviderKey');
        tariffDialogPage.setTariffNameInput('tariffName');
        expect(tariffDialogPage.getTariffNameInput()).toMatch('tariffName');
        tariffDialogPage.statusSelectLastOption();
        tariffDialogPage.save();
        expect(tariffDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class TariffComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-tariff div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class TariffDialogPage {
    modalTitle = element(by.css('h4#myTariffLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    utilityProviderKeyInput = element(by.css('input#field_utilityProviderKey'));
    tariffNameInput = element(by.css('input#field_tariffName'));
    statusSelect = element(by.css('select#field_status'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setUtilityProviderKeyInput = function(utilityProviderKey) {
        this.utilityProviderKeyInput.sendKeys(utilityProviderKey);
    };

    getUtilityProviderKeyInput = function() {
        return this.utilityProviderKeyInput.getAttribute('value');
    };

    setTariffNameInput = function(tariffName) {
        this.tariffNameInput.sendKeys(tariffName);
    };

    getTariffNameInput = function() {
        return this.tariffNameInput.getAttribute('value');
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
