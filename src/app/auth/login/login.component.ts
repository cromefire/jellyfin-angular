import { STEPPER_GLOBAL_OPTIONS } from "@angular/cdk/stepper";
import { AfterContentInit, Component, ViewChild } from "@angular/core";
import {
    AbstractControl,
    FormControl,
    FormGroup,
    ValidationErrors,
    Validators
} from "@angular/forms";
import { MatStepper } from "@angular/material";
import { ApiService } from "../../common/api/api.service";
import { AuthService } from "../auth.service";

@Component({
    selector: "jellyfin-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"],
    providers: [
        {
            provide: STEPPER_GLOBAL_OPTIONS,
            useValue: { displayDefaultIndicatorType: false }
        }
    ]
})
export class LoginComponent implements AfterContentInit {
    public verifying = 0;
    // urlGroup: Temporary
    public urlGroup: FormGroup;
    public loginForm: FormGroup;
    public linear = false;
    public loggingIn = false;

    @ViewChild("stepper", { static: true }) private stepper: MatStepper;
    private verifyAbort = new AbortController();

    constructor(private authService: AuthService, public apiService: ApiService) {
        this.urlGroup = new FormGroup({
            url: new FormControl(
                this.apiService.base,
                [Validators.required],
                [this.verifyUrl.bind(this)]
            )
        });
        this.loginForm = new FormGroup({
            username: new FormControl("", [Validators.required]),
            password: new FormControl("", [Validators.required])
        });
    }

    public ngAfterContentInit() {
        if (this.apiService.base) {
            this.stepper.selectedIndex = 1;
        }
        this.linear = true;
    }

    public async login() {
        if (this.loginForm.valid) {
            const username = this.loginForm.value.username;
            const password = this.loginForm.value.password;

            this.loggingIn = true;
            try {
                await this.authService.login(username, password);
            } finally {
                this.loggingIn = false;
            }
        }
    }

    public serverUrl() {
        if (this.urlGroup.valid) {
            const url = this.urlGroup.value.url;

            this.apiService.base = url;
            localStorage.setItem("jellyfin-url", url);
        }
    }

    public async verifyUrl(control: AbstractControl): Promise<ValidationErrors | null> {
        // Clean up
        this.verifyAbort.abort();
        this.verifyAbort = new AbortController();

        let url: URL;
        try {
            url = new URL(control.value);
        } catch (e) {
            return { url: { msg: "Invalid url", error: e } };
        }
        url.pathname = "/emby/system/info/public";

        this.verifying++;
        try {
            const request = fetch(url.href, { signal: this.verifyAbort.signal });
            let response: Response;
            try {
                response = await request;
            } catch (e) {
                return { connection: { msg: "Connection error", error: e } };
            }

            if (!response.ok) {
                return { invalidServer: `Server returned status ${response.status}` };
            }

            try {
                await response.json();
            } catch {
                return { invalidServer: "Server returned no vaild json" };
            }

            return null;
        } finally {
            this.verifying--;
        }
    }
}
