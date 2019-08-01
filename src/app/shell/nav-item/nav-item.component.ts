import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: "jellyfin-nav-item",
    templateUrl: "./nav-item.component.html",
    styleUrls: ["./nav-item.component.scss"]
})
export class NavItemComponent {
    @Input("href") public href: string;
    @Input("icon") public icon: string;
    @Output("click") public onClick = new EventEmitter<MouseEvent>();
}
