import { Injectable } from "@angular/core";
import {
    ActivatedRouteSnapshot,
    CanActivate,
    CanActivateChild,
    CanLoad,
    Route,
    Router,
    RouterStateSnapshot
} from "@angular/router";
import { AuthService } from "./auth.service";

@Injectable({
    providedIn: "root"
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
    constructor(private authService: AuthService, private router: Router) {}

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const url: string = state.url;

        return this.checkLogin(url);
    }

    public canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.canActivate(childRoute, state);
    }

    public canLoad(route: Route) {
        const url = `/${route.path}`;

        return this.checkLogin(url);
    }

    public checkLogin(url: string): boolean {
        if (this.authService.token) {
            return true;
        }

        // Navigate to the login page with extras
        this.router.navigate(["/login"], { queryParams: { next: url } });
        return false;
    }
}
