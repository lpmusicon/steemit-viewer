import { Component, EventEmitter, Input, Output } from "@angular/core";
import { IPost } from "./../../steem/post.interface";

@Component({
    selector: "FeedTopbar",
    moduleId: module.id,
    templateUrl: "./feed-topbar.component.html",
    styleUrls: ["./feed-topbar.component.scss"]
})
export class FeedTopbarComponent  {
    @Input() post: IPost;
    @Output() account: EventEmitter<string>;
    @Output() tag: EventEmitter<string>;

    constructor() {
        this.account = new EventEmitter<string>();
        this.tag = new EventEmitter<string>();
    }

    onAccount(): void {
        this.account.emit(this.post.author);
    }

    onTag(): void {
        this.tag.emit(this.post.category);
    }
}
