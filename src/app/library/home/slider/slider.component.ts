import { AfterViewInit, Component, Input, ViewChild } from "@angular/core";
import { NguCarousel, NguCarouselConfig } from "@ngu/carousel";
import { TileItem } from "./tile/tile.component";

@Component({
    selector: "jellyfin-slider",
    templateUrl: "./slider.component.html",
    styleUrls: ["./slider.component.scss"]
})
export class SliderComponent implements AfterViewInit {
    @ViewChild(NguCarousel, { static: false }) public carousel: NguCarousel<any>;

    @Input() private tiles: TileItem[];
    private carouselConfig: NguCarouselConfig = {
        grid: { xs: 1, sm: 2, md: 4, lg: 5, all: 0 },
        slide: 1,
        speed: 250,
        load: 2,
        velocity: 0,
        point: {
            visible: false
        },
        touch: true,
        easing: "cubic-bezier(0, 0, 0.2, 1)"
    };

    public ngAfterViewInit(): void {
        console.log(this.carousel);
    }
}
