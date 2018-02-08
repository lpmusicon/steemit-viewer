import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { StackLayout } from "tns-core-modules/ui/layouts/stack-layout/stack-layout";
import { FeedUtilityService } from "./../../home/feed-utility.service";
import { SettingsService } from "./../../shared/settings.service";
import { SteemService } from "./../../steem.service";
import { IAccount, IAccounts } from "./../../steem/account.interface";

/* ***********************************************************
* Keep data that is displayed in your app drawer in the MyDrawer component class.
* Add new data objects that you want to display in the drawer here in the form of properties.
*************************************************************/
@Component({
    selector: "MyDrawer",
    moduleId: module.id,
    templateUrl: "./my-drawer.component.html",
    styleUrls: ["./my-drawer.component.scss"]
})
export class MyDrawerComponent implements OnInit {
    @Input() selectedPage: string;

    backgroundURL: string;
    avatarPlaceholder: string;
    avatarURL: string;
    account: string;
    reputation: number;

    constructor(
        private steem: SteemService,
        private settings: SettingsService,
        private feedUtility: FeedUtilityService) {
            this.avatarPlaceholder = "res://ic_account_circle_white_48dp";
        }

    ngOnInit(): void {
        const prefix = "https://steemitimages.com/1024x256/";
        // Get rep by get_by_reputation
        this.settings.getAccountName().subscribe((accountName: string) => {
            this.account = accountName;
            this.avatarURL = `https://steemitimages.com/u/${accountName}/avatar`;

            this.steem.getAccount(this.settings.accountName).subscribe((res: IAccounts) => {
                const account: IAccount = res.result[0];
                account.metadata = JSON.parse(account.json_metadata);

                this.reputation = this.feedUtility.getAuthorReputation(account.reputation);
                this.backgroundURL = `url('${prefix}${account.metadata.profile.cover_image}')`;
                this.avatarURL = `https://steemitimages.com/u/${this.account}/avatar`;

                this.settings.accountCover = account.metadata.profile.cover_image;
            });
        });

        this.settings.getAccountCover().subscribe((cover: string) => {
            this.backgroundURL = `url('${prefix}${cover}')`;
        });
    }

    isPageSelected(pageTitle: string): boolean {
        return pageTitle === this.selectedPage;
    }
}
