import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { SteemService } from './../../steem.service';
import { FeedUtilityService } from './../../home/feed-utility.service';
import { AccountsInterface } from "./../../steem/account.interface";
import { StackLayout } from "tns-core-modules/ui/layouts/stack-layout/stack-layout";

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

    public backgroundURL: string;
    public avatarPlaceholder: string;
    public avatarURL: string;
    public account: string;
    public reputation: number;

    public ngOnInit(): void {
        this.steem.getAccount(this.steem.getAccountName()).subscribe((res: AccountsInterface) => {
            this.account = res.result[0].name;
            this.reputation = this.feedUtility.getAuthorReputation(res.result[0].reputation);
            res.result[0].metadata = JSON.parse(res.result[0].json_metadata);
            const Prefix = "https://steemitimages.com/1024x256/";
            const Bg = `url('${Prefix}${res.result[0].metadata.profile.cover_image}')`;
            this.backgroundURL = Bg;
            this.avatarURL = `https://steemitimages.com/u/${this.account}/avatar`;
        });
    }

    constructor(
        private steem: SteemService, 
        private feedUtility: FeedUtilityService) {
            this.avatarPlaceholder = "res://ic_account_circle_white_48dp";
        }
   

    isPageSelected(pageTitle: string): boolean {
        return pageTitle === this.selectedPage;
    }
}
