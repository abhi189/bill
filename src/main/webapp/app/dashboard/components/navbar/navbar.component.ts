import { Component, EventEmitter, AfterViewInit, Input, Output, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { AccountService } from '../../../core/auth/account.service';
import { AuthServerProvider } from '../../../core/auth/auth-jwt.service';

@Component({
    selector: 'jhi-dashboard-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class DashboardNavbarComponent implements OnInit, AfterViewInit {
    @Output() toggleSideBar = new EventEmitter();
    @Input() hideSidebarToggle;
    public showUserDetails: boolean;
    constructor(
        private elm: ElementRef,
        private accountService: AccountService,
        private authServerProvider: AuthServerProvider,
        private router: Router
    ) {}

    ngAfterViewInit() {
        document.addEventListener('click', this.handleDocumentClick.bind(this));
    }

    handleDocumentClick(event) {
        if (this.showUserDetails) {
            const dropdown = this.elm.nativeElement.querySelector('.user-details');

            if (dropdown && !dropdown.contains(event.target)) {
                this.showUserDetails = false;
            }
        }
    }

    ngOnInit() {
        this.showUserDetails = false;
    }

    toggleSidebar() {
        this.toggleSideBar.next();
    }

    toggleUserDropDown() {
        this.showUserDetails = !this.showUserDetails;
    }

    logout() {
        if (this.accountService.isAuthenticated()) {
            this.authServerProvider.logout().subscribe(() => {
                this.accountService.authenticate(null);
                this.router.navigate(['']);
            });
        } else {
            this.accountService.authenticate(null);
            this.router.navigate(['']);
        }
    }
}
