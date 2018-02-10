import { Component, Input, OnInit } from "@angular/core";
import { WebView } from "tns-core-modules/ui/web-view/web-view";
import { IPost } from "./../../steem/post.interface";

@Component({
    selector: "FeedComment",
    moduleId: module.id,
    templateUrl: "./feed-comment.component.html",
    styleUrls: ["./feed-comment.component.scss"]
})
export class FeedCommentComponent {
    @Input() comments: Array<IPost>;

    webView(body: string): string {
        // tslint:disable-next-line:max-line-length
        return `<html><head><script src="https://cdnjs.cloudflare.com/ajax/libs/showdown/1.8.6/showdown.min.js"></script><style>a {pointer-events:none;} html, body {margin: 0; width: 100vw; overflow-x: hidden; background: #11171a; color: #cccccc; } a:link { color: #cccccc } img { display: block; width: 100%; height: auto; }</style></head><body>${body}</body><script>document.body.innerHTML = (new showdown.Converter()).makeHtml(document.body.innerHTML);</script></html>`;
    }

    webViewLoaded(args) {
        const webview: WebView = <WebView>args.object;
        if (webview.android) {
            webview.android.getSettings().setDisplayZoomControls(false);
            webview.android.getSettings().setBuiltInZoomControls(false);
        }
    }
}
