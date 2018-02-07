import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { PageRoute, RouterExtensions } from "nativescript-angular/router";
import { ListViewEventData } from "nativescript-pro-ui/listview";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-pro-ui/sidedrawer";
import { RadSideDrawerComponent } from "nativescript-pro-ui/sidedrawer/angular";
import { ObservableArray } from "tns-core-modules/data/observable-array/observable-array";
import { EventData } from "tns-core-modules/ui/editable-text-base/editable-text-base";
import { Observable } from "tns-core-modules/ui/frame/frame";
import { SteemService } from "./../../steem.service";
import { IFeed } from "./../../steem/feed.interface";
import { IPost } from "./../../steem/post.interface";
import { IRouteParams } from "./../route-params.interface";

@Component({
    selector: "Hot",
    moduleId: module.id,
    templateUrl: "./hot.component.html",
    styleUrls: ["./hot.component.scss"]
})
export class HotComponent implements OnInit {
    pageName: string;
    feed: ObservableArray<any>;
    currentTag: string;
    private _sideDrawerTransition: DrawerTransitionBase;
    @ViewChild("drawer") private drawerComponent: RadSideDrawerComponent;

    constructor(
        private steem: SteemService,
        private pageRoute: PageRoute,
        private routerExtensions: RouterExtensions) {
            this.pageName = "Hot";
        }

    ngOnInit(): void {
        this._sideDrawerTransition = new SlideInOnTopTransition();
        this.pageRoute.activatedRoute.subscribe((activatedRoute: ActivatedRoute) => {
            activatedRoute.params.subscribe((params: IRouteParams) => {
                this.currentTag = params.hasOwnProperty("tag") ? params.tag : "";
                this.getFeed();
            });
        });
    }

    get sideDrawerTransition(): DrawerTransitionBase {
        return this._sideDrawerTransition;
    }

    onDrawerButtonTap(): void {
        this.drawerComponent.sideDrawer.showDrawer();
    }

    onLoadMore(event: ListViewEventData): void {
        const lastFeed: IPost = this.feed.getItem(this.feed.length - 1);
        this.steem.getHot(this.currentTag, lastFeed.author, lastFeed.permlink).subscribe(
        (feed: IFeed) => {
            feed.result.forEach((element: IPost) => this.feed.push(element));
            event.object.notifyLoadOnDemandFinished();
        },
        (error: HttpErrorResponse) => {
            this.onDownloadError(error);
            event.object.notifyLoadOnDemandFinished();
        });
    }

    onClick(event: ListViewEventData): void {
        const index = event.index;
        const item: IPost = this.feed.getItem(index);
        this.steem.setPost(item);
        this.routerExtensions.navigate(["/post/", item.author, item.permlink, item.metadata.tags[0]]);
    }

    onTag(tag: string): void {
        this.routerExtensions.navigate(["/home/hot/", tag]);
    }

    onTagReset(): void {
        this.routerExtensions.navigate(["/home/hot"]);
    }

    private getFeed(): void {
        this.steem.getHot(this.currentTag).subscribe(
        (data: IFeed) => {
            this.feed = new ObservableArray(data.result);
        },
        (error: HttpErrorResponse) => this.onDownloadError(error));
    }

    private onDownloadError(error: HttpErrorResponse): void {
        console.log("Network status: ", error.status);
        console.log("for URL:", error.url);
    }
}
