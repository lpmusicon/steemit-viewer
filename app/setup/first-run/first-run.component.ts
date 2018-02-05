import { Component, OnInit, ViewChild } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { RadListViewComponent } from "nativescript-pro-ui/listview/angular";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-pro-ui/sidedrawer";
import { RadSideDrawerComponent } from "nativescript-pro-ui/sidedrawer/angular";
import { EventData } from "tns-core-modules/ui/core/view/view";
import { Page } from "tns-core-modules/ui/page/page";
import { TextField } from "tns-core-modules/ui/text-field/text-field";
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
        private routerExtensions: RouterExtensions) {}

    ngOnInit(): void {
        this.page.backgroundImage = "res://bg";
        this.page.style.backgroundPosition = "center";
        this.page.style.backgroundSize = "cover";
        this.page.style.backgroundRepeat = "no-repeat";
        this.page.actionBarHidden = true;
    }

    onSave(event: EventData): void {
        console.log("UN:", this.username);
        this.steem.getAccount(this.username.toLowerCase()).subscribe((result: IAccounts) => {
            const accounts = result.result as Array<IAccount>;
            if (accounts.length > 0) {
                const account = accounts[0] as IAccount;
                account.metadata = JSON.parse(account.json_metadata);
                this.steem.setAccountBackground(account.metadata.profile.cover_image);
                this.steem.setAccountName(this.username.toLowerCase());
                this.routerExtensions.navigate(["/home"], { clearHistory: true });
            } else {
                alert("User not found. Check spelling and try again");
            }
        }, (error) => {
            console.log("error");
        });
    }

    onBlur(event: any) {
        const textField = event.object as TextField;
        this.username = textField.text;
    }
}
