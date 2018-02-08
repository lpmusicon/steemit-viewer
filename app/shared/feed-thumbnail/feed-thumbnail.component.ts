import { Component, Input, OnInit } from "@angular/core";

@Component({
    selector: "FeedThumbnail",
    moduleId: module.id,
    templateUrl: "./feed-thumbnail.component.html",
    styleUrls: ["./feed-thumbnail.component.scss"]
})
export class FeedThumbnailComponent {
    @Input() src: string;
}
