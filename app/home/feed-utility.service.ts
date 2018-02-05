import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";

import { SteemService } from "./../steem.service";
import { IFeedElement } from "./../steem/feed.interface";

@Injectable()
export class FeedUtilityService {
    constructor(
        private steem: SteemService
    ) {}

    getAuthorReputation(reputation: string): number {
        const rep = parseInt(reputation, 10);
        const absRep = Math.abs(rep);
        let out = Math.log10(absRep);
        if (isNaN(out)) {
            out = 0;
        }
        out = Math.max(out - 9, 0);

        if (rep < 0) {
            out *= -1;
        }
        out = out * 9 + 25;
        out = Math.floor(out);

        return out;
    }

    formatFeedData(feed: Array<IFeedElement>): void {
        feed.forEach((feedElement: IFeedElement) => {
            feedElement.author_reputation_formatted = this.getAuthorReputation(feedElement.author_reputation);
            let foundThumbnail = false;

            const markdownImageRegex = /!\[.*?\]\((.*?)\)/;
            const markdownImage = feedElement.body.match(markdownImageRegex);
            if (markdownImage !== null && markdownImage.hasOwnProperty("1")) {
                feedElement.thumbnail = markdownImage[1];
                foundThumbnail = true;
            }

            if (!foundThumbnail) {
                const htmlImageRegex = /<img.*?src=['"](.*?)['"]/;
                const htmlImage = feedElement.body.match(htmlImageRegex);
                if (htmlImage !== null && htmlImage.hasOwnProperty("1")) {
                    feedElement.thumbnail = htmlImage[1];
                    foundThumbnail = true;
                }
            }

            feedElement.metadata = JSON.parse(feedElement.json_metadata);
            if (!foundThumbnail) {
                if (feedElement.metadata.hasOwnProperty("image")) {
                    feedElement.thumbnail = feedElement.metadata.image[0];
                    foundThumbnail = true;
                } else if (feedElement.metadata.hasOwnProperty("thumbnail")) {
                    feedElement.thumbnail = feedElement.metadata.thumbnail;
                    foundThumbnail = true;
                }
            }

            if (!foundThumbnail) {
                console.log("No Image for", feedElement.title);
                feedElement.thumbnail = "";
            }

            feedElement.thumbnail = feedElement.thumbnail.replace(/^http:\/\//i, "https://");
        });
    }
}
