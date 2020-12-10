import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('TariffName e2e test', () => {
    let navBarPage: NavBarPage;
    let tariffNameDialogPage: TariffNameDialogPage;
    let tariffNameComponentsPage: TariffNameComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load TariffNames', () => {
        navBarPage.goToEntity('tariff-name');
        tariffNameComponentsPage = new TariffNameComponentsPage();
        expect(tariffNameComponentsPage.getTitle()).toMatch(/billingWebApp.tariffName.home.title/);
    });

    it('should load create TariffName dialog', () => {
        tariffNameComponentsPage.clickOnCreateButton();
        tariffNameDialogPage = new TariffNameDialogPage();
        expect(tariffNameDialogPage.getModalTitle()).toMatch(/billingWebApp.tariffName.home.createOrEditLabel/);
        tariffNameDialogPage.close();
    });

    it('should create and save TariffNames', () => {
        tariffNameComponentsPage.clickOnCreateButton();
        tariffNameDialogPage.setUtilityCodeInput('utilityCode');
        expect(tariffNameDialogPage.getUtilityCodeInput()).toMatch('utilityCode');
        tariffNameDialogPage.setNameInput('name');
        expect(tariffNameDialogPage.getNameInput()).toMatch('name');
        tariffNameDialogPage.save();
        expect(tariffNameDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class TariffNameComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-tariff-name div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class TariffNameDialogPage {
    modalTitle = element(by.css('h4#myTariffNameLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    utilityCodeInput = element(by.css('input#field_utilityCode'));
    nameInput = element(by.css('input#field_name'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setUtilityCodeInput = function(utilityCode) {
        this.utilityCodeInput.sendKeys(utilityCode);
    };

    getUtilityCodeInput = function() {
        return this.utilityCodeInput.getAttribute('value');
    };

    setNameInput = function(name) {
        this.nameInput.sendKeys(name);
    };

    getNameInput = function() {
        return this.nameInput.getAttribute('value');
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
