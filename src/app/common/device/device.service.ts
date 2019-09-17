import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { Awaited } from "../../utils/types";

export interface CommonDeviceService {
    client: {
        getName(): Awaited<string>;
        getDevice(): Awaited<string>;
        getDeviceId(): Awaited<string>;
        getVersion(): Awaited<string>;
    };
}

@Injectable({
    providedIn: "root"
})
export class DeviceService implements CommonDeviceService {
    public readonly client = {
        getName() {
            return "Jellyfin angular";
        },
        getDevice() {
            return navigator.userAgent;
        },
        getDeviceId() {
            return btoa(navigator.userAgent);
        },
        getVersion() {
            return `${environment.versionInfo.version}-${environment.versionInfo.suffix}`;
        }
    };
}
