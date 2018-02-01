import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-pro-ui/sidedrawer";
import { RadSideDrawerComponent } from "nativescript-pro-ui/sidedrawer/angular";
import { PageRoute } from "nativescript-angular/router";
import { SteemService } from './../steem.service';

import * as webViewModule from "tns-core-modules/ui/web-view";
import { WebView } from "tns-core-modules/ui/web-view";
import { FeedElementInterface } from "./../steem/feed.interface";

interface PostInterface {
    author: string;
    perm: string;
}

@Component({
    selector: "Post",
    moduleId: module.id,
    templateUrl: "./post.component.html",
    styleUrls: ['post.component.scss']
})
export class PostComponent implements OnInit {
    /* ***********************************************************
    * Use the @ViewChild decorator to get a reference to the drawer component.
    * It is used in the "onDrawerButtonTap" function below to manipulate the drawer.
    *************************************************************/
    @ViewChild("drawer") drawerComponent: RadSideDrawerComponent;
    @ViewChild('webView') webviewRef: ElementRef;

    private _sideDrawerTransition: DrawerTransitionBase;

    constructor(private pageRoute: PageRoute, private steem: SteemService) {}

    public Post: FeedElementInterface;
    public body: string;

    /* ***********************************************************
    * Use the sideDrawerTransition property to change the open/close animation of the drawer.
    *************************************************************/
    ngOnInit(): void {
        this._sideDrawerTransition = new SlideInOnTopTransition();
        this.pageRoute.activatedRoute.subscribe((Route) => {
            Route.params.subscribe((params: PostInterface) => {
                this.Post = this.steem.getPost();
                this.body = this.Post.body;
            })
        });
        this.body = `<html><head><script src="https://cdnjs.cloudflare.com/ajax/libs/showdown/1.8.6/showdown.min.js"></script><style>a {pointer-events:none;} html, body {margin: 0; width: 100vw; overflow-x: hidden; } img { display: block; width: 100%; height: auto; }</style></head><body>${this.body}</body><script>var converter = new showdown.Converter(); var test = converter.makeHtml(document.body.innerHTML); document.body.innerHTML = test;</script></html>`;
    }

    get sideDrawerTransition(): DrawerTransitionBase {
        return this._sideDrawerTransition;
    }

    /* ***********************************************************
    * According to guidelines, if you have a drawer on your page, you should always
    * have a button that opens it. Use the showDrawer() function to open the app drawer section.
    *************************************************************/
    onDrawerButtonTap(): void {
        this.drawerComponent.sideDrawer.showDrawer();
    }

    public onLoadStarted() {
        let webView = this.webviewRef.nativeElement as WebView;
        console.log('Android: ', webView.android);
        if(webView.android) {
            webView.android.getSettings().setDisplayZoomControls(false);
            webView.android.getSettings().setBuiltInZoomControls(false);
        }
    }
}
