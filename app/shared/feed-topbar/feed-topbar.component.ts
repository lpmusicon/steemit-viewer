import { Component, Input, OnInit } from "@angular/core";
import { SteemService } from "./../../steem.service";

import { IPost } from "./../../steem/post.interface";
@Component({
    selector: "FeedTopbar",
    moduleId: module.id,
    templateUrl: "./feed-topbar.component.html",
    styleUrls: ["./feed-topbar.component.scss"]
})
export class FeedTopbarComponent implements OnInit {
    @Input() post: IPost;
    constructor() {
        //
    }
    ngOnInit(): void {
       //
    }
}
