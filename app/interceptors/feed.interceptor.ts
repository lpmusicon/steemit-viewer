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
import { FeedMethods, IFeed } from "./../steem/feed.interface";
import { IFeedParams, IFeedRequest, ISteemRequest } from "./../steem/params.interface";

@Injectable()
export class FeedInterceptor implements HttpInterceptor {

    constructor(private feed: FeedUtilityService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const requestBody: ISteemRequest =  req.body;
        const isFeed = Object.values(FeedMethods).indexOf(requestBody.method) >= 0 ? true : false;

        return next.handle(req).map((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse && isFeed) {
                const body: IFeedRequest = req.body;
                const params: IFeedParams = body.params[0];
                const feed: IFeed = event.body;
                if (params.hasOwnProperty("start_author") && params.start_author.length > 0) {
                    feed.result.shift();
                }
                this.feed.formatFeedData(feed.result);
            }

            return event;
    });
  }
}
