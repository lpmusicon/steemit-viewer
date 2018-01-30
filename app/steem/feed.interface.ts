export interface FeedElementMetadata {
    image?: string[];
    thumbnail?: string;
}

export interface FeedElementInterface {
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
    //ADDED BY APP
    thumbnail: string;
    metadata: FeedElementMetadata
    author_reputation_formatted?: number;
}

export interface FeedInterface {
    id: number;
    result: FeedElementInterface[];
}