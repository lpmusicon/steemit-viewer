import { Component, Input, OnInit } from "@angular/core";
import { SteemService } from "./../../steem.service";

@Component({
    selector: "FeedThumbnail",
    moduleId: module.id,
    templateUrl: "./feed-thumbnail.component.html",
    styleUrls: ["./feed-thumbnail.component.scss"]
})
export class FeedThumbnailComponent implements OnInit {
    @Input() src: string;
    constructor() {
        //
    }
    ngOnInit(): void {
        //
    }
}
