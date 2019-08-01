import { Component, ViewChild } from "@angular/core";
import { AuthService } from "../auth.service";

@Component({
    selector: "jellyfin-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"]
})
export class LoginComponent {
    @ViewChild("username", { static: true }) private username: any;
    @ViewChild("password", { static: true }) private password: any;

    constructor(private authService: AuthService) {}

    public async login() {
        const username = this.username.nativeElement.value;
        const password = this.password.nativeElement.value;

        console.log("Logging in...");
        await this.authService.login(username, password);
    }
}
