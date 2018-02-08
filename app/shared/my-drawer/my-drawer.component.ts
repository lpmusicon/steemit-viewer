import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { StackLayout } from "tns-core-modules/ui/layouts/stack-layout/stack-layout";
import { FeedUtilityService } from "./../../home/feed-utility.service";
import { SettingsService } from "./../../shared/settings.service";
import { SteemService } from "./../../steem.service";
import { IAccounts } from "./../../steem/account.interface";

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
        });

        this.settings.getAccountCover().subscribe((cover: string) => {
            this.backgroundURL = `url('${prefix}${cover}')`;
        });

        // this.steem.getAccount(this.settings.accountName).subscribe((res: IAccounts) => {
        //     this.account = res.result[0].name;
        //     this.reputation = this.feedUtility.getAuthorReputation(res.result[0].reputation);
        //     res.result[0].metadata = JSON.parse(res.result[0].json_metadata);
        //     const bg = `url('${prefix}${res.result[0].metadata.profile.cover_image}')`;
        //     this.backgroundURL = bg;
        //     this.settings.accountCover = res.result[0].metadata.profile.cover_image;
        //     this.avatarURL = `https://steemitimages.com/u/${this.account}/avatar`;
        // });
    }

    isPageSelected(pageTitle: string): boolean {
        return pageTitle === this.selectedPage;
    }
}
