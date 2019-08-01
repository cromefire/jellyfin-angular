import { Component, ViewChild } from "@angular/core";
import { ApiService } from "../../common/api/api.service";
import { AuthService } from "../auth.service";

@Component({
    selector: "jellyfin-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"]
})
export class LoginComponent {
    @ViewChild("url", { static: false }) private url: any;
    @ViewChild("username", { static: true }) private username: any;
    @ViewChild("password", { static: true }) private password: any;

    constructor(private authService: AuthService, public apiService: ApiService) {}

    public async login() {
        // Temporary
        if (!this.apiService.base) {
            const url = this.url.nativeElement.value;
            this.apiService.base = url;
            localStorage.setItem("jellyfin-url", url);
        }
        const username = this.username.nativeElement.value;
        const password = this.password.nativeElement.value;

        await this.authService.login(username, password);
    }
}
