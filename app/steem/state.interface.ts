import { IAccount } from "./account.interface";
import { IPost } from "./post.interface";

export interface IStateResponse {
    id: number;
    result: IStateResult;
}

export interface IStateResult {
    accounts: Array<IAccount>;
    content: Array<IPost>;
    current_route: string;
}
