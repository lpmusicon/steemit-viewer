import { Component, OnInit, ViewChild } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { RadListViewComponent } from "nativescript-pro-ui/listview/angular";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-pro-ui/sidedrawer";
import { RadSideDrawerComponent } from "nativescript-pro-ui/sidedrawer/angular";
import { EventData } from "tns-core-modules/ui/core/view/view";
import { Page } from "tns-core-modules/ui/page/page";
import { TextField } from "tns-core-modules/ui/text-field/text-field";
import { SettingsService } from "./../../shared/settings.service";
import { SteemService } from "./../../steem.service";
import { IAccount, IAccounts } from "./../../steem/account.interface";

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./first-run.component.html",
    styleUrls: ["./first-run.component.scss"]
})
export class FirstRunComponent implements OnInit {
    username: string;

    constructor(
        private page: Page,
        private steem: SteemService,
        private settings: SettingsService,
        private routerExtensions: RouterExtensions) {}

    ngOnInit(): void {
        this.page.background = "#11171a";
        // this.page.style.backgroundPosition = "center";
        // this.page.style.backgroundSize = "cover";
        // this.page.style.backgroundRepeat = "no-repeat";
        this.page.actionBarHidden = true;
    }

    onSave(event: EventData): void {
        this.steem.getAccount(this.username.toLowerCase()).subscribe((result: IAccounts) => {
            const accounts: Array<IAccount> = result.result;
            if (accounts.length > 0) {
                const account: IAccount = accounts[0];
                account.metadata = JSON.parse(account.json_metadata);
                this.settings.accountName = this.username.toLowerCase();
                this.settings.accountCover = account.metadata.profile.cover_image;
                this.routerExtensions.navigate(["/home"], { clearHistory: true });
            } else {
                alert("User not found. Check spelling and try again");
            }
        }, (error) => {
            console.log("error");
        });
    }

    onBlur(event: any) {
        const textField: TextField = event.object;
        this.username = textField.text;
    }
}
