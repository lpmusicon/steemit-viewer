import { IPost } from "./post.interface";

export interface IFeed {
    id: number;
    result: Array<IPost>;
}

export enum FeedMethods {
    byCreated = "get_discussions_by_created",
    byTrending = "get_discussions_by_trending",
    byHot = "get_discussions_by_hot",
    byFeed = "get_discussions_by_feed",
    byBlog = "get_discussions_by_blog"
}
