import { Component, OnInit, ViewChild } from "@angular/core";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-pro-ui/sidedrawer";
import { RadSideDrawerComponent } from "nativescript-pro-ui/sidedrawer/angular";
import { RadListViewComponent } from "nativescript-pro-ui/listview/angular"
import { SteemService } from "./../../steem.service";
import { RouterExtensions } from "nativescript-angular/router";
import { Page } from "tns-core-modules/ui/page/page";
import { EventData } from "tns-core-modules/ui/core/view/view";
import { TextField } from "tns-core-modules/ui/text-field/text-field";
import { AccountInterface, AccountsInterface } from "./../../steem/account.interface";

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./first-run.component.html",
    styleUrls: ["./first-run.component.scss"]
})
export class FirstRunComponent implements OnInit {
    constructor(
        private page: Page,
        private steem: SteemService, 
        private routerExtensions: RouterExtensions) {}

    public username: string;

    ngOnInit(): void {
        this.page.backgroundImage = "res://bg";
        this.page.style.backgroundPosition = "center";
        this.page.style.backgroundSize = "cover";
        this.page.style.backgroundRepeat = "no-repeat";
    }

    public onSave(event: EventData): void {
        console.log('UN:', this.username);
        this.steem.getAccount(this.username.toLowerCase()).subscribe((result: AccountsInterface) => {
            const Accounts = result.result as AccountInterface[];
            if(Accounts.length > 0) {
                const Account = Accounts[0] as AccountInterface;
                Account.metadata = JSON.parse(Account.json_metadata);
                this.steem.setAccountBackground(Account.metadata.profile.cover_image);
                this.steem.setAccountName(this.username.toLowerCase());
                this.routerExtensions.navigate(['/home'], { clearHistory: true });
            } else {
                alert('User not found. Check spelling and try again');
            }
        }, (error) => {
            console.log('error');
        })
    }

    public onBlur(event: any) {
        const TextField = event.object as TextField;
        this.username = TextField.text;
    }
}
