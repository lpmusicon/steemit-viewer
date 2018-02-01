import { Component, Input, OnInit } from "@angular/core";
import { SteemService } from './../../steem.service';
import { AccountsInterface } from "./../../steem/account.interface";

@Component({
    selector: "FeedThumbnail",
    moduleId: module.id,
    templateUrl: "./feed-thumbnail.component.html",
    styleUrls: ["./feed-thumbnail.component.scss"]
})
export class FeedThumbnailComponent implements OnInit {
    @Input() src: string;

    ngOnInit(): void {}

    constructor() {}
}
