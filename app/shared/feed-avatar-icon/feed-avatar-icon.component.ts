import { Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges } from "@angular/core";
import { SteemService } from "./../../steem.service";

@Component({
    selector: "FeedAvatarIcon",
    moduleId: module.id,
    templateUrl: "./feed-avatar-icon.component.html",
    styleUrls: ["./feed-avatar-icon.component.scss"]
})
export class FeedAvatarIconComponent implements OnInit, OnChanges {
    @Input() src: string;

    avatarURL: string;
    placeholder: string;

    constructor() {
        this.placeholder = "res://ic_account_circle_white_48dp";
    }

    ngOnInit(): void {
        this.avatarURL = `https://steemitimages.com/u/${this.src}/avatar/small`;
    }

    ngOnChanges(changes: SimpleChanges) {
        const src: SimpleChange = changes.src;
        this.avatarURL = `https://steemitimages.com/u/${src.currentValue}/avatar/small`;
    }
}
