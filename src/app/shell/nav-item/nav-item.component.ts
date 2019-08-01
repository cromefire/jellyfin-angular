import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: "jellyfin-nav-item",
    templateUrl: "./nav-item.component.html",
    styleUrls: ["./nav-item.component.scss"]
})
export class NavItemComponent {
    @Input("href") private href: string;
    @Input("icon") private icon: string;
    @Output("click") private onClick = new EventEmitter<MouseEvent>();

    constructor() {}
}
