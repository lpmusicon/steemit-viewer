export interface ICommonResponse {
    id: number;
    jsonrpc: string;
    result: any;
}

export enum FeedMethods {
    byCreated = "get_discussions_by_created",
    byTrending = "get_discussions_by_trending",
    byHot = "get_discussions_by_hot",
    byFeed = "get_discussions_by_feed",
    byBlog = "get_discussions_by_blog"
}

export enum MiscMethods {
    getTrendingTags = "get_trending_tags",
    call = "call",
    getAccountsReputation = ""
}

export type Methods = MiscMethods | FeedMethods;
