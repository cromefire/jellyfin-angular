import { Component, Input } from "@angular/core";

export interface TileItem {
    image: string;
    subtitle: string;
    year?: string;
}

@Component({
    selector: "jellyfin-tile",
    templateUrl: "./tile.component.html",
    styleUrls: ["./tile.component.scss"]
})
export class TileComponent {
    @Input() private item: TileItem;
}
