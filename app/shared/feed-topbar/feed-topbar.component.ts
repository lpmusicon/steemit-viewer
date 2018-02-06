import { Component, Input, OnInit } from "@angular/core";
import { SteemService } from "./../../steem.service";

import { IFeedElement } from "./../../steem/feed.interface";
@Component({
    selector: "FeedTopbar",
    moduleId: module.id,
    templateUrl: "./feed-topbar.component.html",
    styleUrls: ["./feed-topbar.component.scss"]
})
export class FeedTopbarComponent implements OnInit {
    @Input() post: IFeedElement;
    constructor() {
        //
    }
    ngOnInit(): void {
       //
    }
}
