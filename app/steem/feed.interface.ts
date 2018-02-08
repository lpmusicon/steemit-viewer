import { ICommonResponse } from "./common.interface";
import { IPost } from "./post.interface";

export interface IFeed extends ICommonResponse {
    result: Array<IPost>;
}
