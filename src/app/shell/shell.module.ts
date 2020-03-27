import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import {
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    MatIconModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRippleModule,
    MatTooltipModule
} from "@angular/material";
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { SliderComponent } from "../common/slider/slider.component";

import { HomeComponent } from "../library/home/home.component";
import { MoviesComponent } from "../library/movies/movies.component";
import { ShellRoutingModule } from "./shell-routing.module";

@NgModule({
    declarations: [HomeComponent, SliderComponent, MoviesComponent],
    imports: [
        CommonModule,
        ShellRoutingModule,
        MatCardModule,
        MatButtonModule,
        MatRippleModule,
        MatProgressSpinnerModule,
        InfiniteScrollModule,
        MatTooltipModule,
        MatProgressBarModule,
        MatIconModule,
        MatGridListModule
    ],
    bootstrap: []
})
export class ShellModule {}
