import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Provider e2e test', () => {
    let navBarPage: NavBarPage;
    let providerDialogPage: ProviderDialogPage;
    let providerComponentsPage: ProviderComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Providers', () => {
        navBarPage.goToEntity('provider');
        providerComponentsPage = new ProviderComponentsPage();
        expect(providerComponentsPage.getTitle()).toMatch(/billingWebApp.provider.home.title/);
    });

    it('should load create Provider dialog', () => {
        providerComponentsPage.clickOnCreateButton();
        providerDialogPage = new ProviderDialogPage();
        expect(providerDialogPage.getModalTitle()).toMatch(/billingWebApp.provider.home.createOrEditLabel/);
        providerDialogPage.close();
    });

    it('should create and save Providers', () => {
        providerComponentsPage.clickOnCreateButton();
        providerDialogPage.setNameInput('name');
        expect(providerDialogPage.getNameInput()).toMatch('name');
        providerDialogPage.save();
        expect(providerDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class ProviderComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-provider div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class ProviderDialogPage {
    modalTitle = element(by.css('h4#myProviderLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

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
