import { AfterViewInit, Component, ViewChild } from "@angular/core";
import { MatSidenav } from "@angular/material/sidenav";
import { Router } from "@angular/router";

@Component({
    selector: "jellyfin-shell",
    templateUrl: "./shell.component.html",
    styleUrls: ["./shell.component.scss"]
})
export class ShellComponent implements AfterViewInit {
    @ViewChild("#sidemenu") private sidemenu: MatSidenav;

    constructor(private router: Router) {}

    public ngAfterViewInit() {
        this.router.events.subscribe(() => {
            if (this.sidemenu) {
                this.sidemenu.close();
            }
        });
    }
}
