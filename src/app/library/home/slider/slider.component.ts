import { Component, ElementRef, ViewChild } from "@angular/core";

@Component({
    selector: "jellyfin-slider",
    templateUrl: "./slider.component.html",
    styleUrls: ["./slider.component.scss"]
})
export class SliderComponent {
    @ViewChild("slider", { static: true }) public slider: ElementRef<HTMLDivElement>;

    public more() {
        console.log("load more");
    }

    public left() {
        const parentRect = (this.slider.nativeElement.getClientRects() as DOMRectList)[0];
        for (const child of Array.from(this.slider.nativeElement.children).reverse()) {
            const rect = (child.getClientRects() as DOMRectList)[0];
            const beyondBorder = rect.right < parentRect.left;
            if (beyondBorder) {
                child.scrollIntoView({ behavior: "smooth", block: "start" });
                break;
            }
        }
    }

    public right() {
        const parentRect = (this.slider.nativeElement.getClientRects() as DOMRectList)[0];
        for (const child of Array.from(this.slider.nativeElement.children)) {
            const rect = (child.getClientRects() as DOMRectList)[0];
            const beyondBorder = rect.left > parentRect.right;
            if (beyondBorder) {
                child.scrollIntoView({ behavior: "smooth", block: "start" });
                break;
            }
        }
    }
}
