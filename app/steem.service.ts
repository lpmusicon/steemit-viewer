import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";

import * as ApplicationSettings from "application-settings";
import { IAccounts } from "./steem/account.interface";
import { FeedMethods, IFeed } from "./steem/feed.interface";
import { IFeedParams } from "./steem/params.interface";
import { IPost } from "./steem/post.interface";

@Injectable()
export class SteemService {
    private static postElement: IPost;
    private static accountBackground: string;
    private steemitAPI: string;
    private currentLimit: number;

    constructor(private http: HttpClient) {
        this.steemitAPI = "https://api.steemit.com";
        this.currentLimit = 11;
    }

    getNew(tag: string = "", startAuthor: string = "", startPermlink: string = ""): Observable<IFeed> {
        const PARAMS: IFeedParams = {
            limit: this.currentLimit,
            tag
        };

        if (startAuthor.length > 0 && startPermlink.length > 0) {
            PARAMS.start_author = startAuthor;
            PARAMS.start_permlink = startPermlink;
        }

        return this.http.post<IFeed>(this.steemitAPI, {
            id: 2,
            jsonrpc: "2.0",
            method: FeedMethods.byCreated,
            params: [PARAMS]
        });
    }

    getTrending(tag: string = "", startAuthor: string = "", startPermlink: string = ""): Observable<IFeed> {
        const PARAMS: IFeedParams = {
            limit: this.currentLimit,
            tag
        };

        if (startAuthor.length > 0 && startPermlink.length > 0) {
            PARAMS.start_author = startAuthor;
            PARAMS.start_permlink = startPermlink;
        }

        return this.http.post<IFeed>(this.steemitAPI, {
            id: 2,
            jsonrpc: "2.0",
            method: FeedMethods.byTrending,
            params: [PARAMS]
        });
    }

    getHot(tag: string = "", startAuthor: string = "", startPermlink: string = ""): Observable<IFeed> {
        const PARAMS: IFeedParams = {
            limit: this.currentLimit,
            tag
        };

        if (startAuthor.length > 0 && startPermlink.length > 0) {
            PARAMS.start_author = startAuthor;
            PARAMS.start_permlink = startPermlink;
        }

        return this.http.post<IFeed>(this.steemitAPI, {
            id: 2,
            jsonrpc: "2.0",
            method: FeedMethods.byHot,
            params: [PARAMS]
        });
    }

    getFeed(startAuthor: string = "", startPermlink: string = ""): Observable<IFeed> {
        return this.http.post<IFeed>(this.steemitAPI, {
            id: 1,
            jsonrpc: "2.0",
            method: FeedMethods.byFeed,
            params: [{
                tag: this.getAccountName(),
                limit: this.currentLimit,
                start_author: startAuthor,
                start_permlink: startPermlink
            }]
        });
    }

    getAccount(account: string = ""): Observable<IAccounts> {
        return this.http.post<IAccounts>(this.steemitAPI, {
            id: 0,
            jsonrpc: "2.0",
            method: "call",
            params: [
                "database_api",
                "get_accounts",
                [[account]]
            ]
        });
    }

    setAccountName(account: string): void {
        ApplicationSettings.setString("accountName", account);
    }

    getAccountName(): string {
        return ApplicationSettings.getString("accountName", null);
    }

    setPost(feedElement: IPost): void {
        SteemService.postElement = feedElement;
    }

    getPost(): IPost {
        return SteemService.postElement;
    }

    setAccountBackground(bg: string): void {
        SteemService.accountBackground = bg;
    }

    getAccountBackground(): string {
        return SteemService.accountBackground;
    }

    resetAll(): void {
        ApplicationSettings.clear();
        SteemService.accountBackground = "";
    }
}
