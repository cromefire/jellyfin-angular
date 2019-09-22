import {
    AfterContentInit,
    ChangeDetectorRef,
    Component,
    ElementRef,
    ViewChild
} from "@angular/core";

@Component({
    selector: "jellyfin-slider",
    templateUrl: "./slider.component.html",
    styleUrls: ["./slider.component.scss"]
})
export class SliderComponent implements AfterContentInit {
    @ViewChild("slider", { static: true }) public slider: ElementRef<HTMLDivElement>;

    constructor(private changeDetector: ChangeDetectorRef) {}

    public ngAfterContentInit() {
        this.slider.nativeElement.addEventListener("scroll", () => {
            this.changeDetector.detectChanges();
        });
    }

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

    public get isLeft() {
        const parentRect = (this.slider.nativeElement.getClientRects() as DOMRectList)[0];
        const rect = (this.slider.nativeElement.children[1].getClientRects() as DOMRectList)[0];
        return rect.left >= parentRect.left;
    }

    public get isRight() {
        const parentRect = (this.slider.nativeElement.getClientRects() as DOMRectList)[0];
        const rect = (this.slider.nativeElement.children[
            this.slider.nativeElement.children.length - 2
        ].getClientRects() as DOMRectList)[0];
        return rect.right <= parentRect.right;
    }
}
