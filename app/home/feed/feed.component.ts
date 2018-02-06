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

import { SteemService } from "./../../steem.service";
import { IFeed, IFeedElement } from "./../../steem/feed.interface";
import { FeedUtilityService } from "./../feed-utility.service";

@Component({
    selector: "Feed",
    moduleId: module.id,
    templateUrl: "./feed.component.html",
    styleUrls: ["./feed.component.scss"]
})
export class FeedComponent implements OnInit {
    @ViewChild("drawer") drawerComponent: RadSideDrawerComponent;
    pageName: string;
    currentFeed: ObservableArray<any>;
    private _sideDrawerTransition: DrawerTransitionBase;

    constructor(
        private steem: SteemService,
        private feedUtility: FeedUtilityService,
        private routerExtensions: RouterExtensions) {
            this.pageName = "Feed";
        }

    ngOnInit(): void {
        this._sideDrawerTransition = new SlideInOnTopTransition();
        this.steem.getFeed().subscribe((data: IFeed) => {
            this.feedUtility.formatFeedData(data.result);
            this.currentFeed = new ObservableArray(data.result);
        }, (error) => {
            console.log("Error");
        });
    }

    get sideDrawerTransition(): DrawerTransitionBase {
        return this._sideDrawerTransition;
    }

    onDrawerButtonTap(): void {
        this.drawerComponent.sideDrawer.showDrawer();
    }

    onLoadMore(event: ListViewEventData) {
        const lastFromFeed = this.currentFeed.getItem(this.currentFeed.length - 1) as IFeedElement;
        this.steem.getFeed(lastFromFeed.author, lastFromFeed.permlink).subscribe((feed: IFeed) => {
            feed.result.shift(); // Removing duplicate element
            this.feedUtility.formatFeedData(feed.result);
            feed.result.forEach((element: IFeedElement) => {
                this.currentFeed.push(element);
            });
            event.object.notifyLoadOnDemandFinished();
        }, (error) => {
            console.log("Error", JSON.stringify(error));
            event.object.notifyLoadOnDemandFinished();
        });
    }

    setPost(event: ListViewEventData) {
        const index = event.index;
        const item = this.currentFeed.getItem(index) as IFeedElement;
        this.steem.setPost(item);
        this.routerExtensions.navigate(["/post/", item.author, item.permlink]);
    }
}
