import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { PageRoute } from "nativescript-angular/router";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-pro-ui/sidedrawer";
import { RadSideDrawerComponent } from "nativescript-pro-ui/sidedrawer/angular";
import * as SocialShare from "nativescript-social-share";
import { EventData } from "tns-core-modules/ui/editable-text-base/editable-text-base";
import * as webViewModule from "tns-core-modules/ui/web-view";
import { SettingsService } from "./../shared/settings.service";
import { SteemService } from "./../steem.service";
import { IPost } from "./../steem/post.interface";

interface IPostInterface {
    author: string;
    perm: string;
}

@Component({
    selector: "Post",
    moduleId: module.id,
    templateUrl: "./post.component.html",
    styleUrls: ["post.component.scss"]
})
export class PostComponent implements OnInit {
    /* ***********************************************************
    * Use the @ViewChild decorator to get a reference to the drawer component.
    * It is used in the "onDrawerButtonTap" function below to manipulate the drawer.
    *************************************************************/
    @ViewChild("drawer") drawerComponent: RadSideDrawerComponent;
    @ViewChild("webView") webviewRef: ElementRef;
    post: IPost;
    body: string;
    private uri: string;
    private _sideDrawerTransition: DrawerTransitionBase;
    constructor(
        private pageRoute: PageRoute,
        private settings: SettingsService,
        private steem: SteemService) {}

    /* ***********************************************************
    * Use the sideDrawerTransition property to change the open/close animation of the drawer.
    *************************************************************/
    ngOnInit(): void {
        this._sideDrawerTransition = new SlideInOnTopTransition();
        this.pageRoute.activatedRoute.subscribe((route) => {
            route.params.subscribe((params: IPostInterface) => {
                console.log(JSON.stringify(params));
                this.post = this.settings.currentPost;
                this.body = this.post.body;
            });
        });
        this.body = `<html><head>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/showdown/1.8.6/showdown.min.js"></script>
        <style>a {pointer-events:none;} html, body {margin: 0; width: 100vw; overflow-x: hidden; }
        img { display: block; width: 100%; height: auto; }</style></head>
        <body>${this.body}
        <script>document.body.innerHTML = (new showdown.Converter()).makeHtml(document.body.innerHTML);</script>
        </body></html>`;
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

    onShare(event: EventData) {
        console.log("Share");
        SocialShare.shareUrl("Hello Event", "TextShare", "Share via:");
    }

    onLoadStarted() {
        const webView = this.webviewRef.nativeElement as webViewModule.WebView;
        console.log("Android: ", webView.android);
        if (webView.android) {
            webView.android.getSettings().setDisplayZoomControls(false);
            webView.android.getSettings().setBuiltInZoomControls(false);
        }
    }
}
