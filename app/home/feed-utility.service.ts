import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { FeedElementInterface } from './../steem/feed.interface';
import { SteemService } from './../steem.service';

@Injectable()
export class FeedUtilityService
{
    public constructor(
        private steem: SteemService
    ) {}

    public getAuthorReputation(reputation: string): number
    {
        const rep = parseInt(reputation);
        const absRep = Math.abs(rep);
        let out = Math.log10(absRep);
        if (isNaN(out)) out = 0;
        out = Math.max(out - 9, 0);

        if(rep < 0) {
            console.log('Negative', out);
            out *= -1;
        }
        out = out * 9 + 25;
        out = Math.floor(out);
        return out;
    }

    public formatFeedData(feed: FeedElementInterface[]): void
    {
        feed.forEach((feedElement: FeedElementInterface) => {
            feedElement.author_reputation_formatted = this.getAuthorReputation(feedElement.author_reputation);
            let FoundThumbnail = false;

            const MarkdownImageRegex = /!\[.*?\]\((.*?)\)/;
            const MarkdownImage = feedElement.body.match(MarkdownImageRegex);
            if(MarkdownImage !== null && MarkdownImage.hasOwnProperty('1')) {
                feedElement.thumbnail = MarkdownImage[1];
                FoundThumbnail = true;
            }

            if(!FoundThumbnail) {
                const HtmlImageRegex = /<img.*?src=['"](.*?)['"]/;
                const HtmlImage = feedElement.body.match(HtmlImageRegex);
                if(HtmlImage !== null && HtmlImage.hasOwnProperty('1')) {
                    feedElement.thumbnail = HtmlImage[1];
                    FoundThumbnail = true;
                }
            }

            feedElement.metadata = JSON.parse(feedElement.json_metadata);
            if(!FoundThumbnail) {
                if(feedElement.metadata.hasOwnProperty('image')) {
                    feedElement.thumbnail = feedElement.metadata.image[0];
                    FoundThumbnail = true;
                } else if(feedElement.metadata.hasOwnProperty('thumbnail')) {
                    feedElement.thumbnail = feedElement.metadata.thumbnail;
                    FoundThumbnail = true;
                }
            }

            if(!FoundThumbnail) {
                console.log('No Image for', feedElement.title);
                feedElement.thumbnail = "";
            }

            feedElement.thumbnail = feedElement.thumbnail.replace(/^http:\/\//i, 'https://');
        });
    }
}