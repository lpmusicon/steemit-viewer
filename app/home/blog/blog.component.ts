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
    feed: ObservableArray<IPost>;
    tag: string;
    title: string;
    private _sideDrawerTransition: DrawerTransitionBase;

    constructor(
        private steem: SteemService,
        private pageRoute: PageRoute,
        private settings: SettingsService,
        private routerExtensions: RouterExtensions) {
            this.pageName = "Blog";
            this.feed = new ObservableArray<IPost>();
        }

    ngOnInit(): void {
        this._sideDrawerTransition = new SlideInOnTopTransition();
        this.pageRoute.activatedRoute.subscribe((activatedRoute: ActivatedRoute) => {
            activatedRoute.params.subscribe((params: IRouteParams) => {
                this.tag = params.hasOwnProperty("tag") ? params.tag : this.settings.accountName;
                this.title = this.tag === this.settings.accountName ? "My Blog" : `${this.tag}'s blog`;
                this.getFeed();
            });
        });
    }

    get sideDrawerTransition(): DrawerTransitionBase {
        return this._sideDrawerTransition;
    }

    onMenuTap(): void {
        this.drawerComponent.sideDrawer.showDrawer();
    }

    onLoadMore(event: ListViewEventData): void {
        const lastPost: IPost = this.feed.getItem(this.feed.length - 1);
        this.steem.getBlog(this.tag, lastPost.author, lastPost.permlink).subscribe(
            (feed: IFeed) => {
                feed.result.forEach((element: IPost) => this.feed.push(element));
                event.object.notifyLoadOnDemandFinished();
            },
            (error) => {
                this.onDownloadError(error);
                event.object.notifyLoadOnDemandFinished();
        });
    }

    setPost(event: ListViewEventData): void {
        const index = event.index;
        const item: IPost = this.feed.getItem(index);
        this.settings.currentPost = item;
        this.routerExtensions.navigate(["/post/", item.author, item.permlink, item.category]);
    }

    onTag(tag: string): void {
        this.routerExtensions.navigate(["/home/trending/", tag]);
    }

    onAuthor(author: string): void {
        this.routerExtensions.navigate(["/home/blog/", author]);
    }

    templateSelector(item: IPost, index: number, items: Array<IPost>): string {
        return item.thumbnail === "" ? "no-image" : "image";
    }

    private getFeed(): void {
        this.steem.getBlog(this.tag).subscribe(
        (data: IFeed) => data.result.forEach((el: IPost) => this.feed.push(el)),
        (error: HttpErrorResponse) => this.onDownloadError(error));
    }

    private onDownloadError(error: HttpErrorResponse): void {
        console.log("Network status: ", error.status);
        console.log("for URL:", error.url);
    }
}
