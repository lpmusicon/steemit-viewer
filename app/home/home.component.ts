import { Component, OnInit, ViewChild } from "@angular/core";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-pro-ui/sidedrawer";
import { RadSideDrawerComponent } from "nativescript-pro-ui/sidedrawer/angular";
import { RadListViewComponent } from "nativescript-pro-ui/listview/angular"
import * as htmlViewModule from "tns-core-modules/ui/html-view";

import { SteemService } from "./../steem.service";
import { ObservableArray } from "tns-core-modules/data/observable-array/observable-array";
import * as imageSource from "image-source";
import { FeedInterface, FeedElementInterface } from './../steem/feed.interface';
import { ListViewEventData } from "nativescript-pro-ui/listview";
import { Observable } from "tns-core-modules/ui/frame/frame";
import { RouterExtensions } from "nativescript-angular/router";

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
    constructor(private steem: SteemService, private routerExtensions: RouterExtensions) {}
    public currentFeed: ObservableArray<any>;
    /* ***********************************************************
    * Use the @ViewChild decorator to get a reference to the drawer component.
    * It is used in the "onDrawerButtonTap" function below to manipulate the drawer.
    *************************************************************/
    @ViewChild("drawer") drawerComponent: RadSideDrawerComponent;

    private _sideDrawerTransition: DrawerTransitionBase;

    private formatFeedData(feed: FeedElementInterface[]): void
    {
        feed.forEach((feedElement: FeedElementInterface) => {
            feedElement.author_reputation_formatted = this.steem.getAuthorReputation(feedElement.author_reputation);
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

    ngOnInit(): void {
        this._sideDrawerTransition = new SlideInOnTopTransition();
        this.steem.getFeed().subscribe((data: FeedInterface) => {
            this.formatFeedData(data.result);
            this.currentFeed = new ObservableArray(data.result);
        })
    }

    get sideDrawerTransition(): DrawerTransitionBase {
        return this._sideDrawerTransition;
    }

    onDrawerButtonTap(): void {
        this.drawerComponent.sideDrawer.showDrawer();
    }

    public onLoadMoreItemsRequested(event: ListViewEventData) {
        console.log('LOAD MORE');
        const LastFromFeed = this.currentFeed.getItem(this.currentFeed.length - 1) as FeedElementInterface;
        console.log('Author: ', LastFromFeed.author, 'PermLink: ', LastFromFeed.permlink);
        this.steem.getFeed(LastFromFeed.author, LastFromFeed.permlink).subscribe((feed: FeedInterface) => {
            //Removing duplicate element
            feed.result.shift();
            this.formatFeedData(feed.result);
            feed.result.forEach((element: FeedElementInterface) => {
                this.currentFeed.push(element);
            });
            event.object.notifyLoadOnDemandFinished();
            console.log('Finished: ', this.currentFeed.length);
        }, (error) => {
            console.log('WTF');
            console.log(JSON.stringify(error));
            event.object.notifyLoadOnDemandFinished();
        });
    }

    public setPost(event: ListViewEventData) {
        const Index = event.index;
        const Item = this.currentFeed.getItem(Index) as FeedElementInterface;
        this.steem.setPost(Item);
        console.log('Post SET');
        this.routerExtensions.navigate(['/post/', Item.author, Item.permlink]);
    }
}
