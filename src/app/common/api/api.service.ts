import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material";
import { from, Observable, throwError } from "rxjs";
import { catchError, retry, switchMap } from "rxjs/operators";
import { AuthService } from "../../auth/auth.service";
import { DeviceService } from "../device/device.service";

// General interface
export interface RequestOptions {
    headers?: { [header: string]: string };
    query?: { [key: string]: string };
}

export async function assembleAuthHeader(deviceService: DeviceService, token?: string) {
    const clientInfo = deviceService.client;

    const query: { [key: string]: string } = {
        Client: await clientInfo.getName(),
        Device: await clientInfo.getDevice(),
        DeviceId: await clientInfo.getDeviceId(),
        Version: await clientInfo.getVersion()
    };

    if (token) {
        query.Token = token;
    }

    const queryString = Object.entries(query)
        .map(([key, value]) => `${key}="${value}"`)
        .join(", ");

    return `MediaBrowser ${queryString}`;
}

export abstract class CommonApiService {
    public base: string;

    protected constructor(protected deviceService: DeviceService) {}

    public abstract get<Response>(url: string, options?: RequestOptions): Observable<Response>;

    public abstract post<Request, Response>(
        url: string,
        request: Request,
        options?: RequestOptions
    ): Observable<Response>;

    public assembleUrl(url: string, query?: { [key: string]: string }): string {
        const assembledUrl = new URL(url, this.base);
        if (query) {
            for (const [key, value] of Object.entries(query)) {
                assembledUrl.searchParams.append(key, value);
            }
        }
        return assembledUrl.href;
    }
}

// Web specific service
@Injectable({
    providedIn: "root"
})
export class ApiService extends CommonApiService {
    constructor(
        private http: HttpClient,
        deviceService: DeviceService,
        private snackBar: MatSnackBar,
        private authService: AuthService
    ) {
        super(deviceService);
        this.base = localStorage.getItem("jellyfin-url");
        if (this.base) {
            const preconnect = document.createElement("link");
            preconnect.rel = "preconnect";
            preconnect.href = this.base;
            document.head.append(preconnect);
        }
    }

    public get<Response>(url: string, options: RequestOptions = {}): Observable<Response> {
        return from(assembleAuthHeader(this.deviceService, this.authService.token)).pipe(
            switchMap(
                (authHeader): Observable<Response> => {
                    const headers = Object.assign(options.headers || {}, {
                        "X-Emby-Authorization": authHeader,
                        Accept: "application/json"
                    });
                    return this.http.get<Response>(this.assembleUrl(url, options.query), {
                        headers
                    });
                }
            ),
            retry(3),
            catchError(error => {
                if (error.status === 401) {
                    this.snackBar
                        .open("Error: Token invalid", "Login again", {
                            duration: 10000
                        })
                        .onAction()
                        .subscribe(() => {
                            return this.authService.logout();
                        });
                } else {
                    this.snackBar.open("Error while loading data", null, {
                        duration: 5000
                    });
                }
                return throwError(error);
            })
        );
    }

    public post<Request, Response>(
        url: string,
        request: Request,
        options: RequestOptions = {}
    ): Observable<Response> {
        return from(assembleAuthHeader(this.deviceService, this.authService.token)).pipe(
            switchMap(authHeader => {
                const headers = Object.assign(options.headers || {}, {
                    "X-Emby-Authorization": authHeader,
                    Accept: "application/json"
                });
                return this.http.post<Response>(this.assembleUrl(url, options.query), request, {
                    headers
                });
            })
        );
    }
}
