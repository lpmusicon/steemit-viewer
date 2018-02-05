import { Component, OnInit, ViewChild } from "@angular/core";
import * as imageSource from "image-source";
import { RouterExtensions } from "nativescript-angular/router";
import { ListViewEventData } from "nativescript-pro-ui/listview";
import { RadListViewComponent } from "nativescript-pro-ui/listview/angular";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-pro-ui/sidedrawer";
import { RadSideDrawerComponent } from "nativescript-pro-ui/sidedrawer/angular";
import { ObservableArray } from "tns-core-modules/data/observable-array/observable-array";
import { Observable } from "tns-core-modules/ui/frame/frame";
import * as htmlViewModule from "tns-core-modules/ui/html-view";

import { EventData } from "tns-core-modules/ui/editable-text-base/editable-text-base";
import { SteemService } from "./../../steem.service";
import { IFeed, IFeedElement } from "./../../steem/feed.interface";
import { FeedUtilityService } from "./../feed-utility.service";

@Component({
    selector: "Hot",
    moduleId: module.id,
    templateUrl: "./hot.component.html",
    styleUrls: ["./hot.component.scss"]
})
export class HotComponent implements OnInit {
    @ViewChild("drawer") drawerComponent: RadSideDrawerComponent;
    pageName: string;
    currentFeed: ObservableArray<any>;
    currentTag: string;
    private _sideDrawerTransition: DrawerTransitionBase;

    constructor(
        private steem: SteemService,
        private feedUtility: FeedUtilityService,
        private routerExtensions: RouterExtensions) {
            this.pageName = "Hot";
            this.currentTag = "";
        }

    ngOnInit(): void {
        this._sideDrawerTransition = new SlideInOnTopTransition();
        this.getInitialFeed();
    }

    get sideDrawerTransition(): DrawerTransitionBase {
        return this._sideDrawerTransition;
    }

    onDrawerButtonTap(): void {
        this.drawerComponent.sideDrawer.showDrawer();
    }

    onLoadMore(event: ListViewEventData): void {
        const lastFromFeed = this.currentFeed.getItem(this.currentFeed.length - 1) as IFeedElement;
        this.steem.getHot(this.currentTag, lastFromFeed.author, lastFromFeed.permlink).subscribe(
        (feed: IFeed) => {
            feed.result.shift(); // Removing duplicate element
            this.feedUtility.formatFeedData(feed.result);
            feed.result.forEach((element: IFeedElement) => this.currentFeed.push(element));
            event.object.notifyLoadOnDemandFinished();
        }, (error) => {
            console.log("Error happend:", JSON.stringify(error));
            event.object.notifyLoadOnDemandFinished();
        });
    }

    onClick(event: ListViewEventData): void {
        const index = event.index;
        const item = this.currentFeed.getItem(index) as IFeedElement;
        this.steem.setPost(item);
        this.routerExtensions.navigate(["/post/", item.author, item.permlink, item.metadata.tags[0]]);
    }

    onTag(event: EventData, tag: string): void {
        this.currentTag = tag;
        this.getInitialFeed();
    }

    onTagReset(): void {
        this.currentTag = "";
        this.getInitialFeed();
    }

    private getInitialFeed(): void {
        this.steem.getHot(this.currentTag).subscribe((data: IFeed) => {
            this.feedUtility.formatFeedData(data.result);
            this.currentFeed = new ObservableArray(data.result);
        }, (error) => {
            console.log("BACK OFF");
        });
    }
}
