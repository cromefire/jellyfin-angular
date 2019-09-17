import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ApiService } from "../../common/api/api.service";
import { AuthService } from "../auth.service";

@Component({
    selector: "jellyfin-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"]
})
export class LoginComponent {
    public loginForm = new FormGroup({
        // url: Temporary
        url: new FormControl(this.apiService.base, [Validators.required]),
        username: new FormControl("", [Validators.required]),
        password: new FormControl("", [Validators.required])
    });

    constructor(private authService: AuthService, public apiService: ApiService) {}

    public async login() {
        if (this.loginForm.valid) {
            const url = this.loginForm.value.url;
            this.apiService.base = url;
            localStorage.setItem("jellyfin-url", url);

            const username = this.loginForm.value.username;
            const password = this.loginForm.value.password;

            await this.authService.login(username, password);
        }
    }
}
