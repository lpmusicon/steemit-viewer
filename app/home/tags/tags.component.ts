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
import { ITag, ITagResponse } from "./../../steem/tag.interface";
import { IRouteParams } from "./../route-params.interface";

@Component({
    selector: "Tags",
    moduleId: module.id,
    templateUrl: "./tags.component.html",
    styleUrls: ["./tags.component.scss"]
})
export class TagsComponent implements OnInit {
    pageName: string;
    feed: ObservableArray<any>;
    currentTag: string;
    private _sideDrawerTransition: DrawerTransitionBase;
    @ViewChild("drawer") private drawerComponent: RadSideDrawerComponent;

    constructor(
        private steem: SteemService,
        private pageRoute: PageRoute,
        private settings: SettingsService,
        private routerExtensions: RouterExtensions) {
            this.pageName = "Tags";
        }

    ngOnInit(): void {
        this._sideDrawerTransition = new SlideInOnTopTransition();
        this.getFeed();
    }

    get sideDrawerTransition(): DrawerTransitionBase {
        return this._sideDrawerTransition;
    }

    onDrawerButtonTap(): void {
        this.drawerComponent.sideDrawer.showDrawer();
    }

    onClick(event: ListViewEventData): void {
        const index = event.index;
        const item: ITag = this.feed.getItem(index);
        this.routerExtensions.navigate(["/home/trending", item.name]);
    }

    private getFeed(): void {
        this.steem.getTags().subscribe(
        (data: ITagResponse) => {
            data.result.shift();
            this.feed = new ObservableArray(data.result);
        },
        (error: HttpErrorResponse) => this.onDownloadError(error));
    }

    private onDownloadError(error: HttpErrorResponse): void {
        console.log("Network status: ", error.status);
        console.log("for URL:", error.url);
    }
}
