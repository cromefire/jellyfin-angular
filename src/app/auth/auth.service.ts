import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { from } from "rxjs";
import { switchMap } from "rxjs/operators";
import { Authenticated, AuthenticateRequest } from "../common/api/api";
import { DeviceService } from "../common/device/device.service";
import { assembleAuthHeader } from "../utils/api-helpers";

@Injectable({
    providedIn: "root"
})
export class AuthService {
    public token: string | null = null;
    public userId: string;

    constructor(
        private http: HttpClient,
        private router: Router,
        private deviceService: DeviceService
    ) {
        const token = localStorage.getItem("jellyfin-token");
        const userId = localStorage.getItem("jellyfin-user-id");
        if (token && userId) {
            this.token = token;
            this.userId = userId;
        }
    }

    public async login(serverUrl: string, user: string, password: string): Promise<boolean> {
        const request: AuthenticateRequest = {
            Username: user,
            Pw: password
        };

        const url = new URL(serverUrl);
        url.pathname = `${url.pathname}/Users/authenticatebyname`;

        const response = await from(assembleAuthHeader(this.deviceService))
            .pipe(
                switchMap(authHeader => {
                    const headers = {
                        "X-Emby-Authorization": authHeader,
                        Accept: "application/json"
                    };
                    return this.http.post<Authenticated>(url.href, request, {
                        headers
                    });
                })
            )
            .toPromise();

        // Store info
        this.token = response.AccessToken;
        localStorage.setItem("jellyfin-token", this.token);
        this.userId = response.User.Id;
        localStorage.setItem("jellyfin-user-id", this.userId);
        return true;
    }

    public logout(): Promise<boolean> {
        this.token = null;
        this.userId = null;
        localStorage.removeItem("jellyfin-token");
        localStorage.removeItem("jellyfin-user-id");
        return this.router.navigate(["/login"], {
            queryParams: {
                next: this.router.url
            }
        });
    }

    public get loggedIn() {
        if (this.userId && this.token) {
            return true;
        }
    }
}
