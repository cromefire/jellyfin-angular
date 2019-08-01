import { Condition } from "./misc";

export interface TranscodingProfile {
    Container: string;
    Type: string;
    VideoCodec?: string;
    AudioCodec: string;
    Protocol: string;
    EstimateContentLength: boolean;
    EnableMpegtsM2TsMode: boolean;
    TranscodeSeekInfo: string;
    CopyTimestamps: boolean;
    Context: string;
    EnableSubtitlesInManifest: boolean;
    MaxAudioChannels?: string;
    MinSegments: number;
    SegmentLength: number;
    BreakOnNonKeyFrames: boolean;
}

export interface DirectPlayProfile {
    Container: string;
    AudioCodec?: string;
    VideoCodec?: string;
    Type: string;
}

export interface CodecProfile {
    Type: string;
    Conditions: Condition[];
    ApplyConditions: Condition[];
    Codec: string;
}

export interface ResponseProfile {
    Container: string;
    Type: string;
    MimeType: string;
    Conditions: Condition[];
}

export interface SubtitleProfile {
    Format: string;
    Method: string;
}

export interface DeviceProfile {
    EnableAlbumArtInDidl: boolean;
    EnableSingleAlbumArtLimit: boolean;
    EnableSingleSubtitleLimit: boolean;
    SupportedMediaTypes: string;
    MaxAlbumArtWidth: number;
    MaxAlbumArtHeight: number;
    MaxStreamingBitrate: number;
    MaxStaticBitrate: number;
    MusicStreamingTranscodingBitrate: number;
    MaxStaticMusicBitrate: number;
    TimelineOffsetSeconds: number;
    RequiresPlainVideoItems: boolean;
    RequiresPlainFolders: boolean;
    EnableMSMediaReceiverRegistrar: boolean;
    IgnoreTranscodeByteRangeRequests: boolean;
    XmlRootAttributes: any[];
    DirectPlayProfiles: DirectPlayProfile[];
    TranscodingProfiles: TranscodingProfile[];
    ContainerProfiles: any[];
    CodecProfiles: CodecProfile[];
    ResponseProfiles: ResponseProfile[];
    SubtitleProfiles: SubtitleProfile[];
}

export interface Capabilities {
    Id: string;
    PlayableMediaTypes: string[];
    SupportedCommands: string[];
    SupportsMediaControl: boolean;
    SupportsContentUploading: boolean;
    SupportsPersistentIdentifier: boolean;
    SupportsSync: boolean;
    DeviceProfile: DeviceProfile;
    IconUrl: string;
}
