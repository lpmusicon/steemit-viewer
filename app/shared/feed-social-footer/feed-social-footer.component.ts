import { Component, EventEmitter, Input, Output } from "@angular/core";
import { IPost } from "./../../steem/post.interface";

@Component({
    selector: "FeedSocialFooter",
    moduleId: module.id,
    templateUrl: "./feed-social-footer.component.html",
    styleUrls: ["./feed-social-footer.component.scss"]
})
export class FeedSocialFooterComponent {
    @Input() item: IPost;
    @Output() tap: EventEmitter<string>;

    constructor() {
        this.tap = new EventEmitter<string>();
    }

    onTap(tag: string) {
        this.tap.emit(tag);
    }
}
