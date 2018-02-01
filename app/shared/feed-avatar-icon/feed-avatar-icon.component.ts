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

    ngOnInit(): void {}

    constructor() {}
}
