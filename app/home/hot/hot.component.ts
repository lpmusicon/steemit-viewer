import { Component, OnInit, ViewChild } from "@angular/core";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-pro-ui/sidedrawer";
import { RadSideDrawerComponent } from "nativescript-pro-ui/sidedrawer/angular";
import { RadListViewComponent } from "nativescript-pro-ui/listview/angular"
import { ListViewEventData } from "nativescript-pro-ui/listview";
import { Observable } from "tns-core-modules/ui/frame/frame";
import { RouterExtensions } from "nativescript-angular/router";
import { ObservableArray } from "tns-core-modules/data/observable-array/observable-array";
import * as imageSource from "image-source";
import * as htmlViewModule from "tns-core-modules/ui/html-view";

import { SteemService } from "./../../steem.service";
import { FeedInterface, FeedElementInterface } from './../../steem/feed.interface';
import { FeedUtilityService } from './../feed-utility.service';
import { EventData } from "tns-core-modules/ui/editable-text-base/editable-text-base";

@Component({
    selector: "Hot",
    moduleId: module.id,
    templateUrl: "./hot.component.html",
    styleUrls: ["./hot.component.scss"]
})
export class HotComponent implements OnInit {
    @ViewChild("drawer") drawerComponent: RadSideDrawerComponent;
    public pageName: string;
    public currentFeed: ObservableArray<any>;
    public currentTag: string;
    private _sideDrawerTransition: DrawerTransitionBase;

    constructor(
        private steem: SteemService,
        private feedUtility: FeedUtilityService,
        private routerExtensions: RouterExtensions) {
            this.pageName = "Hot";
            this.currentTag = "";
        }

    public ngOnInit(): void {
        this._sideDrawerTransition = new SlideInOnTopTransition();
        this.getInitialFeed();
    }

    private getInitialFeed(): void {
        this.steem.getHot(this.currentTag).subscribe((data: FeedInterface) => {
            this.feedUtility.formatFeedData(data.result);
            this.currentFeed = new ObservableArray(data.result);
        });
    }

    public get sideDrawerTransition(): DrawerTransitionBase {
        return this._sideDrawerTransition;
    }

    public onDrawerButtonTap(): void {
        this.drawerComponent.sideDrawer.showDrawer();
    }

    public onLoadMore(event: ListViewEventData): void {
        const LastFromFeed = this.currentFeed.getItem(this.currentFeed.length - 1) as FeedElementInterface;
        this.steem.getHot(this.currentTag, LastFromFeed.author, LastFromFeed.permlink).subscribe((feed: FeedInterface) => {
            feed.result.shift(); //Removing duplicate element
            this.feedUtility.formatFeedData(feed.result);
            feed.result.forEach((element: FeedElementInterface) => this.currentFeed.push(element));
            event.object.notifyLoadOnDemandFinished();
        }, (error) => {
            console.log('Error happend:', JSON.stringify(error));
            event.object.notifyLoadOnDemandFinished();
        });
    }

    public onClick(event: ListViewEventData): void {
        const Index = event.index;
        const Item = this.currentFeed.getItem(Index) as FeedElementInterface;
        this.steem.setPost(Item);
        this.routerExtensions.navigate(['/post/', Item.author, Item.permlink]);
    }

    public onTag(event: EventData, tag: string): void {
        this.currentTag = tag;
        this.getInitialFeed();
    }

    public onTagReset(): void {
        this.currentTag = "";
        this.getInitialFeed();
    }
}
