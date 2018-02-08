import { ICommonResponse } from "./common.interface";

export interface ITag {
    comments: number;
    name: string;
    net_votes: number;
    top_posts: number;
    total_payout: string;
    trending: string;
}

export type ITags = Array<ITag>;

export interface ITagResponse extends ICommonResponse {
    result: ITags;
}
