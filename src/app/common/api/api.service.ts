import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { retry } from "rxjs/operators";

@Injectable({
    providedIn: "root"
})
export class ApiService {
    public base: string;

    constructor(private http: HttpClient) {
        this.base = localStorage.getItem("jellyfin-url");
    }

    public get<Response>(
        url: string,
        token?: string,
        headers?: {
            [header: string]: string;
        }
    ): Promise<Response> {
        return this.http
            .get<Response>(this.assembleUrl(url), {
                headers
            })
            .pipe(retry(3))
            .toPromise();
    }

    public post<Request, Response>(
        url: string,
        request: Request,
        token?: string,
        headers?: {
            [header: string]: string;
        }
    ): Promise<Response> {
        headers = Object.assign(headers || {}, {
            "X-Emby-Authorization":
                'MediaBrowser Client="Jellyfin Web", Device="Firefox", DeviceId="TW96aWxsYS81LjAgKFgxMTsgVWJ1bnR1OyBMaW51eCB4ODZfNjQ7IHJ2OjY4LjApIEdlY2tvLzIwMTAwMTAxIEZpcmVmb3gvNjguMHwxNTYzMjcwNDg1ODE3", Version="10.3.7"',
            Accept: "application/json"
        });
        return this.http
            .post<Response>(this.assembleUrl(url), request, {
                headers
            })
            .toPromise();
    }

    private assembleUrl(url: string): string {
        const assembledUrl = new URL(this.base);
        assembledUrl.pathname = url;
        return assembledUrl.href;
    }
}
