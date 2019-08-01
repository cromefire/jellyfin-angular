import { Capabilities } from "./device";

export interface UserConfiguration {
    AudioLanguagePreference?: string;
    PlayDefaultAudioTrack: boolean;
    SubtitleLanguagePreference?: string;
    DisplayMissingEpisodes: boolean;
    GroupedFolders: string[];
    SubtitleMode: string;
    DisplayCollectionsView: boolean;
    EnableLocalPassword: boolean;
    OrderedViews: string[];
    LatestItemsExcludes: string[];
    MyMediaExcludes: string[];
    HidePlayedInLatest: boolean;
    RememberAudioSelections: boolean;
    RememberSubtitleSelections: boolean;
    EnableNextEpisodeAutoPlay: boolean;
}

export interface UserPolicy {
    IsAdministrator: boolean;
    IsHidden: boolean;
    IsDisabled: boolean;
    BlockedTags: [];
    EnableUserPreferenceAccess: boolean;
    AccessSchedules: [];
    BlockUnratedItems: [];
    EnableRemoteControlOfOtherUsers: boolean;
    EnableSharedDeviceControl: boolean;
    EnableRemoteAccess: boolean;
    EnableLiveTvManagement: boolean;
    EnableLiveTvAccess: boolean;
    EnableMediaPlayback: boolean;
    EnableAudioPlaybackTranscoding: boolean;
    EnableVideoPlaybackTranscoding: boolean;
    EnablePlaybackRemuxing: boolean;
    EnableContentDeletion: boolean;
    EnableContentDeletionFromFolders: string[];
    EnableContentDownloading: boolean;
    EnableSyncTranscoding: boolean;
    EnableMediaConversion: boolean;
    EnabledDevices: string[];
    EnableAllDevices: boolean;
    EnabledChannels: string[];
    EnableAllChannels: boolean;
    EnabledFolders: string[];
    EnableAllFolders: boolean;
    InvalidLoginAttemptCount: number;
    LoginAttemptsBeforeLockout: number;
    EnablePublicSharing: boolean;
    RemoteClientBitrateLimit: number;
    AuthenticationProviderId: string;
}

export interface User {
    Name: string;
    ServerId: string;
    Id: string;
    HasPassword: boolean;
    HasConfiguredPassword: boolean;
    HasConfiguredEasyPassword: boolean;
    LastLoginDate: string;
    LastActivityDate: string;
    Configuration: UserConfiguration;
    Policy: UserPolicy;
    PrimaryImageTag?: string;
    PrimaryImageAspectRatio?: number;
}

export interface PlayState {
    CanSeek: boolean;
    IsPaused: boolean;
    IsMuted: boolean;
    RepeatMode: string;
}

export interface SessionInfo {
    PlayState: PlayState;
    AdditionalUsers: [];
    Capabilities: Capabilities;
    RemoteEndPoint: string;
    PlayableMediaTypes: string[];
    Id: string;
    UserId: string;
    UserName: string;
    Client: string;
    LastActivityDate: string;
    LastPlaybackCheckIn: string;
    DeviceName: string;
    DeviceId: string;
    ApplicationVersion: string;
    SupportedCommands: string[];
    IsActive: boolean;
    SupportsMediaControl: boolean;
    SupportsRemoteControl: boolean;
    HasCustomDeviceName: boolean;
    ServerId: string;
}
