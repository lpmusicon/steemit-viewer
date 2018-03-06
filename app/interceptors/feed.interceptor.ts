import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";
import { FeedUtilityService } from "./../home/feed-utility.service";
import { FeedMethods } from "./../steem/common.interface";
import { IFeed } from "./../steem/feed.interface";
import { IFeedParams } from "./../steem/params.interface";

@Injectable()
export class FeedInterceptor implements HttpInterceptor {

    constructor(private feed: FeedUtilityService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (Object.values(FeedMethods).indexOf(req.body.method) >= 0) {
            return next.handle(req).map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    const params: IFeedParams = req.body.params[0];
                    const feed: IFeed = event.body;
                    if (params.hasOwnProperty("start_author") && params.start_author.length > 0) {
                        feed.result.shift();
                    }
                    this.feed.formatFeedData(feed.result);
                }

                return event;
        });
        } else {
            return next.handle(req);
        }
    }
}
