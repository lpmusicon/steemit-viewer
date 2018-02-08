import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { PageRoute, RouterExtensions } from "nativescript-angular/router";
import { ListViewEventData } from "nativescript-pro-ui/listview";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-pro-ui/sidedrawer";
import { RadSideDrawerComponent } from "nativescript-pro-ui/sidedrawer/angular";
import { ObservableArray } from "tns-core-modules/data/observable-array/observable-array";
import { SettingsService } from "./../../shared/settings.service";
import { SteemService } from "./../../steem.service";
import { IFeed } from "./../../steem/feed.interface";
import { IPost } from "./../../steem/post.interface";
import { IRouteParams } from "./../route-params.interface";

@Component({
    selector: "Blog",
    moduleId: module.id,
    templateUrl: "./blog.component.html",
    styleUrls: ["./blog.component.scss"]
})
export class BlogComponent implements OnInit {
    @ViewChild("drawer") drawerComponent: RadSideDrawerComponent;
    pageName: string;
    feed: ObservableArray<any>;
    currentTag: string;
    title: string;
    private _sideDrawerTransition: DrawerTransitionBase;

    constructor(
        private steem: SteemService,
        private pageRoute: PageRoute,
        private settings: SettingsService,
        private routerExtensions: RouterExtensions) {
            this.pageName = "Blog";
        }

    ngOnInit(): void {
        this._sideDrawerTransition = new SlideInOnTopTransition();
        this.pageRoute.activatedRoute.subscribe((activatedRoute: ActivatedRoute) => {
            activatedRoute.params.subscribe((params: IRouteParams) => {
                this.currentTag = params.hasOwnProperty("tag") ? params.tag : this.settings.accountName;
                this.title = this.currentTag === this.settings.accountName ? "My Blog" : `${this.currentTag}'s blog`;
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

    onLoadMore(event: ListViewEventData) {
        const lastFromFeed: IPost = this.feed.getItem(this.feed.length - 1);
        this.steem.getBlog(this.currentTag, lastFromFeed.author, lastFromFeed.permlink).subscribe(
            (feed: IFeed) => {
                feed.result.forEach((element: IPost) => this.feed.push(element));
                event.object.notifyLoadOnDemandFinished();
            },
            (error) => {
                this.onDownloadError(error);
                event.object.notifyLoadOnDemandFinished();
        });
    }

    setPost(event: ListViewEventData) {
        const index = event.index;
        const item: IPost = this.feed.getItem(index);
        this.settings.currentPost = item;
        this.routerExtensions.navigate(["/post/", item.author, item.permlink]);
    }

    onTag(tag: string): void {
        this.routerExtensions.navigate(["/home/trending/", tag]);
    }

    onAuthor(author: string): void {
        this.routerExtensions.navigate(["/home/blog/", author]);
    }

    private getFeed(): void {
        this.steem.getBlog(this.currentTag).subscribe(
        (data: IFeed) => this.feed = new ObservableArray(data.result),
        (error: HttpErrorResponse) => this.onDownloadError(error));
    }

    private onDownloadError(error: HttpErrorResponse): void {
        console.log("Network status: ", error.status);
        console.log("for URL:", error.url);
    }
}
