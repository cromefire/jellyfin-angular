import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import {
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatRippleModule,
    MatTooltipModule
} from "@angular/material";
import { InfiniteScrollModule } from "ngx-infinite-scroll";

import { HomeComponent } from "../library/home/home.component";
import { SliderComponent } from "../library/home/slider/slider.component";
import { ShellRoutingModule } from "./shell-routing.module";

@NgModule({
    declarations: [HomeComponent, SliderComponent],
    imports: [
        CommonModule,
        ShellRoutingModule,
        MatCardModule,
        MatButtonModule,
        MatRippleModule,
        MatProgressSpinnerModule,
        InfiniteScrollModule,
        MatTooltipModule
    ],
    bootstrap: []
})
export class ShellModule {}
