import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('ExcludedPassthrough e2e test', () => {
    let navBarPage: NavBarPage;
    let excludedPassthroughDialogPage: ExcludedPassthroughDialogPage;
    let excludedPassthroughComponentsPage: ExcludedPassthroughComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load ExcludedPassthroughs', () => {
        navBarPage.goToEntity('excluded-passthrough');
        excludedPassthroughComponentsPage = new ExcludedPassthroughComponentsPage();
        expect(excludedPassthroughComponentsPage.getTitle()).toMatch(/billingWebApp.excludedPassthrough.home.title/);
    });

    it('should load create ExcludedPassthrough dialog', () => {
        excludedPassthroughComponentsPage.clickOnCreateButton();
        excludedPassthroughDialogPage = new ExcludedPassthroughDialogPage();
        expect(excludedPassthroughDialogPage.getModalTitle()).toMatch(/billingWebApp.excludedPassthrough.home.createOrEditLabel/);
        excludedPassthroughDialogPage.close();
    });

    it('should create and save ExcludedPassthroughs', () => {
        excludedPassthroughComponentsPage.clickOnCreateButton();
        excludedPassthroughDialogPage.setServiceTypeInput('serviceType');
        expect(excludedPassthroughDialogPage.getServiceTypeInput()).toMatch('serviceType');
        excludedPassthroughDialogPage.siteAccountSelectLastOption();
        excludedPassthroughDialogPage.save();
        expect(excludedPassthroughDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class ExcludedPassthroughComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-excluded-passthrough div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class ExcludedPassthroughDialogPage {
    modalTitle = element(by.css('h4#myExcludedPassthroughLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    serviceTypeInput = element(by.css('input#field_serviceType'));
    siteAccountSelect = element(by.css('select#field_siteAccount'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setServiceTypeInput = function(serviceType) {
        this.serviceTypeInput.sendKeys(serviceType);
    };

    getServiceTypeInput = function() {
        return this.serviceTypeInput.getAttribute('value');
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
