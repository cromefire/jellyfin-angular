import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatRippleModule } from "@angular/material/core";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatTooltipModule } from "@angular/material/tooltip";
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
