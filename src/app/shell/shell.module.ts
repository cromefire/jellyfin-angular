import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatButtonModule, MatCardModule, MatRippleModule } from "@angular/material";
import { NguCarouselModule } from "@ngu/carousel";

import { HomeComponent } from "../library/home/home.component";
import { SliderComponent } from "../library/home/slider/slider.component";
import { TileComponent } from "../library/home/slider/tile/tile.component";
import { ShellRoutingModule } from "./shell-routing.module";

@NgModule({
    declarations: [HomeComponent, SliderComponent, TileComponent],
    imports: [
        CommonModule,
        ShellRoutingModule,
        MatCardModule,
        NguCarouselModule,
        MatButtonModule,
        MatRippleModule
    ],
    bootstrap: []
})
export class ShellModule {}
