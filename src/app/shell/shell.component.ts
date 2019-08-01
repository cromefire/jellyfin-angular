import { AfterViewInit, Component, ViewChild } from "@angular/core";
import { MatSidenav } from "@angular/material";
import { Router } from "@angular/router";

@Component({
    selector: "jellyfin-shell",
    templateUrl: "./shell.component.html",
    styleUrls: ["./shell.component.scss"]
})
export class ShellComponent implements AfterViewInit {
    @ViewChild("#sidemenu", { static: false }) private sidemenu: MatSidenav;

    constructor(private router: Router) {}

    public ngAfterViewInit() {
        this.router.events.subscribe(() => {
            this.sidemenu.close();
        });
    }
}
