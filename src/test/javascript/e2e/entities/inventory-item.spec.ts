import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('InventoryItem e2e test', () => {
    let navBarPage: NavBarPage;
    let inventoryItemDialogPage: InventoryItemDialogPage;
    let inventoryItemComponentsPage: InventoryItemComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load InventoryItems', () => {
        navBarPage.goToEntity('inventory-item');
        inventoryItemComponentsPage = new InventoryItemComponentsPage();
        expect(inventoryItemComponentsPage.getTitle()).toMatch(/billingWebApp.inventoryItem.home.title/);
    });

    it('should load create InventoryItem dialog', () => {
        inventoryItemComponentsPage.clickOnCreateButton();
        inventoryItemDialogPage = new InventoryItemDialogPage();
        expect(inventoryItemDialogPage.getModalTitle()).toMatch(/billingWebApp.inventoryItem.home.createOrEditLabel/);
        inventoryItemDialogPage.close();
    });

    it('should create and save InventoryItems', () => {
        inventoryItemComponentsPage.clickOnCreateButton();
        inventoryItemDialogPage.setNameInput('name');
        expect(inventoryItemDialogPage.getNameInput()).toMatch('name');
        inventoryItemDialogPage.setInstallDateInput('2000-12-31');
        expect(inventoryItemDialogPage.getInstallDateInput()).toMatch('2000-12-31');
        inventoryItemDialogPage.setBudderflyIdInput('budderflyId');
        expect(inventoryItemDialogPage.getBudderflyIdInput()).toMatch('budderflyId');
        inventoryItemDialogPage.save();
        expect(inventoryItemDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class InventoryItemComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-inventory-item div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class InventoryItemDialogPage {
    modalTitle = element(by.css('h4#myInventoryItemLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));
    installDateInput = element(by.css('input#field_installDate'));
    budderflyIdInput = element(by.css('input#field_budderflyId'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setNameInput = function(name) {
        this.nameInput.sendKeys(name);
    };

    getNameInput = function() {
        return this.nameInput.getAttribute('value');
    };

    setInstallDateInput = function(installDate) {
        this.installDateInput.sendKeys(installDate);
    };

    getInstallDateInput = function() {
        return this.installDateInput.getAttribute('value');
    };

    setBudderflyIdInput = function(budderflyId) {
        this.budderflyIdInput.sendKeys(budderflyId);
    };

    getBudderflyIdInput = function() {
        return this.budderflyIdInput.getAttribute('value');
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
