import { SessionInfo, User } from "./users";

export type Public = User[];

export interface AuthenticateRequest {
    Username: string;
    Pw: string;
}

export interface Authenticated {
    User: User;
    SessionInfo: SessionInfo;
    AccessToken: string;
    ServerId: string;
}
