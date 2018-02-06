import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { SteemService } from "./../../steem.service";
import { IFeedElement } from "./../../steem/feed.interface";
@Component({
    selector: "FeedSocialFooter",
    moduleId: module.id,
    templateUrl: "./feed-social-footer.component.html",
    styleUrls: ["./feed-social-footer.component.scss"]
})
export class FeedSocialFooterComponent implements OnInit {
    @Input() item: IFeedElement;
    @Output() tap: EventEmitter<string>;
    constructor() {
        this.tap = new EventEmitter<string>();
    }
    ngOnInit(): void {
        //
    }

    onTap(tag: string) {
        this.tap.emit(tag);
    }
}
