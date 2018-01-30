export interface AccountMetadataProfileInterface {
    profile_image: string;
    name: string;
    cover_image: string;
    about: string;
}

export interface AccountMetadataInterface {
    profile: AccountMetadataProfileInterface;
}

export interface AccountInterface {
    id: number;
    name: string;
    json_metadata: string;
    reputation: string;
    //There-are-other-props-that-i-dont-need
    //app-generated
    metadata?: AccountMetadataInterface;
}

export interface AccountsInterface {
    id: number;
    result: AccountInterface[];
}