import { Component, Input, OnInit } from "@angular/core";
import { SteemService } from './../../steem.service';
import { AccountsInterface } from "./../../steem/account.interface";

@Component({
    selector: "FeedAvatarIcon",
    moduleId: module.id,
    templateUrl: "./feed-avatar-icon.component.html",
    styleUrls: ["./feed-avatar-icon.component.scss"]
})
export class FeedAvatarIconComponent implements OnInit {
    @Input() src: string;

    public avatarURL: string;
    public placeholder: string;

    public ngOnInit(): void {
        this.avatarURL = `https://steemitimages.com/u/${this.src}/avatar`;;
    }

    constructor() {
        this.placeholder = "res://ic_account_circle_white_48dp";
        this.avatarURL = "";
    }
}
