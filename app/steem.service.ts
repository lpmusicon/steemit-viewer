import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { DATA } from './steem.feed.data';
import { ACCOUNT } from './steem.account.data';

import { FeedInterface, FeedElementInterface } from './steem/feed.interface';
import { AccountsInterface } from './steem/account.interface';
import * as ApplicationSettings from "application-settings";

@Injectable()
export class SteemService
{
    constructor(private http: HttpClient) {}

    public getFeed(start_author: string = "", start_permlink: string = ""): Observable<FeedInterface>
    {
        return this.http.post<FeedInterface>('https://api.steemit.com', {
            "id": 1, 
            "jsonrpc":"2.0",
            "method": "get_discussions_by_feed",
            "params": [{
                "tag": "lpmusicon",
                "limit": 6,
                "start_author": start_author,
                "start_permlink": start_permlink
            }]
        });
    }

    public getAccount(account: string = ""): Observable<AccountsInterface>
    {
        return this.http.post<AccountsInterface>('https://api.steemit.com', {
            "id": 0,
            "jsonrpc": "2.0",
            "method": "call",
            "params": [
                "database_api",
                "get_accounts",
                [[account]]
            ]
        });
    }

    public setAccountName(account: string): void {
        ApplicationSettings.setString('accountName', account);
    }

    public getAccountName(): string {
        return ApplicationSettings.getString('accountName', null);
    }

    private static PostElement: FeedElementInterface;
    public setPost(FeedElement: FeedElementInterface): void
    {
        SteemService.PostElement = FeedElement;
    }

    public getPost(): FeedElementInterface
    {
        return SteemService.PostElement;
    }

    private static accountBackground: string;
    public setAccountBackground(bg: string): void {
        SteemService.accountBackground = bg;
    }

    public getAccountBackground(): string {
        return SteemService.accountBackground;
    }

    public getAuthorReputation(reputation: string): number
    {
        return Math.floor((Math.log10(parseInt(reputation)) - 9)*9+25);
    }

    public resetAll(): void {
        ApplicationSettings.clear();
        SteemService.accountBackground = "";
    }
}