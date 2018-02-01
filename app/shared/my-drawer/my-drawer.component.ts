import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { SteemService } from './../../steem.service';
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
    @ViewChild('background') background: StackLayout;

    public backgroundURL: string;

    ngOnInit(): void {
        this.steem.getAccount(this.steem.getAccountName()).subscribe((res: AccountsInterface) => {
            this.account = res.result[0].name;
            this.reputation = this.steem.getAuthorReputation(res.result[0].reputation);
            res.result[0].metadata = JSON.parse(res.result[0].json_metadata);
            const Prefix = "https://steemitimages.com/1024x256/";
            const Bg = `url('${Prefix}${res.result[0].metadata.profile.cover_image}')`;
            console.log('Magic:', Bg);
            this.background.backgroundImage = Bg;
            this.backgroundURL = Bg;
            console.log("BG: ",  this.background.backgroundImage);
        });
    }

    constructor(private steem: SteemService) {}
    public account: string;
    public reputation: number;

    isPageSelected(pageTitle: string): boolean {
        return pageTitle === this.selectedPage;
    }
}
