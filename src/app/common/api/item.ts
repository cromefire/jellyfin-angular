export interface UserData {
    PlaybackPositionTicks: number;
    PlayCount: number;
    IsFavorite: boolean;
    LastPlayedDate: string;
    Played: boolean;
    Key: string;
}

export interface Item {
    Name: string;
    ServerId: string;
    Id: string;
    HasSubtitles: boolean;
    Container: string;
    PremiereDate: string;
    CriticRating: number;
    OfficialRating: string;
    CommunityRating: number;
    RunTimeTicks: string;
    IsFolder: boolean;
    UserData: UserData;
    PrimaryAspectRatio: number;
    VideoType: string;
    MediaSourceCount: number;
    ImageTags: { [imageType: string]: string };
    BackdropImageTags?: string[];
    LocationType: string;
    MediaType: string;
}
