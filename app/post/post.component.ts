import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { PageRoute } from "nativescript-angular/router";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-pro-ui/sidedrawer";
import { RadSideDrawerComponent } from "nativescript-pro-ui/sidedrawer/angular";
import * as SocialShare from "nativescript-social-share";
import { EventData } from "tns-core-modules/ui/editable-text-base/editable-text-base";
import { WebView } from "tns-core-modules/ui/web-view/web-view";
import { SettingsService } from "./../shared/settings.service";
import { SteemService } from "./../steem.service";
import { IPost } from "./../steem/post.interface";
import { IStateResponse } from "./../steem/state.interface";

interface IPostInterface {
    author: string;
    perm: string;
    category: string;
}

interface IComment {
    body: string;
    replies: Array<IComment>;
}

@Component({
    selector: "Post",
    moduleId: module.id,
    templateUrl: "./post.component.html",
    styleUrls: ["post.component.scss"]
})
export class PostComponent implements OnInit {
    @ViewChild("drawer") drawerComponent: RadSideDrawerComponent;
    post: IPost;
    comments: Array<IPost>;
    body: string;
    loadedComments: boolean;
    private uri: string;
    private params: IPostInterface;
    private _sideDrawerTransition: DrawerTransitionBase;
    private temp: Array<Array<IPost>> = [];
    constructor(
        private pageRoute: PageRoute,
        private settings: SettingsService,
        private steem: SteemService) {
            this.comments = [];
            this.loadedComments = false;
        }

    sortByDepth(replies: Array<IPost>, depth: number): void {
        const depthArray: Array<IPost> = [];

        Object.keys(replies).forEach((key) => {
            const item: IPost = replies[key];
            if (item.depth === depth) {
                depthArray.push(item);
                delete replies[key];
            }
        });

        this.temp.push(depthArray);
    }

    addToReplies(depth: number) {
        const addingTo: Array<IPost> = this.temp[depth - 1];
        const beingAdded: Array<IPost> = this.temp[depth];

        Object.keys(addingTo).forEach((key) => {
            const item: IPost = addingTo[key];
            Object.keys(beingAdded).forEach((bKey) => {
                const bItem: IPost = beingAdded[bKey];

                if (item.replies.indexOf(`${bItem.author}/${bItem.permlink}`) >= 0) {
                    if (!item.hasOwnProperty("post_replies")) {
                        item.post_replies = [];
                    }
                    item.post_replies.push(bItem);
                    delete beingAdded[bKey];
                }
            });
        });
    }

    showComments() {
        const rootPath: string = `/${this.params.category}/@${this.params.author}/${this.params.perm}`;
        this.steem.getState(rootPath).subscribe(
        (res: IStateResponse) => {
            const obj: Array<IPost> =  res.result.content;
            let x = 0;
            while (Object.keys(obj).length > 0) {
                this.sortByDepth(obj,  x);
                x++;
            }

            this.sortByDepth(obj, 0);
            for (let i = (this.temp.length - 1); i > 0; i--) {
                this.addToReplies(i);
            }

            this.comments = this.temp[0][0].post_replies;
            this.loadedComments = true;
        });
    }

    ngOnInit(): void {
        this._sideDrawerTransition = new SlideInOnTopTransition();

        this.pageRoute.activatedRoute.subscribe((route) => {
            route.params.subscribe((params: IPostInterface) => {
                this.post = this.settings.currentPost;
                this.body = this.post.body;
                this.params = params;
            });
        });

        this.body = this.webView(this.body);
    }

    webView(body: string): string {
        // tslint:disable-next-line:max-line-length
        return `<html><head><script src="https://cdnjs.cloudflare.com/ajax/libs/showdown/1.8.6/showdown.min.js"></script><style>a {pointer-events:none;} html, body {margin: 0; width: 100vw; overflow-x: hidden; background: #11171a; color: #cccccc; } a:link { color: #cccccc } img { display: block; width: 100%; height: auto; }</style></head><body>${body}</body><script>document.body.innerHTML = (new showdown.Converter()).makeHtml(document.body.innerHTML);</script></html>`;
    }

    get sideDrawerTransition(): DrawerTransitionBase {
        return this._sideDrawerTransition;
    }

    onDrawerButtonTap(): void {
        this.drawerComponent.sideDrawer.showDrawer();
    }

    onShare(event: EventData) {
        SocialShare.shareUrl(
            `https://steemit.com/${this.params.category}/@${this.params.author}/${this.params.perm} via Steemit Viewer`,
            "via Steemit Viewer", "Share via:");
    }

    onWebLoad(args) {
        const webview: WebView = <WebView>args.object;
        if (webview.android) {
            webview.android.getSettings().setDisplayZoomControls(false);
            webview.android.getSettings().setBuiltInZoomControls(false);
        }
    }
}
