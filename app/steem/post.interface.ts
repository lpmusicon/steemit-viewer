type VoterName = string;

export interface IPost {
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
    active_votes: Array<IPostVote>;
    last_payout: string;
    url: string;
    root_title: string;
    pending_payout_value: string;
    author_reputation: string;
    // ADDED BY APP
    thumbnail: string;
    metadata: IPostMetadata;
    author_reputation_formatted?: number;
}
export interface IPostVote {
    voter: VoterName;
    weight: number;
    rshares: number;
    percent: number;
    reputation: number;
    time: Date;
}

export interface IPostMetadata {
    image?: Array<string>;
    thumbnail?: string;
    tags?: Array<string>;
}
