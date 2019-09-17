import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Authenticated, AuthenticateRequest } from "../common/api/api";
import { ApiService } from "../common/api/api.service";

@Injectable({
    providedIn: "root"
})
export class AuthService {
    public token: string | null = null;
    public userId: string;

    // store the URL so we can redirect after logging in
    public redirectUrl: string;

    constructor(private apiService: ApiService, private router: Router) {
        const token = localStorage.getItem("jellyfin-token");
        const userId = localStorage.getItem("jellyfin-user-id");
        if (token && userId) {
            this.token = token;
            this.userId = userId;
        }
    }

    public async login(user: string, password: string): Promise<boolean> {
        const response = await this.apiService
            .post<AuthenticateRequest, Authenticated>("/emby/Users/authenticatebyname", {
                Username: user,
                Pw: password
            })
            .toPromise();

        // Store info
        this.token = response.AccessToken;
        localStorage.setItem("jellyfin-token", this.token);
        this.userId = response.User.Id;
        localStorage.setItem("jellyfin-user-id", this.userId);

        // Navigate back to where the user was
        this.router.navigateByUrl(this.redirectUrl || "/").then(() => {
            this.redirectUrl = null;
        });
        return true;
    }

    public logout(): void {
        this.token = null;
        this.userId = null;
        localStorage.removeItem("jellyfin-token");
        localStorage.removeItem("jellyfin-user-id");
    }
}
