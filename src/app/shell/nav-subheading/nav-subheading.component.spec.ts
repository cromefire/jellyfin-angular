import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { NavSubheadingComponent } from "./nav-subheading.component";

describe("NavSubheadingComponent", () => {
    let component: NavSubheadingComponent;
    let fixture: ComponentFixture<NavSubheadingComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [NavSubheadingComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NavSubheadingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
