export interface IAccountMetadataProfile {
    profile_image: string;
    name: string;
    cover_image: string;
    about: string;
}

export interface IAccountMetadata {
    profile: IAccountMetadataProfile;
}

export interface IAccount {
    id: number;
    name: string;
    json_metadata: string;
    reputation: string;
    // There-are-other-props-that-i-dont-need
    // app-generated
    metadata?: IAccountMetadata;
}

export interface IAccounts {
    id: number;
    result: Array<IAccount>;
}
