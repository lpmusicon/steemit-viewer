import { FeedMethods } from "./feed.interface";

export interface IFeedParams {
    limit: number;
    tag: string;
    start_author?: string;
    start_permlink?: string;
}

export interface IFeedRequest extends ISteemRequest {
    method: FeedMethods;
    params: Array<IFeedParams>;
}

export interface ISteemRequest {
    id: number;
    jsonrpc: string;
    method: string;
    params: Array<any>;
}
