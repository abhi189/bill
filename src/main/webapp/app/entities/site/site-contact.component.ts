import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Contact } from '../contact/contact.model';
import { ContactService } from '../contact/contact.service';

@Component({
    selector: 'jhi-site-contact',
    templateUrl: './site-contact.component.html'
})
export class SiteContactComponent implements OnInit, OnDestroy {
    @Input() siteContact;
    @Input() billingContact;
    @Input() franchiseContact;

    contacts: Contact[] = [];
    contact: Contact;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(private eventManager: JhiEventManager, private contactService: ContactService, private route: ActivatedRoute) {}

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            if (this.siteContact != null) {
                this.load(this.siteContact);
            }
            if (this.billingContact != null) {
                this.load(this.billingContact);
            }
            if (this.franchiseContact != null) {
                this.load(this.franchiseContact);
            }
        });

        this.registerChangeInContacts();
    }

    load(id) {
        this.contactService.find(id).subscribe((contactResponse: HttpResponse<Contact>) => {
            this.contact = contactResponse.body;
            if (this.contact != null) {
                this.contacts.push(this.contact);
            }
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInContacts() {
        this.eventSubscriber = this.eventManager.subscribe('contactListModification', response => this.load(this.contact.id));
    }
}
