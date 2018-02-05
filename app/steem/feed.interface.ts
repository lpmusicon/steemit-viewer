export interface IFeedElementMetadata {
    image?: Array<string>;
    thumbnail?: string;
    tags?: Array<string>;
}

export interface IFeedElement {
    id: number;
    author: string;
    permlink: string;
    category: string;
    parent_author: string;
    parent_permlink: string;
    title: string;
    body: string;
    json_metadata: string;
    last_update: string;
    created: string;
    active: string;
    last_payout: string;
    url: string;
    root_title: string;
    pending_payout_value: string;
    author_reputation: string;
    // ADDED BY APP
    thumbnail: string;
    metadata: IFeedElementMetadata;
    author_reputation_formatted?: number;
}

export interface IFeed {
    id: number;
    result: Array<IFeedElement>;
}
